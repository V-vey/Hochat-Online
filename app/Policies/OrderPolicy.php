<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    /**
     * A customer may only view their own orders.
     */
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    /**
     * A customer may cancel their own order within 1 minute, while it is still Pending.
     */
    public function cancel(User $user, Order $order): bool
    {
        return $this->view($user, $order)
            && $order->status === 'Pending'
            && $order->created_at->diffInSeconds(now()) <= 60;
    }
}
