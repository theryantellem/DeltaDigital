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

            $educatorDetails = Admin::where('uuid', $educator)->firstOrFail();

            $validator = Validator::make($request->all(), [
                'message' => 'required|string',
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 422);
            }

            if ($request->hasFile('media')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $message = uploadFile($request->file('media'), "media", "do_spaces");
                $type = "media";
            } else {
                $message = $request->message;
                $type = "text";
            }

            $chat = Chat::create([
                'chat_group_id' => $educatorDetails->chatGroup->id,
                'sender_id' => auth()->user()->id,
                'message' => $message,
                'type' => $type
            ]);

            $chat = new ChatResource($chat);

            event(new ChatNotification($educatorDetails->uuid, $chat));

            $fcmTokens =  followersPushTokens($educatorDetails->id);

            if (!empty($fcmTokens)) {
                $name = ucfirst($educatorDetails->first_name) . ' ' . ucfirst($educatorDetails->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Chat Notification",
                    'message' => "You have new message in {$name}'s channel"
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
            }

            return $this->sendResponse($chat, "Message sent successfully.", 201);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Unable to complete your request at the moment.", [], 500);
        }
    }
}
