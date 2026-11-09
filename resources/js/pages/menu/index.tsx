import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { store as addToCart } from '@/actions/App/Http/Controllers/CartController';
import { index } from '@/actions/App/Http/Controllers/MenuController';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';

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

    const nonEmpty = categories.filter(
        (category) => category.menu_items.length > 0,
    );
    const shown =
        selected === 'all'
            ? nonEmpty
            : nonEmpty.filter((category) => category.id === selected);
    const title = selected === 'all' ? 'Menu' : (shown[0]?.name ?? 'Menu');

    const tabClass = (active: boolean) =>
        active
            ? 'rounded-full border border-ink bg-brown px-4 py-1.5 font-display text-sm text-white'
            : 'rounded-full border border-gold bg-cream px-4 py-1.5 font-display text-sm text-gold hover:bg-beige';

    return (
        <AppLayout>
            <Head title="Menu" />
            <PageHeader title={title} backHref={home()} />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setSelected('all')}
                        className={tabClass(selected === 'all')}
                    >
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

                <Form {...index.form()} className="flex gap-2">
                    <input
                        name="search"
                        defaultValue={search}
                        placeholder="Search food..."
                        className="rounded-full border border-gold bg-cream px-4 py-2 font-display text-sm focus:border-brown focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="btn-pill px-4 py-2 text-sm"
                    >
                        Search
                    </button>
                </Form>
            </div>

            {shown.length === 0 && (
                <p className="text-center font-display text-gold">
                    No food found for "{search}".
                </p>
            )}

            {shown.map((category) => (
                <section key={category.id} className="mb-12">
                    {selected === 'all' && (
                        <h2 className="mb-6 text-center font-display text-2xl text-gold">
                            {category.name}
                        </h2>
                    )}

                    <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {category.menu_items.map((item) => (
                            <div
                                key={item.id}
                                className="mx-auto flex w-full max-w-60 flex-col items-center"
                            >
                                <div className="mb-6 w-full rounded-2xl bg-cream p-5 shadow-[0_4px_12px_rgb(0_0_0/0.12)]">
                                    {item.photo_url ? (
                                        <img
                                            src={item.photo_url}
                                            alt={item.name}
                                            className="aspect-square w-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-beige font-display text-sm text-gold">
                                            No photo
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`w-full rounded-full border border-ink px-4 py-1.5 text-center font-display leading-tight text-white shadow ${item.is_available ? 'bg-brown' : 'bg-gray-400'}`}
                                >
                                    <p className="capitalize">{item.name}</p>
                                    <p>₱ {item.price}</p>
                                </div>

                                {item.is_available ? (
                                    <Link
                                        href={addToCart(item.id)}
                                        as="button"
                                        preserveScroll
                                        className="mt-2 btn-pill-light px-4 py-1 text-sm"
                                    >
                                        + Add to cart
                                    </Link>
                                ) : (
                                    <span className="mt-2 font-display text-sm text-gray-500">
                                        Sold out
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </AppLayout>
    );
}
