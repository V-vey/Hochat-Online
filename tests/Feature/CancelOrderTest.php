<?php

use App\Models\Order;
use App\Models\User;

test('a customer can cancel a pending order within one minute', function () {
    $order = Order::factory()->create();

    $this->actingAs($order->user)
        ->patch(route('orders.cancel', $order))
        ->assertRedirect();

    expect($order->fresh()->status)->toBe('Cancelled');
});

test('a customer cannot cancel after one minute', function () {
    $order = Order::factory()->create();

    $this->travel(61)->seconds();

    $this->actingAs($order->user)
        ->patch(route('orders.cancel', $order))
        ->assertForbidden();

    expect($order->fresh()->status)->toBe('Pending');
});

test('a customer cannot cancel an order that is already being prepared', function () {
    $order = Order::factory()->create(['status' => 'Preparing']);

    $this->actingAs($order->user)
        ->patch(route('orders.cancel', $order))
        ->assertForbidden();
});

test('a customer cannot see another customer\'s order', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('orders.show', $order))
        ->assertForbidden();
});