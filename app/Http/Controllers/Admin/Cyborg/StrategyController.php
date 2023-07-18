<?php

namespace App\Http\Controllers\Admin\Cyborg;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cyborg\StrategyResource;
use App\Models\Exchange;
use App\Models\Strategy;
use App\Traits\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StrategyController extends Controller
{
    use FileUpload;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.strategy.index');
    }

    public function getStrategies()
    {
        $strategy = StrategyResource::collection(Strategy::get());

        return response(['success' => true, 'data' => $strategy]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'exchange' => 'required|string|exists:exchanges,uuid',
                'strategy_name' => 'required|string',
                'minimum_amount' => 'required|numeric',
                'description' => 'nullable|string',
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $exchange = Exchange::whereUuid($request->exchange)->first();

            $imageUrl = null;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/strategy'), $image_name);

                $imageUrl = url('/images/strategy/' . $image_name);
            }

            $strategy = $exchange->strategies()->create([
                'strategy_name' => $request->strategy_name,
                'minimum_amount' => $request->minimum_amount,
                'description' => $request->description,
                'image' => $imageUrl,
            ]);

            $strategy = new StrategyResource($strategy);

            return response()->json(['success' => true, 'strategy' => $strategy, 'message' => 'Strategy created successfully.'], 201);
        } catch (\Throwable $th) {
            logger(['add_strategy' => $th->getMessage()]);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Strategy $strategy)
    {
        return view('admin.strategy.show', compact('strategy'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Strategy $strategy)
    {
        return view('admin.strategy.edit', compact('strategy'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Strategy $strategy)
    {
        try {
            $validator = Validator::make($request->all(), [
                'exchange' => 'required|string|exists:exchanges,uuid',
                'strategy_name' => 'required|string',
                'minimum_amount' => 'required|numeric',
                'description' => 'nullable|string',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $exchange = Exchange::whereUuid($request->exchange)->first();

            $imageUrl = $strategy->image;

            if ($request->hasFile('photo')) {

                // delete existing image
                if ($strategy->image) {
                    unlink($strategy->image);
                }

                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/strategy'), $image_name);

                $imageUrl = url('/images/strategy/' . $image_name);
            }

            $strategy->update([
                'exchange_id' => $exchange->id,
                'strategy_name' => $request->strategy_name,
                'minimum_amount' => $request->minimum_amount,
                'description' => $request->description,
                'image' => $imageUrl,
            ]);

            return response()->json(['success' => true, 'strategy' => $strategy, 'message' => 'Strategy updated successfully.'], 201);
        } catch (\Throwable $th) {
            logger(['add_strategy' => $th->getMessage()]);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Strategy $strategy)
    {
        $strategy->update(
            [
                'deleted_at' => now()
            ]
        );

        return response()->json(['success' => true, 'message' => 'Strategy deleted successfully.'], 200);
    }
}
