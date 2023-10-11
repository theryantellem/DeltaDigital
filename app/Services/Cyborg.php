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
        return self::handle("/setupUser?userId={$user->id}&expire={$user->expiry_date}&iseligible={$user->iseligible}&username={$user->username}&email={$user->email}&ref={$user->ref}&role={$user->role}&referallinks={$user->referallinks}&referallinks2={$user->referallinks}&level2={$user->level2}&level3={$user->level3}&pushToken={$user->fcm_token}");
    }

    protected function handle($uri)
    {
        try {
            $request = new Request("GET", "https://backend.deltacyborg.pro/Api/Mobile/{$uri}");

            $res = $this->client->sendAsync($request)->wait();

            return json_decode($res->getBody()->getContents(), true);
        } catch (\Exception $e) {
            sendToLog($e);
        }
    }
}
