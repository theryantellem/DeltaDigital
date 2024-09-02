<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Http;

class CustomSanctumAuth extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  ...string|null  $guards
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        // Retrieve the user ID from the custom header
        $userId = $request->header('X-User-ID');

        if ($userId) {
            // If X-User-ID header is present, use it for authentication

            $baseUrl = config('constants.auth.base_url');

            // Make an API call to the user service to retrieve the user details
            $response = Http::get("{$baseUrl}/user?user_id={$userId}");

            // Check if the API call was successful
            if ($response->failed()) {
                return response()->json(['error' => 'Failed to retrieve user information'], 400);
            }

            // Decode the response and check if the user exists
            $user = (object) $response->json();

            if (!$user || empty($user->data)) {
                return response()->json(['error' => 'Invalid user ID on headers'], 400);
            }

            $user = (object) $user->data;

            // Update or create the user in the local database
            $user = User::updateOrCreate(
                ['id' => $user->user_id],
                [
                    'id' => $user->user_id,
                    'uuid' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'username' => $user->username,
                    'password' => "check", // You should set a proper password or handle it as per your requirement
                    'role' => $user->role,
                    'profile_picture' => $user->profile_picture,
                    'created_at' => $user->created_at,
                ]
            );

            // Attach the user to the request
            $request->setUserResolver(function () use ($user) {
                return $user;
            });

            // Skip Sanctum authentication if X-User-ID is provided
            return $next($request);
        }

        // If X-User-ID is not provided, fall back to Sanctum authentication

        if ($request->is('api/*')) {
            $guards = ['sanctum'];
        }

        // Call the parent handle method to use the Sanctum authentication logic
        $this->authenticate($request, $guards);

        // Continue with the request
        return $next($request);
    }
}
