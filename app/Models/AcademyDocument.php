<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AcademyDocument extends Model
{
    use HasFactory, GeneratesUuid;

    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function module()
    {
        return $this->belongsTo(AcademyModule::class, 'academy_module_id');
    }
}
