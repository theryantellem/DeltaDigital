<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResources extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray(Request $request): array
    {
        $day = $this->schedule_day;

        // Check if $day is a string and if it can be decoded as JSON
        if (is_string($day) && is_array(json_decode($day, true))) {
            // If it's JSON, decode it
            $day = json_decode($day, true);
        } else {
            // If it's not JSON, convert it to an array
            $day = [$day];
        }

        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'day' => $this->schedule_day,
            'days' => formatFirstToLast($day),
            'time' => $this->schedule_time,
            'educator' => new EducatorResource($this->admin),
            'category' => new CategoryResource($this->category)
        ];
    }
}
