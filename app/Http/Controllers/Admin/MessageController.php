<?php

namespace App\Http\Controllers\Admin;

use App\Events\ChatNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\UserFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    function index()
    {
        return view('admin.messages.index');
    }

    function getMessages()
    {
        $user = Auth::guard('admin')->user();

        $messages = Chat::where('chat_group_id', $user->chatGroup->id)->latest()->get();

        $messages = ChatResource::collection($messages);

        return response()->json(['success' => true, 'messages' => $messages]);
    }

    function getFollowers()
    {
        $user = Auth::guard('admin')->user();

        $followers = UserFollower::with('user')->where('admin_id', $user->id)->get();

        return response()->json(['success' => true, 'followers' => $followers]);
    }

    function sendMessage(Request $request)
    {
        try {

            $user = Auth::guard('admin')->user();

            $validator = Validator::make($request->all(), [
                'message' => 'required|string',
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            if ($request->message == 'null') {
                return response()->json(['success' => false, 'error' => "Cannot send null message."], 400);
            }

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            if ($request->hasFile('media')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('media');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('media'), $image_name);

                $message = url('media/' . $image_name);
                $type = "media";
            } else {
                $message = $request->message;
                $type = "text";
            }

            $chat = Chat::create([
                'chat_group_id' => $user->chatGroup->id,
                'sender_id' => $user->id,
                'message' => $message,
                'type' => $type
            ]);

            $chat = new ChatResource($chat);

            event(new ChatNotification($user->uuid, $chat));

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {
                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Chat Notification",
                    'message' => "You have new message in {$name}'s channel"
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
            }

            return response()->json(['success' => true, 'message' => $chat]);
        } catch (\Exception $e) {
            sendToLog($e);

            return response()->json(['success' => false, 'error' => "An error has occurred."], 500);
        }
    }
}
