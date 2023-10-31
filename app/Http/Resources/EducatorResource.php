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
            'total_followers' => !empty($this->followers) ? $this->followers->count() : 0,
            'categories' =>  EducatorCategoryResource::collection($this->categories),
            'thumbnail' => $this->thumbnail ? $this->thumbnail : asset('frontend/img/finix.png'),
            'is_live' => $this->is_live ?  1 : 0,
            'stream_url' => $this->is_live ?  env('LIVE_URL') . "/{$this->stream_key}.m3u8" : null,
            'android_stream_url' => $this->is_live ? env('ANDRIOD_LIVE_URL') . "/{$this->stream_key}.m3u8" : null,
            'schedule' => $this->is_live && $this->liveSchedule ? ['id' => $this->liveSchedule->uuid, 'name' => $this->liveSchedule->name, 'category' => new CategoryResource($this->liveSchedule->category)] : null,
            'live_count' => $this->is_live && $this->liveSchedule ? $this->liveSchedule->viewers : 0
        ];
    }
}
