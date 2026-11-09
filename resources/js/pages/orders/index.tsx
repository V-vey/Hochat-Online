import { Head, Link } from '@inertiajs/react';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { show } from '@/actions/App/Http/Controllers/OrderController';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';

type Order = {
    id: number;
    order_type: string;
    status: string;
    total_amount: string;
    created_at: string;
};

export default function OrdersIndex({ orders }: { orders: Order[] }) {
    return (
        <AppLayout>
            <Head title="My Orders" />
            <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

            {orders.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                    <p className="mb-4 text-gray-500">You have no orders yet.</p>
                    <Link
                        href={menuIndex()}
                        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                    >
                        Order something
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={show(order.id)}
                            className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm hover:ring-2 hover:ring-orange-300"
                        >
                            <div>
                                <p className="font-semibold">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleString()} · {order.order_type}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <StatusBadge status={order.status} />
                                <p className="w-24 text-right font-semibold text-orange-600">₱{order.total_amount}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}