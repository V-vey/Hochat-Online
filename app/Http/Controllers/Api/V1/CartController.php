<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AddToCartRequest;
use App\Http\Requests\Api\UpdateCartItemRequest;
use App\Http\Requests\PlaceOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

/**
 * The API cart. API clients use tokens instead of sessions, so each user's
 * cart is kept in the cache under their user id.
 */
class CartController extends Controller
{
    /**
     * Show the cart.
     */
    public function index(Request $request): JsonResponse
    {
        return $this->cartResponse($request->user());
    }

    /**
     * Add an item (or more of it) to the cart.
     */
    public function store(AddToCartRequest $request): JsonResponse
    {
        $menuItem = MenuItem::findOrFail($request->validated('menu_item_id'));

        if (! $menuItem->is_available) {
            throw ValidationException::withMessages(['menu_item_id' => 'This item is sold out.']);
        }

        $cart = $this->cart($request->user());
        $cart[$menuItem->id] = min(50, ($cart[$menuItem->id] ?? 0) + $request->validated('quantity', 1));
        $this->saveCart($request->user(), $cart);

        return $this->cartResponse($request->user(), 201);
    }

    /**
     * Change the quantity of an item already in the cart.
     */
    public function update(UpdateCartItemRequest $request, MenuItem $menuItem): JsonResponse
    {
        $cart = $this->cart($request->user());
        abort_unless(isset($cart[$menuItem->id]), 404, 'That item is not in your cart.');

        $cart[$menuItem->id] = $request->validated('quantity');
        $this->saveCart($request->user(), $cart);

        return $this->cartResponse($request->user());
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(Request $request, MenuItem $menuItem): JsonResponse
    {
        $cart = $this->cart($request->user());
        unset($cart[$menuItem->id]);
        $this->saveCart($request->user(), $cart);

        return $this->cartResponse($request->user());
    }

    /**
     * Place an order from everything in the cart, then empty the cart.
     */
    public function checkout(PlaceOrderRequest $request): JsonResponse
    {
        $order = Order::placeFor(
            $request->user(),
            $request->validated('order_type'),
            $request->validated('scheduled_time'),
            $this->cart($request->user()),
        );

        Cache::forget($this->cacheKey($request->user()));

        return (new OrderResource($order->load('orderItems.menuItem')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * @return array<int, int> menu item id => quantity
     */
    private function cart(User $user): array
    {
        return Cache::get($this->cacheKey($user), []);
    }

    /**
     * @param  array<int, int>  $cart
     */
    private function saveCart(User $user, array $cart): void
    {
        Cache::put($this->cacheKey($user), $cart, now()->addDays(7));
    }

    private function cacheKey(User $user): string
    {
        return "api-cart:{$user->id}";
    }

    private function cartResponse(User $user, int $status = 200): JsonResponse
    {
        $cart = $this->cart($user);

        $items = MenuItem::whereIn('id', array_keys($cart))->get()->map(fn (MenuItem $item) => [
            'menu_item_id' => $item->id,
            'name' => $item->name,
            'price' => (float) $item->price,
            'quantity' => $cart[$item->id],
            'subtotal' => round($item->price * $cart[$item->id], 2),
            'is_available' => $item->is_available,
        ])->values();

        return response()->json([
            'data' => [
                'items' => $items,
                'item_count' => array_sum($cart),
                'subtotal' => round($items->sum('subtotal'), 2),
                'delivery_fee_if_delivery' => Order::DELIVERY_FEE,
            ],
        ], $status);
    }
}
