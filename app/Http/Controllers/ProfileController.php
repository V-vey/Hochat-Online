<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the logged-in user's profile (name, contact and delivery info).
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('profile/edit', [
            'user' => $request->user()->only(['name', 'email', 'phone', 'address']),
        ]);
    }

    /**
     * Save changes to name, email, phone and delivery address.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->update($request->validated());

        return back()->with('status', 'Profile saved.');
    }

    /**
     * Change the password after confirming the current one.
     */
    public function updatePassword(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update(['password' => $request->validated('password')]);

        return back()->with('status', 'Password changed.');
    }
}
