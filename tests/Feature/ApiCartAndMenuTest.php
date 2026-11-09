<?php

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('a customer can add to, change and remove from the api cart', function () {
    Sanctum::actingAs(User::factory()->create());
    $rice = MenuItem::factory()->create(['price' => 100]);
    $drink = MenuItem::factory()->create(['price' => 50]);

    $this->postJson(route('api.v1.cart.store'), ['menu_item_id' => $rice->id, 'quantity' => 2])
        ->assertCreated()
        ->assertJsonPath('data.item_count', 2);

    $this->postJson(route('api.v1.cart.store'), ['menu_item_id' => $drink->id])
        ->assertJsonPath('data.item_count', 3)
        ->assertJsonPath('data.subtotal', 250);

    $this->patchJson(route('api.v1.cart.update', $rice), ['quantity' => 1])
        ->assertOk()
        ->assertJsonPath('data.subtotal', 150);

    $this->deleteJson(route('api.v1.cart.destroy', $drink))
        ->assertOk()
        ->assertJsonCount(1, 'data.items');
});

test('a sold out item cannot be added to the api cart', function () {
    Sanctum::actingAs(User::factory()->create());
    $item = MenuItem::factory()->create(['is_available' => false]);

    $this->postJson(route('api.v1.cart.store'), ['menu_item_id' => $item->id])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('menu_item_id');
});

test('checking out the api cart places the order and empties the cart', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);
    $item = MenuItem::factory()->create(['price' => 120]);

    $this->postJson(route('api.v1.cart.store'), ['menu_item_id' => $item->id, 'quantity' => 2]);

    $this->postJson(route('api.v1.cart.checkout'), ['order_type' => 'Dine-In'])
        ->assertCreated()
        ->assertJsonPath('data.status', 'Pending')
        ->assertJsonPath('data.total_amount', 240);

    expect($user->orders()->count())->toBe(1);

    $this->getJson(route('api.v1.cart.index'))->assertJsonPath('data.item_count', 0);
});

test('checking out an empty api cart fails', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson(route('api.v1.cart.checkout'), ['order_type' => 'Dine-In'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('items');
});

test('staff can create and update menu items through the api', function () {
    Sanctum::actingAs(User::factory()->staff()->create());
    $category = Category::factory()->create(['name' => 'Desserts']);

    $response = $this->postJson(route('api.v1.admin.menu-items.store'), [
        'category_id' => $category->id,
        'name' => 'Halo-Halo',
        'price' => 85,
    ])
        ->assertCreated()
        ->assertJsonPath('data.is_available', true)
        ->assertJsonPath('data.category', 'Desserts');

    $id = $response->json('data.id');

    $this->putJson(route('api.v1.admin.menu-items.update', $id), [
        'category_id' => $category->id,
        'name' => 'Halo-Halo Special',
        'price' => 95,
        'is_available' => false,
    ])
        ->assertOk()
        ->assertJsonPath('data.price', 95)
        ->assertJsonPath('data.is_available', false);
});

test('staff cannot delete menu items through the api', function () {
    Sanctum::actingAs(User::factory()->staff()->create());
    $item = MenuItem::factory()->create();

    $this->deleteJson(route('api.v1.admin.menu-items.destroy', $item))->assertForbidden();

    $this->assertModelExists($item);
});

test('an admin can delete an unused menu item through the api', function () {
    Sanctum::actingAs(User::factory()->admin()->create());
    $item = MenuItem::factory()->create();

    $this->deleteJson(route('api.v1.admin.menu-items.destroy', $item))->assertNoContent();

    $this->assertModelMissing($item);
});

test('an admin cannot delete a menu item that is in past orders through the api', function () {
    Sanctum::actingAs(User::factory()->admin()->create());
    $item = MenuItem::factory()->create();
    Order::factory()->create()->orderItems()->create([
        'menu_item_id' => $item->id,
        'quantity' => 1,
        'sub_total' => $item->price,
    ]);

    $this->deleteJson(route('api.v1.admin.menu-items.destroy', $item))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('menu_item');
});

test('customers cannot manage menu items through the api', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson(route('api.v1.admin.menu-items.store'), [])->assertForbidden();
});
