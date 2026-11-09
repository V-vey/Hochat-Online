import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { store as addToCart } from '@/actions/App/Http/Controllers/CartController';
import { index } from '@/actions/App/Http/Controllers/MenuController';
import AppLayout from '@/layouts/app-layout';

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

type Props = {
    categories: Category[];
    search: string;
};

export default function MenuIndex({ categories, search }: Props) {
    const [selected, setSelected] = useState<number | 'all'>('all');

    const nonEmpty = categories.filter((category) => category.menu_items.length > 0);
    const shown = selected === 'all' ? nonEmpty : nonEmpty.filter((category) => category.id === selected);

    const tabClass = (active: boolean) =>
        active
            ? 'rounded-full bg-orange-600 px-4 py-1.5 text-sm font-medium text-white'
            : 'rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-orange-100';

    return (
        <AppLayout>
            <Head title="Menu" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Menu</h1>

                <Form {...index.form()} className="flex gap-2">
                    <input
                        name="search"
                        defaultValue={search}
                        placeholder="Search food..."
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                    >
                        Search
                    </button>
                </Form>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                <button type="button" onClick={() => setSelected('all')} className={tabClass(selected === 'all')}>
                    All
                </button>
                {nonEmpty.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelected(category.id)}
                        className={tabClass(selected === category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {shown.length === 0 && <p className="text-gray-500">No food found for "{search}".</p>}

            {shown.map((category) => (
                <section key={category.id} className="mb-10">
                    <h2 className="mb-4 text-xl font-semibold">{category.name}</h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {category.menu_items.map((item) => (
                            <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                                {item.photo_url ? (
                                    <img src={item.photo_url} alt={item.name} className="h-40 w-full object-cover" />
                                ) : (
                                    <div className="flex h-40 items-center justify-center bg-orange-100 text-sm text-orange-400">
                                        No photo
                                    </div>
                                )}

                                <div className="flex items-center justify-between gap-2 p-4">
                                    <div>
                                        <p className="font-semibold capitalize">{item.name}</p>
                                        <p className="text-orange-600">₱{item.price}</p>
                                    </div>

                                    {item.is_available ? (
                                        <Link
                                            href={addToCart(item.id)}
                                            as="button"
                                            preserveScroll
                                            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
                                        >
                                            Add to cart
                                        </Link>
                                    ) : (
                                        <span className="rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-500">
                                            Sold out
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </AppLayout>
    );
}