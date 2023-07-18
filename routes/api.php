<?php

use App\Http\Controllers\Api\AuthenticationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthenticationController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // cyborg
    Route::prefix('cyborg')->group(function () {
        Route::controller(\App\Http\Controllers\Api\Cyborg\BindController::class)->group(function () {
            Route::post('/bind', 'bind');
            Route::post('/unbind', 'unbind');
        });

        Route::controller(\App\Http\Controllers\Api\Cyborg\StrategyController::class)->group(function () {
            Route::post('/strategies', 'index');
        });

        Route::get('/exchanges', [\App\Http\Controllers\Api\Cyborg\ExchangeController::class, 'index']);
    });
});
