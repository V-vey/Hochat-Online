<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class Order extends Model
{
    use HasFactory;

    /**
     * Flat fee added to every Delivery order (in pesos).
     */
    public const DELIVERY_FEE = 50;

    /**
     * Delivery is only offered inside this town (from the case study scope).
     */
    public const DELIVERY_AREA = 'Gerona';

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

    /**
     * Place an order for a customer. Used by both the website checkout and the API,
     * so the same rules apply everywhere.
     *
     * @param  array<int, int>  $quantities  menu item id => quantity
     * @param  string  $itemsErrorKey  form field that sold-out errors are shown under
     *
     * @throws ValidationException when the order breaks a rule
     */
    public static function placeFor(
        User $user,
        string $orderType,
        ?string $scheduledTime,
        array $quantities,
        string $itemsErrorKey = 'items',
    ): self {
        if ($quantities === []) {
            throw ValidationException::withMessages([$itemsErrorKey => 'Your cart is empty.']);
        }

        if ($orderType === 'Delivery') {
            if (blank($user->address)) {
                throw ValidationException::withMessages([
                    'order_type' => 'Add a delivery address to your profile first.',
                ]);
            }

            if (! str_contains(strtolower($user->address), strtolower(self::DELIVERY_AREA))) {
                throw ValidationException::withMessages([
                    'order_type' => 'Sorry, we only deliver within '.self::DELIVERY_AREA.'. Check the address in your profile.',
                ]);
            }
        }

        $menuItems = MenuItem::whereIn('id', array_keys($quantities))->get();

        if ($menuItems->contains(fn (MenuItem $item) => ! $item->is_available)) {
            throw ValidationException::withMessages([
                $itemsErrorKey => 'An item in your order is sold out. Please remove it.',
            ]);
        }

        return DB::transaction(function () use ($user, $orderType, $scheduledTime, $quantities, $menuItems) {
            $subtotal = $menuItems->sum(fn (MenuItem $item) => $item->price * $quantities[$item->id]);
            $deliveryFee = self::deliveryFeeFor($orderType);

            $order = $user->orders()->create([
                'order_type' => $orderType,
                'status' => 'Pending',
                'scheduled_time' => $scheduledTime,
                'delivery_fee' => $deliveryFee,
                'total_amount' => $subtotal + $deliveryFee,
            ]);

            foreach ($menuItems as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item->id,
                    'quantity' => $quantities[$item->id],
                    'sub_total' => $item->price * $quantities[$item->id],
                ]);
            }

            return $order;
        });
    }
}
