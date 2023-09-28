<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    function index()
    {
        return view('admin.category.index');
    }

    function allCategories()
    {
        $categories = Category::get();

        $categories = CategoryResource::collection($categories);

        return response()->json(['success' => true, 'categories' => $categories]);
    }

    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {
            $photo = null;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/category'), $image_name);

                $photo = url('/images/category/' . $image_name);
            }

            $category = Category::create([
                'name' => $request->name,
                'photo' =>  $photo,
            ]);

            // broadcast events
            $category = new CategoryResource($category);

            return response()->json(['success' => true, 'category' => $category, 'message' => 'Catgory created successfully'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }

    function show($id)
    {
        $category = Category::where('id', $id)->first();

        if (!$category) {
            return response()->json(['success' => false, 'errors' => 'Category not found.']);
        }

        $category = new CategoryResource($category);

        return response()->json(['success' => true, 'category' => $category,], 201);
    }

    function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $category = Category::where('id', $id)->first();

        if (!$category) {
            return response()->json(['success' => false, 'errors' => 'Category not found.']);
        }

        try {
            $photo = $category->photo;

            if ($request->hasFile('photo')) {
                // $imageUrl = $this->uploadFile($request->file('photo'), "strategy");
                $image = $request->file('photo');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/category'), $image_name);

                $photo = url('/images/category/' . $image_name);
            }

            $category->update([
                'name' => $request->name,
                'photo' =>  $photo,
            ]);

            $category->refresh();

            // broadcast events
            $category = new CategoryResource($category);

            return response()->json(['success' => true, 'category' => $category, 'message' => 'Catgory updated successfully'], 201);
        } catch (\Throwable $th) {
            sendToLog($th);

            return response()->json(['success' => false, 'message' => 'Ops Somthing went wrong. try again later.'], 500);
        }
    }
}