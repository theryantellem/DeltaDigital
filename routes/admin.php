<?php

use App\Http\Controllers\Admin\Academy\AcademyController;
use App\Http\Controllers\Admin\Academy\AcademyModuleController;
use App\Http\Controllers\Admin\Academy\AcademyVideoController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\Admin\AssetsController;
use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\Cyborg\ExchangeController;
use App\Http\Controllers\Admin\Cyborg\MarketController;
use App\Http\Controllers\Admin\Cyborg\StrategyController;
use App\Http\Controllers\Admin\Cyborg\TradeSettingsController;
use App\Http\Controllers\Admin\EducatorController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\NewsManagement;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RolesPermissions;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\Signal\SignalController;
use App\Http\Controllers\Admin\SupportTicket;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;
use Kutia\Larafirebase\Facades\Larafirebase;

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

Route::controller(AuthenticationController::class)->group(function () {
    Route::get('/', 'login')->name('login');
    Route::post('/', 'authenticate')->name('authenticate');
    Route::get('/logout', 'logout')->name('logout')->middleware('auth:admin');
});

Route::middleware(['auth:admin'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('cyborg')->name('cyborg.')->group(function () {
        Route::get('/get-exchangies', [ExchangeController::class, 'getExchanges'])->name('exchange.all');

        Route::get('/get-strategies', [StrategyController::class, 'getStrategies'])->name('strategies.all');
        Route::resource('strategy', StrategyController::class);

        Route::resource('trade-settings', TradeSettingsController::class);

        Route::resource('markets', MarketController::class);
    });

    Route::get('get-signals', [SignalController::class, 'getSignals'])->name('signals.all');
    Route::post('/update-market-status', [SignalController::class, 'updateMarketStatus'])->name('signals.market.status');
    Route::post('/all-assets', [SignalController::class, 'getAssets'])->name('signals.assets');
    Route::post('/update-status', [SignalController::class, 'updateStatus'])->name('signals.status');
    Route::resource('signals', SignalController::class);

    Route::get('admins/all', [AdminManagementController::class, 'allAdmins'])->name('admins.all');
    Route::resource('administrative', AdminManagementController::class);

    Route::prefix('users')->name('users.')->controller(UserManagementController::class)->group(function () {
        Route::get('/', 'index')->name('index');
    });

    Route::resource('/news', NewsManagement::class);

    Route::controller(SupportTicket::class)->prefix('tickets')->name('tickets.')->group(function () {
        Route::get('tickets', 'index')->name('index');
    });

    Route::get('educators/all', [EducatorController::class, 'allEducators'])->name('educators.all');
    Route::resource('educators', EducatorController::class);

    Route::resource('banners', BannerController::class);

    Route::resource('roles', RolesPermissions::class);

    Route::controller(MessageController::class)->prefix('inbox')->name('inbox.')->group(function () {
        Route::get('', 'index')->name('index');
        Route::get('followers', 'getFollowers')->name('followers');
        Route::get('messages', 'getMessages')->name('messages');
        Route::post('message', 'sendMessage')->name('messages.send');
    });

    Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function () {
        Route::get('profile', 'index')->name('index');
        Route::post('update-password', 'updatePassword')->name('update.password');
        Route::post('update-photo', 'updateProfileImage')->name('update.photo');
        Route::post('update-profile', 'updateProfile')->name('update.profile');
    });

    Route::controller(CategoryController::class)->prefix('category')->name('category.')->group((function () {
        Route::get('', 'index')->name('index');
        Route::get('list', 'allCategories')->name('all');
        Route::get('show/{id}', 'show')->name('show');
        Route::post('store', 'store')->name('store');
        Route::post('update/{id}', 'update')->name('update');
        Route::post('/remove-image/{id}', 'removeImage')->name('remove.image');
    }));

    Route::controller(AssetsController::class)->prefix('assets')->name('assets.')->group((function () {
        Route::get('', 'index')->name('index');
        Route::get('list', 'all')->name('all');
        Route::get('show/{id}', 'show')->name('show');
        Route::post('store', 'store')->name('store');
        Route::post('update/{id}', 'update')->name('update');
    }));

    Route::controller(ScheduleController::class)->prefix('schedule')->name('schedule.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/all', 'schedules')->name('all');
        Route::get('/videos/{schedule}', 'getVideos')->name('videos');
        Route::post('store', 'store')->name('store');
        Route::get('show/{schedule}', 'show')->name('show');
        Route::post('upload', 'uploadVideo')->name('upload');
        Route::put('update/{schedule}', 'update')->name('update');
        Route::post('live/start/{schedule}', 'startLive')->name('live.start');
        Route::post('live/stop/{schedule}', 'stopLive')->name('live.stop');
        Route::get('live/views/{schedule}', 'stopLive')->name('live.views');
        Route::delete('delete/{schedule}', 'destroy')->name('delete');
    });

    Route::controller(AcademyController::class)->prefix('academy')->name('academy.')->group((function () {
        Route::get('/', 'index')->name('index');
        Route::get('/details/{academy}','details')->name('details');
        Route::get('/all','all')->name('all');
        Route::post('store', 'store')->name('store');
        Route::get('show/{academy}', 'show')->name('show');
        Route::put('update/{academy}', 'update')->name('update');
        Route::delete('delete/{academy}', 'delete')->name('delete');
    }));

    Route::controller(AcademyModuleController::class)->prefix('academy/modules')->name('academy.modules.')->group((function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{category}', 'categoryModule')->name('categoryModule'); // This endpoint list all module under a category
        Route::post('store', 'store')->name('store');
        Route::get('details/{module}', 'details')->name('details');
        Route::get('show/{module}', 'show')->name('show'); // This endpoint list all video under a module
        Route::put('update/{module}', 'update')->name('update');
        Route::put('make-video-favourite/{module}', 'makeFavourite')->name('makeFavourite');
        Route::delete('delete/{module}', 'delete')->name('delete');
    }));

    Route::controller(AcademyVideoController::class)->prefix('academy/videos')->name('academy.videos.')->group((function () {
        Route::get('/{video}', 'index')->name('index');
        Route::post('store', 'store')->name('store');
        Route::put('update/{video}', 'update')->name('update');
        Route::delete('delete/{video}', 'delete')->name('delete');
    }));
});

Route::get('test-notifications', function () {
    event(new \App\Events\SignalNotification(1, "hello", "updated"));

    return null;
});

Route::get('push-notification', function () {

    // $fcmTokens =  followersPushTokens(1);

    // if (!empty($fcmTokens)) {
    //     \Illuminate\Support\Facades\Notification::send(null, new \App\Notifications\SendPushNotification("Signal Created", "A new signal has been created. Tap to view details.", $fcmTokens));
    // }

    $firebaseToken = ["f-7-xyUjI05-g2xU13RXtr:APA91bHamFGUhQy476Forn8hKozkkGNqKOnPSTtA9xhjOpRCK1v-moHicASA-IEqXtyU_8wDx43US5apAeYq83iRjnImUPvfEDnunDvzWJR5vndvUQhMvZZMp4iEOWAUTUrOqPu2-sGd"];

    $data = [
        'push_tokens' => $firebaseToken,
        'title' => "Hello World",
        'message' => "Trust your day is fine."
    ];

    $firebase = new \App\Services\PushNotification();

    dd($firebase->sendNotification($data));
});
