<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('signals.{educator}', function ($educator) {
    return true;
});

Broadcast::channel('chat.{educator}', function ($educator) {
    return true;
});

Broadcast::channel('live-started.{scheduleid}', function ($scheduleid) {
    return;
});

Broadcast::channel('stop-live.{scheduleid}', function ($scheduleid) {
    return;
});

Broadcast::channel('joined-stream.{schedule}', function ($schedule) {
    return;
});
