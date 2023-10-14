<?php

namespace App\Services;

use AWS\CRT\Log;
use BackblazeB2\Client;
use BackblazeB2\Bucket;

class BlackblazeService
{

    public $client;

    function __construct()
    {
        $options = ['auth_timeout_seconds' => "60"];

        $this->client = new Client(config('filesystems.disks.b2.accountId'), config('filesystems.disks.b2.applicationKey'), $options);
    }

    public function upload($folder, $file)
    {
        $file = $this->client->upload([
            'BucketName' => config('filesystems.disks.b2.bucketName'),
            'FileName' => $folder,
            'Body' => $file
        ]);

       dd($file);

        return $file;
    }

    public function delete($file)
    {
        $fileDelete = $this->client->deleteFile([
            'BucketName' => config('filesystems.disks.b2.bucketName'),
            'FileName' => $file
        ]);

        return $fileDelete;
    }
}
