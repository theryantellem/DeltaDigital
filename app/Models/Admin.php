<?php

namespace App\Models;

use App\Enums\AdminStatus;
use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasFactory, GeneratesUuid, HasRoles;

    protected $guarded = [];

    protected $guard = 'admin';

    /**
     * Define the route model binding key for a given model.
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('uuid', $value)->firstOrFail();
    }

    protected $casts = [
        'status' => AdminStatus::class
    ];

    function followers()
    {
        return $this->hasMany(UserFollower::class, 'admin_id');
    }
}
