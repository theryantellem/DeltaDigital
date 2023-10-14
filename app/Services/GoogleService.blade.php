<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive;

class GoogleService
{
    function uploadWithConversion()
    {
        try {
            $client = new Client();
            $client->useApplicationDefaultCredentials();
            $client->addScope(Drive::DRIVE);
            $driveService = new Drive($client);
            $fileMetadata = new Drive\DriveFile([
                'name' => 'My Report',
                'mimeType' => 'application/vnd.google-apps.spreadsheet',
            ]);
            $content = file_get_contents('../files/report.csv');
            $file = $driveService->files->create($fileMetadata, [
                'data' => $content,
                'mimeType' => 'text/csv',
                'uploadType' => 'multipart',
                'fields' => 'id',
            ]);
            printf("File ID: %s\n", $file->id);
            return $file->id;
        } catch (Exception $e) {
            echo 'Error Message: ' . $e;
        }
    }
}
