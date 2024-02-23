<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class SubscribeController extends ApiController
{
    function subscription(Request $request)
    {
        try {

            //add to logic to set subscrip to true if the field is false and false if the field is true
            $user = User::where('id', '20874')->first();

            $user->update([
                'subscribe' => true
            ]);

            $data = new UserResource($user->refresh());


            return $this->sendResponse($data, "Subscription successful.");
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function unSubscription(Request $request)
    {
        try {

            //add to logic to set subscrip to true if the field is false and false if the field is true
            $user = User::where('id', '20874')->first();

            $user->update([
                'subscribe' => false
            ]);

            $data = new UserResource($user->refresh());

            return $this->sendResponse($data, "UnSubscription successful.");
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
