<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Academy\EnrolmentResource;
use App\Models\AcademyEnrolment;
use App\Models\AcademyModule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AcademyEnrolController extends ApiController
{
    public function index(Request $request)
    {
        $user = $request->user();

        $resources  = EnrolmentResource::collection($user->academyEnrolments);

        return $this->sendResponse($resources, "Enrolments retrieved successfully.", Response::HTTP_OK);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'module_uuid' => ['required', 'exists:academy_modules,uuid'],
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 400);
        }

        $module = AcademyModule::where('uuid', $request->module_uuid)->first();
        $user = $request->user();
        $enrolment = AcademyEnrolment::where('academy_module_id', $module->id)
            ->where('user_id', $user->id)
            ->first();

        if ($enrolment) {
            return $this->sendError("You already enrolled for this module");
        }

        $resource = $user->academyEnrolments()->create([
            'uuid' => Str::orderedUuid(),
            'academy_module_id' => $module->id,
            'watch_time' => '0'
        ]);

        $data  = new EnrolmentResource($resource);

        return $this->sendResponse($data, "Module enrolled successfully.", Response::HTTP_OK);
    }

    public function show(AcademyEnrolment $enrolment)
    {
        $data  = new EnrolmentResource($enrolment);

        return $this->sendResponse($data, "Enrolment retrieved successfully.", Response::HTTP_OK);
    }

    public function delete(AcademyEnrolment $enrolment)
    {
        $enrolment->delete();

        return $this->sendResponse([], "Enrolment deleted successfully.", Response::HTTP_OK);
    }

    public function watchTime(Request $request, AcademyModule $module)
    {
        $validator = Validator::make($request->all(), [
            'watch_time' => ['required', 'numeric'], // Watch time should be in seconds
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 400);
        }

        $user = $request->user();

        $enrolment = AcademyEnrolment::where('academy_module_id', $module->id)
            ->where('user_id', $user->id)
            ->first();

        if ($enrolment) {
            $enrolment->increment('watch_time', $request->watch_time);
        }

        return $this->sendResponse([], "Watch time updated successfully.", Response::HTTP_OK);
    }
}
