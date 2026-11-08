<?php

namespace App\Enums;

enum Role: string
{
    case Administrator = 'Administrator';
    case Staff = 'Staff';
    case User = 'User';
}
