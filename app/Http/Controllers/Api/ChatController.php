<?php

namespace App\Http\Controllers\Api;

use App\Events\ChatNotification;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Models\Admin;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends ApiController
{
    function messages($educator)
    {
        try {
            $educator = Admin::where('uuid', $educator)->firstOrFail();

            $messages = Chat::where('chat_group_id', $educator->chatGroup->id)->get();

            $messages = ChatResource::collection($messages);

            return $this->sendResponse($messages);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }

    function sendMessage(Request $request, $educator)
    {
        try {

            $educator = Admin::where('uuid', $educator)->firstOrFail();

            $validator = Validator::make($request->all(), [
                'message' => 'required|string',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 422);
            }

            $chat = Chat::create([
                'chat_group_id' => $educator->chatGroup->id,
                'sender_id' => auth()->user()->id,
                'message' => $request->message
            ]);

            $chat = new ChatResource($chat);

            event(new ChatNotification($educator->uuid, $chat));

            return $this->sendResponse($chat, "Message sent successfully.", 201);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
