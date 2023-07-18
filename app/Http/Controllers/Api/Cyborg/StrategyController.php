<?php

namespace App\Http\Controllers\Api\Cyborg;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Resources\StrategyResource;
use App\Models\Strategy;

class StrategyController extends ApiController
{
    function index()
    {
        $strategy = StrategyResource::collection(Strategy::get());

        return $this->sendResponse($strategy, "List of strategies");
    }
}
