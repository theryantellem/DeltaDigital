<?php

namespace App\Http\Controllers\Api\Academy;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Academy\AcademyResource;
use App\Models\Academy;
use App\Models\UserFollower;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpFoundation\Response;

class AcademyController extends ApiController
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $adminIds = UserFollower::where('user_id', $user->id)->pluck('admin_id')->toArray();

            $data = Academy::whereIn('admin_id', $adminIds)->orderBy('id', 'desc')->get();
            $resource = AcademyResource::collection($data);

            return $this->sendResponse($resource, "Academy list retrieved successfully.", Response::HTTP_OK);
        } catch (\Exception $e) {
            sendToLog($e);

            return $this->sendError("Service unavailable");
        }
    }
}