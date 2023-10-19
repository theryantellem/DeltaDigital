<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducatorResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'photo' => !empty($this->photo) ? $this->photo : url('/') . "/images/educator/default.png",
            'total_followers' => $this->followers->count(),
            'categories' =>  EducatorCategoryResource::collection($this->categories),
            'is_live' => $this->is_live ?  1 : 0,
            'stream_url' => $this->is_live ?  env('LIVE_URL') . "/{$this->stream_key}.m3u8" : null
        ];
    }
}
