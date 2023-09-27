<?php

namespace App\Enums;


enum SignalOrderTypeEnum: string
{
    case Buy = 'buy';
    case Sell = 'sell';
    case BuyLimit = 'buy limit';
    case SellLimit = 'sell limit';
    case BuyStop = 'buy stop';
    case SellStop = 'sell stop';

    public function label(): string
    {
        return match ($this) {
            self::Buy => "BUY",
            self::Sell => 'SELL',
            self::BuyStop => 'BUY STOP',
            self::SellStop => 'SELL STOP',
            self::BuyLimit => 'BUY LIMIT',
            self::SellLimit => 'SELL LIMIT',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn (self $SignalOrderTypeEnum) => [
            $SignalOrderTypeEnum->value => $SignalOrderTypeEnum->label(),
        ])->toArray();
    }
}
