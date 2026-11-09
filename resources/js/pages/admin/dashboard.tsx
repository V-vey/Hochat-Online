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
            <h1 className="mb-6 text-3xl font-bold">Staff Dashboard</h1>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Orders to handle</h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {activeStatuses.map(({ status, color }) => (
                    <Link
                        key={status}
                        href={ordersIndex({ query: { status } })}
                        className={`rounded-xl border-l-4 bg-white p-5 shadow-sm hover:ring-2 hover:ring-orange-300 ${color}`}
                    >
                        <p className="text-sm text-gray-500">{status}</p>
                        <p className="text-3xl font-bold">{orderCounts[status] ?? 0}</p>
                    </Link>
                ))}
            </div>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Overview</h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Orders today</p>
                    <p className="text-3xl font-bold">{ordersToday}</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Menu items</p>
                    <p className="text-3xl font-bold">{menuItemCount}</p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Sold out</p>
                    <p className="text-3xl font-bold">{soldOutCount}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Link
                    href={ordersIndex()}
                    className="rounded-md bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                >
                    Manage Orders
                </Link>
                <Link
                    href={menuIndex()}
                    className="rounded-md border border-orange-600 px-5 py-2.5 font-semibold text-orange-700 hover:bg-orange-50"
                >
                    Manage Menu
                </Link>
            </div>
        </AppLayout>
    );
}
