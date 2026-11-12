<?php

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Collection;
use Inertia\Testing\AssertableInertia as Assert;

test('the administrator can see every account with its order count', function () {
    $admin = User::factory()->admin()->create();
    $customer = User::factory()->create();
    Order::factory()->count(2)->for($customer)->create();

    $this->actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/users/index')
            ->has('users', 2)
            ->where('users', fn (Collection $users) => $users->firstWhere('id', $customer->id)['orders_count'] === 2
                && $users->every(fn (array $user) => ! array_key_exists('password', $user)))
        );
});

test('staff and customers cannot open the user list or delete accounts', function (User $actor) {
    $target = User::factory()->create();

    $this->actingAs($actor)->get(route('admin.users.index'))->assertForbidden();
    $this->actingAs($actor)->delete(route('admin.users.destroy', $target))->assertForbidden();

    expect($target->fresh())->not->toBeNull();
})->with([
    'staff' => fn () => User::factory()->staff()->create(),
    'customer' => fn () => User::factory()->create(),
]);

test('deleting a user permanently removes the account and its orders', function () {
    $customer = User::factory()->create();
    $order = Order::factory()->for($customer)->create();
    $order->orderItems()->create([
        'menu_item_id' => MenuItem::factory()->create()->id,
        'quantity' => 1,
        'sub_total' => 99,
    ]);
    $customer->createToken('api');

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.users.destroy', $customer))
        ->assertRedirect();

    $this->assertDatabaseMissing('users', ['id' => $customer->id]);
    $this->assertDatabaseMissing('orders', ['id' => $order->id]);
    $this->assertDatabaseMissing('order_items', ['order_id' => $order->id]);
    $this->assertDatabaseMissing('personal_access_tokens', ['tokenable_id' => $customer->id]);
});

test('the administrator cannot delete their own account', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->delete(route('admin.users.destroy', $admin))
        ->assertSessionHasErrors('delete');

    expect($admin->fresh())->not->toBeNull();
});

test('the administrator can permanently delete an order', function () {
    $order = Order::factory()->create(['status' => 'Completed']);
    $order->orderItems()->create([
        'menu_item_id' => MenuItem::factory()->create()->id,
        'quantity' => 2,
        'sub_total' => 198,
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.orders.destroy', $order))
        ->assertRedirect();

    $this->assertDatabaseMissing('orders', ['id' => $order->id]);
    $this->assertDatabaseMissing('order_items', ['order_id' => $order->id]);
});

test('staff cannot delete orders', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->delete(route('admin.orders.destroy', $order))
        ->assertForbidden();

    expect($order->fresh())->not->toBeNull();
});
