<?php

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('api login gives back a token', function () {
    $user = User::factory()->create();

    $this->postJson(route('api.v1.login'), [
        'email' => $user->email,
        'password' => 'password',
    ])
        ->assertOk()
        ->assertJsonStructure(['token', 'user' => ['id', 'name', 'role']]);
});

test('api login with the wrong password fails', function () {
    $user = User::factory()->create();

    $this->postJson(route('api.v1.login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('email');
});

test('anyone can read the menu', function () {
    MenuItem::factory()->count(3)->create();

    $this->getJson(route('api.v1.menu.index'))
        ->assertOk()
        ->assertJsonCount(3, 'data');
});

test('orders need a token', function () {
    $this->getJson(route('api.v1.orders.index'))->assertUnauthorized();
});

test('a customer can place an order through the api', function () {
    Sanctum::actingAs(User::factory()->create());
    $item = MenuItem::factory()->create(['price' => 100]);

    $this->postJson(route('api.v1.orders.store'), [
        'order_type' => 'Dine-In',
        'items' => [
            ['menu_item_id' => $item->id, 'quantity' => 3],
        ],
    ])
        ->assertCreated()
        ->assertJsonPath('data.status', 'Pending')
        ->assertJsonPath('data.total_amount', 300)
        ->assertJsonCount(1, 'data.items');
});

test('customers cannot use the staff api', function () {
    $order = Order::factory()->create();
    Sanctum::actingAs($order->user);

    $this->patchJson(route('api.v1.admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertForbidden();
});

test('staff can change an order status through the api', function () {
    $order = Order::factory()->create();
    Sanctum::actingAs(User::factory()->staff()->create());

    $this->patchJson(route('api.v1.admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertOk()
        ->assertJsonPath('data.status', 'Preparing');
});