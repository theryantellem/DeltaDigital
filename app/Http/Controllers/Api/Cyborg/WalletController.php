<?php

namespace App\Http\Controllers\Api\Cyborg;

use App\Http\Controllers\ApiController;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class WalletController extends ApiController
{
    private $coinpayment;

    function __construct()
    {
        $this->coinpayment = new \App\Services\CoinPaymentService();
    }

    public function deposit(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'currency' => 'required|string',
        // ]);

        // // Handle validation errors
        // if ($validator->fails()) {
        //     return $this->sendError("Validation failed.", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        // }

        $currency = "LTCT";

        $user = $request->user();

        $wallet = $user->wallet;

        if (empty($wallet)) {
            $data['currency'] =  $currency;

            $response = $this->coinpayment->makeDeposit($data);

            if ($response['error'] == "ok") {
                $wallet = Wallet::create([
                    'user_id' => $user->id,
                    'address' => $response['result']['address'],
                ]);
            } else {
                return  $this->sendError("Service unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
            }
        }

        return $this->sendResponse(['address' => $wallet->address, 'currency' => $currency], "Deposit address for {$currency}");
    }
}
