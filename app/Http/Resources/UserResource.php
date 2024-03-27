<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'user_id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'profile_picture' => $this->profile_picture,
            'plan' => $this->plan,
            'expiry_time' => $this->expiry_date,
            'referallinks' => [
                'left_link' => $this->left_link,
                'right_link' => $this->right_link
            ],
            'role' => $this->role,
            'iseligible' => $this->iseligible ? $this->iseligible : false,
            'cyborg' => in_array($this->plan, cyborgPlans()) ? true : false,
            'signal' => in_array($this->plan, signalPlans()) ? true : false,
            'push_token' => $this->fcm_token,
            'pin'  => $this->pin,
            'subscribe' => (bool) $this->id != "20874" ? true : $this->subscribe,
        ];
    }
}
