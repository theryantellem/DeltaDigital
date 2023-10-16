<?php

use App\Services\BlackblazeService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (!function_exists('generateReference')) { /* Check_for "generateReference" */
    function generateReference()
    {
        $reference = (string) Str::uuid();
        $reference = str_replace('-', '', $reference);

        return $reference;
    }
} /* End_check for "generateReference" */


// create caption
if (!function_exists('createCaption')) {
    function createCaption($content)
    {
        // Remove HTML tags
        $plainText = strip_tags($content);

        // Remove shortcodes (if any)
        $plainText = preg_replace('/\[.*?\]/', '', $plainText);

        // Set the desired maximum length for the caption
        $maxCaptionLength = 150;

        // Create the caption from the content
        $caption = Str::limit($plainText, $maxCaptionLength);

        // If the content exceeds the maximum length, add an ellipsis at the end
        if (strlen($plainText) > $maxCaptionLength) {
            $caption .= '...';
        }

        return $caption;
    }
}

if (!function_exists('settings')) {
    function settings()
    {
        return (object)[
            'storage' => [
                'driver' => 'b2'
            ]
        ];
    }
}

/**
 * Send mail with the specified driver
 *
 * @param string  $driver
 * @param string  $email
 * @param array  $data
 *
 * @return boolean  true|false
 */
if (!function_exists('sendMailByDriver')) { /* Check_for "sendMailByDriver" */
    function sendMailByDriver($driver, $email, $data)
    {
        // Try and send the mail via the selected dirver
        {
            // Mailgun drivers
            $mailgunDrivers = ['mailgun', 'onboarding_mailgun', 'marketing_mailgun', 'transaction_mailgun'];

            // Criteria to lookout for in the selected mail driver
            $criteria = in_array($driver, $mailgunDrivers) ? config('mail.mailers.' . $driver . '.domain') : config('mail.mailers.' . $driver . '.username');

            // Verify if the driver exist in the env and mail configuration file
            if (!is_null($criteria)) {
                // Try and send the mail via the selected dirver
                try {
                    Mail::mailer($driver)->to($email)->send($data);

                    return true;
                } catch (\Exception $e) {
                    // Log the driver mail error
                    logger($driver == 'smtp' ? 'Mailtrap' : 'Mailgun' . ' Failure => ', [
                        'message' => $e->getMessage(),
                    ]);

                    return false;
                }
            }

            logger(ucfirst($driver) . ' driver configuration is empty.');
            return false;
        }
    }
}

if (!function_exists('cyborgPlans')) { /* Check_for "plans allowed for cyborg" */
    function cyborgPlans()
    {
        return  ["Delta Digital Plus", "Delta Digital Plus Renewal", "Delta Digital Plus Upgrade", "Delta Digital Pro Renewal", "Delta Digital Pro Upgrade", "Delta Digital Pro"];
    }
}

if (!function_exists('signalPlans')) { /* Check_for "plans allowed for signal" */
    function signalPlans()
    {
        return  ["Delta Digital Plus", "Delta Digital Plus Renewal", "Delta Digital Plus Upgrade", "Delta Digital Pro Renewal", "Delta Digital Pro Upgrade", "Delta Digital Pro", "Delta Digital Standard Renewal"];
    }
}

if (!function_exists('sendToLog')) { /* send to log" */
    function sendToLog($log)
    {
        logger($log);
    }
}


if (!function_exists('followers')) {
    function followers($educator)
    {
        $followers = \App\Models\UserFollower::where('admin_id', $educator)->get();

        return $followers;
    }
}

if (!function_exists('followersPushTokens')) {
    function followersPushTokens($educator)
    {
        $followers = \App\Models\UserFollower::with('user')->where('admin_id', $educator)
            ->whereHas('user', function ($query) {
                $query->whereNotNull('fcm_token')->where('iseligible', 1)->select('fcm_token');
            })
            ->get();

        $fcmTokens = $followers->pluck('user.fcm_token')->toArray();

        return $fcmTokens;
    }
}

if (!function_exists('uploadFile')) { /* send to log" */
    function uploadFile($file, $folder, $driver = "")
    {
        // if (str_contains("b2", $driver)) {
        //     // $fileUrl = env('B2_BUCKET_URL') . '/' . Storage::disk('b2')->put("{$folder}", $file);
        //     $backblaze = new BlackblazeService();
        //     $fileName = $file->getClientOriginalName();
        //     // $filePath = "{$folder}/" . $fileName;
        //     $fileUrl = $backblaze->upload($fileName, $file);
        //     return $fileUrl;
        // } else if (str_contains("s3", $driver)) {
        //     $fileName = $file->getClientOriginalName();
        //     $filePath = "{$folder}/" . $fileName;
        //     $path = Storage::disk('s3')->put($filePath, file_get_contents($file));
        //     $fileUrl = Storage::disk('s3')->url($path);
        // } else {
        $file_name = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path("{$folder}"), $file_name);

        $fileUrl = url("{$folder}/" . $file_name);
        // }

        return $fileUrl;
    }
}
