<?php

namespace App\Http\Controllers\Api\Cyborg;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Resources\Cyborg\StrategyResource;
use App\Http\Resources\Cyborg\TradeSettingsResource;
use App\Models\ExchangeBind;
use App\Models\Strategy;
use App\Models\TradeSettings;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class StrategyController extends ApiController
{
    function index()
    {
        $strategy = StrategyResource::collection(Strategy::get());

        return $this->sendResponse($strategy, "List of strategies");
    }

    public function tradeSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'strategy' => 'required|string|exists:strategies,uuid',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return $this->sendError("Validation failed.", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $strategy = Strategy::where('uuid', $request->strategy)->first();

        if (!$strategy) {
            return $this->sendError("Strategy not found.", null, Response::HTTP_NOT_FOUND);
        }

        $tradeSettings = TradeSettings::where('strategy_id', $strategy->id)->get();

        $tradeSettings = TradeSettingsResource::collection($tradeSettings);

        return $this->sendResponse($tradeSettings, "Trade Settings.");
    }

    public function syncStrategy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'strategy' => 'required|string|exists:strategies,uuid',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return $this->sendError("Validation failed.", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = $request->user();

        $strategy = Strategy::where('uuid', $request->strategy)->first();

        if (!$strategy) {
            return $this->sendError("Strategy not found.", null, Response::HTTP_NOT_FOUND);
        }

        $exchange = $strategy->exchange;

        $userBind = ExchangeBind::where('user_id', $user->id, 'exchange_id', $exchange->id)->first();

        $api_key =  $userBind['api_key'];
        $api_secret =  $userBind['api_secret'];
        $api_passphrase =  $userBind['api_passphrase'];
        $platform = $exchange->tag;
        $api_key = str_replace('#', '%23', $api_key);
        $api_key = str_replace('@', '%40', $api_key);
        $api_key = str_replace(' ', '%2B', $api_key);
        $api_secret = str_replace('#', '%23', $api_secret);
        $api_secret = str_replace('@', '%40', $api_secret);
        $api_secret = str_replace(' ', '%2B', $api_secret);
        $api_passphrase = str_replace('.#.', '%2E%23%2E', $api_passphrase);
        $api_passphrase = str_replace('#', '%23', $api_passphrase);
        $api_passphrase = str_replace('@', '%40', $api_passphrase);

        $tradeSettings = TradeSettings::where('strategy_id', $strategy->id)->get();

        foreach ($tradeSettings as $val) {
            $buy_position = $val['buy_position'];
            $sell_position = $val['sell_position'];
            $coin = $val['coin'];
            $trade_price = $val['trade_price'];
            $firstbuy_amount = $val['firstbuy_amount'];
            $qty = $val['qty'];
            $double_position = $val['double_position'];
            $margin_limit = $val['margin_limit'];
            $profit_ratio = $val['profit_ratio'];
            $whole_ratio = $val['whole_ratio'];
            $price_drop = str_replace(',', '|', $val['price_drop']);
            $m_ratio = str_replace(',', '|', $val['m_ratio']);
            $profit_callback = $val['profit_callback'];
            $buycallback = $val['buy_callback'];
            $position_amount = $val['position_amount'];
        }

        return $this->sendResponse(null, "Sync to strategy was successfully", Response::HTTP_CREATED);
    }
}
