<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveSessions extends Model
{
    use HasFactory;

    protected $guarded = [];

    function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id', 'uuid');
    }
}
