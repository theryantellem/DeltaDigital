<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Academy\AcademyResource;
use App\Models\Academy;
use Symfony\Component\HttpFoundation\Response;

class AcademyController extends ApiController
{
    public function index()
    {
        $data = Academy::orderBy('id', 'desc')->get();
        $resource = AcademyResource::collection($data);

        return $this->sendResponse($resource, "Academy list retrieved successfully.", Response::HTTP_OK);
    }
}
