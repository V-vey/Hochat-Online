import { Head, Link } from '@inertiajs/react';
import { index as menuIndex } from '@/actions/App/Http/Controllers/Admin/MenuItemController';
import { index as ordersIndex } from '@/actions/App/Http/Controllers/Admin/OrderController';
import AppLayout from '@/layouts/app-layout';

type Props = {
    orderCounts: Record<string, number>;
    ordersToday: number;
    menuItemCount: number;
    soldOutCount: number;
};

const activeStatuses = [
    { status: 'Pending', color: 'border-yellow-400' },
    { status: 'Preparing', color: 'border-blue-400' },
    { status: 'Ready', color: 'border-purple-400' },
];

export default function Dashboard({ orderCounts, ordersToday, menuItemCount, soldOutCount }: Props) {
    return (
        <AppLayout>
            <Head title="Staff Dashboard" />
            <h1 className="mb-6 font-display text-4xl">Staff Dashboard</h1>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Orders to handle</h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {activeStatuses.map(({ status, color }) => (
                    <Link
                        key={status}
                        href={ordersIndex({ query: { status } })}
                        className={`rounded-xl border-l-4 bg-beige p-5 shadow-sm hover:ring-2 hover:ring-line ${color}`}
                    >
                        <p className="text-sm text-gray-500">{status}</p>
                        <p className="font-display text-4xl">{orderCounts[status] ?? 0}</p>
                    </Link>
                ))}
            </div>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Overview</h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-beige p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Orders today</p>
                    <p className="font-display text-4xl">{ordersToday}</p>
                </div>
                <div className="rounded-xl bg-beige p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Menu items</p>
                    <p className="font-display text-4xl">{menuItemCount}</p>
                </div>
                <div className="rounded-xl bg-beige p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Sold out</p>
                    <p className="font-display text-4xl">{soldOutCount}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Link
                    href={ordersIndex()}
                    className="rounded-full border border-ink bg-brown font-display px-5 py-2.5 font-semibold text-white hover:bg-brown-dark"
                >
                    Manage Orders
                </Link>
                <Link
                    href={menuIndex()}
                    className="rounded-full border border-brown bg-cream font-display px-5 py-2.5 font-semibold text-gold hover:bg-cream"
                >
                    Manage Menu
                </Link>
            </div>
        </AppLayout>
    );
}
