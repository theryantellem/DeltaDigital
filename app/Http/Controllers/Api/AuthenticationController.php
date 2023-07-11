<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Authentication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationController extends ApiController
{
    function login(Request $request, Authentication $authentication)
    {
        try {

            DB::beginTransaction();

            $validator = Validator::make($request->all(), [
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $response = $authentication->login($request->username, $request->password);

            $data = $response['data'];

            if (isset($data['user exist'])) {
                return $this->sendError($data['user'], [], Response::HTTP_UNAUTHORIZED);
            }

            dispatch(new \App\Jobs\SetupCyborgUserJob($data['uid']));

            $user = User::where('id', $data['uid'])->where('username', $request->username)->first();

            if (!$user) {
                $user = User::create([
                    'id' => $data['uid'],
                    'username' => $request->username,
                    'password' => $request->password,
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => $data['role'],
                    'plan' => isset($data['package']['membership']) ? $data['package']['membership'] : null,
                    'expiry_date' => isset($data['package']['data']) ? $data['package']['date'] : null,
                    'left_link' => isset($data['referallinks']['left_link']) ? $data['referallinks']['left_link'] : null,
                    'right_link' => isset($data['referallinks']['right_link']) ? $data['referallinks']['right_link'] : null,
                    'profile_picture' => isset($data['profilepic']) ? $data['profilepic'] : null,
                    'iseligible' => isset($data['iseligible']) ? $data['iseligible'] : 0
                ]);
            } else {
                $user->update([
                    'plan' => isset($data['package']['membership']) ? $data['package']['membership'] : null,
                    'expiry_date' => isset($data['package']['date']) ? $data['package']['date'] : null,
                    'iseligible' => isset($data['iseligible']) ? $data['iseligible'] : 0
                ]);
            }

            $token = $user->createToken('auth-token');

            $responseData['user'] = new UserResource($user);
            $responseData['auth_token'] = $token->plainTextToken;

            DB::commit();

            return $this->sendResponse($responseData, "Successful login.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack();
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
