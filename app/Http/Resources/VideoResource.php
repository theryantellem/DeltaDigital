<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'title' => $this->title,
            'is_favourite' => $this->is_favourite,
            'thumbnail' => $this->thumbnail,
            'file' => $this->video_file,
            'created_at' => $this->created_at,
            'category' => new CategoryResource($this->schedule->category)
        ];
    }
}
