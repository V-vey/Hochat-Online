import { Head } from '@inertiajs/react';

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
                            {!item.is_available && <span>Sold out</span>}
                        </div>
                    ))}
                </section>
            ))}
        </>
    );
}