import { Head, Link } from '@inertiajs/react';
import { cancel, index } from '@/actions/App/Http/Controllers/OrderController';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';

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

type Props = {
    order: Order;
    canCancel: boolean;
};

export default function OrdersShow({ order, canCancel }: Props) {
    return (
        <AppLayout>
            <Head title={`Order #${order.id}`} />

            <Link href={index()} className="mb-4 inline-block text-sm text-orange-700 hover:underline">
                ← Back to my orders
            </Link>

            <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                    <StatusBadge status={order.status} />
                </div>

                <dl className="mb-6 grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-gray-500">Date</dt>
                    <dd className="text-right">{new Date(order.created_at).toLocaleString()}</dd>

                    <dt className="text-gray-500">Type</dt>
                    <dd className="text-right">{order.order_type}</dd>

                    {order.scheduled_time && (
                        <>
                            <dt className="text-gray-500">Pre-order for</dt>
                            <dd className="text-right">{new Date(order.scheduled_time).toLocaleString()}</dd>
                        </>
                    )}

                    <dt className="text-gray-500">Payment</dt>
                    <dd className="text-right">Cash on Delivery / Pickup</dd>
                </dl>

                <div className="border-t border-dashed pt-4">
                    {order.order_items.map((line) => (
                        <div key={line.id} className="flex justify-between py-1 text-sm">
                            <span className="capitalize">
                                {line.quantity} × {line.menu_item.name}
                            </span>
                            <span>₱{line.sub_total}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-dashed pt-4 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">₱{order.total_amount}</span>
                </div>

                {canCancel && (
                    <div className="mt-6">
                        <Link
                            href={cancel(order.id)}
                            as="button"
                            onBefore={() => confirm('Cancel this order?')}
                            className="w-full rounded-md border border-red-300 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Cancel order
                        </Link>
                        <p className="mt-2 text-center text-xs text-gray-500">
                            You can cancel within 1 minute while the order is Pending.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}