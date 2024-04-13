<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AcademyModule extends Model
{
    use HasFactory, SoftDeletes, GeneratesUuid;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function academy()
    {
        return $this->belongsTo(Academy::class);
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function videos()
    {
        return $this->hasMany(AcademyVideo::class)->orderBy('order', 'ASC');
    }

    public function documents()
    {
        return $this->hasMany(AcademyDocument::class)->orderBy('order', 'ASC');
    }
}
