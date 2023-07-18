<?php

namespace App\Http\Controllers\Admin\Cyborg;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cyborg\TradeSettingsRquest;
use App\Models\Strategy;
use Illuminate\Http\Request;

class TradeSettingsController extends Controller
{
    public function index()
    {
    }

    public function create()
    {
    }

    public function store(TradeSettingsRquest $request)
    {
        // get strategy
        $strategy = Strategy::whereUuid($request->strategy)->first();

        $settings = $strategy->tradeSettings()->create([
            'market_id' => $request->market,
            'first_buy_amount' => $request->first_buy,
            'double_postion' => $request->double_position,
            'margin_limit' => $request->margin_limit,
            'profit_ratio' => $request->profit_ratio,
            'whole_ratio' => $request->whole_ratio,
            'whole_stop' => $request->whole_stop,
            'profit_callback' => $request->profit_callback,
            'price_drop' => implode("|", $request->price_drop),
            'm_ration' => implode("|", $request->m_ration)
        ]);

        return response()->json(['success' => true, 'message' => "Trade Settings created successfully", "trade_settings" => $settings]);
    }
}
