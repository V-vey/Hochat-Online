<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\MenuItem;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

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
        if ($request->input('order_type') === 'Delivery' && blank($request->user()->address)) {
            throw ValidationException::withMessages([
                'order_type' => 'Add a delivery address to your account first.',
            ]);
        }

        $quantities = collect($request->validated('items'))->pluck('quantity', 'menu_item_id');
        $menuItems = MenuItem::whereIn('id', $quantities->keys())->get();

        if ($menuItems->contains(fn (MenuItem $item) => ! $item->is_available)) {
            throw ValidationException::withMessages([
                'items' => 'An item in your order is sold out.',
            ]);
        }

        $order = DB::transaction(function () use ($request, $quantities, $menuItems) {
            $subtotal = $menuItems->sum(fn (MenuItem $item) => $item->price * $quantities[$item->id]);
            $deliveryFee = Order::deliveryFeeFor($request->input('order_type'));

            $order = $request->user()->orders()->create([
                'order_type' => $request->input('order_type'),
                'status' => 'Pending',
                'scheduled_time' => $request->input('scheduled_time'),
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
