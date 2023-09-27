<?php

namespace App\Http\Controllers\Api\Cyborg;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Cyborg\ExchangeResource;
use App\Models\Exchange;
use Illuminate\Http\Request;

class ExchangeController extends ApiController
{
    function index()
    {
        $data = ExchangeResource::collection(Exchange::get());

        return $this->sendResponse($data,'List of exchanges');
    }
}
