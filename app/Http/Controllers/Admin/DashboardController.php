<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderReportRequest;
use App\Models\MenuItem;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * The order statuses, in the order they happen.
     *
     * @var list<string>
     */
    private const STATUSES = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

    /**
     * Show the Order Status Report for a date range (today by default).
     */
    public function __invoke(OrderReportRequest $request): Response
    {
        $from = $request->from();
        $to = $request->to();

        $ordersInRange = Order::whereBetween('created_at', [$from, $to]);

        $countsFromDatabase = (clone $ordersInRange)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $statusCounts = collect(self::STATUSES)
            ->mapWithKeys(fn (string $status) => [$status => (int) ($countsFromDatabase[$status] ?? 0)]);

        return Inertia::render('admin/dashboard', [
            'from' => $from->toDateString(),
            'to' => $to->toDateString(),
            'statusCounts' => $statusCounts,
            'totalOrders' => $statusCounts->sum(),
            'completedSales' => number_format((float) (clone $ordersInRange)->where('status', 'Completed')->sum('total_amount'), 2, '.', ''),
            'menuItemCount' => MenuItem::count(),
            'soldOutCount' => MenuItem::where('is_available', false)->count(),
            'orders' => (clone $ordersInRange)
                ->with('user:id,name')
                ->latest()
                ->limit(50)
                ->get(['id', 'user_id', 'order_type', 'status', 'total_amount', 'created_at']),
        ]);
    }
}
