import type { ReactNode } from 'react';
import StatusBadge from '@/components/status-badge';

export type OrderLine = {
    id: number;
    quantity: number;
    sub_total: string;
    menu_item: { name: string };
};

export type OrderDetails = {
    id: number;
    order_type: string;
    status: string;
    delivery_fee: string;
    total_amount: string;
    scheduled_time: string | null;
    created_at: string;
    order_items: OrderLine[];
};

/**
 * One order with its items and totals, styled like the "Past Orders" card in the mockup (Figure 7).
 */
export default function OrderCard({
    order,
    children,
}: {
    order: OrderDetails;
    children?: ReactNode;
}) {
    const subtotal = (
        Number(order.total_amount) - Number(order.delivery_fee)
    ).toFixed(2);

    return (
        <div className="rounded-xl border-l-4 border-gold bg-cream p-5 font-display shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-2">
                <h3 className="text-gold">Order #HOCHAT-{order.id}</h3>
                <StatusBadge status={order.status} />
            </div>

            <p className="mt-2 text-xs">
                {new Date(order.created_at).toLocaleString()} ·{' '}
                {order.order_type}
            </p>
            {order.scheduled_time && (
                <p className="text-xs text-gold">
                    Pre-order for{' '}
                    {new Date(order.scheduled_time).toLocaleString()}
                </p>
            )}

            <div className="mt-2">
                {order.order_items.map((line) => (
                    <div
                        key={line.id}
                        className="flex justify-between border-b border-dotted border-line py-1.5 text-sm"
                    >
                        <span className="capitalize">
                            <span className="text-gold">{line.quantity}×</span>{' '}
                            {line.menu_item.name}
                        </span>
                        <span>₱ {line.sub_total}</span>
                    </div>
                ))}
            </div>

            <div className="mt-3 text-sm">
                <div className="flex justify-between border-t border-line py-1.5">
                    <span>Subtotal:</span>
                    <span className="text-gold">₱ {subtotal}</span>
                </div>
                <div className="flex justify-between border-t border-line py-1.5">
                    <span>Delivery Fee:</span>
                    <span className="text-gold">₱ {order.delivery_fee}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-1.5 text-base">
                    <span>Total:</span>
                    <span className="text-gold">₱ {order.total_amount}</span>
                </div>
            </div>

            {children}
        </div>
    );
}
