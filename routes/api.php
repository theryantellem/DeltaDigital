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

        Route::controller(\App\Http\Controllers\Api\Cyborg\StrategyController::class)->prefix('strategies')->group(function () {
            Route::get('/', 'index');
            Route::get('trade-settings', 'tradeSettings');
            Route::post('sync', 'syncStrategy');
        });

        Route::get('/exchanges', [\App\Http\Controllers\Api\Cyborg\ExchangeController::class, 'index']);

        Route::controller(\App\Http\Controllers\Api\Cyborg\WalletController::class)->prefix('wallets')->group(function () {
            Route::post('deposit', 'deposit');
        });
    });

    Route::controller(\App\Http\Controllers\Api\NewsController::class)->prefix('news')->group(function () {
        Route::get('', 'index');
    });

    Route::apiResource('/tickets', \App\Http\Controllers\Api\TicketsController::class);

    //Pin set controller
    Route::controller(\App\Http\Controllers\Api\PinController::class)->prefix('pin')->group(function () {
        Route::post('/set', 'setPin');
        Route::post('/reset-token', 'requestPinResetToken');
        Route::post('/verify-token', 'verifyPinResetToken');
        Route::post('/reset', 'resetPin');
    });
});
