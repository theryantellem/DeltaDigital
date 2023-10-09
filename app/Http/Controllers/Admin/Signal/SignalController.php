<?php

namespace App\Http\Controllers\Admin\Signal;

use App\Events\SignalNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\SignalResource;
use App\Models\Asset;
use App\Models\Category;
use App\Models\EducatorCategory;
use App\Models\Signal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Notifications\SendPushNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SignalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Log::info();
        return view('admin.signals.index');
    }

    public function getSignals()
    {
        $admin = Auth::guard('admin')->user();

        if ($admin->hasRole('super_admin')) {
            $signals = Signal::get();
        } else {
            $signals = Signal::where('admin_id', $admin->id)->get();
        }

        $signals = SignalResource::collection($signals);

        $orderType = \App\Enums\SignalOrderTypeEnum::options();
        $marketStaus = \App\Enums\SignalMarketStatus::options();
        $status = \App\Enums\SignalStatusEnum::options();

        $assets = AssetResource::collection(Asset::get());
        $categories = EducatorCategory::with('category')->where('admin_id', $admin->id)->get();
        // $categories = CategoryResource::collection(Category::get());

        return response()->json(['signals' => $signals, 'categories' => $categories, 'order_type' => $orderType, 'market_status' => $marketStaus, 'status' => $status, 'assets' => $assets]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category' => 'required|string',
                'asset_type' => 'required_if:type,trade',
                'order_type' => 'required_if:type,trade',
                'entry_price' => 'required_if:type,trade|numeric',
                'stop_loss' => 'required_if:type,trade|numeric',
                'target_price' => 'required_if:type,trade|numeric',
                'percentage' => 'numeric',
                'comment' => 'nullable|string',
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'description' => 'required_if:type,news'
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $user = Auth::guard('admin')->user();

            $chartUrl = null;

            if ($request->hasFile('photo')) {
                $chartUrl = uploadFile($request->file('photo'), "signals");
            }

            $signal = Signal::create([
                'admin_id' => $user->id,
                'asset_type' => $request->asset_type,
                'order_type' => $request->order_type,
                'entry_price' => $request->entry_price,
                'stop_loss' => $request->stop_loss,
                'target_price' => $request->target_price,
                'category_id' => $request->category,
                'percentage' => $request->percentage,
                'comment' => !empty($request->comment) ? $request->comment : $request->description,
                'chart_photo' =>  $chartUrl,
            ]);

            // broadcast events
            $signal = new SignalResource($signal);

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Signal Created.",
                    'message' => "{$name} created new signal."
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
                // Notification::send(null, new SendPushNotification("Signal Created", "A new signal has been created. Tap to view details.", $fcmTokens));
            }

            // // dispatch notification
            // event(new SignalNotification($user->uuid, $signal, "created"));

            return response()->json(['success' => true, 'signal' => $signal, 'message' => 'Signal created successfully.'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    public function updateMarketStatus(Request $request)
    {
        try {

            $signal = Signal::where('uuid', $request->signal)->first();

            if (!$signal) {
                return response()->json(['success' => false, 'message' => 'Signal not found.']);
            }

            $signal->update(['market_status' => $request->market_status]);

            $signal = new SignalResource($signal);

            $user = Auth::guard('admin')->user();

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Signal Status updated.",
                    'message' => "{$name} updated signal status."
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
                // Notification::send(null, new SendPushNotification("Signal Created", "A new signal has been created. Tap to view details.", $fcmTokens));
            }

            event(new SignalNotification(Auth::guard('admin')->user()->uuid, $signal, "updated"));

            return response()->json(['success' => true, 'message' => 'Market status updated successfully.']);
        } catch (\Exception $e) {
            logger($e->getMessage());

            return response()->json(['success' => false, 'message' => 'Cant perform this request at the moment.']);
        }
    }

    public function updateStatus(Request $request)
    {

        try {
            $signal = Signal::where('uuid', $request->signal)->first();

            if (!$signal) {
                return response()->json(['success' => false, 'message' => 'Signal not found.']);
            }

            $signal->update(['status' => $request->status]);

            $signal = new SignalResource($signal);

            $user = Auth::guard('admin')->user();

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Signal Status updated",
                    'message' => "{$name} updated signal status."
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
                // Notification::send(null, new SendPushNotification("Signal Created", "A new signal has been created. Tap to view details.", $fcmTokens));
            }

            return response()->json(['success' => true, 'message' => 'Status updated successfully.']);
        } catch (\Exception $e) {
            logger($e->getMessage());

            return response()->json(['success' => false, 'message' => 'Cant perform this request at the moment.']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|string',
            'asset_type' => 'required_if:type,trade',
            'order_type' => 'required_if:type,trade',
            'entry_price' => 'required_if:type,trade|numeric',
            'stop_loss' => 'required_if:type,trade|numeric',
            'target_price' => 'required_if:type,trade|numeric',
            'percentage' => 'numeric',
            'comment' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'description' => 'required_if:type,news'
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {

            $signal = Signal::where('uuid', $id)->first();

            if (!$signal) {
                return response()->json(['success' => false, 'errors' => "Signal not found."]);
            }

            // $imageUrl = $signal->photo;
            $chartUrl = $signal->chart_photo;

            if ($request->hasFile('photo')) {
                $chartUrl = uploadFile($request->file('photo'), "signals");
            }

            $signal->update([
                'asset_type' => $request->asset_type,
                'order_type' => $request->order_type,
                'entry_price' => $request->entry_price,
                'stop_loss' => $request->stop_loss,
                'target_price' => $request->target_price,
                'category_id' => $request->category,
                'percentage' => $request->percentage,
                'comment' => !empty($request->comment) ? $request->comment : $request->description,
                'chart_photo' =>  $chartUrl,
                'is_updated' => true
            ]);

            // broadcast events
            $signal = new SignalResource($signal);

            $user = Auth::guard('admin')->user();

            $fcmTokens =  followersPushTokens($user->id);

            if (!empty($fcmTokens)) {

                $name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);

                $data = [
                    'push_tokens' =>  $fcmTokens,
                    'title' => "Signal Updated",
                    'message' => "{$name} updated signal."
                ];

                dispatch(new \App\Jobs\PushNotificationJob($data));
                // Notification::send(null, new SendPushNotification("Signal Created", "A new signal has been created. Tap to view details.", $fcmTokens));
            }


            return response()->json(['success' => true, 'signal' => $signal, 'message' => 'Signal update successfully.'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $signal = Signal::where('uuid', $id)->first();

        if (!$signal) {
            return response()->json(['success' => false, 'message' => 'Signal not found.']);
        }

        $signal->delete();

        return response()->json(['success' => true, 'message' => ' Signal was successfully deleted.']);
    }
}
