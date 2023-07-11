<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\CyborgController;
use Illuminate\Http\Request;
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
    Route::controller(CyborgController::class)->prefix('cyborg')->group(function () {
        Route::get('exchange-list', 'getExchanges');
        Route::post('bind', 'apiBind');
        Route::post('unbind', 'apiUnBind');
        Route::post('set-trade', 'tradeSettings');
        Route::get('get-strategy', 'getStrategy');
        Route::get('set-user','setupUser');
    });
});
