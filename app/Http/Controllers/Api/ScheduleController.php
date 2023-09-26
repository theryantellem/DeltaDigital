<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\ScheduleResources;
use App\Http\Resources\VideoResource;
use App\Models\Admin;
use App\Models\Schedule;
use App\Models\Video;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ScheduleController extends ApiController
{
    public function index()
    {
        $schdules = Schedule::orderBy('id', 'desc')->get();
        $resources = ScheduleResources::collection($schdules);

        return $this->sendResponse($resources, "Schedules retrieved successfully.", Response::HTTP_OK);
    }

    public function educatorSchedules($educator)
    {
        $educator = Admin::where('uuid', $educator)->firstOrFail();

        $schdules = Schedule::where('admin_id', $educator->id)->get();
        $resources = ScheduleResources::collection($schdules);

        return $this->sendResponse($resources, "Educator {$educator->first_name}'s schedules retrieved successfully.", Response::HTTP_OK);
    }

    public function show(Request $request, $schedule)
    {
        $schedule = Schedule::where('uuid', $schedule)->firstOrFail();
        $videos = Video::where('schedule_id', $schedule->id);

        if ($request->has('type')) {
            $videos = $videos->where('type', $request->type);
        }

        $resources = [
            "schedule" => new ScheduleResources($schedule),
            "videos" => VideoResource::collection($videos->get())
        ];

        return $this->sendResponse($resources, "Schedules retrieved successfully.", Response::HTTP_OK);
    }
}
