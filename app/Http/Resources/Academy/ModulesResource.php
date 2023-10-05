<?php

namespace App\Http\Resources\Academy;

use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModulesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'thumbnail' => $this->thumbnail ? url($this->thumbnail) : null,
            'description' => $this->description,
            'category_info' => new CategoryResource($this->category),
            'total_videos' => count($this->videos),
            'completion' => null
        ];
    }
}
