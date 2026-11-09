<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    /**
     * Flat fee added to every Delivery order (in pesos).
     */
    public const DELIVERY_FEE = 50;

    protected $fillable = [
        'user_id',
        'order_type',
        'status',
        'delivery_fee',
        'total_amount',
        'order_date',
        'scheduled_time',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'delivery_fee' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'order_date' => 'datetime',
            'scheduled_time' => 'datetime',
        ];
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * The delivery fee for the given order type: ₱50 for Delivery, free for Dine-In.
     */
    public static function deliveryFeeFor(string $orderType): int
    {
        return $orderType === 'Delivery' ? self::DELIVERY_FEE : 0;
    }
}
