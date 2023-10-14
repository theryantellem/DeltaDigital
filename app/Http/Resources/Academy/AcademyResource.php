<?php

namespace App\Http\Resources\Academy;

use App\Http\Resources\EducatorResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class AcademyResource extends JsonResource
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
            'name' => ucfirst($this->name),
            'thumbnail' => $this->thumbnail ? url($this->thumbnail) : null,
            'description' => $this->description,
            'caption' => Str::limit(strip_tags($this->description), 30, '...'),
            'completed' => '0%',
            'educator'=> new EducatorResource($this->educator)
        ];
    }
}
