<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlaceOrderRequest;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Turn the cart into an order.
     */
    public function store(PlaceOrderRequest $request): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);

        if ($cart === []) {
            return back()->withErrors(['cart' => 'Your cart is empty.']);
        }

        if ($request->input('order_type') === 'Delivery' && blank($request->user()->address)) {
            return back()->withErrors(['order_type' => 'Add a delivery address to your account first.']);
        }

        $menuItems = MenuItem::query()->whereIn('id', array_keys($cart))->get();

        if ($menuItems->contains(fn (MenuItem $item) => ! $item->is_available)) {
            return back()->withErrors(['cart' => 'An item in your cart is sold out. Please remove it.']);
        }

        DB::transaction(function () use ($request, $cart, $menuItems) {
            $total = $menuItems->sum(fn (MenuItem $item) => $item->price * $cart[$item->id]);

            $order = $request->user()->orders()->create([
                'order_type' => $request->input('order_type'),
                'scheduled_time' => $request->input('scheduled_time'),
                'total_amount' => $total,
            ]);

            foreach ($menuItems as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item->id,
                    'quantity' => $cart[$item->id],
                    'sub_total' => $item->price * $cart[$item->id],
                ]);
            }
        });

        $request->session()->forget('cart');

        return redirect()->route('menu.index');
    }
}