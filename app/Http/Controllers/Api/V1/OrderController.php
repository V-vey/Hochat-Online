<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        return OrderResource::collection($request->user()->orders()->latest()->get());
    }

    public function show(Order $order): OrderResource
    {
        Gate::authorize('view', $order);

        return new OrderResource($order->load('orderItems.menuItem'));
    }

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = Order::placeFor(
            $request->user(),
            $request->validated('order_type'),
            $request->validated('scheduled_time'),
            collect($request->validated('items'))->pluck('quantity', 'menu_item_id')->all(),
        );

        return (new OrderResource($order->load('orderItems.menuItem')))
            ->response()
            ->setStatusCode(201);
    }

    public function cancel(Order $order): OrderResource
    {
        Gate::authorize('cancel', $order);

        $order->update(['status' => 'Cancelled']);

        return new OrderResource($order);
    }
}
