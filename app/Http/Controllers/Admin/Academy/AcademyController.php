<?php

namespace App\Http\Controllers\Admin\Academy;

use App\Http\Controllers\Controller;
use App\Http\Resources\Academy\AcademyResource;
use App\Models\Academy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AcademyController extends Controller
{
    public function index()
    {
        return view('admin.academy.index');
    }

    public function details(Academy $academy)
    {
        return view('admin.academy.show',['academy' => $academy]);
    }

    public function all()
    {
        $admin_id = Auth::guard('admin')->user()->id;
        $data = Academy::where('admin_id', $admin_id)->orderBy('id', 'desc')->get();
        $resource = AcademyResource::collection($data);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'thumbnail' => ['required', 'mimes:jpg,png', 'max:30'],
            'description' => ['nullable', 'max:10000'],
        ]);

        $thumbnail = $request->file('thumbnail')->store('academy/thumbnails', 'public_uploads');

        $admin_id = Auth::guard('admin')->user()->id;

        Academy::create([
            'admin_id' =>  $admin_id,
            'name' => $request->name,
            'thumbnail' => $thumbnail,
            'description' => $request->description,
        ]);

        return response()->json(['success' => true, 'message' => 'New Academy created successfully.']);
    }

    public function show(Academy $academy)
    {
        $resource = new AcademyResource($academy);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function update(Request $request, Academy $academy)
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:200'],
            'thumbnail' => ['nullable', 'mimes:jpg,png', 'max:30'],
            'description' => ['nullable', 'string', 'max:10000']
        ]);

        $thumbnail = $academy->thumbnail;

        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store('academy/thumbnails', 'public_uploads');
        }

        $academy->update([
            'name' => $request->name ?? $academy->name,
            'description' => $request->description ?? $academy->description,
            'thumbnail' => $thumbnail,
        ]);

        return response()->json(['success' => true, 'message' => 'Academy updated successfully.']);
    }

    public function delete(Academy $academy)
    {
        $academy->delete();

        return response()->json(['success' => true, 'message' => 'Academy deleted successfully.']);
    }
}
