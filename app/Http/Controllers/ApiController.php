<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function sendResponse($data, $message=null, $status = 200)
    {
        $response = [
            'success' => true,
            'data' => $data,
            'message' => $message
        ];

        return response()->json($response, $status);
    }

    public function sendError($message, $errorData = [], $status = 400)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if (!empty($errorData)) {
            $response['data'] = $errorData;
        }

        return response()->json($response, $status);
    }

    public function resourceNotFoundResponse(string $resource)
    {
        $response = [
            'error' => "The $resource wasn't found",
        ];

        return response()->json($response, 404);
    }
}
