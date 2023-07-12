<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Hamcrest\SelfDescribing;

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

    public function tradeSettings(array $data)
    {

        $userId = $data['userId'];
        $id = $data['id'];
        $firstbuy_amount = $data['firstbuy_amount'];
        $double_position = $data['double_positio'];
        $margin_limit = $data['margin_limit'];
        $profit_ratio = $data['profit_ratio'];
        $whole_ratio = $data['whole_ratio'];
        $first_call = $data['first_call'];
        $first_ratio = $data['first_ratio'];
        $profit_callback = $data['profit_callback'];
        $cycle = $data['cycle'];
        $one_short = $data['one_short'];
        $whole_stop = $data['whole_stop'];

        return self::handle("/tradesetting?userId={$userId}&id={$id}&firstbuy_amount={$firstbuy_amount}&double_position={$double_position}&margin_limit={$margin_limit}&profit_ratio={$profit_ratio}&whole_ratio=$whole_ratio&first_call={$first_call}&first_ratio=$first_ratio&profit_callback={$profit_callback}&cycle=$cycle&one_short={$one_short}&one_short=$one_short&whole_stop={$whole_stop}");
    }

    public function runningTrades($userId)
    {
        return self::handle("/strategy?userId={$userId}");
    }

    public function getOStrategy($userId)
    {
        return self::handle("/ostrategy?userId={$userId}");
    }

    public function strategy($userId)
    {
        return self::handle("/strategy?userId={$userId}");
    }

    public function getRevenue($userId)
    {
        return self::handle("/Revenue?userId={$userId}");
    }

    public function startBot($userId, $marketId)
    {
        return self::handle("/start?userId={$userId}&id={$marketId}&startbot=1");
    }

    public function stopBot($userId, $marketId)
    {
        return self::handle("/start?userId={$userId}&id={$marketId}&startbot=0");
    }

    public function getStrategy($userId)
    {
        return self::handle("/getstrategy?userId={$userId}");
    }

    public function Mycounselor($userId)
    {
        return self::handle("/Mycounselor?userId={$userId}");
    }

    public function Team($userId)
    {
        return self::handle("/Team?userId={$userId}");
    }

    public function cancelCycle($id)
    {
        return self::handle("/cancelsync?strategyid={$id}");
    }

    public function Leaderboard($userId)
    {
        return self::handle("/Leaderboard?userId={$userId}");
    }

    public function deleteStrategy($id)
    {
        return self::handle("/addgetstrategy?id={$id}&type=3");
    }

    public function getRewardDetails($userId)
    {
        return self::handle("/Rewarddetails?userId={$userId}");
    }

    public function getAssets($userId)
    {
        return self::handle("/Asset?userId={$userId}");
    }

    public function depositeAddress($userId)
    {
        return self::handle("/depositaddress?userId={$userId}");
    }

    public function doWithdraw($userId, $amount, $address)
    {
        return self::handle("/doWithdraw?userId={$userId}&num={$amount}&addr={$address}");
    }

    public function strategyDetails($userId, $market, $exchange)
    {
        return self::handle("/newstrategyget?userId={$userId}&market={$market}&exchange=$exchange");
    }

    public function getCircle($userId)
    {
        return self::handle("/getcircle?userId={$userId}");
    }

    public function deleteCircle($userId, $circleId)
    {
        return self::handle("/deletecircle?userId={$userId}&id={$circleId}");
    }

    public function circleLeaderboard($userId)
    {
        return self::handle("/circleleaderboard?userId={$userId}");
    }

    public function createCircle($userId, $name, $type, $intro)
    {
        return self::handle("/createcircle?userId={$userId}&name={$name}&type={$type}&intro={$intro}");
    }

    public function joinCircle($userId, $cirlceId, $type)
    {
        return self::handle("/joincircle?userId={$userId}&id={$cirlceId}&type={$type}");
    }

    public function viewCircle($userId, $id)
    {
        return self::handle("/viewcircle?userId={$userId}&id={$id}");
    }

    public function viewJoinedCircle($userId, $cirlceId)
    {
        return self::handle("/viewjoinedcircle?userId={$userId}&id={$cirlceId}");
    }

    public function updateCircle($userId, $circleId, $type,)
    {
        return self::handle("/createcircle?userId={$userId}&id={$circleId}&type={$type}");
    }

    public function circleIncome($userId)
    {
        return self::handle("/circleincome?userId={$userId}");
    }

    public function postCircle($userId, $circleId, $topic)
    {
        return self::handle("/postcircle?userId={$userId}&id={$circleId}&topic={$topic}");
    }

    public function synCircle($userId, $id, $sync, $profit, $exchange)
    {
        return self::handle("/syncircle?userId=$userId&id={$id}&sync={$sync}&profit={$profit}&exchange={$exchange}");
    }

    public function syncedCircle($userId, $id)
    {
        return self::handle("/viewsynccircle?userId={$userId}&id={$id}");
    }

    public function joinCircleStrategy($userId, $id, $first_buy, $market, $exchange)
    {
        return self::handle("/joincirclestrategy?userId={$userId}&id={$id}&first_buy={$first_buy}&market={$market}&exchange={$exchange}");
    }

    public function canceleSync($userId, $strategyid)
    {
        return self::handle("/cancelsync?userId={$userId}&strategyid={$strategyid}");
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
