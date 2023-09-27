<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends ApiController
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $profile = new UserResource($user);

            return $this->sendResponse($profile, "User Profile.", 200);
        } catch (\Exception $e) {
            logger($e);

            return $this->sendError("Service Unavailable", [], 500);
        }
    }

    public function updateToken(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'token' => 'required|string',
            ]);


            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $request->user()->update(['fcm_token' => $request->token]);

            return $this->sendResponse(null, "Token updated successfully", 201);
        } catch (\Exception $e) {
            logger($e);

            return $this->sendError("Service Unavailable", [], 500);
        }
    }
}
