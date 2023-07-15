<?php

namespace App\Http\Controllers\Cyborg;

use App\Http\Controllers\ApiController;
use App\Models\Exchange;
use App\Models\ExchangeBind;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BindController extends ApiController
{
    function bind(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'exchange' => 'required|string|exists:exchanges,uuid',
            'api_key' => 'required|string',
            'api_secret' => 'required|string',
            'api_passphrase' => 'nullable|string',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return $this->sendError("Validation error.", ['errors' => $validator->errors()], 422);
        }

        $user =  $request->user();

        $exchange = Exchange::whereUuid($request->exchange)->first();

        //create or update
        ExchangeBind::updateOrCreate(
            [
                'exchange_id' => $exchange->id,
                'user_id' => $user->id
            ],
            [
                'api_key' => $request->api_key,
                'api_secret' => $request->api_secret,
                'api_passphrase' => $request->api_passphrase,
                'is_binded' => true
            ]
        );

        return $this->sendResponse(null, 'Exchange bound successfully.');
    }

    public function unbind(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'exchange' => 'required|string|exists:exchanges,uuid',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return $this->sendError("Validation error.", ['errors' => $validator->errors()], 422);
        }

        $user =  $request->user();

        $exchange = Exchange::whereUuid($request->exchange)->first();

        $exchangeBind = ExchangeBind::where([
            'exchange_id' => $exchange->id,
            'user_id' => $user->id
        ])->first();

        $exchangeBind->update([
            'is_binded' => false
        ]);

        return $this->sendResponse(null, 'Exchange unbound successfully.');
    }
}
