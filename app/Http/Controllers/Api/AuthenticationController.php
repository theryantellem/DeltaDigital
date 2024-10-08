<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Authentication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationController extends ApiController
{
    function login(Request $request, Authentication $authentication)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);


        if ($validator->fails()) {
            return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }


        try {

            DB::beginTransaction();

            $response = $authentication->login($request->username, $request->password);

            $data = $response['data'];

            // dd($data);

            if (empty($data)) {
                return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
            }

            if (isset($data['user exist'])) {
                return $this->sendError($data['user'], [], Response::HTTP_UNAUTHORIZED);
            }

            $role = $data['role'];

            if (!empty($role)) {
                if ($role == 'Customer') {
                    $referallinks1 = $data['referallinks'];
                    $referallinks2 = null;
                } else {
                    $referallinks1 = $data['referallinks']['left_link'];
                    $referallinks2 = $data['referallinks']['right_link'];
                }
            } else {
                $referallinks1 = null;
                $referallinks2 = null;
            }

            $ref = !empty($data['sponsorname']) ? $data['sponsorname'] : null;
            $level1 = !empty($data['sponsor_levels']['level_1']) ? $data['sponsor_levels']['level_1'] : null;
            $level2 = !empty($data['sponsor_levels']['level_2']) ?  $data['sponsor_levels']['level_2'] : null;
            $level3 = !empty($data['sponsor_levels']['level_3']) ? $data['sponsor_levels']['level_3'] : null;

            $user = User::where('id', $data['uid'])->where('username', $request->username)->first();

            if (!$data['iseligible']) {
                if ($user) {
                    $user->update([
                        'iseligible' => 0
                    ]);
                }
                return $this->sendError("Your account is not eligible, update your subscription.", [], Response::HTTP_UNAUTHORIZED);
            }

            if (!$user) {
                $user = User::create([
                    'id' => $data['uid'],
                    // 'username' => $request->username,
                    'username' => $data['name'],
                    'password' => $request->password,
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => $data['role'],
                    'plan' => isset($data['package']['membership']) ? $data['package']['membership'] : null,
                    'expiry_date' => isset($data['package']['data']) ? $data['package']['date'] : null,
                    'left_link' => isset($data['referallinks']['left_link']) ? $data['referallinks']['left_link'] : null,
                    'right_link' => isset($data['referallinks']['right_link']) ? $data['referallinks']['right_link'] : null,
                    'profile_picture' => isset($data['profilepic']) ? $data['profilepic'] : null,
                    'iseligible' => isset($data['iseligible']) ? $data['iseligible'] : 0,
                    'ref' => $ref,
                    'referallinks' => $referallinks1,
                    'referallinks2' => $referallinks2,
                    'level2' => $level2,
                    'level3' => $level3,
                ]);
            } else {
                $user->update([
                    // 'username' => $request->username,
                    'username' => $data['name'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'plan' => isset($data['package']['membership']) ? $data['package']['membership'] : null,
                    'expiry_date' => isset($data['package']['date']) ? $data['package']['date'] : null,
                    'profile_picture' => isset($data['profilepic']) ? $data['profilepic'] : null,
                    'iseligible' => isset($data['iseligible']) ? $data['iseligible'] : 0,
                    'ref' => $ref,
                    'referallinks' => $referallinks1,
                    'referallinks2' => $referallinks2,
                    'level2' => $level2,
                    'level3' => $level3,
                ]);
            }

            $token = $user->createToken('auth-token');

            $responseData['user'] = new UserResource($user);
            $responseData['auth_token'] = $token->plainTextToken;

            DB::commit();

            $user->refresh();

            if (in_array($user->plan, cyborgPlans())) {
                dispatch(new \App\Jobs\SetupCyborgUserJob($user));
            }

            return $this->sendResponse($responseData, "Successful login.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack();
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function loginWithPin(Request $request, Authentication $authentication)
    {
        $validator = Validator::make($request->all(), [
            'pin' => 'required|numeric|digits:4',
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {

            DB::beginTransaction();

            $user = $request->user();

            if (!Hash::check($request->pin, $user->pin)) {
                return $this->sendError("Invalid pin", [], Response::HTTP_UNAUTHORIZED);
            }

            $response = $authentication->getUser($user->username);

            $data = $response['data'];

            if (empty($data)) {
                $user->tokens()->delete();
                return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
            }

            if (isset($data['user exist'])) {
                $user->tokens()->delete();
                return $this->sendError("Your account is not a valid account.", [], Response::HTTP_UNAUTHORIZED);
            }

            if (!$data['iseligible']) {
                if ($user) {
                    $user->update([
                        'iseligible' => 0
                    ]);
                }
                $user->tokens()->delete();
                return $this->sendError("Your account is not eligible, update your subscription.", [], Response::HTTP_UNAUTHORIZED);
            }

            $user->update([
                'plan' => isset($data['package']['membership']) ? $data['package']['membership'] : null,
                'expiry_date' => isset($data['package']['date']) ? $data['package']['date'] : null,
                'profile_picture' => isset($data['profilepic']) ? $data['profilepic'] : null,
                'iseligible' => isset($data['iseligible']) ? $data['iseligible'] : 0,
            ]);

            $token = $user->createToken('auth-token');

            $responseData['user'] = new UserResource($user);
            $responseData['auth_token'] = $token->plainTextToken;

            DB::commit();

            $user->refresh();

            if (in_array($user->plan, cyborgPlans())) {
                dispatch(new \App\Jobs\SetupCyborgUserJob($user));
            }

            return $this->sendResponse($responseData, "Successful login.", Response::HTTP_OK);
        } catch (\Throwable $e) {
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function getUserDetails(Request $request, Authentication $authentication)
    {
        try {


            $validator = Validator::make($request->all(), [
                'username' => 'required|string'
            ]);


            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $response = $authentication->getUser($request->username);

            $data = $response['data'];

            dd($data);
        } catch (\Throwable $e) {
            DB::rollBack();
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }

    function checkLogin(Request $request, Authentication $authentication)
    {
        try {

            $validator = Validator::make($request->all(), [
                'timezone' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return $this->sendError("Validation error", $validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = $request->user();

            $response = $authentication->getUser($user->username);

            $data = $response['data'];

            if (empty($data)) {
                $user->tokens()->delete();
                return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
            }

            if (isset($data['user exist'])) {
                $user->tokens()->delete();
                return $this->sendError("Your account is not a valid account.", [], Response::HTTP_UNAUTHORIZED);
            }

            if (!$data['iseligible']) {

                if ($user) {
                    $user->update([
                        'iseligible' => 0,
                    ]);
                }

                $user->tokens()->delete();

                return $this->sendError("Your account is not eligible, update your subscription.", [], Response::HTTP_UNAUTHORIZED);
            }

            $user->update([
                'timezone'      => $request->timezone,
                'iseligible'    => 1,
                'expiry_date'   => isset($data['package']['date']) ? $data['package']['date'] : null,
            ]);

            $user->refresh();

            if (in_array($user->plan, cyborgPlans())) {
                dispatch(new \App\Jobs\SetupCyborgUserJob($user));
            }

            return $this->sendResponse("User is active");
        } catch (\Throwable $e) {
            DB::rollBack();
            logger(["auth error" => $e->getMessage()]);
            return $this->sendError("Service Unavailable", [], Response::HTTP_SERVICE_UNAVAILABLE);
        }
    }
}
