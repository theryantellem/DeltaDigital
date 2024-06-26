<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LiveChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sender = null;

        if (!empty($this->user)) {
            $sender = [
                'id' => $this->user->uuid,
                'name' => $this->user->username,
                'photo' => $this->user->profile_picture
            ];
        } else {
            $sender = [
                'id' => $this->educator->uuid,
                'name' => $this->educator->first_name . ' ' . $this->educator->last_name,
                'photo' => $this->educator->photo
            ];
        }

        return [
            'id' => $this->uuid,
            'message' => $this->message,
            'sender' => $sender,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'formatedDate' => Carbon::parse($this->created_at)->format('d/m/Y'),
            'formatedTime' => Carbon::parse($this->created_at)->format('g:i A')
        ];
    }
}
