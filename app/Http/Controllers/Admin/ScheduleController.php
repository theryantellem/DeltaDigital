<?php

namespace App\Http\Controllers\Admin;

use App\Events\ChatNotification;
use App\Events\LiveStarted;
use App\Events\StopLive;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Http\Resources\LiveChatResource;
use App\Http\Resources\ScheduleResources;
use App\Http\Resources\VideoResource;
use App\Models\Admin;
use App\Models\Category;
use App\Models\LiveAttendants;
use App\Models\LiveChat;
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
        try {
            $admin = Auth::guard('admin')->user();

            // $timezones = Timezone::all();

            if ($admin->hasRole('super_admin')) {
                $schdedules = Schedule::get();
            } else {
                $schdedules = Schedule::where('admin_id', $admin->id)->get();
            }

            $schdedules = ScheduleResources::collection($schdedules);

            return response()->json(['success' => true, 'schedules' => $schdedules]);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function uploadVideo(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'schedule' => 'required|exists:schedules,uuid',
                'title' => 'required|string',
                'thumbnail' => ['required', 'mimes:png,jpg,jpeg,webp', 'max:5000'],
                'file' => ['required', 'mimes:mp4,avi,flv,mov,wmvp', 'max:512000'],
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $admin = auth()->guard('admin')->user();

            $videoUrl = null;
            $thumbnail = null;

            if ($request->hasFile('thumbnail')) {
                $thumbnail = uploadFile($request->file('thumbnail'), "schedule/thumbnails", 'do_spaces');
            }

            if ($request->hasFile('file')) {
                // $videoUrl = $request->file('file')->store('recorded', 'do_spaces');
                $videoUrl = uploadFile($request->file('file'), "recorded", 'do_spaces');
            }

            $schdedule = Schedule::where('uuid', $request->schedule)->first();

            $record = Video::create([
                'admin_id' => $admin->id,
                'schedule_id' => $schdedule->id,
                'title' => $request->title,
                'thumbnail' => $thumbnail,
                'video_file' => $videoUrl,
            ]);

            $record = new VideoResource($record);

            return response()->json(['success' => true, 'record' => $record, 'message' => "Video uploaded successfully."]);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function startLive($id)
    {
        try {

            $schdule = Schedule::whereUuid($id)->first();

            if (!$schdule) {
                return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
            }

            $user = Auth::guard('admin')->user();

            $user->update([
                'is_live' => true,
                'live_schedule' =>  $schdule->id
            ]);

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Live started",
                    'message' => "{$name} is live.",
                    'data' => [
                        'stream_url' => env('LIVE_URL ') . "/{$user->stream_key}.m3u8",
                        'android_stream_url' => env('ANDRIOD_LIVE_URL') . "/{$user->stream_key}.m3u8",
                    ]
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
            }

            $schdule->update(['viewers' => 0]);

            LiveChat::where('admin_id', $user->id)->delete();

            broadcast(new LiveStarted($schdule))->toOthers();

            return response()->json(['success' => true, 'message' => 'your are now live ']);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function stopLive($id)
    {
        try {
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
                'is_live' => false,
                'live_schedule' => null
            ]);

            $schdule->update(['viewers' => 0]);

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Live ended",
                    'message' => "{$name} live has ended.",
                    'data' => [
                        'stream_url' => null,
                        'android_stream_url' => null
                    ]
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
            }

            $schdule->update(['viewers' => 0]);

            LiveChat::where('admin_id', $user->id)->delete();

            broadcast(new StopLive($schdule))->toOthers();

            return response()->json(['success' => true, 'message' => 'live session have ended']);
            // return redirect()->route('dashboard.educator.schedule.show',$id);

        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
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
        try {
            $video = Video::where('uuid', $id)->first();

            if (!$video) {
                return response()->json(['success' => false, 'message' => 'Video not found.'], 404);
            }

            if ($video->is_favourite) {
                $video->update([
                    'is_favourite' => false
                ]);
            } else {
                $video->update([
                    'is_favourite' => true
                ]);
            }

            return response()->json(['success' => true, 'message' => 'Successfull.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function deleteVideo(Request $request, $id)
    {
        try {
            $video = Video::where('uuid', $id)->first();

            if (!$video) {
                return response()->json(['success' => false, 'message' => 'Video not found.'], 404);
            }

            $video->delete();

            return response()->json(['success' => true, 'message' => 'Deleted Successfull.']);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function destroy($id)
    {
        try {
            $schedule = Schedule::where('uuid', $id)->first();

            if (!$schedule) {
                return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
            }

            $schedule->delete();

            return response()->json(['success' => true, 'message' => 'Schedule deleted successfully.'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function messages()
    {
        try {
            $educator = auth()->guard('admin')->user();

            $messages = LiveChat::where('admin_id', $educator->id)->latest()->get();

            $messages = LiveChatResource::collection($messages);

            return response()->json(['success' => true, 'messages' => $messages]);
        } catch (\Exception $e) {
            sendToLog($e);

            return response()->json(["success'" > true, "message" => "Unable to complete your request at the moment."], 500);
        }
    }

    function sendMessage(Request $request)
    {
        try {

            $user = Auth::guard('admin')->user();

            $validator = Validator::make($request->all(), [
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'message' => 'nullable|string|required_if:media,null',
            ]);

            if ($request->message == 'null' && !$request->hasFile('media')) {
                return response()->json(['success' => false, 'error' => "Cannot send null message."], 400);
            }

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            if ($request->hasFile('media')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $message = uploadFile($request->file('media'), "media", "do_spaces");
                $type = "media";
            } else {
                $message = $request->message;
                $type = "text";
            }

            $chat = LiveChat::create([
                'admin_id' => $user->id,
                'sender_id' => $user->id,
                'message' => $message,
                'type' => $type
            ]);

            $chat = new LiveChatResource($chat);

            event(new ChatNotification($user->uuid, $chat));

            return response()->json(['success' => true, 'message' => $chat]);
        } catch (\Exception $e) {
            sendToLog($e);

            return response()->json(['success' => false, 'error' => "An error has occurred."], 500);
        }
    }

    function getCounts($id)
    {
        try {

            $schdule = Schedule::whereUuid($id)->first();

            if (!$schdule) {
                return response()->json(['success' => false, 'message' => 'Schedule not found.'], 404);
            }

            return response()->json(['success' => true, 'count' => $schdule->viewers]);
        } catch (\Throwable $th) {
            DB::rollBack();

            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }
}
