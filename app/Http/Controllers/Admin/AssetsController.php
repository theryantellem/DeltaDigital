<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AssetResource;
use App\Http\Resources\CategoryResource;
use App\Models\Asset;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssetsController extends Controller
{
    function index()
    {
        return view('admin.asset.index');
    }

    function all()
    {
        $assets = AssetResource::collection(Asset::get());

        $categories = CategoryResource::collection(Category::get());

        return response(['success' => true, 'categories' => $categories, 'assets' => $assets]);
    }

    function show($id)
    {
        $asset = Asset::where('id', $id)->first();

        if (!$asset) {
            return response()->json(['success' => false, 'message' => 'Asset not found.']);
        }

        $asset = new AssetResource($asset);

        return response()->json(['success' => true, 'assets' => $asset]);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'asset_name' => 'required|string',
                'category' => 'required|exists:categories,id',
                'symbol'   => 'required|string',
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            // Handle validation errors
            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            $photo = null;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/assets'), $image_name);

                $photo = url('/images/assets/' . $image_name);
            }

            $asset = Asset::create([
                'name' => $request->asset_name,
                'symbol' => $request->symbol,
                'category_id' => $request->category,
                'image' => $photo
            ]);

            // broadcast events
            $asset = new AssetResource($asset);

            return response()->json(['success' => true, 'asset' => $asset, 'message' => 'Asset created successfully.'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'asset_name' => 'required|string',
            'category' => 'required|exists:categories,id',
            'symbol'   => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {

            $asset = Asset::where('id', $id)->first();

            if (!$asset) {
                return response()->json(['success' => false, 'message' => 'Asset not found.']);
            }

            $photo = $asset->image;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/assets'), $image_name);

                $photo = url('/images/assets/' . $image_name);
            }

            $asset->update([
                'name' => $request->asset_name,
                'symbol' => $request->symbol,
                'category_id' => $request->category,
                'image' => $photo
            ]);

            $asset->refresh();

            // broadcast events
            $asset = new AssetResource($asset);

            return response()->json(['success' => true, 'asset' => $asset, 'message' => 'Asset updated successfully.'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }
}
