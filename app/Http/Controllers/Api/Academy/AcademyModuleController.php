<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Resources\Academy\CategorizedModule;
use App\Http\Resources\Academy\ModulesResource;
use App\Http\Resources\Academy\ModuleWithVideosResource;
use App\Models\AcademyModule;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\ApiController;
use App\Http\Resources\Academy\AcademyRating as AcademyAcademyRating;
use App\Http\Resources\Academy\AcademyResource;
use App\Models\Academy;
use App\Models\AcademyRating;
use App\Models\User;
use Illuminate\Support\Str;

class AcademyModuleController extends ApiController
{
    public function index()
    {
        $data = AcademyModule::orderBy('id', 'desc')->get();
        $resource = ModulesResource::collection($data);

        return $this->sendResponse($resource, "Academy modules fetched successfully.", Response::HTTP_OK);
    }

    public function categoryModule($academy)
    {
        $data = Academy::where('uuid', $academy)->with('academyModules')->get();
        $resource = CategorizedModule::collection($data);

        return $this->sendResponse($resource, "Academy modules fetched successfully.", Response::HTTP_OK);
    }

    public function show(AcademyModule $module)
    {
        $resource = new ModuleWithVideosResource($module);

        return $this->sendResponse($resource, "Academy module info fetched successfully.", Response::HTTP_OK);
    }

    public function rating(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'academy_uuid' => ['required', 'exists:academies,uuid'],
            'stars' => ['required', 'integer', 'in:1,2,3,4,5'],
            'comment' => ['required', 'string', 'max:200'],
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validations failed.", ['errors' => $validator->errors()], 400);
        }

        $user = $request->user();
        $user = User::find($user->id ?? 1);
        $academy = Academy::where('uuid', $request->academy_uuid)->first();

        $rating = AcademyRating::where('academy_id', $academy->id)
            ->where('user_id', $user->id)
            ->first();

        if ($rating) {
            $rating->update([
                'stars' => $request->stars,
                'comment' => $request->comment
            ]);
        } else {
            AcademyRating::create([
                'uuid' => Str::orderedUuid(),
                'user_id' => $user->id,
                'academy_id' => $academy->id,
                'stars' => $request->stars,
                'comment' => $request->comment
            ]);
        }

        return $this->sendResponse(new AcademyAcademyRating($rating), "Academy rated successfully.", Response::HTTP_OK);
    }

    public function getRating(Academy $academy)
    {
        $rating = AcademyRating::where('academy_id', $academy->id)->get();

        $resource = AcademyAcademyRating::collection($rating);

        return $this->sendResponse($resource, "Academy rated successfully.", Response::HTTP_OK);
    }
}
