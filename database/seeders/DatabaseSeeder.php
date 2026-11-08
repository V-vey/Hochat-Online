<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\MenuItem;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Administrator
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@hochat.test',
            'role' => 'Administrator',
        ]);

        // Staff
        User::factory()->create([
            'name' => 'Staff',
            'email' => 'staff@hochat.test',
            'role' => 'Staff',
        ]);

        // Customer (role defaults to 'User')
        User::factory()->create([
            'name' => 'Customer',
            'email' => 'user@hochat.test',
        ]);

        $riceMeals = Category::create(['name' => 'Rice Meals']);
        MenuItem::factory()->count(5)->create(['category_id' => $riceMeals->id]);

        $wings = Category::create(['name' => 'Wings']);
        MenuItem::factory()->count(5)->create(['category_id' => $wings->id]);

        $pasta = Category::create(['name' => 'Pasta']);
        MenuItem::factory()->count(5)->create(['category_id' => $pasta->id]);

        $drinks = Category::create(['name' => 'Drinks']);
        MenuItem::factory()->count(5)->create(['category_id' => $drinks->id]);

        $desserts = Category::create(['name' => 'Desserts']);
        MenuItem::factory()->count(5)->create(['category_id' => $desserts->id]);
        
    }
}
