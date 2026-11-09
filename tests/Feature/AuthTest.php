<?php

use App\Enums\Role;
use App\Models\User;

test('a visitor can register as a customer', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Juan Dela Cruz',
        'email' => 'juan@example.com',
        'phone' => '09171234567',
        'address' => 'Davao City',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertRedirect(route('home'));
    $this->assertAuthenticated();
    expect(User::where('email', 'juan@example.com')->first()->role)->toBe(Role::User);
});

test('a user can log in with the correct password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('home'));

    $this->assertAuthenticatedAs($user);
});

test('a user cannot log in with the wrong password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('guests are sent to the login page', function () {
    $this->get(route('menu.index'))->assertRedirect(route('login'));
});

test('customers cannot open the staff dashboard', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});

test('staff can open the staff dashboard', function () {
    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard'))
        ->assertOk();
});
