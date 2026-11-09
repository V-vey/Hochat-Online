<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show today's order counts and menu stats for staff.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'orderCounts' => Order::selectRaw('status, count(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status'),
            'ordersToday' => Order::whereDate('created_at', today())->count(),
            'menuItemCount' => MenuItem::count(),
            'soldOutCount' => MenuItem::where('is_available', false)->count(),
        ]);
    }
}
