<?php

use App\Http\Controllers\Api\Academy\AcademyController;
use App\Http\Controllers\Api\Academy\AcademyEnrolController;
use App\Http\Controllers\Api\Academy\AcademyModuleController;
use App\Http\Controllers\Api\Academy\AcademyVideoController;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\EducatorController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\SignalsController;
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

    Route::controller(EducatorController::class)->prefix('educators')->group(function () {
        Route::get('', 'index');
        Route::get('/show/{educator}', 'show');
        Route::get('following', 'following');
        Route::post('follow', 'follow');
        Route::post('unfollow', 'unfollow');
        Route::get('/signals/{educatorId}', 'signals');
    });

    Route::controller(SignalsController::class)->prefix('signals')->group(function () {
        Route::get('', 'index');
        Route::get('show/{signal}', 'show');
    });

    Route::controller(ChatController::class)->prefix('chat')->group(function () {
        Route::get('messages/{educator}', 'messages');
        Route::post('send/{educator}', 'sendMessage');
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

    Route::controller(\App\Http\Controllers\Api\ProfileController::class)->prefix('profile')->group(function () {
        Route::get('', 'index');
        Route::post('/update-push-token', 'updateToken');
    });

    Route::get('banners', [BannerController::class, 'banners']);

    Route::group(['prefix' => 'academy'], function () {
        Route::get('/', [AcademyController::class, 'index']);
        Route::get('modules', [AcademyModuleController::class, 'index']);
        Route::get('{academy}', [AcademyModuleController::class, 'categoryModule']); // This endpoint list all module under a category
        Route::get('modules/show/{module}', [AcademyModuleController::class, 'show']); // This endpoint list all video under a module
        Route::get('video/{video}', [AcademyVideoController::class, 'index']);
        Route::post('enrolments', [AcademyEnrolController::class, 'store']);
        Route::get('enrolments', [AcademyEnrolController::class, 'index']);
        Route::get('enrolments/{enrolment}', [AcademyEnrolController::class, 'show']);
        Route::delete('enrolments/{enrolment}', [AcademyEnrolController::class, 'delete']);
        Route::post('rating', [AcademyModuleController::class, 'rating']);
        Route::get('rating/{academy}', [AcademyModuleController::class, 'getRating']);
        Route::patch('watch-time/{module}', [AcademyEnrolController::class, 'watchTime']);
    });

    Route::controller(ScheduleController::class)->prefix('schedules')->group(function () {
        Route::get('', 'index');
        Route::get('/{schedule}', 'show');
        Route::get('/join-live/{schedule}', 'setViewers');
        Route::get('{educator}/educator-schedules', 'educatorSchedules');
        Route::get('/live/educators', 'educatorsOnLive');
    });
});

Route::get('categories', [CategoryController::class, 'index']);
