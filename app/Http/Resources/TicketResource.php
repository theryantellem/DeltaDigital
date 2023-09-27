<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->uuid,
            'subject'=>$this->subject,
            'status'=>$this->status,
            'created_at'=>$this->created_at,
            'messages'=> TiceketMessageResource::collection($this->messages)
        ];
    }
}
