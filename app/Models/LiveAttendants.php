<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveAttendants extends Model
{
    use HasFactory;

    protected $guarded = [];

    function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
}
