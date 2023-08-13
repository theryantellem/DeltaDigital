<?php

namespace App\Enums;


enum AdminStatus: string
{
    case Active = 'active';
    case Suspened = 'suspended';
    case Banned = 'banned';

    public function label(): string
    {
        return match ($this) {
            self::Active => "ACTIVE",
            self::Suspened => 'SUSPENDED',
            self::Banned => 'BANNED',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn (self $status) => [
            $status->value => $status->label(),
        ])->toArray();
    }
}
