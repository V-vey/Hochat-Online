<?php

use App\Enums\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;

/**
 * Give a user a role name that is not in the Role enum, the same as
 * what happens to Staff accounts when the Staff role is removed.
 */
function giveRemovedRole(User $user): User
{
    DB::statement('PRAGMA ignore_check_constraints = ON');
    DB::table('users')->where('id', $user->id)->update(['role' => 'Cashier']);
    DB::statement('PRAGMA ignore_check_constraints = OFF');

    return $user->fresh();
}

test('a stored role that no longer exists is read as no role instead of crashing', function () {
    expect(Role::fromStored('Cashier'))->toBeNull()
        ->and(Role::fromStored(null))->toBeNull()
        ->and(Role::fromStored('Staff'))->toBe(Role::Staff);

    $user = giveRemovedRole(User::factory()->staff()->create());

    expect($user->role)->toBeNull();
});

test('a user whose role was removed cannot log in to the website', function () {
    $user = giveRemovedRole(User::factory()->staff()->create());

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertSessionHasErrors(['email' => User::INACTIVE_ROLE_MESSAGE]);

    $this->assertGuest();
});

test('a user whose role was removed cannot log in to the api', function () {
    $user = giveRemovedRole(User::factory()->staff()->create());

    $this->postJson(route('api.v1.login'), [
        'email' => $user->email,
        'password' => 'password',
    ])
        ->assertForbidden()
        ->assertJsonPath('message', User::INACTIVE_ROLE_MESSAGE);

    expect($user->tokens()->count())->toBe(0);
});

test('a user who is still logged in when their role is removed gets 403, not an error', function () {
    $user = giveRemovedRole(User::factory()->staff()->create());

    $this->actingAs($user)->get(route('admin.dashboard'))->assertForbidden();
    $this->actingAs($user)->get(route('cart.index'))->assertForbidden();
    $this->actingAs($user)->get(route('menu.index'))->assertOk();

    Sanctum::actingAs($user);
    $this->getJson(route('api.v1.admin.orders.index'))->assertForbidden();
});

test('a route that still lists a removed role skips it and keeps working', function () {
    Route::middleware(['web', 'auth', 'role:Cashier,Administrator'])
        ->get('/removed-role-check', fn () => 'allowed');

    $this->actingAs(User::factory()->admin()->create())
        ->get('/removed-role-check')
        ->assertOk()
        ->assertSee('allowed');

    $this->actingAs(User::factory()->staff()->create())
        ->get('/removed-role-check')
        ->assertForbidden();
});

test('the administrator can still see an account whose role was removed', function () {
    $user = giveRemovedRole(User::factory()->staff()->create());

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where(
            'users',
            fn ($users) => $users->firstWhere('id', $user->id)['role'] === null,
        ));
});
