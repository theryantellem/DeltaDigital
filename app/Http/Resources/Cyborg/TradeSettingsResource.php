<?php

namespace App\Http\Resources\Cyborg;

use App\Http\Resources\Cyborg\MarketResource;
use App\Http\Resources\Cyborg\StrategyResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TradeSettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'first_buy_amount' => $this->first_buy_amount,
            'double_position' => $this->double_position,
            'margin_limit' => $this->margin_limit,
            'profit_ratio' => $this->profit_ratio,
            'whole_ratio' => $this->whole_ratio,
            'whole_stop' => $this->whole_stop,
            'price_drop' => $this->price_drop,
            'm_ratio' => $this->m_ratio,
            'profit_callback' => $this->profit_callback,
            'cycle' => $this->cycle,
            'one_short' => $this->one_short ? true : false,
            // 'strategy' => new StrategyResource($this->strategy),
            'exchange' => $this->strategy->exchange,
            'market' => new MarketResource($this->market)
        ];
    }
}
