<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;

/**
 * The real Hochat Café menu, taken from the café's "HOCHAT CAFE_UPDATED MENU" Google Drive folder
 * (Main Menu board, Grab & Go ₱99, Signature Cakes, Leche Flan, Graham Temptations, Ber Month Favorites).
 *
 * Bulk orders, party trays/bilao, catering and mocktail packages are left out because they are
 * not regular online orders. Photos were cropped from the same posters; replace them with real
 * food photos later through Manage Menu.
 */
class MenuSeeder extends Seeder
{
    /**
     * Category name => [item name => price in pesos].
     *
     * @var array<string, array<string, int>>
     */
    private const MENU = [
        'Rice Bowls' => [
            'Creamy Hungarian Rice Bowl' => 149,
            'Bacon Rice Bowl' => 139,
            'Tapa Rice Bowl' => 129,
            'Sisig Rice Bowl' => 109,
            'Tocino Rice Bowl' => 109,
            'Korean Strips Rice Bowl' => 109,
            'Thai Strips Rice Bowl' => 109,
            'Basil Chicken Rice Bowl' => 109,
        ],
        'Grab & Go (₱99)' => [
            'Grab & Go Sisig Rice Bowl' => 99,
            'Grab & Go Korean Strips Rice Bowl' => 99,
            'Grab & Go Tocino Rice Bowl' => 99,
            'Grab & Go Thai Strips Rice Bowl' => 99,
            'Grab & Go Honey Garlic Teriyaki Katsu' => 99,
            'Grab & Go Roasted Pepper Katsu' => 99,
            'Grab & Go Classic Katsu' => 99,
        ],
        'Chicken Katsu' => [
            'Ala King Katsu' => 199,
            'Curry Katsu' => 199,
            'Katsu Kimchi' => 199,
            'Honey Garlic Teriyaki Katsu' => 189,
            'Spiced Honey Katsu' => 189,
            'Roasted Pepper Katsu' => 189,
            'Classic Katsu' => 189,
        ],
        'Chicken Meals' => [
            'Salted Honey Glazed Chicken Meal' => 199,
            'Spicy Bulgogi Chicken Meal' => 199,
            'Hochat Super Meal' => 229,
        ],
        'Chicken Wings' => [
            'Chicken Wings 3 pcs with Rice' => 159,
            'Chicken Wings 6 pcs' => 299,
            'Chicken Wings 9 pcs' => 469,
        ],
        'Sulit Treats' => [
            '4 pcs Wings & Fries' => 129,
            '4 pcs Wings & Nachos' => 149,
            '4 pcs Wings & Pasta' => 149,
        ],
        'Signature Bowls' => [
            'Kimchi Fried Rice' => 119,
            'Korean Bowl' => 129,
        ],
        'Pasta' => [
            'Hochat Carbonara' => 149,
            'Creamy Tuna Pasta' => 149,
            'Chicken Aglio Olio' => 149,
            'Bacon Hollandaise Pasta' => 169,
            'Pasta Ala King' => 229,
        ],
        'Pancit Platters' => [
            'Pancit Guisado (good for 2-3)' => 289,
            'Pancit Sisig (good for 2-3)' => 289,
            'Pancit Tapa (good for 2-3)' => 299,
        ],
        'Chicken Katsu Burgers' => [
            'Classic Burger' => 179,
            'Spicy Burger' => 179,
            'Ranch Burger' => 179,
            'Korean Burger' => 179,
            'Creamy Bacon Burger' => 199,
        ],
        'Fries & Nachos' => [
            'Double Cheese Fries' => 99,
            'Sour Cream Fries' => 99,
            'Roast Beef Fries' => 99,
            'Flame Grilled BBQ Fries' => 99,
            'Hochat Nachos' => 139,
            'Nacho Fries' => 139,
            'Combo Nachos' => 169,
        ],
        'Desserts' => [
            'Graham De Leche (good for 2)' => 149,
            'Biscoff Graham (good for 2)' => 159,
            'Buko Pandan Salad' => 129,
            'Fruit Salad' => 139,
        ],
        'Signature Cakes (pre-order)' => [
            'Biscoff Graham Cake' => 799,
            'Graham De Leche Cake' => 699,
            'Blueberry Graham Cake' => 699,
            'Creamy Mango Cake' => 699,
            'Tiramisu Cake' => 699,
            'Leche Flan Regular' => 899,
            'Leche Flan Special' => 949,
            'Leche Flan Cheesecake' => 1159,
        ],
        'Coolers' => [
            'Hochat Red Iced Tea' => 69,
            'Peach Iced Tea' => 69,
            'Lemonade (Blue, Pink or Cucumber)' => 75,
            'Milky Melon' => 69,
            'Dark Mocha' => 69,
        ],
        'Iced Coffee' => [
            'Mochaccino 12oz' => 79,
            'Mochaccino 16oz' => 99,
            'French Latte 12oz' => 79,
            'French Latte 16oz' => 99,
            'Caramel Mac 12oz' => 79,
            'Caramel Mac 16oz' => 99,
            'Tsoknut 12oz' => 79,
            'Tsoknut 16oz' => 99,
            'Hazelnut 12oz' => 79,
            'Hazelnut 16oz' => 99,
        ],
        'Rice & Add-ons' => [
            'Plain Rice' => 30,
            'Garlic Rice' => 35,
            'Add-on Fries' => 30,
            'Add-on Nachos' => 30,
            'Add-on Drink' => 40,
        ],
    ];

    /**
     * Item name => photo in public/images/menu, cropped from the café's posters.
     * Items without a photo show "No photo" until one is uploaded in Manage Menu.
     *
     * @var array<string, string>
     */
    private const PHOTOS = [
        'Sisig Rice Bowl' => 'sisig-rice-bowl.jpg',
        'Grab & Go Sisig Rice Bowl' => 'sisig-rice-bowl.jpg',
        'Korean Strips Rice Bowl' => 'korean-strips-rice-bowl.jpg',
        'Grab & Go Korean Strips Rice Bowl' => 'korean-strips-rice-bowl.jpg',
        'Tocino Rice Bowl' => 'tocino-rice-bowl.jpg',
        'Grab & Go Tocino Rice Bowl' => 'tocino-rice-bowl.jpg',
        'Thai Strips Rice Bowl' => 'thai-strips-rice-bowl.jpg',
        'Grab & Go Thai Strips Rice Bowl' => 'thai-strips-rice-bowl.jpg',
        'Honey Garlic Teriyaki Katsu' => 'honey-garlic-teriyaki-katsu.jpg',
        'Grab & Go Honey Garlic Teriyaki Katsu' => 'honey-garlic-teriyaki-katsu.jpg',
        'Roasted Pepper Katsu' => 'roasted-pepper-katsu.jpg',
        'Grab & Go Roasted Pepper Katsu' => 'roasted-pepper-katsu.jpg',
        'Classic Katsu' => 'classic-katsu.jpg',
        'Grab & Go Classic Katsu' => 'classic-katsu.jpg',
        'Classic Burger' => 'classic-burger.jpg',
        'Pancit Guisado (good for 2-3)' => 'pancit-guisado.jpg',
        'Biscoff Graham (good for 2)' => 'biscoff-graham.jpg',
        'Graham De Leche (good for 2)' => 'graham-de-leche.jpg',
        'Buko Pandan Salad' => 'buko-pandan-salad.jpg',
        'Fruit Salad' => 'fruit-salad.jpg',
        'Biscoff Graham Cake' => 'biscoff-graham-cake.jpg',
        'Graham De Leche Cake' => 'graham-de-leche-cake.jpg',
        'Blueberry Graham Cake' => 'blueberry-graham-cake.jpg',
        'Creamy Mango Cake' => 'creamy-mango-cake.jpg',
        'Tiramisu Cake' => 'tiramisu-cake.jpg',
        'Leche Flan Regular' => 'leche-flan-regular.jpg',
        'Leche Flan Special' => 'leche-flan-special.jpg',
    ];

    /**
     * Create every category and its menu items.
     */
    public function run(): void
    {
        foreach (self::MENU as $categoryName => $items) {
            $category = Category::create(['name' => $categoryName]);

            foreach ($items as $itemName => $price) {
                MenuItem::create([
                    'category_id' => $category->id,
                    'name' => $itemName,
                    'price' => $price,
                    'photo_url' => isset(self::PHOTOS[$itemName]) ? '/images/menu/'.self::PHOTOS[$itemName] : null,
                    'is_available' => true,
                ]);
            }
        }
    }
}
