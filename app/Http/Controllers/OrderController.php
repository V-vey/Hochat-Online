<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlaceOrderRequest;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * List the customer's own orders, newest first.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('orders/index', [
            'orders' => $request->user()->orders()->with('orderItems.menuItem')->latest()->get(),
        ]);
    }

    /**
     * Show one order as a receipt.
     */
    public function show(Request $request, Order $order): Response
    {
        Gate::authorize('view', $order);

        return Inertia::render('orders/show', [
            'order' => $order->load('orderItems.menuItem'),
            'canCancel' => $request->user()->can('cancel', $order),
        ]);
    }

    /**
     * Cancel the order if the 1-minute window is still open.
     */
    public function cancel(Order $order): RedirectResponse
    {
        Gate::authorize('cancel', $order);

        $order->update(['status' => 'Cancelled']);

        return back();
    }

    public function store(PlaceOrderRequest $request): RedirectResponse
    {
        $order = Order::placeFor(
            $request->user(),
            $request->validated('order_type'),
            $request->validated('scheduled_time'),
            $request->session()->get('cart', []),
            itemsErrorKey: 'cart',
        );

        $request->session()->forget('cart');

        return redirect()->route('orders.show', $order);
    }
}
