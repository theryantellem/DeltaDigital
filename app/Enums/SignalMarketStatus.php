<?php

namespace App\Enums;


enum SignalMarketStatus: string
{
    case Pending = 'pending';
    case InTrade = 'intrade';
    case Win = "win";
    case Loss = "loss";
    case BreakEven = "breakeven";

    public function label(): string
    {
        return match ($this) {
            self::Pending => "PENDING",
            self::InTrade => 'INTRADE',
            self::Win => 'WIN',
            self::Loss => 'LOSS',
            self::BreakEven => "BREAKEVEN",
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn (self $SignalStatus) => [
            $SignalStatus->value => $SignalStatus->label(),
        ])->toArray();
    }
}
