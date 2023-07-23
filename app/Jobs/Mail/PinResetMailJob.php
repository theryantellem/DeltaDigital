<?php

namespace App\Jobs\Mail;

use App\Mail\PinResetMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PinResetMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $data)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Mail data
        $body = new PinResetMail($this->data);

        // Recipient email address
        $email = $this->data['email'];

        // Try and send the mail via mailgun driver
        $sent = sendMailByDriver('mailgun', $email, $body);

        // Send mail via send grid driver if mailgun fails
        if (!$sent) {
           sendMailByDriver('smtp', $email, $body);
        }
    }
}
