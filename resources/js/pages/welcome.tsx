import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import AppLayout from '@/layouts/app-layout';

type FeaturedItem = {
    id: number;
    name: string;
    price: string;
    photo_url: string | null;
    category: { name: string };
};

export default function Welcome({ featured }: { featured: FeaturedItem[] }) {
    const [slide, setSlide] = useState(0);
    const current = featured[slide];

    useEffect(() => {
        if (featured.length < 2) {
            return;
        }

        const timer = setInterval(() => setSlide((s) => (s + 1) % featured.length), 5000);

        return () => clearInterval(timer);
    }, [featured.length]);

    const go = (step: number) => setSlide((s) => (s + step + featured.length) % featured.length);

    return (
        <AppLayout>
            <Head title="Home" />

            <section className="grid items-center gap-10 py-6 md:grid-cols-2">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold sm:text-5xl">It’s all about taste.</h1>
                    <p className="mb-8 text-2xl">
                        Fresh Ingredients,
                        <br />
                        Unforgettable Flavors.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href={menuIndex()} className="btn-pill px-6 py-3 text-lg">
                            Discover the Menu
                        </Link>
                        <Link href={menuIndex()} className="btn-pill px-6 py-3 text-lg">
                            Order Now
                        </Link>
                    </div>
                </div>

                {current && (
                    <div>
                        <div className="relative h-72 overflow-hidden rounded-2xl bg-beige shadow-lg">
                            {current.photo_url ? (
                                <img src={current.photo_url} alt={current.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center font-display text-gold">
                                    {current.category.name}
                                </div>
                            )}
                            <span className="absolute top-3 right-3 rounded-full bg-brown px-3 py-1 font-display text-xs text-white">
                                Featured
                            </span>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center text-white">
                                <p className="font-display text-xl capitalize">{current.name}</p>
                                <p className="text-sm">
                                    {current.category.name} · ₱{current.price}
                                </p>
                            </div>
                        </div>

                        {featured.length > 1 && (
                            <div className="mt-4 flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label="Previous"
                                    className="h-8 w-8 rounded-full bg-brown text-white hover:bg-brown-dark"
                                >
                                    ‹
                                </button>
                                {featured.map((item, i) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSlide(i)}
                                        aria-label={`Show ${item.name}`}
                                        className={`h-2.5 w-2.5 rounded-full border border-brown ${i === slide ? 'bg-brown' : 'bg-transparent'}`}
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label="Next"
                                    className="h-8 w-8 rounded-full bg-brown text-white hover:bg-brown-dark"
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
