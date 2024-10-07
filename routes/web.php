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
        'push_tokens' =>  ['f5uNZe_-tk03t6S-SUsdnw:APA91bFRU_20laXbsvFOkr2DMqKxUUmpmri6O-acLbjCvC7-VwGVloZYUBwjh_yB83MbCvD9Bs2nzZm0SKvDpRr0nwbOQsxN-FLnxXXXqvam3WC1-CoNygmVVlWNTy4GxAtedsjNlLbi'],
        'title' => "Signal Created.",
        'message' => "push notification test",
    ];

    dispatch(new PushNotificationJob($data));

    dD("done");

    // $firebase = new \App\Services\PushNotification();

    // $data['push_token'] = "f5uNZe_-tk03t6S-SUsdnw:APA91bFRU_20laXbsvFOkr2DMqKxUUmpmri6O-acLbjCvC7-VwGVloZYUBwjh_yB83MbCvD9Bs2nzZm0SKvDpRr0nwbOQsxN-FLnxXXXqvam3WC1-CoNygmVVlWNTy4GxAtedsjNlLbi";
    // $res = $firebase->sendNotification($data);

    // dD($res);

    // $res = [];

    // foreach ($data['push_tokens'] as $token) {
    //     $data['push_token'] = $token;
    //     $firebase->sendNotification($data);
    //     // dd($firebase);

    //     // array_push($res, $firebase);
    // }

    // dD($res);
});
