import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import {
    create as loginPage,
    destroy as logout,
} from '@/actions/App/Http/Controllers/Auth/LoginController';
import { index as cartIndex } from '@/actions/App/Http/Controllers/CartController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { index as transactions } from '@/actions/App/Http/Controllers/OrderController';
import { edit as profile } from '@/actions/App/Http/Controllers/ProfileController';
import { about, contact, home } from '@/routes';
import { dashboard } from '@/routes/admin';

const navLink =
    'font-display uppercase tracking-wide text-ink hover:text-brown';

export default function AppLayout({ children }: { children: ReactNode }) {
    const { auth, cartCount } = usePage().props;
    const isStaff =
        auth.user?.role === 'Staff' || auth.user?.role === 'Administrator';

    return (
        <div className="flex min-h-screen flex-col bg-cream text-ink">
            <header className="bg-beige">
                <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
                    <Link href={home()} className="shrink-0">
                        <img
                            src="/images/hochat-logo.png"
                            alt="Hochat Café"
                            className="h-20 w-auto sm:h-24"
                        />
                    </Link>

                    <div className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm sm:text-base">
                        <Link href={home()} className={navLink}>
                            Home
                        </Link>
                        <Link href={menuIndex()} className={navLink}>
                            Menu
                        </Link>

                        {auth.user && (
                            <>
                                <Link href={cartIndex()} className={navLink}>
                                    Cart ({cartCount})
                                </Link>
                                <Link href={transactions()} className={navLink}>
                                    Transactions
                                </Link>
                                <Link href={profile()} className={navLink}>
                                    Profile
                                </Link>
                            </>
                        )}

                        <Link href={about()} className={navLink}>
                            About Us
                        </Link>
                        <Link href={contact()} className={navLink}>
                            Contact Us
                        </Link>

                        {isStaff && (
                            <Link href={dashboard()} className={navLink}>
                                Report
                            </Link>
                        )}

                        {auth.user ? (
                            <Link
                                href={logout()}
                                as="button"
                                className={`${navLink} cursor-pointer`}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link href={loginPage()} className={navLink}>
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
                {children}
            </main>

            <footer className="bg-beige py-8">
                <div className="flex justify-center gap-3">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-9 w-9 rounded-md bg-brown p-1.5 text-white"
                            fill="currentColor"
                        >
                            <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8Z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-9 w-9 rounded-md bg-brown p-1.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle
                                cx="17.5"
                                cy="6.5"
                                r="1"
                                fill="currentColor"
                            />
                        </svg>
                    </a>
                </div>
            </footer>
        </div>
    );
}
