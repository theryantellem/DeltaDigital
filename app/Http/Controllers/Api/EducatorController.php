<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\EducatorResource;
use App\Http\Resources\FollowResource;
use App\Http\Resources\SignalResource;
use App\Http\Resources\VideoResource;
use App\Models\Admin;
use App\Models\Signal;
use App\Models\UserFollower;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class EducatorController extends ApiController
{
    function index()
    {
        $role = Role::where('name', 'educator')->first();

        $educators = EducatorResource::collection($role->users);

        return $this->sendResponse($educators);
    }

    function show($id)
    {
        $educator = Admin::where('uuid', $id)->first();

        if (!$educator) {
            return $this->sendError("Educator not found.", [], 404);
        }

        $educator = new EducatorResource($educator);

        return $this->sendResponse($educator);
    }

    function following()
    {
        try {
            $followings = UserFollower::where('user_id', auth()->user()->id)->get();

            $following = FollowResource::collection($followings);

            return $this->sendResponse($following);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function follow(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'educator' => 'required|exists:admins,uuid',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 422);
            }

            $user = $request->user();

            $educator = Admin::where('uuid', $request->educator)->firstOrFail();

            $following = UserFollower::where('admin_id', $educator->id)->where('user_id', $user->id)->exists();

            if ($following) {
                return $this->sendError("You are already following {$educator->first_name} {$educator->last_name}", [], 422);
            }

            $follow = UserFollower::create([
                'admin_id' => $educator->id,
                'user_id' => $user->id
            ]);

            return $this->sendResponse(null, "You are now following {$educator->first_name} {$educator->last_name}.", 201);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function unfollow(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'educator' => 'required|exists:admins,uuid',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 422);
            }

            $user = $request->user();

            $educator = Admin::where('uuid', $request->educator)->firstOrFail();

            $following = UserFollower::where('admin_id', $educator->id)->where('user_id', $user->id)->first();

            if (!$following) {
                return $this->sendError("You are not yet following {$educator->first_name} {$educator->last_name}.", [], 422);
            }

            $following->delete();

            return $this->sendResponse(null, "You have successfully unfollowed {$educator->first_name} {$educator->last_name}.", 201);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function signals($educatorId)
    {
        try {
            // get list of eductors user is following
            $educator = Admin::where('uuid', $educatorId)->first();

            if (!$educator) {
                return $this->sendError("Educator not found.", [], 400);
            }

            $signals = Signal::where('admin_id', $educator->id)->latest()->paginate(30);

            $signals = SignalResource::collection($signals);

            return $this->sendResponse($signals);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function recordedVideos($educator)
    {
        try {
            // get list of eductors user is following
            $educator = Admin::where('uuid', $educator)->first();

            if (!$educator) {
                return $this->sendError("Educator not found.", [], 400);
            }

            $videos = Video::where('admin_id', $educator->id)->latest()->paginate(10);

            $videos = VideoResource::collection($videos);

            return $this->sendResponse($videos);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
