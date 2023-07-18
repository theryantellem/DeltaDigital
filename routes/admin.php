<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\Admin\Cyborg\ExchangeController;
use App\Http\Controllers\Admin\Cyborg\MarketController;
use App\Http\Controllers\Admin\Cyborg\StrategyController;
use App\Http\Controllers\Admin\Cyborg\TradeSettingsController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::prefix('cyborg')->name('cyborg.')->group(function () {
    Route::get('/get-exchangies', [ExchangeController::class, 'getExchanges'])->name('exchange.all');

    Route::get('/get-strategies', [StrategyController::class, 'getStrategies'])->name('strategies.all');
    Route::resource('strategy', StrategyController::class);

    Route::resource('trade-settings', TradeSettingsController::class);

    Route::resource('markets',MarketController::class);
});

Route::resource('administrative', AdminManagementController::class);

Route::prefix('users')->name('users.')->controller(UserManagementController::class)->group(function () {
    Route::get('/', 'index')->name('index');
});
