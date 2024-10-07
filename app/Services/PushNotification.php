<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class PushNotification
{
    function sendNotification($data)
    {
        $payload =
            [
                "message" => [
                    'token' => $data['push_token'],
                    "notification" => [
                        'title' => $data['title'],
                        'body' => $data['message'],
                    ],
                    "android" => [
                        "notification" => [
                            "sound" => "default"
                        ]
                    ],
                    "apns" => [
                        "payload" => [
                            "aps" => [
                                "sound" => "default"
                            ]
                        ]
                    ]
                ]
            ];

        if (!empty($data['data'])) {
            $payload["message"]["data"] =  $data['data'];
        }

        return self::handle($payload);
    }

    function handle($payload)
    {
        try {
            $credentialsFilePath = base_path('lkl.json');

            $client = new GoogleClient();

            $client->setAuthConfig($credentialsFilePath);

            $client->addScope('https://www.googleapis.com/auth/firebase.messaging');

            $client->refreshTokenWithAssertion();

            $token = $client->getAccessToken();

            $projectId = 'delta-signal';

            $access_token = $token['access_token'];

            $headers = [
                'Authorization' => 'Bearer ' . $access_token,
                'Content-Type' => 'application/json',
            ];

            $response = Http::withHeaders($headers)
                ->post("https://fcm.googleapis.com/v1/projects/{$projectId}/messages:send", $payload);

            if ($response->failed()) {
                return response()->json([
                    'message' => 'Request Error: ' . $response->body(),
                ], 500);
                // return false;
            }

            return true;

            // return response()->json([
            //     'message' => 'Notification has been sent',
            //     'response' => $response->json(),
            // ]);
        } catch (\Exception $e) {
            sendToLog($e);

            return false;
        }
    }
}
