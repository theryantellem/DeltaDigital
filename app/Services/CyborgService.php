<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class CyborgService
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

    public function bindApi(array $data)
    {
        $exchange = $data['exchange'];
        $api_key = $data['api_key'];
        $api_secret = $data['api_secret'];
        $api_passphrase = $data['api_passphrase'];
        $bind = $data['bind'];
        $userId = $data['user_id'];

        return self::handle("/Apibind?userId={$userId}&exchange={$exchange}&api_key={$api_key}&api_secret={$api_secret}&api_passphrase={$api_passphrase}&bind={$bind}");
    }

    public function tradeSettings(
        $userId,
        $id,
        $firstbuy_amount,
        $double_position,
        $margin_limit,
        $profit_ratio,
        $whole_ratio,
        $first_call,
        $first_ratio,
        $profit_callback,
        $cycle,
        $one_short,
        $whole_stop,
        $second_call = 0,
        $second_ratio = 0,
        $third_call = 0,
        $third_ratio = 0,
        $forth_call = 0,
        $forth_ratio = 0,
        $fifth_call = 0,
        $fifth_ratio = 0
    ) {
        return self::handle("/tradesetting?userId={$userId}&id={$id}&firstbuy_amount={$firstbuy_amount}
        &double_position={$double_position}&margin_limit={$margin_limit}&
        profit_ratio={$profit_ratio}&whole_ratio=$whole_ratio,
        first_call={$first_call}&first_ratio=$first_ratio,
        profit_callback={$profit_callback}&cycle=$cycle,
        one_short={$one_short}&one_short=$one_short,
        whole_stop={$whole_stop}&second_call=$second_call,
        second_ratio={$second_ratio}&third_call=$third_call,
        third_ratio={$third_ratio}&forth_call=$forth_call,
        forth_ratio={$forth_ratio}&forth_call=$fifth_call,
        fifth_ratio={$fifth_ratio}
        ");
    }

    public function runningTrades($userId)
    {
        return self::handle("/strategy?userId={$userId}");
    }

    public function getStrategy($userId)
    {
        return self::handle("/ostrategy?userId={$userId}");
    }

    public function balanceRefresh()
    {
    }

    function handle(string $uri, $method = "GET")
    {
        try {
            $request = new Request($method, config('constants.cyborg.url') . $uri);

            $res = $this->client->sendAsync($request)->wait();

            return json_decode($res->getBody()->getContents());
        } catch (Exception $e) {
            logger(['cyborg_services' => $e->getMessage()]);
        }
    }
}
