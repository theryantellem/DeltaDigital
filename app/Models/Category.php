<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, GeneratesUuid;

    protected $guarded = [];
}
