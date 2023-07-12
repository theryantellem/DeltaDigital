<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\Cyborg\ExchangeResource;
use App\Models\Exchange;
use App\Services\CyborgService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CyborgController extends ApiController
{

    public $cybordService;

    function __construct()
    {
        $this->cybordService = new CyborgService();
    }

    public function getExchanges()
    {
        $exchanges = ExchangeResource::collection(Exchange::where('status', 'enabled')->get());

        return $this->sendResponse($exchanges, 'List of exchanges', Response::HTTP_OK);
    }

    function apiBind(\App\Http\Requests\Cyborg\BindRequest $request)
    {
        try {
            $validated = (object) $request->validated();

            $user = $request->user();

            $exchange = Exchange::where('uuid', $validated->exchange_id)->first();

            $data['exchange'] = $exchange->tag;
            $data['api_key'] = $validated->api_key;
            $data['api_secret'] = $validated->api_secret;
            $data['api_passphrase'] = $validated->api_passphrase;
            $data['bind'] = 1;
            $data['user_id'] = $user->id;

            $respone = $this->cybordService->bindApi($data);

            if ($respone->status == 1) {
                return $this->sendResponse([], "Binded Successfully");
            }

            return $this->sendError("Not Successfull."[], 400);
        } catch (\Throwable $e) {
            logger(["Api bind" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function apiUnBind(\App\Http\Requests\Cyborg\BindRequest $request)
    {
        try {
            $validated = $request->validated();

            $user = $request->user();

            $exchange = Exchange::where('uuid', $validated->exchange_id)->first();

            $data['exchange'] = $exchange->tag;
            $data['api_key'] = $validated->api_key;
            $data['api_secret'] = $validated->api_secret;
            $data['api_passphrase'] = $validated->api_passphrase;
            $data['bind'] = 0;
            $data['user_id'] = $user->id;

            $respone = $this->cybordService->bindApi($data);

            if ($respone->status == 1) {
                return $this->sendResponse([], "Unbinded Successfully");
            }

            return $this->sendError("Not Successfull."[], 400);
        } catch (\Throwable $e) {
            logger(["Api bind" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function tradeSettings(\App\Http\Requests\Cyborg\TradeSettingsRequest $request)
    {
        try {

            $validated = (object) $request->validated();

            $user = $request->user();

            $data['userId'] = $user->id;
            $data['id'] = $validated->id;
            $data['firstbuy_amount'] = $validated->firstbuy_amount;
            $data['double_positio'] = $validated->double_position;
            $data['margin_limit'] = $validated->margin_limit;
            $data['profit_ratio'] = $validated->profit_ratio;
            $data['whole_ratio'] = $validated->whole_ratio;
            $data['first_call'] = $validated->first_call;
            $data['first_ratio'] = $validated->first_ratio;
            $data['profit_callback'] = $validated->profit_callback;
            $data['cycle'] = $validated->cycle;
            $data['one_short'] = $validated->one_short;
            $data['whole_stop'] = $validated->whole_stop;

            $respone = $this->cybordService->tradeSettings($data);

            dd($respone);
        } catch (\Throwable $e) {
            logger(["Trade set" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    public function getStrategy()
    {
        try {
            $user = Auth::user();

            $respone = $this->cybordService->getStrategy($user->id);

            dd($respone);
        } catch (\Throwable $e) {
            logger(["Get stratigy error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    public function getMarkets()
    {
        try {
            $user = Auth::user();

            $respone = $this->cybordService->getOStrategy($user->id);

            return $this->sendResponse($respone->data->strategy, "List of markets");
        } catch (\Throwable $e) {
            logger(["Get stratigy error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    public function setupUser()
    {
        try {
            $user = Auth::user();

            $respone = $this->cybordService->setupUser($user->id);

            if ($respone->status) {
                return $this->sendResponse([], "User Setup successfully.");
            } else {
                return $this->sendResponse([], "User setup not successfull.", Response::HTTP_SERVICE_UNAVAILABLE);
            }
        } catch (\Throwable $e) {
            logger(["Get stratigy error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
