<?php

namespace App\Http\Controllers\Admin\Academy;

use App\Http\Controllers\Controller;
use App\Http\Resources\Academy\VideosResource;
use App\Models\AcademyModule;
use App\Models\AcademyVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AcademyVideoController extends Controller
{
    public function index(AcademyVideo $video)
    {
        $resource = new VideosResource($video);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'module_uuid' => ['required', 'exists:academy_modules,uuid'],
            'description' => ['nullable', 'max:10000'],
            'video_file' => ['required', 'mimes:mp4,avi,flv,mov,wmvp', 'max:10000'],
            'length' => ['required', 'numeric', 'min:5'],
        ]);

        $module = AcademyModule::where('uuid', $request->module_uuid)->first();
        $video = $request->file('video_file')->store('academy/videos', 'public_uploads');

        $module->videos()->create([
            'uuid' => Str::orderedUuid(),
            'name' => $request->name,
            'video_file' => $video,
            'length' => $request->length,
            'description' => $request->description,
        ]);

        return response()->json(['success' => true, 'message' => 'New video created successfully.']);
    }

    public function update(Request $request, AcademyVideo $video)
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:200'],
            'description' => ['nullable', 'max:10000'],
        ]);

        $video->update([
            'name' => $request->name ?? $video->name,
            'description' => $request->description ?? $video->description,
        ]);

        return response()->json(['success' => true, 'message' => 'Video updated successfully.']);
    }

    public function delete(AcademyVideo $video)
    {
        $video->delete();

        return response()->json(['success' => true, 'message' => 'Video deleted successfully.']);
    }
}
