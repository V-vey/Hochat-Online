<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ManageOrdersRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * List orders, optionally filtered by status and by a date range.
     */
    public function index(ManageOrdersRequest $request): Response
    {
        $status = $request->validated('status');
        $from = $request->validated('from');
        $to = $request->validated('to');

        $inDateRange = fn (Builder $query) => $query
            ->when($from, fn (Builder $q) => $q->where('created_at', '>=', Carbon::parse($from)->startOfDay()))
            ->when($to, fn (Builder $q) => $q->where('created_at', '<=', Carbon::parse($to)->endOfDay()));

        $orders = Order::with(['user', 'orderItems.menuItem'])
            ->tap($inDateRange)
            ->when($status, fn (Builder $query) => $query->where('status', $status))
            ->latest()
            ->get();

        $counts = Order::query()
            ->tap($inDateRange)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'counts' => $counts,
            'status' => $status,
            'from' => $from,
            'to' => $to,
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

    /**
     * Permanently remove an order and its items (Administrator only).
     */
    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return back();
    }
}
