<?php

namespace App\Http\Controllers\Api;

use App\Events\JoinedStream;
use App\Http\Controllers\ApiController;
use App\Http\Resources\EducatorResource;
use App\Http\Resources\ScheduleResources;
use App\Http\Resources\UserResource;
use App\Http\Resources\VideoResource;
use App\Models\Admin;
use App\Models\LiveAttendants;
use App\Models\Schedule;
use App\Models\UserFollower;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        // if ($request->has('type')) {
        //     $videos = $videos->where('type', $request->type);
        // }

        $resources = [
            "schedule" => new ScheduleResources($schedule),
            "videos" => VideoResource::collection($videos->get())
        ];

        return $this->sendResponse($resources, "Schedules retrieved successfully.", Response::HTTP_OK);
    }

    function setViewers($id)
    {
        $schdule = Schedule::whereUuid($id)->first();

        if (!$schdule) {
            return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
        }

        $user = LiveAttendants::where('user_id', Auth::user()->id)->where('schedule_id', $schdule->id)->where('date', date("Y-m-d"))->first();



        if (!$user) {

            $schdule->viewers = $schdule->viewers + 1;

            $schdule->save();

            LiveAttendants::create([
                'user_id' => Auth::user()->id,
                'schedule_id' => $schdule->id,
                'date' => date("Y-m-d")
            ]);

            // event(new JoinedStream($schdule));
        }

        $sch = $schdule->refresh();

        if ($sch->viewers == 0) {
            $sch->update(['viewers' => 1]);
        }

        $schdule = $schdule->refresh();

        return response()->json(['message' => 'updated successfully', 'viewers' => $schdule->viewers]);
    }

    function leaveStream($id)
    {
        try {
            $schedule = Schedule::whereUuid($id)->first();

            if (!$schedule) {
                return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
            }

            $schedule->update([
                'viewers' =>  $schedule->viewers > 0 ? $schedule->viewers - 1 : 0
            ]);

            LiveAttendants::where([
                'user_id' => Auth::user()->id,
                'schedule_id' => $schedule->id,
                'date' => date("Y-m-d")
            ])->delete();

            // event(new JoinedStream($schedule));

            return response()->json(['message' => 'updated successfully', 'viewers' => $schedule->viewers]);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function getViewers($schedule)
    {
        $schdule = Schedule::whereUuid($schedule)->firstOrFail();

        return $this->sendResponse($schdule->viewers);
    }

    function educatorsOnLive()
    {
        try {

            // get list of eductors user is following
            $educators = UserFollower::where('user_id', auth()->user()->id)->pluck('admin_id')->toArray();

            $educators = Admin::whereIn('id', $educators)->where('is_live', true)->get();

            $educators = EducatorResource::collection($educators);

            return $this->sendResponse($educators);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
