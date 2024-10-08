<?php

namespace App\Services;

use GuzzleHttp\Client as GuzzleClient;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class PushNotification
{
    function sendNotification($data)
    {
        $payload = [
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
            $payload["message"]["data"] = $data['data'];
        }

        return self::handle($payload);
    }

    function handle($payload)
    {
        try {
            // Get the URL of the Firebase credentials file from the .env
            $credentialsUrl = env('FIREBASE_CREDENTIALS_URL');

            // Fetch the credentials JSON file from the provided URL
            $guzzleClient = new GuzzleClient();
            $response = $guzzleClient->get($credentialsUrl);

            // Check if the request was successful
            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Failed to download Firebase credentials file');
            }

            // Save the downloaded JSON file temporarily
            $credentialsFilePath = storage_path('app/firebase_credentials.json');
            file_put_contents($credentialsFilePath, $response->getBody());

            // Use the temporary file with Google Client
            $client = new GoogleClient();
            $client->setAuthConfig($credentialsFilePath);
            $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
            $client->refreshTokenWithAssertion();

            $token = $client->getAccessToken();
            $accessToken = $token['access_token'];

            $projectId = env('FIREBASE_PROJECT_ID');

            $headers = [
                'Authorization' => 'Bearer ' . $accessToken,
                'Content-Type' => 'application/json',
            ];

            $response = Http::withHeaders($headers)
                ->post("https://fcm.googleapis.com/v1/projects/{$projectId}/messages:send", $payload);

            // Clean up the temporary file after the request
            unlink($credentialsFilePath);

            if ($response->failed()) {
                return response()->json([
                    'message' => 'Request Error: ' . $response->body(),
                ], 500);
            }

            return true;
        } catch (\Exception $e) {
            // Handle errors
            sendToLog($e);

            return false;
        }
    }
}