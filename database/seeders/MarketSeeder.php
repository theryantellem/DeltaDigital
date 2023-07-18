<?php

namespace Database\Seeders;

use App\Models\Market;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $markets = self::marketData();

        foreach ($markets as $market) {
            \App\Models\Market::create([
                'name' => $market['market'],
                'exchange_tag' => $market['exchange'],
                'coin' => $market['coin'],
                'coin_image' => $market['coin_image'],
                'strategy_ratio' => $market['strategy_ratio']
            ]);
        }
    }

    public function marketData()
    {
        $values = array(
            array(
                'exchange' => 1,
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ),
            array(
                'exchange' => 1,
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ),
            array(
                'exchange' => 1,
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ),
            array(
                'exchange' => 1,
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ),
            array(
                'exchange' => 1,
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ),
            array(
                'exchange' => 1,
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ),
            array(
                'exchange' => 1,
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ),
            array(
                'exchange' => 1,
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ),
            array(
                'exchange' => 1,
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ),
            array(
                'exchange' => 1,
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ),
            array(
                'exchange' => 1,
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ),
            array(
                'exchange' => 1,
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ),
            array(
                'exchange' => 1,
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ),
            array(
                'exchange' => 1,
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ),
            array(
                'exchange' => 1,
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ),
            array(
                'exchange' => 1,
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ),
            array(
                'exchange' => 1,
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ),
            array(
                'exchange' => 1,
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ),
            array(
                'exchange' => 1,
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ),
            array(
                'exchange' => 1,
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ),
            array(
                'exchange' => 1,
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ),
            array(
                'exchange' => 1,
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ),
            array(
                'exchange' => 1,
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ),
            array(
                'exchange' => 1,
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ),
            array(
                'exchange' => 1,
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ),
            array(
                'exchange' => 1,
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ),
            array(
                'exchange' => 1,
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ),
            array(
                'exchange' => 1,
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ),
            array(
                'exchange' => 1,
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ),
            array(
                'exchange' => 1,
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ),
            array(
                'exchange' => 1,
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            ),
            array(
                'exchange' => 2,
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ),
            array(
                'exchange' => 2,
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ),
            array(
                'exchange' => 2,
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ),
            array(
                'exchange' => 2,
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ),
            array(
                'exchange' => 2,
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ),
            array(
                'exchange' => 2,
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ),
            array(
                'exchange' => 2,
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ),
            array(
                'exchange' => 2,
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ),
            array(
                'exchange' => 2,
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ),
            array(
                'exchange' => 2,
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ),
            array(
                'exchange' => 2,
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ),
            array(
                'exchange' => 2,
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ),
            array(
                'exchange' => 2,
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ),
            array(
                'exchange' => 2,
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ),
            array(
                'exchange' => 2,
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ),
            array(
                'exchange' => 2,
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ),
            array(
                'exchange' => 2,
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ),
            array(
                'exchange' => 2,
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ),
            array(
                'exchange' => 2,
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ),
            array(
                'exchange' => 2,
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ),
            array(
                'exchange' => 2,
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ),
            array(
                'exchange' => 2,
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ),
            array(
                'exchange' => 2,
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ),
            array(
                'exchange' => 2,
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ),
            array(
                'exchange' => 2,
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ),
            array(
                'exchange' => 2,
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ),
            array(
                'exchange' => 2,
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ),
            array(
                'exchange' => 2,
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ),
            array(
                'exchange' => 2,
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ),
            array(
                'exchange' => 2,
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ),
            array(
                'exchange' => 2,
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            ),
            array(
                'exchange' => 3,
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ),
            array(
                'exchange' => 3,
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ),
            array(
                'exchange' => 3,
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ),
            array(
                'exchange' => 3,
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ),
            array(
                'exchange' => 3,
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ),
            array(
                'exchange' => 3,
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ),
            array(
                'exchange' => 3,
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ),
            array(
                'exchange' => 3,
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ),
            array(
                'exchange' => 3,
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ),
            array(
                'exchange' => 3,
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ),
            array(
                'exchange' => 3,
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ),
            array(
                'exchange' => 3,
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ),
            array(
                'exchange' => 3,
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ),
            array(
                'exchange' => 3,
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ),
            array(
                'exchange' => 3,
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ),
            array(
                'exchange' => 3,
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ),
            array(
                'exchange' => 3,
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ),
            array(
                'exchange' => 3,
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ),
            array(
                'exchange' => 3,
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ),
            array(
                'exchange' => 3,
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ),
            array(
                'exchange' => 3,
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ),
            array(
                'exchange' => 3,
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ),
            array(
                'exchange' => 3,
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ),
            array(
                'exchange' => 3,
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ),
            array(
                'exchange' => 3,
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ),
            array(
                'exchange' => 3,
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ),
            array(
                'exchange' => 3,
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ),
            array(
                'exchange' => 3,
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ),
            array(
                'exchange' => 3,
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ),
            array(
                'exchange' => 3,
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ),
            array(
                'exchange' => 3,
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            ),
            array(
                'exchange' => 4,
                'market' => "BTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BTC",
                'coin_image' => "BTC.png"
            ),
            array(
                'exchange' => 4,
                'market' => "ETH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "ETH",
                'coin_image' => "ETH.png"
            ),
            array(
                'exchange' => 4,
                'market' => "BNB/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "BNB",
                'coin_image' => "BNB.png"
            ),
            array(
                'exchange' => 4,
                'market' => "HBAR/USDT",
                'strategy_ratio' => 2.4,
                'coin' => "HBAR",
                'coin_image' => "HBAR.png"
            ),
            array(
                'exchange' => 4,
                'market' => "HOT/USDT",
                'strategy_ratio' => 2.3,
                'coin' => "HOT",
                'coin_image' => "HOT.png"
            ),
            array(
                'exchange' => 4,
                'market' => "QTUM/USDT",
                'strategy_ratio' => 1.1,
                'coin' => "QTUM",
                'coin_image' => "QTUM.png"
            ),
            array(
                'exchange' => 4,
                'market' => "VET/USDT",
                'strategy_ratio' => 3,
                'coin' => "VET",
                'coin_image' => "VET.png"
            ),
            array(
                'exchange' => 4,
                'market' => "XLM/USDT",
                'strategy_ratio' => 2.5,
                'coin' => "XLM",
                'coin_image' => "XLM.png"
            ),
            array(
                'exchange' => 4,
                'market' => "1INCH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "1INCH",
                'coin_image' => "1INCH.png"
            ),
            array(
                'exchange' => 4,
                'market' => "AAVE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "AAVE",
                'coin_image' => "AAVE.png"
            ),
            array(
                'exchange' => 4,
                'market' => "ADA/USDT",
                'strategy_ratio' => 6.1,
                'coin' => "ADA",
                'coin_image' => "ADA.png"
            ),
            array(
                'exchange' => 4,
                'market' => "CAKE/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "CAKE",
                'coin_image' => "CAKE.png"
            ),
            array(
                'exchange' => 4,
                'market' => "DASH/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DASH",
                'coin_image' => "DASH.png"
            ),
            array(
                'exchange' => 4,
                'market' => "DOGE/USDT",
                'strategy_ratio' => 5.1,
                'coin' => "DOGE",
                'coin_image' => "DOGE.png"
            ),
            array(
                'exchange' => 4,
                'market' => "DOT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "DOT",
                'coin_image' => "DOT.png"
            ),
            array(
                'exchange' => 4,
                'market' => "EOS/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "EOS",
                'coin_image' => "EOS.png"
            ),
            array(
                'exchange' => 4,
                'market' => "ETC/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ETC",
                'coin_image' => "ETC.png"
            ),
            array(
                'exchange' => 4,
                'market' => "FIL/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "FIL",
                'coin_image' => "FIL.png"
            ),
            array(
                'exchange' => 4,
                'market' => "FTT/USDT",
                'strategy_ratio' => 2.2,
                'coin' => "FTT",
                'coin_image' => "FTT.png"
            ),
            array(
                'exchange' => 4,
                'market' => "GRT/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "GRT",
                'coin_image' => "GRT.png"
            ),
            array(
                'exchange' => 4,
                'market' => "LINK/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LINK",
                'coin_image' => "LINK.png"
            ),
            array(
                'exchange' => 4,
                'market' => "LTC/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "LTC",
                'coin_image' => "LTC.png"
            ),
            array(
                'exchange' => 4,
                'market' => "THETA/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "THETA",
                'coin_image' => "THETA.png"
            ),
            array(
                'exchange' => 4,
                'market' => "UNI/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "UNI",
                'coin_image' => "UNI.png"
            ),
            array(
                'exchange' => 4,
                'market' => "XMR/USDT",
                'strategy_ratio' => 3.1,
                'coin' => "XMR",
                'coin_image' => "XMR.png"
            ),
            array(
                'exchange' => 4,
                'market' => "XRP/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XRP",
                'coin_image' => "XRP.png"
            ),
            array(
                'exchange' => 4,
                'market' => "XTZ/USDT",
                'strategy_ratio' => 2.1,
                'coin' => "XTZ",
                'coin_image' => "XTZ.png"
            ),
            array(
                'exchange' => 4,
                'market' => "ALICE/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "ALICE",
                'coin_image' => "ALICE.png"
            ),
            array(
                'exchange' => 4,
                'market' => "SOL/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "SOL",
                'coin_image' => "SOL.png"
            ),
            array(
                'exchange' => 4,
                'market' => "LUNA/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "LUNA",
                'coin_image' => "LUNA.png"
            ),
            array(
                'exchange' => 4,
                'market' => "FTM/USDT",
                'strategy_ratio' => 4.1,
                'coin' => "FTM",
                'coin_image' => "FTM.png"
            )
        );

        return $values;
    }
}
