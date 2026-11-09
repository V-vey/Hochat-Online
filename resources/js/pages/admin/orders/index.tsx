import { Head, Link, usePage } from '@inertiajs/react';
import { index, update } from '@/actions/App/Http/Controllers/Admin/OrderController';

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
};

const nextStatus: Record<string, string> = {
    Pending: 'Preparing',
    Preparing: 'Ready',
    Ready: 'Completed',
};

const statuses = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

export default function AdminOrdersIndex({ orders, counts, status }: Props) {
    const { errors } = usePage().props;

    return (
        <>
            <Head title="Manage Orders" />
            <h1>Manage Orders</h1>

            <div>
                <Link href={index()}>All</Link>
                {statuses.map((s) => (
                    <Link key={s} href={index({ query: { status: s } })}>
                        {' '}| {s} ({counts[s] ?? 0})
                    </Link>
                ))}
            </div>
            <p>Showing: {status ?? 'All'}</p>

            {errors.status && <p>{errors.status}</p>}

            {orders.length === 0 ? (
                <p>No orders.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <h3>
                            Order #{order.id} — {order.status}
                        </h3>
                        <p>
                            {order.user.name} ({order.user.phone}) — {order.order_type}
                            {order.order_type === 'Delivery' && ` — ${order.user.address}`}
                        </p>
                        <p>Ordered: {new Date(order.created_at).toLocaleString()}</p>
                        {order.scheduled_time && (
                            <p>Pre-order for: {new Date(order.scheduled_time).toLocaleString()}</p>
                        )}
                        <ul>
                            {order.order_items.map((item) => (
                                <li key={item.id}>
                                    {item.quantity} × {item.menu_item.name}
                                </li>
                            ))}
                        </ul>
                        <p>Total: ₱{order.total_amount}</p>

                        {nextStatus[order.status] && (
                            <Link
                                href={update(order.id)}
                                as="button"
                                data={{ status: nextStatus[order.status] }}
                                preserveScroll
                            >
                                Mark as {nextStatus[order.status]}
                            </Link>
                        )}
                        <hr />
                    </div>
                ))
            )}
        </>
    );
}