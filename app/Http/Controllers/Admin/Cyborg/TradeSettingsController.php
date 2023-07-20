<?php

namespace App\Http\Controllers\Admin\Cyborg;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cyborg\TradeSettingsRquest;
use App\Http\Resources\Cyborg\TradeSettingsResource;
use App\Models\Strategy;
use App\Models\TradeSettings;
use Illuminate\Http\Request;

class TradeSettingsController extends Controller
{
    public function index()
    {
        $tradeSettings = TradeSettingsResource::collection(TradeSettings::get());

        return response()->json(['success' => true, 'trade_settings' => $tradeSettings]);
    }

    public function create()
    {
    }

    public function store(TradeSettingsRquest $request)
    {
        // get strategy
        $strategy = Strategy::whereUuid($request->strategy)->first();

        $settings = TradeSettings::create([
            'strategy_id' => $strategy->id,
            'market_id' => $request->market,
            'first_buy_amount' => $request->first_buy,
            'double_position' => $request->double_position,
            'margin_limit' => $request->margin_limit,
            'profit_ratio' => $request->profit_ratio,
            'whole_ratio' => $request->whole_ratio,
            'whole_stop' => $request->whole_stop,
            'profit_callback' => $request->profit_callback,
            'price_drop' => implode("|", $request->price_drop),
            'm_ratio' => implode("|", $request->m_ratio)
        ]);

        $settings = new TradeSettingsResource($settings);

        return response()->json(['success' => true, 'message' => "Trade Settings created successfully", "trade_settings" => $settings]);
    }

    public function destroy(TradeSettings $settings)
    {
        $settings->deleted_at = now();

        $settings->save();

        return response()->json(['success' => true, 'message' => "Trade Settings deleted successfully."]);
    }
}
