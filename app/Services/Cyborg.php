<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class Cyborg
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function setupUser($userId)
    {
        return self::handle("/setupUser?userId={$userId}");
    }

    protected function handle($uri)
    {
        try {
            $request = new Request("GET", "https://backend.deltastreaming.pro/Api/Mobile/{$uri}");

            $res = $this->client->sendAsync($request)->wait();

            return json_decode($res->getBody()->getContents(), true);
        } catch (\Exception $e) {
            logger(['cyborg_error' => $e->getMessage()]);
        }
    }
}
