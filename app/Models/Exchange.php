<?php

namespace App\Models;

use App\Traits\GeneratesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exchange extends Model
{
    use HasFactory, GeneratesUuid;

    protected $guarded = [];

    const EXCHANGE_LIST = [
        [
            'name' => "Binance",
            'tag' => "1",
            'status' => "enabled"
        ],
        [
            'name' => "Kucoin",
            'tag' => "2",
            'status' => "enabled"
        ],
        [
            'name' => "Coinbase",
            'tag' => "3",
            'status' => "enabled"
        ],
        [
            'name' => "Krakan",
            'tag' => "4",
            'status' => "enabled"
        ],
    ];

    function strategies()
    {
        return $this->hasMany(Strategy::class);
    }
}
