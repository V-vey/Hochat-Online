<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the home page with a few featured menu items for the slideshow.
     */
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'featured' => MenuItem::with('category')
                ->where('is_available', true)
                ->orderByRaw('photo_url is null')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
