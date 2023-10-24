<?php

namespace App\Http\Controllers\Admin;

use App\Events\LiveStarted;
use App\Events\StopLive;
use App\Http\Controllers\Controller;
use App\Http\Resources\ScheduleResources;
use App\Http\Resources\VideoResource;
use App\Models\Admin;
use App\Models\Category;
use App\Models\LiveAttendants;
use App\Models\LiveSessions;
use App\Models\Schedule;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    function index()
    {
        return view('admin.schedule.index');
    }

    function show($id)
    {
        $schedule = Schedule::whereUuid($id)->first();

        if (!$schedule) {
            abort(404);
        }

        $data['schedule'] = $schedule;

        return view('admin.schedule.show', $data);
    }

    function getVideos($id)
    {
        $schedule = Schedule::whereUuid($id)->first();

        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Schedule not found.']);
        }

        $videos = Video::where('schedule_id', $schedule->id)->get();

        $videos = VideoResource::collection($videos);

        return response()->json(['success' => false, 'videos' => $videos]);
    }

    function videoDetails($id)
    {
        return view('admin.schedule.video');
    }

    function schedules()
    {
        $admin = Auth::guard('admin')->user();

        // $timezones = Timezone::all();

        if ($admin->hasRole('super_admin')) {
            $schdedules = Schedule::get();
        } else {
            $schdedules = Schedule::where('admin_id', $admin->id)->get();
        }

        $schdedules = ScheduleResources::collection($schdedules);

        return response()->json(['success' => true, 'schedules' => $schdedules]);
    }

    function uploadVideo(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'schedule' => 'required|exists:schedules,uuid',
                'title' => 'required|string',
                'file' => 'required|mimes:mp4,ogx,oga,ogv,ogg,webm|max:500000',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $admin = auth()->guard('admin')->user();

            $videoUrl = null;

            if ($request->hasFile('file')) {
                $videoUrl = $request->file('video_file')->store('recorded', 'public_uploads');
                // $videoUrl = uploadFile($request->file('file'), "recorded", 'b2');
            }

            $schdedule = Schedule::where('uuid', $request->schedule)->first();

            $record = Video::create([
                'admin_id' => $admin->id,
                'schedule_id' => $schdedule->id,
                'title' => $request->title,
                'video_file' => $videoUrl,
            ]);

            $record = new VideoResource($record);

            return response()->json(['success' => true, 'record' => $record]);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function startLive($id)
    {
        $schdule = Schedule::whereUuid($id)->first();

        if (!$schdule) {
            return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
        }

        $user = Auth::guard('admin')->user();

        $user->update([
            'is_live' => true
        ]);

        $fcmTokens =  followersPushTokens($user->id);

        if (!empty($fcmTokens)) {

            $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

            $data = [
                'push_tokens' =>  $fcmTokens,
                'title' => "Live started",
                'message' => "{$name} is live.",
                'stream_url' => env('LIVE_URL ') . "/{$user->stream_key}.m3u8"
            ];

            dispatch(new \App\Jobs\PushNotificationJob($data));
        }

        $schdule->update(['viewers' => 0]);

        broadcast(new LiveStarted($schdule))->toOthers();

        return response()->json(['success' => true, 'message' => 'your are now live ']);
    }

    function stopLive($id)
    {
        $schdule = Schedule::whereUuid($id)->first();

        if (!$schdule) {
            return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
        }

        LiveSessions::create([
            'schedule_id' => $id,
            'viewers' => $schdule->viewers
        ]);

        $user = Auth::guard('admin')->user();

        $user->update([
            'is_live' => false
        ]);

        $schdule->update(['viewers' => 0]);

        $fcmTokens =  followersPushTokens($user->id);

        if (!empty($fcmTokens)) {

            $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

            $data = [
                'push_tokens' =>  $fcmTokens,
                'title' => "Live ended",
                'message' => "{$name} live has ended.",
                'stream_url' => null
            ];

            dispatch(new \App\Jobs\PushNotificationJob($data));
        }

        $schdule->update(['viewers' => 0]);

        broadcast(new StopLive($schdule))->toOthers();

        return response()->json(['success' => true, 'message' => 'live session have ended']);
        // return redirect()->route('dashboard.educator.schedule.show',$id);
    }

    function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'category' => 'required|exists:categories,id',
                'educator' => 'required|exists:admins,uuid',
                'schedule_day' => 'required',
                'schedule_time' => 'required',
                'schedule_name' => 'required',
                'description' => 'nullable|string'
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $educator = Admin::where('uuid', $request->educator)->first();

            $category = Category::where('id', $request->category)->first();

            $schdedule = Schedule::create([
                'admin_id' => $educator->id,
                'category_id' => $category->id,
                'schedule_time' =>  date("H:i a", strtotime($request->schedule_time)),
                'schedule_day' => $request->schedule_day,
                'name' => $request->schedule_name
            ]);

            $schdedule = new ScheduleResources($schdedule);

            DB::commit();

            return response()->json(['success' => true, 'schedule' => $schdedule, 'message' => 'Schedule created successfully.'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'category' => 'required|exists:categories,id',
                'schedule_day' => 'required',
                'schedule_time' => 'required',
                'schedule_name' => 'required',
                'description' => 'nullable|string'
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $schdedule = Schedule::where('uuid', $id)->first();

            if (!$schdedule) {
                return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
            }

            $category = Category::where('id', $request->category)->first();

            $schdedule->update([
                'category_id' => $category->id,
                'schedule_time' => date("H:i a", strtotime($request->schedule_time)),
                'schedule_day' => $request->schedule_day,
                'name' => $request->schedule_name
            ]);

            DB::commit();

            return response()->json(['success' => true, 'message' => 'Schedule updated successfully.'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function getViewers($id)
    {
        $schdule = Schedule::findOrFail($id);

        return response()->json(['data' => $schdule->viewers]);
    }

    function makeFavourite(Request $request, $id)
    {
        Video::where('uuid', $id)->update([
            'is_favourite' => $request->is_favourite === "on" ? true : false
        ]);

        return response()->json(['success' => true, 'message' => 'Successfull.']);
    }

    function destroy($id)
    {
        $schedule = Schedule::where('uuid', $id)->first();

        if (!$schedule) {
            return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
        }

        $schedule->delete();

        return response()->json(['success' => true, 'message' => 'Schedule deleted successfully.'], 201);
    }
}
