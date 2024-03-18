<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory,GeneratesUuid;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function liveSessions()
    {
        return $this->hasMany(LiveSessions::class);
    }
}
