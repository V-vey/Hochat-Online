<?php

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the staff dashboard shows order and menu counts', function () {
    Order::factory()->count(2)->create();
    Order::factory()->create(['status' => 'Preparing']);
    MenuItem::factory()->create(['is_available' => false]);

    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('orderCounts.Pending', 2)
            ->where('orderCounts.Preparing', 1)
            ->where('ordersToday', 3)
            ->where('soldOutCount', 1)
        );
});

test('staff can move an order to the next status', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->patch(route('admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertRedirect();

    expect($order->fresh()->status)->toBe('Preparing');
});

test('customers cannot change an order status', function () {
    $order = Order::factory()->create();

    $this->actingAs($order->user)
        ->patch(route('admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertForbidden();
});

test('a finished order cannot be changed', function () {
    $order = Order::factory()->create(['status' => 'Completed']);

    $this->actingAs(User::factory()->staff()->create())
        ->patch(route('admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertSessionHasErrors('status');

    expect($order->fresh()->status)->toBe('Completed');
});

test('staff can add a menu item with a photo', function () {
    Storage::fake('public');
    $category = Category::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->post(route('admin.menu-items.store'), [
            'category_id' => $category->id,
            'name' => 'Halo-Halo',
            'price' => 85,
            'is_available' => '1',
            'photo' => UploadedFile::fake()->image('halo-halo.png'),
        ])
        ->assertRedirect(route('admin.menu-items.index'));

    $item = MenuItem::where('name', 'Halo-Halo')->first();

    expect($item->is_available)->toBeTrue();
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $item->photo_url));
});

test('staff cannot delete a menu item', function () {
    $item = MenuItem::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->delete(route('admin.menu-items.destroy', $item))
        ->assertForbidden();

    $this->assertModelExists($item);
});

test('an admin can delete a menu item that was never ordered', function () {
    $item = MenuItem::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.menu-items.destroy', $item))
        ->assertRedirect();

    $this->assertModelMissing($item);
});

test('an admin cannot delete a menu item that is in past orders', function () {
    $item = MenuItem::factory()->create();
    $order = Order::factory()->create();
    $order->orderItems()->create([
        'menu_item_id' => $item->id,
        'quantity' => 1,
        'sub_total' => $item->price,
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.menu-items.destroy', $item))
        ->assertSessionHasErrors('delete');

    $this->assertModelExists($item);
});
