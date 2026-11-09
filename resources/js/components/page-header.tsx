import { Link } from '@inertiajs/react';
import type { RouteDefinition } from '@/wayfinder';

type Props = {
    title: string;
    backHref?: RouteDefinition<'get'>;
    backLabel?: string;
};

/**
 * Centered page title with an optional brown "Back" pill on the right, like the mockups.
 */
export default function PageHeader({ title, backHref, backLabel = 'Back' }: Props) {
    return (
        <div className="relative mb-8 flex flex-wrap items-center justify-center gap-4">
            <h1 className="font-display text-4xl drop-shadow-sm">{title}</h1>
            {backHref && (
                <Link href={backHref} className="btn-pill sm:absolute sm:right-0">
                    {backLabel}
                </Link>
            )}
        </div>
    );
}
