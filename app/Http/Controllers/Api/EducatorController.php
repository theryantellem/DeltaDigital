<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\EducatorResource;
use App\Http\Resources\FollowResource;
use App\Models\Admin;
use App\Models\UserFollower;
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

            $educator = Admin::where('uuid', $request->educator)->firstOrFail();

            $following = UserFollower::where('admin_id', $educator->id)->exists();

            if ($following) {
                return $this->sendError("You are already following {$educator->first_name} {$educator->last_name}", [], 422);
            }

            $follow = UserFollower::create([
                'admin_id' => $educator->id,
                'user_id' => auth()->user()->id
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

            $educator = Admin::where('uuid', $request->educator)->firstOrFail();

            $following = UserFollower::where('admin_id', $educator->id)->first();

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
}
