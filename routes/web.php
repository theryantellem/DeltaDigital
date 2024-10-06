<?php

use App\Jobs\PushNotificationJob;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('test', function () {
    $data = [
        'push_tokens' =>  ['fXZZ8qCUDkc6omS_dW4Eqz:APA91bE2vV5bIu8Qq8DzL0-C8ldwVFFeFwk_jP_VgjOedVsWt5tpsivNtXZ84JSzP4AbITE0Ow9WV2w4isKy3Liw3V7iI9--4CMhkQroeHAdtMXqGh8X3S6mIjPqnA99IenI203_mTih'],
        'title' => "Signal Created.",
        'message' => "push notification test",
    ];

    dispatch(new PushNotificationJob($data));

    // $firebase = new \App\Services\PushNotification();

    // dD($firebase->sendNotification($data));

});
