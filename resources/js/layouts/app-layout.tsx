import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { index as manageMenu } from '@/actions/App/Http/Controllers/Admin/MenuItemController';
import { index as manageOrders } from '@/actions/App/Http/Controllers/Admin/OrderController';
import { create as loginPage, destroy as logout } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { index as cartIndex } from '@/actions/App/Http/Controllers/CartController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { index as myOrders } from '@/actions/App/Http/Controllers/OrderController';

export default function AppLayout({ children }: { children: ReactNode }) {
    const { auth, cartCount } = usePage().props;
    const isStaff = auth.user?.role === 'Staff' || auth.user?.role === 'Administrator';

    return (
        <div className="min-h-screen bg-orange-50 text-gray-800">
            <header className="bg-orange-600 text-white shadow">
                <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
                    <Link href={menuIndex()} className="text-xl font-bold">
                        Hochat Online
                    </Link>

                    <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                        {auth.user ? (
                            <>
                                <Link href={menuIndex()} className="hover:underline">
                                    Menu
                                </Link>
                                <Link href={cartIndex()} className="hover:underline">
                                    Cart ({cartCount})
                                </Link>
                                <Link href={myOrders()} className="hover:underline">
                                    My Orders
                                </Link>

                                {isStaff && (
                                    <>
                                        <Link href={manageOrders()} className="hover:underline">
                                            Manage Orders
                                        </Link>
                                        <Link href={manageMenu()} className="hover:underline">
                                            Manage Menu
                                        </Link>
                                    </>
                                )}

                                <Link
                                    href={logout()}
                                    as="button"
                                    className="rounded-md bg-white/20 px-3 py-1 hover:bg-white/30"
                                >
                                    Log out
                                </Link>
                            </>
                        ) : (
                            <Link href={loginPage()} className="hover:underline">
                                Log in
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </div>
    );
}