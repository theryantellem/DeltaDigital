<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Academy\VideosResource;
use App\Models\AcademyVideo;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class AcademyVideoController extends ApiController
{
    public function index(AcademyVideo $video)
    {
        $resource = new VideosResource($video);

        return $this->sendResponse($resource, "Video info fetched successully.", Response::HTTP_OK);
    }
}
