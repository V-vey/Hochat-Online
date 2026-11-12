<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * List every account so the Administrator can oversee them.
     */
    public function index(): Response
    {
        return Inertia::render('admin/users/index', [
            'users' => User::query()
                ->withCount('orders')
                ->latest()
                ->get(['id', 'name', 'email', 'phone', 'address', 'role', 'created_at']),
        ]);
    }

    /**
     * Permanently remove an account together with its orders.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->is($request->user())) {
            return back()->withErrors(['delete' => 'You cannot delete your own account.']);
        }

        DB::transaction(function () use ($user) {
            $user->orders()->delete();
            $user->tokens()->delete();
            $user->delete();
        });

        return back();
    }
}
