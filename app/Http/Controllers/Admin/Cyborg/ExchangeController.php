<?php

namespace App\Http\Controllers\Admin\Cyborg;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cyborg\ExchangeResource;
use App\Models\Exchange;
use Illuminate\Http\Request;

class ExchangeController extends Controller
{
    function getExchanges()
    {
        $data = ExchangeResource::collection(Exchange::get());

        return response(['success' => true, 'data' => $data]);
    }
}
