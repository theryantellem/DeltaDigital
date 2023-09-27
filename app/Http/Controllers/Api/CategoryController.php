<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends ApiController
{
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->get();
        $resources =CategoryResource::collection($categories);

        return $this->sendResponse($resources, "Schedules retrieved successfully.", Response::HTTP_OK);
    }
}
