import { Head, Link, usePage } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/OrderController';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';

type OrderItem = {
    id: number;
    quantity: number;
    menu_item: { name: string };
};

type Order = {
    id: number;
    order_type: string;
    status: string;
    total_amount: string;
    scheduled_time: string | null;
    created_at: string;
    user: { name: string; phone: string; address: string | null };
    order_items: OrderItem[];
};

type Props = {
    orders: Order[];
    counts: Record<string, number>;
    status: string | null;
    from: string | null;
    to: string | null;
};

const nextStatus: Record<string, string> = {
    Pending: 'Preparing',
    Preparing: 'Ready',
    Ready: 'Completed',
};

const statuses = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

export default function AdminOrdersIndex({
    orders,
    counts,
    status,
    from,
    to,
}: Props) {
    const { errors } = usePage().props;

    /** Keep the date range (if any) when switching status tabs. */
    const dates = { ...(from ? { from } : {}), ...(to ? { to } : {}) };
    const hasDates = from !== null || to !== null;
    const period =
        from === to ? from : `${from ?? 'the start'} to ${to ?? 'today'}`;

    const tabClass = (active: boolean) =>
        active
            ? 'rounded-full bg-brown px-4 py-1.5 text-sm font-medium text-white'
            : 'rounded-full bg-beige px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-beige';

    return (
        <AppLayout>
            <Head title="Manage Orders" />
            <h1 className="mb-6 font-display text-4xl">Manage Orders</h1>

            {hasDates && (
                <p className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-beige px-4 py-3 font-display text-sm">
                    Showing orders placed {from === to ? 'on' : 'from'} {period}
                    <Link
                        href={index({ query: status ? { status } : {} })}
                        className="btn-pill-light px-3 py-1 text-xs"
                    >
                        Show all dates
                    </Link>
                </p>
            )}

            <div className="mb-6 flex flex-wrap gap-2">
                <Link
                    href={index({ query: dates })}
                    className={tabClass(status === null)}
                >
                    All
                </Link>
                {statuses.map((s) => (
                    <Link
                        key={s}
                        href={index({ query: { ...dates, status: s } })}
                        className={tabClass(status === s)}
                    >
                        {s} ({counts[s] ?? 0})
                    </Link>
                ))}
            </div>

            {errors.status && (
                <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                    {errors.status}
                </p>
            )}

            {orders.length === 0 ? (
                <div className="rounded-xl bg-beige p-10 text-center text-gray-500 shadow-sm">
                    No orders here.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex flex-col rounded-xl bg-beige p-5 shadow-sm"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    Order #{order.id}
                                </h2>
                                <StatusBadge status={order.status} />
                            </div>

                            <div className="mb-3 text-sm text-gray-600">
                                <p className="font-medium text-gray-800">
                                    {order.user.name} · {order.user.phone}
                                </p>
                                <p>
                                    {order.order_type}
                                    {order.order_type === 'Delivery' &&
                                        ` to ${order.user.address}`}
                                </p>
                                <p>
                                    Ordered{' '}
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleString()}
                                </p>
                                {order.scheduled_time && (
                                    <p className="font-medium text-gold">
                                        Pre-order for{' '}
                                        {new Date(
                                            order.scheduled_time,
                                        ).toLocaleString()}
                                    </p>
                                )}
                            </div>

                            <ul className="mb-3 border-t border-dashed pt-3 text-sm">
                                {order.order_items.map((item) => (
                                    <li key={item.id} className="capitalize">
                                        {item.quantity} × {item.menu_item.name}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto flex items-center justify-between border-t pt-3">
                                <p className="font-bold text-gold">
                                    ₱{order.total_amount}
                                </p>

                                {nextStatus[order.status] && (
                                    <Link
                                        href={update(order.id)}
                                        as="button"
                                        data={{
                                            status: nextStatus[order.status],
                                        }}
                                        preserveScroll
                                        className="rounded-full border border-ink bg-brown px-4 py-2 font-display text-sm font-medium text-white hover:bg-brown-dark"
                                    >
                                        Mark as {nextStatus[order.status]}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
