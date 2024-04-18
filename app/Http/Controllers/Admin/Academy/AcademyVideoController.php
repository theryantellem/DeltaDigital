<?php

namespace App\Http\Controllers\Admin\Academy;

use App\Http\Controllers\Controller;
use App\Http\Resources\Academy\VideosResource;
use App\Models\AcademyModule;
use App\Models\AcademyVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AcademyVideoController extends Controller
{
    public function index(AcademyVideo $video)
    {
        $resource = new VideosResource($video);

        return response()->json(['success' => true, 'data' => $resource]);
    }

    public function store(Request $request)
    {

        $validator = Validator::make(
            [
                'name' => ['required', 'string', 'max:200', 'regex:/[^\s]+/'],
                'module_uuid' => ['required', 'exists:academy_modules,uuid'],
                'description' => ['nullable', 'max:10000', 'required_if:description,!=,null|regex:/[^\s]+/'],
                'video_file' => ['required', 'mimes:mp4,avi,flv,mov,wmvp,mkv', 'max:512000'],
                'length' => ['required', 'numeric', 'min:5'],
            ]
        );

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {
            $module = AcademyModule::where('uuid', $request->module_uuid)->first();

            $video = NULL;

            $video = uploadFile($request->file('video_file'), "academy/videos", "do_spaces");

            $uploaded = $module->videos()->create([
                'name' => $request->name,
                'video_file' => $video,
                'length' => $request->length,
                'description' => $request->description,
            ]);

            $video = new VideosResource($uploaded);

            return response()->json(['success' => true, 'message' => 'New video created successfully.', 'video' => $video]);
        } catch (\Exception $e) {
            logger($e);

            return response()->json(['success' => false, 'message' => 'Error uploading video.', 'errors' => $e]);
        }
    }

    public function validateVideoFile(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:200', 'regex:/[^\s]+/'],
            'module_uuid' => ['required', 'exists:academy_modules,uuid'],
            'description' => ['nullable', 'max:10000', 'required_if:description,!=,null|regex:/[^\s]+/'],
            'video_file' => ['required', 'mimes:mp4,avi,flv,mov,wmvp', 'max:512000'],
            'length' => ['required', 'numeric', 'min:5'],
        ]);

        return response()->json(['success' => true, 'message' => 'Validated successfully']);
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

    public function updateOrder(Request $request)
    {
        $this->validate($request, [
            'videos.*.order' => 'required|numeric',
        ]);

        $videos = AcademyVideo::all();

        foreach ($videos as $video) {
            $id = $video->id;
            foreach ($request->videos as $videoNew) {
                if ($videoNew['id'] == $id) {
                    $video->update(['order' => $videoNew['order']]);
                }
            }
        }

        return response('Updated Successfully.', 200);
    }

    public function delete(AcademyVideo $video)
    {
        $video->delete();

        return response()->json(['success' => true, 'message' => 'Video deleted successfully.']);
    }
}
