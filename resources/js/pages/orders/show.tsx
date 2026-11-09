import { Head, Link } from '@inertiajs/react';
import { cancel, index } from '@/actions/App/Http/Controllers/OrderController';

type OrderItem = {
    id: number;
    quantity: number;
    sub_total: string;
    menu_item: {
        name: string;
    };
};

type Order = {
    id: number;
    order_type: string;
    status: string;
    total_amount: string;
    scheduled_time: string | null;
    created_at: string;
    order_items: OrderItem[];
};

export default function OrdersShow({ order, canCancel }: { order: Order; canCancel: boolean }) {
    return (
        <>
            <Head title={`Order #${order.id}`} />
            <h1>Order #{order.id}</h1>

            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
            <p>Type: {order.order_type}</p>
            <p>Status: {order.status}</p>
            {order.scheduled_time && (
                <p>Scheduled for: {new Date(order.scheduled_time).toLocaleString()}</p>
            )}

            <h2>Items</h2>
            {order.order_items.map((line) => (
                <p key={line.id}>
                    {line.menu_item.name} × {line.quantity} — ₱{line.sub_total}
                </p>
            ))}

            <p>Total: ₱{order.total_amount}</p>
            <p>Payment: Cash on Delivery / Pickup</p>

            {canCancel && (
                <Link href={cancel(order.id)} as="button">
                    Cancel order
                </Link>
            )}

            <Link href={index()}>Back to my orders</Link>
        </>
    );
}