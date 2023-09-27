<?php

namespace App\Enums;


enum SignalStatusEnum: string
{
    case Active = 'active';
    case Closed = 'closed';

    public function label(): string
    {
        return match ($this) {
            self::Active => "ACTIVE",
            self::Closed => 'CLOSED',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn (self $SignalStatus) => [
            $SignalStatus->value => $SignalStatus->label(),
        ])->toArray();
    }
}
