import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { home } from '@/routes';

/**
 * Plain cream page with a beige card and the logo on top, used by Login and Sign up (mockup Figure 5).
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 text-ink">
            <div className="w-full max-w-2xl rounded-3xl bg-beige px-6 py-10 shadow-sm sm:px-16">
                <Link href={home()} className="mx-auto mb-6 block w-fit">
                    <img
                        src="/images/hochat-logo.png"
                        alt="Hochat Café"
                        className="h-36 w-auto"
                    />
                </Link>
                {children}
            </div>
        </div>
    );
}
