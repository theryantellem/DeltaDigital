<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SignalResource extends JsonResource
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
            'educator' => new EducatorResource($this->educator),
            'asset' => $this->asset_type,
            'order_type' => $this->order_type,
            'entry_price' => $this->entry_price,
            'stop_loss' => $this->stop_loss,
            'target_price' => $this->target_price,
            'comment' => $this->comment,
            'photo' => $this->photo,
            'chart_photo' => $this->chart_photo,
            'market_status' => $this->market_status,
            'status' => $this->status
        ];
    }
}
