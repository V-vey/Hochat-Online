import { Head, Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/OrderController';

type Order = {
    id: number;
    order_type: string;
    status: string;
    total_amount: string;
    created_at: string;
};

export default function OrdersIndex({ orders }: { orders: Order[] }) {
    return (
        <>
            <Head title="My Orders" />
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <p>
                            Order #{order.id} — {order.order_type} — {order.status} — ₱{order.total_amount}
                        </p>
                        <p>{new Date(order.created_at).toLocaleString()}</p>
                        <Link href={show(order.id)}>View</Link>
                    </div>
                ))
            )}
        </>
    );
}