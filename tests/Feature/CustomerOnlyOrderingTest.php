<?php

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

dataset('employees', [
    'staff' => fn () => User::factory()->staff()->create(),
    'administrator' => fn () => User::factory()->admin()->create(),
]);

test('staff and administrators cannot use the cart, checkout or transactions on the website', function (User $employee) {
    $item = MenuItem::factory()->create();
    $order = Order::factory()->for($employee)->create();

    $this->actingAs($employee);

    $this->get(route('cart.index'))->assertForbidden();
    $this->post(route('cart.store', $item))->assertForbidden();
    $this->patch(route('cart.update', $item), ['quantity' => 2])->assertForbidden();
    $this->delete(route('cart.destroy', $item))->assertForbidden();
    $this->post(route('orders.store'), ['order_type' => 'Dine-In'])->assertForbidden();
    $this->get(route('orders.index'))->assertForbidden();
    $this->get(route('orders.show', $order))->assertForbidden();
    $this->patch(route('orders.cancel', $order))->assertForbidden();

    expect(Order::count())->toBe(1);
})->with('employees');

test('staff and administrators cannot use the cart, checkout or transactions through the api', function (User $employee) {
    $item = MenuItem::factory()->create();
    $order = Order::factory()->for($employee)->create();

    Sanctum::actingAs($employee);

    $this->getJson(route('api.v1.cart.index'))->assertForbidden();
    $this->postJson(route('api.v1.cart.store'), ['menu_item_id' => $item->id])->assertForbidden();
    $this->postJson(route('api.v1.cart.checkout'), ['order_type' => 'Dine-In'])->assertForbidden();
    $this->postJson(route('api.v1.orders.store'), [
        'order_type' => 'Dine-In',
        'items' => [['menu_item_id' => $item->id, 'quantity' => 1]],
    ])->assertForbidden();
    $this->getJson(route('api.v1.orders.index'))->assertForbidden();
    $this->getJson(route('api.v1.orders.show', $order))->assertForbidden();

    expect(Order::count())->toBe(1);
})->with('employees');

test('staff and administrators can still browse the menu and edit their profile', function (User $employee) {
    $this->actingAs($employee);

    $this->get(route('menu.index'))->assertOk();
    $this->get(route('profile.edit'))->assertOk();
})->with('employees');

test('customers can still add to the cart and place an order', function () {
    $customer = User::factory()->create();
    $item = MenuItem::factory()->create();

    $this->actingAs($customer)
        ->post(route('cart.store', $item))
        ->assertRedirect();

    $this->actingAs($customer)
        ->post(route('orders.store'), ['order_type' => 'Dine-In'])
        ->assertRedirect();

    expect($customer->orders()->count())->toBe(1);
});
