<?php

namespace App\Http\Resources\Academy;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademyRating extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reviewer_info' => new UserResource($this->user),
            'rating' => $this->stars,
            'comment' => $this->comment,
            'created_at' => $this->created_at
        ];
    }
}
