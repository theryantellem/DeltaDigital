<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class PinController extends ApiController
{
    function setPin(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'pin' => 'required|numeric|digits:4',
            ]);

            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = $request->user();

            if (!is_null($user->pin)) {
                return $this->sendError("Pin already set.", null, Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user->update([
                'pin' => Hash::make($request->pin)
            ]);

            return $this->sendResponse(null, "Pin set successfully.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            logger(["pin_set_error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function requestPinResetToken(Request $request)
    {
        try {
            $user = $request->user();

            // Generate a random 4-digit reset code
            $resetCode = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);

            $user->update([
                'pin_reset_token' => Hash::make($resetCode)
            ]);

            $data['email'] = $user->email;
            $data['name'] = ucfirst($user->name);
            $data['token'] = $resetCode;

            dispatch(new \App\Jobs\Mail\PinResetMailJob($data));

            return $this->sendResponse(null, "Pin reset token sent successfully.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            logger(["pin_resets_error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function verifyPinResetToken(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'token' => 'required|numeric|digits:4',
            ]);

            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = $request->user();

            if (!Hash::check($request->token, $user->pin_reset_token)) {
                return $this->sendError("Invalid pin reset token.", null, Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            return $this->sendResponse(null, "Token verified successfully.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function resetPin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'token' => 'required|numeric|digits:4',
                'pin' => 'required|numeric|digits:4'
            ]);

            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = $request->user();

            if (!Hash::check($request->token, $user->pin_reset_token)) {
                return $this->sendError("Invalid pin reset token.", null, Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user->update([
                'pin' => Hash::make($request->pin)
            ]);

            return $this->sendResponse(null, "Token verified successfully.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            logger(["pin_reset" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
