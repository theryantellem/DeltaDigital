<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Academy extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function academyModules()
    {
        return $this->hasMany(AcademyModule::class);
    }

    public function ratings()
    {
        return $this->hasMany(AcademyRating::class);
    }
}
