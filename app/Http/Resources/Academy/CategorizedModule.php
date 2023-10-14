<?php

namespace App\Http\Resources\Academy;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CategorizedModule extends JsonResource
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
            'name' => ucfirst($this->name),
            'thumbnail' => $this->thumbnail ? url($this->thumbnail) : null,
            'description' => $this->description,
            'caption' => Str::limit(strip_tags($this->description), 30, '...'),
            'modules' => ModulesResource::collection($this->academyModules),
        ];
    }
}
