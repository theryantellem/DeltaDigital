<?php

namespace App\Models;

use App\Enums\SignalMarketStatus;
use App\Enums\SignalOrderTypeEnum;
use App\Enums\SignalStatusEnum;
use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Signal extends Model
{
    use HasFactory, GeneratesUuid;

    protected $guarded = [];

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'asset_type', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

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

    public function educator()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    protected $casts = [
        'order_type' => SignalOrderTypeEnum::class,
        'status' => SignalStatusEnum::class,
        'market_status' => SignalMarketStatus::class
    ];
}
