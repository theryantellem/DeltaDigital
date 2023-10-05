<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Resources\Academy\CategorizedModule;
use App\Http\Resources\Academy\ModulesResource;
use App\Http\Resources\Academy\ModuleWithVideosResource;
use App\Models\AcademyModule;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;

class AcademyModuleController extends ApiController
{
    public function index()
    {
        $data = AcademyModule::orderBy('id', 'desc')->get();
        $resource = ModulesResource::collection($data);

        return $this->sendResponse($resource, "Academy modules fetched successfully.", Response::HTTP_OK);
    }

    public function categoryModule($category)
    {
        $data = Category::where('uuid', $category)->with('academyModules')->get();
        $resource = CategorizedModule::collection($data);

        return $this->sendResponse($resource, "Academy modules fetched successfully.", Response::HTTP_OK);
    }

    public function show(AcademyModule $module)
    {
        $resource = new ModuleWithVideosResource($module);

        return $this->sendResponse($resource, "Academy module info fetched successfully.", Response::HTTP_OK);
    }
}
