<?php

namespace App\Http\Resources\Cyborg;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MarketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'exchange_tag' => $this->exchange_tag,
            'coin' => $this->coin,
            'image' => url('/') . '/assets/images/coin/' . $this->coin_image,
            'strategy_ratio' => $this->strategy_ratio
        ];
    }
}
