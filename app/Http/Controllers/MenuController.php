<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Show the menu catalog, grouped by category.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $categories = Category::query()
            ->with(['menuItems' => function ($query) use ($search) {
                $query->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
                    ->orderBy('name');
            }])
            ->orderBy('id')
            ->get();

        return Inertia::render('menu/index', [
            'categories' => $categories,
            'search' => $search,
        ]);
    }
}
