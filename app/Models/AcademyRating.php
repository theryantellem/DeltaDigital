<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AcademyRating extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function module()
    {
        return $this->belongsTo(AcademyModule::class, 'academy_id');
    }
}
