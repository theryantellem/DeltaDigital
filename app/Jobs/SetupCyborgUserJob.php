<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SetupCyborgUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $cyborgService = new \App\Services\Cyborg();

        try {
            if (in_array($this->user->plan, cyborgPlans())) {
                $response = $cyborgService->setupUser($this->user);

                logger(['user_set_response' => $response]);
            }
        } catch (\Throwable $th) {
            logger(['user_set_error' => $th->getMessage()]);
        }
    }
}
