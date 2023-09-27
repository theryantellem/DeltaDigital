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

    public function setupUser($user)
    {
        return self::handle("/setupUser?userId={$user->id}&expire={$user->expiry_date}&iseligible={$user->iseligible}&username={$user->username}&email={$user->email}");
    }

    protected function handle($uri)
    {
        try {
            $request = new Request("GET", "https://backend.deltacyborg.pro/Api/Mobile/{$uri}");

            $res = $this->client->sendAsync($request)->wait();

            return json_decode($res->getBody()->getContents(), true);
        } catch (\Exception $e) {
            logger(['cyborg_error' => $e->getMessage()]);
        }
    }
}
