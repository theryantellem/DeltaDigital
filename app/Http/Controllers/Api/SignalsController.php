<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\SignalResource;
use App\Models\Admin;
use App\Models\Signal;
use App\Models\UserFollower;
use Illuminate\Http\Request;

class SignalsController extends ApiController
{
    function index()
    {
        try {
            // get list of eductors user is following
            $educators = UserFollower::where('user_id', auth()->user()->id)->pluck('admin_id')->toArray();

            $signals = Signal::whereIn('admin_id', $educators)->get();

            $signals = SignalResource::collection($signals);

            return $this->sendResponse($signals);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function show($id)
    {
        try {
            $signal = Signal::where('uuid', $id)->firstOrFail();

            $signal = new SignalResource($signal);

            return $this->sendResponse($signal);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
