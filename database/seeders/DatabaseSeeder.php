<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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

        // Customer (role defaults to 'User'), with a Gerona address so Delivery works in the demo
        User::factory()->create([
            'name' => 'Customer',
            'email' => 'user@hochat.test',
            'address' => 'Poblacion 1, Gerona, Tarlac',
        ]);

        $this->call(MenuSeeder::class);
    }
}
