<?php

namespace App\Http\Controllers\Admin\Signal;

use App\Events\SignalNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\SignalResource;
use App\Models\Asset;
use App\Models\Category;
use App\Models\Signal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SignalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.signals.index');
    }

    public function getSignals()
    {
        $admin = Auth::guard('admin')->user();

        // if ($admin->hasRole('educator')) {
        //     $signals = Signal::where('user_id', $admin->id)->get();
        // } else {
        //     $signals = Signal::get();
        // }

        $signals = Signal::where('user_id', $admin->id)->get();

        $signals = SignalResource::collection($signals);

        $orderType = \App\Enums\SignalOrderTypeEnum::options();
        $marketStaus = \App\Enums\SignalMarketStatus::options();
        $status = \App\Enums\SignalStatusEnum::options();

        $assets = AssetResource::collection(Asset::get());
        $categories = CategoryResource::collection(Category::get());

        return response()->json(['signals' => $signals, 'categories' => $categories, 'order_type' => $orderType, 'market_status' => $marketStaus, 'status' => $status, 'assets' => $assets]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'asset_type' => 'required|string',
                'order_type' => 'required|string',
                'entry_price' => 'required|numeric',
                'category' => 'required|string',
                'stop_loss' => 'required|numeric',
                'target_price' => 'required|numeric',
                'percentage' => 'numeric',
                'comment' => 'nullable|string',
                // 'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'chart_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            // $imageUrl = null;
            $chartUrl = null;

            // if ($request->hasFile('photo')) {
            //     // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            //     $image = $request->file('photo');
            //     $image_name = time() . '.' . $image->getClientOriginalExtension();
            //     $image->move(public_path('images/signals'), $image_name);

            //     $imageUrl = url('/images/signals/' . $image_name);
            // }

            if ($request->hasFile('chart_photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('chart_photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/signals'), $image_name);

                $chartUrl = url('/images/signals/' . $image_name);
            }

            $signal = Signal::create([
                'admin_id' => Auth::guard('admin')->user()->id,
                'asset_type' => $request->asset_type,
                'order_type' => $request->order_type,
                'entry_price' => $request->entry_price,
                'stop_loss' => $request->stop_loss,
                'target_price' => $request->target_price,
                'category_id' => $request->category,
                'percentage' => $request->percentage,
                'comment' => $request->comment,
                // 'photo' => $imageUrl,
                'chart_photo' =>  $chartUrl,
            ]);

            // broadcast events
            $signal = new SignalResource($signal);

            // dispatch notification
            event(new SignalNotification(Auth::guard('admin')->user()->uuid, $signal, "created"));

            return response()->json(['success' => true, 'signal' => $signal, 'message' => 'Signal created successfully.'], 201);
        } catch (\Throwable $th) {
            logger(['signal' => $th->getMessage()]);

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

            event(new SignalNotification(Auth::guard('admin')->user()->uuid, $signal, "updated"));

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
        try {
            $validator = Validator::make($request->all(), [
                'asset_type' => 'required|string',
                'order_type' => 'required|string',
                'entry_price' => 'required|numeric',
                'category' => 'required|string',
                'stop_loss' => 'required|numeric',
                'target_price' => 'required|numeric',
                'percentage' => 'numeric',
                'comment' => 'nullable|string',
                // 'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'chart_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $signal = Signal::where('uuid', $id)->first();

            if (!$signal) {
                return response()->json(['success' => false, 'errors' => "Signal not found."]);
            }

            // $imageUrl = $signal->photo;
            $chartUrl = $signal->chat_photo;

            // if ($request->hasFile('photo')) {
            //     // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
            //     $image = $request->file('photo');
            //     $image_name = time() . '.' . $image->getClientOriginalExtension();
            //     $image->move(public_path('images/signals'), $image_name);

            //     $imageUrl = url('/images/signals/' . $image_name);
            // }

            if ($request->hasFile('chart_photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('chart_photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/signals'), $image_name);

                $chartUrl = url('/images/signals/' . $image_name);
            }

            $signal->update([
                'asset_type' => $request->asset_type,
                'order_type' => $request->order_type,
                'entry_price' => $request->entry_price,
                'stop_loss' => $request->stop_loss,
                'target_price' => $request->target_price,
                'category_id' => $request->category,
                'percentage' => $request->percentage,
                'comment' => $request->comment,
                // 'photo' => $imageUrl,
                'chart_photo' =>  $chartUrl,
                'is_updated' => true
            ]);

            // broadcast events
            $signal = new SignalResource($signal);

            event(new SignalNotification(Auth::guard('admin')->user()->uuid, $signal, "updated"));

            return response()->json(['success' => true, 'signal' => $signal, 'message' => 'Signal update successfully.'], 201);
        } catch (\Throwable $th) {
            logger(['signal' => $th->getMessage()]);

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
