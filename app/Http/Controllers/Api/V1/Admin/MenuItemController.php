<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SaveMenuItemRequest;
use App\Http\Resources\MenuItemResource;
use App\Models\MenuItem;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class MenuItemController extends Controller
{
    /**
     * Create a menu item (Staff and Administrator).
     */
    public function store(SaveMenuItemRequest $request): JsonResponse
    {
        $menuItem = MenuItem::create($request->validated());

        return (new MenuItemResource($menuItem->fresh('category')))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update a menu item, e.g. its price or availability (Staff and Administrator).
     */
    public function update(SaveMenuItemRequest $request, MenuItem $menuItem): MenuItemResource
    {
        $menuItem->update($request->validated());

        return new MenuItemResource($menuItem->fresh('category'));
    }

    /**
     * Permanently delete a menu item (Administrator only). Items that appear in
     * past orders are kept so old receipts stay correct; mark them sold out instead.
     */
    public function destroy(MenuItem $menuItem): Response
    {
        if (OrderItem::where('menu_item_id', $menuItem->id)->exists()) {
            throw ValidationException::withMessages([
                'menu_item' => "{$menuItem->name} is in past orders. Mark it as unavailable instead.",
            ]);
        }

        $menuItem->delete();

        return response()->noContent();
    }
}
