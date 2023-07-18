<?php

namespace App\Http\Resources\Cyborg;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StrategyResource extends JsonResource
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
            'strategy_name' => $this->strategy_name,
            'minimum_amount' => $this->minimum_amount,
            'formated_amount' => 'USDT' . number_format($this->minimum_amount, 2, '.', ','),
            'description' => $this->description,
            'image' => $this->image,
            'exchange' => new ExchangeResource($this->exchange),
        ];
    }
}
