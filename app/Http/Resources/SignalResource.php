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
            'asset' => new AssetResource($this->asset),
            'category' => new CategoryResource($this->category),
            'order_type' => $this->order_type,
            'entry_price' => $this->entry_price,
            'stop_loss' => $this->stop_loss,
            'target_price' => $this->target_price,
            'percentage' => $this->percentage,
            'comment' => $this->comment,
            // 'photo' => $this->photo,
            'chart_photo' => $this->chart_photo,
            'status' => $this->market_status,
            'is_updated' => $this->is_updated,
            // 'status' => $this->status
        ];
    }
}