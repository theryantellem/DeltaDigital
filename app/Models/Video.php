<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory, GeneratesUuid;

    protected $guarded = [];

    function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

    function categories()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id')->with('category');
    }
}
