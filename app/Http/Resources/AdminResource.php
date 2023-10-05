<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
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
            'first_name' => ucfirst($this->first_name),
            'last_name' => ucfirst($this->last_name),
            'email' => $this->email,
            'photo' => !empty($this->photo) ? $this->photo : url('/') . "/images/educator/default.png",
            'roles' => $this->roles
        ];
    }
}
