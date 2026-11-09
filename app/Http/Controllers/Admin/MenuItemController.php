<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuItemRequest;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/menu-items/index', [
            'menuItems' => MenuItem::with('category')
                ->orderBy('category_id')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/menu-items/form', [
            'categories' => Category::orderBy('name')->get(),
            'menuItem' => null,
        ]);
    }

    public function store(MenuItemRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo_url'] = '/storage/'.$request->file('photo')->store('menu', 'public');
        }

        MenuItem::create($data);

        return redirect()->route('admin.menu-items.index');
    }

    public function edit(MenuItem $menuItem): Response
    {
        return Inertia::render('admin/menu-items/form', [
            'categories' => Category::orderBy('name')->get(),
            'menuItem' => $menuItem,
        ]);
    }

    public function update(MenuItemRequest $request, MenuItem $menuItem): RedirectResponse
    {
        $data = $request->safe()->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo_url'] = '/storage/'.$request->file('photo')->store('menu', 'public');
        }

        $menuItem->update($data);

        return redirect()->route('admin.menu-items.index');
    }

    public function destroy(MenuItem $menuItem): RedirectResponse
    {
        if (OrderItem::where('menu_item_id', $menuItem->id)->exists()) {
            return back()->withErrors([
                'delete' => "{$menuItem->name} is in past orders. Mark it as unavailable instead.",
            ]);
        }

        $menuItem->delete();

        return back();
    }
}