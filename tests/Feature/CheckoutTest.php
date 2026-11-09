<?php

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('customers can see the menu', function () {
    MenuItem::factory()->count(3)->create();

    $this->actingAs(User::factory()->create())
        ->get(route('menu.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('menu/index')
            ->has('categories', 3)
        );
});

test('a customer can add an item to the cart', function () {
    $item = MenuItem::factory()->create();

    $this->actingAs(User::factory()->create())
        ->post(route('cart.store', $item))
        ->assertSessionHas('cart', [$item->id => 1]);
});

test('a sold out item cannot be added to the cart', function () {
    $item = MenuItem::factory()->create(['is_available' => false]);

    $this->actingAs(User::factory()->create())
        ->post(route('cart.store', $item))
        ->assertSessionHasErrors('cart')
        ->assertSessionMissing('cart');
});

test('checking out creates the order and empties the cart', function () {
    $user = User::factory()->create();
    $rice = MenuItem::factory()->create(['price' => 100]);
    $drink = MenuItem::factory()->create(['price' => 50]);

    $this->actingAs($user)
        ->withSession(['cart' => [$rice->id => 2, $drink->id => 1]])
        ->post(route('orders.store'), ['order_type' => 'Dine-In'])
        ->assertRedirect()
        ->assertSessionMissing('cart');

    $order = $user->orders()->first();

    expect($order->total_amount)->toBe('250.00')
        ->and($order->status)->toBe('Pending')
        ->and($order->orderItems)->toHaveCount(2);
});

test('checkout fails when the cart is empty', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('orders.store'), ['order_type' => 'Dine-In'])
        ->assertSessionHasErrors('cart');

    expect(Order::count())->toBe(0);
});

test('delivery needs an address on the account', function () {
    $user = User::factory()->create(['address' => null]);
    $item = MenuItem::factory()->create();

    $this->actingAs($user)
        ->withSession(['cart' => [$item->id => 1]])
        ->post(route('orders.store'), ['order_type' => 'Delivery'])
        ->assertSessionHasErrors('order_type');

    expect(Order::count())->toBe(0);
});

test('a pre-order cannot be scheduled in the past', function () {
    $item = MenuItem::factory()->create();

    $this->actingAs(User::factory()->create())
        ->withSession(['cart' => [$item->id => 1]])
        ->post(route('orders.store'), [
            'order_type' => 'Dine-In',
            'scheduled_time' => now()->subHour()->toDateTimeString(),
        ])
        ->assertSessionHasErrors('scheduled_time');
});