<?php

namespace App\Http\Resources\Academy;

use App\Http\Resources\CategoryResource;
use App\Models\AcademyEnrolment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

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
            'id' => $this->uuid,
            'name' => $this->name,
            'description' => $this->description,
            // 'academy_info' => new AcademyResource($this->academy),
            'caption' => Str::limit(strip_tags($this->description), 30, '...'),
            'videos' => VideosResource::collection($this->videos),
            'total_videos' => count($this->videos),
            'completed' => $this->completed($this->videos->sum('length'), $this->id),
        ];
    }

    private function completed($total_length, $module_id)
    {
        if (auth('admin')->check() || $total_length < 1) {
            return "0%";
        }

        $user = auth()->user();

        if (!$user) {
            return "0%";
        }

        $enrolment = AcademyEnrolment::where('academy_module_id', $module_id)
            ->where('user_id', $user->id)
            ->first();

        if (!$enrolment) {
            return "0%";
        }

        $watch_time = $enrolment->watch_time;
        $completed = ($watch_time / $total_length) * 100;

        if ($completed > 100) {
            return "100%";
        }

        return number_format($completed) . "%";
    }
}
