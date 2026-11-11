<?php

use App\Enums\Role;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;

test('the seeder loads the real Hochat menu and the three sample accounts', function () {
    $this->seed(DatabaseSeeder::class);

    expect(Category::count())->toBe(16)
        ->and(MenuItem::count())->toBe(85)
        ->and(MenuItem::where('is_available', false)->count())->toBe(0);

    $photos = MenuItem::whereNotNull('photo_url')->pluck('photo_url');

    expect($photos)->toHaveCount(27);
    $photos->each(fn (string $url) => expect(public_path($url))->toBeFile());

    expect(MenuItem::where('name', 'Hochat Carbonara')->first()->price)->toBe('149.00')
        ->and(MenuItem::where('name', 'Leche Flan Cheesecake')->first()->price)->toBe('1159.00');

    expect(User::where('email', 'admin@hochat.test')->first()->role)->toBe(Role::Administrator)
        ->and(User::where('email', 'staff@hochat.test')->first()->role)->toBe(Role::Staff)
        ->and(User::where('email', 'user@hochat.test')->first()->address)->toContain('Gerona');
});
