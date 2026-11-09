<?php

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the order status report counts today\'s orders by status', function () {
    Order::factory()->count(2)->create();
    Order::factory()->create(['status' => 'Preparing']);
    Order::factory()->create(['status' => 'Completed', 'total_amount' => 150]);
    MenuItem::factory()->create(['is_available' => false]);

    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('statusCounts.Pending', 2)
            ->where('statusCounts.Preparing', 1)
            ->where('statusCounts.Ready', 0)
            ->where('statusCounts.Completed', 1)
            ->where('statusCounts.Cancelled', 0)
            ->where('totalOrders', 4)
            ->where('completedSales', '150.00')
            ->where('soldOutCount', 1)
            ->has('orders', 4)
        );
});

test('the order status report only includes orders in the chosen dates', function () {
    Order::factory()->create(['created_at' => now()->subDays(10)]);
    Order::factory()->create(['created_at' => now()->subDays(2)]);
    Order::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard', [
            'from' => now()->subDays(3)->toDateString(),
            'to' => now()->toDateString(),
        ]))
        ->assertInertia(fn (Assert $page) => $page
            ->where('totalOrders', 2)
            ->has('orders', 2)
        );
});

test('the order status report rejects an end date before the start date', function () {
    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard', ['from' => '2026-11-10', 'to' => '2026-11-01']))
        ->assertSessionHasErrors('to');
});

test('the order status report only lists the latest 50 orders but counts them all', function () {
    Order::factory()->count(52)->create();

    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('totalOrders', 52)
            ->has('orders', 50)
        );
});

test('manage orders can be filtered by status and date range', function () {
    Order::factory()->create(['created_at' => now()->subDays(10)]);
    Order::factory()->create(['created_at' => now()->subDays(1)]);
    Order::factory()->create(['status' => 'Completed']);

    $this->actingAs(User::factory()->staff()->create())
        ->get(route('admin.orders.index', [
            'status' => 'Pending',
            'from' => now()->subDays(3)->toDateString(),
            'to' => now()->toDateString(),
        ]))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/orders/index')
            ->has('orders', 1)
            ->where('counts.Pending', 1)
            ->where('counts.Completed', 1)
            ->where('from', now()->subDays(3)->toDateString())
        );
});

test('customers cannot see the order status report', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});

test('staff can move an order to the next status', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->staff()->create())
        ->patch(route('admin.orders.update', $order), ['status' => 'Preparing'])
        ->assertRedirect();

    expect($order->fresh()->status)->toBe('Preparing');
});

test('staff can cancel an order that is not finished', function () {
    $order = Order::factory()->create(['status' => 'Preparing']);

    $this->actingAs(User::factory()->staff()->create())
        ->patch(route('admin.orders.update', $order), ['status' => 'Cancelled'])
        ->assertSessionHasNoErrors();

    expect($order->fresh()->status)->toBe('Cancelled');
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
