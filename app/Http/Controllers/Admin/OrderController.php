<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->query('status');

        $orders = Order::with(['user', 'orderItems.menuItem'])
            ->when($status, fn ($query) => $query->where('status', $status))
            ->latest()
            ->get();

        $counts = Order::selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'counts' => $counts,
            'status' => $status,
        ]);
    }

    public function update(UpdateOrderStatusRequest $request, Order $order): RedirectResponse
    {
        if (in_array($order->status, ['Completed', 'Cancelled'])) {
            return back()->withErrors(['status' => 'This order is already finished.']);
        }

        $order->update(['status' => $request->validated('status')]);

        return back();
    }
}