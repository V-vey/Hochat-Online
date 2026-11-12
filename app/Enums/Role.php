<?php

namespace App\Enums;

use ValueError;

enum Role: string
{
    case Administrator = 'Administrator';
    case Staff = 'Staff';
    case User = 'User';

    /**
     * Turn a stored role name into a Role, or null when that role no longer
     * exists (for example after a role is removed from this enum).
     */
    public static function fromStored(?string $value): ?self
    {
        if ($value === null) {
            return null;
        }

        try {
            return self::from($value);
        } catch (ValueError) {
            return null;
        }
    }
}
