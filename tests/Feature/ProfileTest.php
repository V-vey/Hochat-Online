<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

test('a customer can open their profile', function () {
    $user = User::factory()->create(['address' => 'Poblacion, Gerona']);

    $this->actingAs($user)
        ->get(route('profile.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('profile/edit')
            ->where('user.address', 'Poblacion, Gerona')
            ->missing('user.password')
        );
});

test('a customer can update their contact and delivery info', function () {
    $user = User::factory()->create(['address' => null]);

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Juan Dela Cruz',
            'email' => $user->email,
            'phone' => '09171234567',
            'address' => 'Purok 3, Gerona, Tarlac',
        ])
        ->assertRedirect()
        ->assertSessionHas('status', 'Profile saved.');

    expect($user->fresh())
        ->name->toBe('Juan Dela Cruz')
        ->phone->toBe('09171234567')
        ->address->toBe('Purok 3, Gerona, Tarlac');
});

test('a customer cannot take another account\'s email', function () {
    $other = User::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => $user->name,
            'email' => $other->email,
            'phone' => $user->phone,
        ])
        ->assertSessionHasErrors('email');
});

test('a customer can change their password with the current one', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->put(route('profile.password'), [
            'current_password' => 'password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])
        ->assertSessionHasNoErrors();

    expect(Hash::check('new-password-123', $user->fresh()->password))->toBeTrue();
});

test('the password is not changed when the current password is wrong', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->put(route('profile.password'), [
            'current_password' => 'wrong-password',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])
        ->assertSessionHasErrors('current_password');

    expect(Hash::check('password', $user->fresh()->password))->toBeTrue();
});

test('guests cannot open the profile page', function () {
    $this->get(route('profile.edit'))->assertRedirect(route('login'));
});
