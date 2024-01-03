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

        $user = auth()->user();

         // Assuming $user is the authenticated user with their timezone stored
         $userTimezone = optional($user)->timezone ?: config('app.timezone');

         // Convert the created_at timestamp to the user's timezone
         $createdAtInUserTimezone = $this->created_at->setTimezone($userTimezone);

        return [
            'id' => $this->uuid,
            'message' => $this->message,
            'sender' => $sender,
            'type' => $this->type,
            'created_at' => $createdAtInUserTimezone,
            'formatedDate' => $createdAtInUserTimezone->format('d/m/Y'),
            'formatedTime' => $createdAtInUserTimezone->format('g:i A')
        ];
    }
}
