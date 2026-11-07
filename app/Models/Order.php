<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_type',
        'status',
        'total_ammount',
        'order_date',
        'scheduled_time',
        'is_available',
    ];
}
