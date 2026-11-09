import { Head, Link } from '@inertiajs/react';
import { store as addToCart } from '@/actions/App/Http/Controllers/CartController';

type MenuItem = {
    id: number;
    name: string;
    price: string;
    photo_url: string | null;
    is_available: boolean;
};

type Category = {
    id: number;
    name: string;
    menu_items: MenuItem[];
};

export default function MenuIndex({ categories }: { categories: Category[] }) {
    return (
        <>
            <Head title="Menu" />
            <h1>Menu</h1>
            {categories.map((category) => (
                <section key={category.id}>
                    <h2>{category.name}</h2>

                    {category.menu_items.map((item) => (
                        <div key={item.id}>
                            <p>{item.name} — ₱{item.price}</p>

                            {item.is_available ? (
                            <Link href={addToCart(item.id)} as="button" preserveScroll>
                                Add to cart
                            </Link>
                            ) : (
                                <span>Sold out</span>
                            )}
                            
                        </div>
                        
                    ))}
                    
                </section>
            ))}
            
        </>
    );
}