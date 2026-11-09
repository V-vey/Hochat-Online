<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Show the cart with current prices and totals.
     */
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);

        $items = MenuItem::query()
            ->whereIn('id', array_keys($cart))
            ->get()
            ->map(fn (MenuItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->price,
                'quantity' => $cart[$item->id],
                'subtotal' => number_format($item->price * $cart[$item->id], 2, '.', ''),
            ]);

        return Inertia::render('cart/index', [
            'items' => $items,
            'total' => number_format($items->sum('subtotal'), 2, '.', ''),
        ]);
    }

    /**
     * Add one of an item to the cart.
     */
    public function store(Request $request, MenuItem $menuItem): RedirectResponse
    {
        if (! $menuItem->is_available) {
            return back()->withErrors(['cart' => 'This item is sold out.']);
        }

        $cart = $request->session()->get('cart', []);
        $cart[$menuItem->id] = ($cart[$menuItem->id] ?? 0) + 1;
        $request->session()->put('cart', $cart);

        return back();
    }

    /**
     * Change the quantity of an item.
     */
    public function update(Request $request, MenuItem $menuItem): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:50'],
        ]);

        $cart = $request->session()->get('cart', []);
        $cart[$menuItem->id] = $validated['quantity'];
        $request->session()->put('cart', $cart);

        return back();
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(Request $request, MenuItem $menuItem): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[$menuItem->id]);
        $request->session()->put('cart', $cart);

        return back();
    }
}