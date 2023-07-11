<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SetupCyborgUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $userId)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $cyborgService = new \App\Services\CyborgService();

        try {
            $response = $cyborgService->setupUser($this->userId);

            logger(['user set response' => $response]);
        } catch (\Throwable $th) {
            logger(['user set error' => $th->getMessage()]);
        }
    }
}
