<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $orders = Order::with(['user', 'orderItems.menuItem'])
            ->when($request->query('status'), fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    public function update(UpdateOrderStatusRequest $request, Order $order): OrderResource
    {
        if (in_array($order->status, ['Completed', 'Cancelled'])) {
            throw ValidationException::withMessages([
                'status' => 'This order is already finished.',
            ]);
        }

        $order->update(['status' => $request->validated('status')]);

        return new OrderResource($order);
    }
}
