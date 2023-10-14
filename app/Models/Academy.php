<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Academy extends Model
{
    use HasFactory, SoftDeletes, GeneratesUuid;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function educator()
    {
        return $this->belongsTo(Admin::class,'admin_id');
    }

    public function academyModules()
    {
        return $this->hasMany(AcademyModule::class,'academy_id');
    }

    public function ratings()
    {
        return $this->hasMany(AcademyRating::class);
    }
}
