import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes/admin';
import { create as loginPage } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { create as registerPage } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import AppLayout from '@/layouts/app-layout';

export default function Welcome() {
    const { auth } = usePage().props;
    const isStaff = auth.user?.role === 'Staff' || auth.user?.role === 'Administrator';

    return (
        <AppLayout>
            <Head title="Welcome" />

            <section className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
                    Hungry? <span className="text-orange-600">Order from Hochat.</span>
                </h1>
                <p className="mx-auto mb-8 max-w-xl text-gray-600">
                    Browse our menu, add your favorites to the cart, and choose dine-in or delivery. Pay cash on
                    delivery or at pickup.
                </p>

                {auth.user ? (
                    <div className="flex flex-wrap justify-center gap-3">
                        <p className="w-full text-sm text-gray-500">Welcome back, {auth.user.name}!</p>
                        <Link
                            href={menuIndex()}
                            className="rounded-md bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
                        >
                            See the menu
                        </Link>
                        {isStaff && (
                            <Link
                                href={dashboard()}
                                className="rounded-md border border-orange-600 px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50"
                            >
                                Staff Dashboard
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href={registerPage()}
                            className="rounded-md bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
                        >
                            Create an account
                        </Link>
                        <Link
                            href={loginPage()}
                            className="rounded-md border border-orange-600 px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50"
                        >
                            Log in
                        </Link>
                    </div>
                )}
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                    ['Browse the menu', 'Rice meals, wings, pasta, drinks and desserts, all in one place.'],
                    ['Dine-in or delivery', 'Eat here or have it brought to your door. Pre-order for later too.'],
                    ['Pay on delivery', 'No card needed. Pay cash on delivery or when you pick up.'],
                ].map(([title, text]) => (
                    <div key={title} className="rounded-xl bg-white p-5 shadow-sm">
                        <h2 className="mb-1 font-semibold text-orange-700">{title}</h2>
                        <p className="text-sm text-gray-600">{text}</p>
                    </div>
                ))}
            </section>
        </AppLayout>
    );
}
