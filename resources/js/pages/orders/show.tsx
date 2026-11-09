import { Head, Link } from '@inertiajs/react';
import { cancel, index } from '@/actions/App/Http/Controllers/OrderController';
import type { OrderDetails } from '@/components/order-card';
import OrderCard from '@/components/order-card';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';

type Props = {
    order: OrderDetails;
    canCancel: boolean;
};

export default function OrdersShow({ order, canCancel }: Props) {
    return (
        <AppLayout>
            <Head title={`Order #${order.id}`} />
            <PageHeader title="Receipt" backHref={index()} />

            <div className="mx-auto max-w-2xl rounded-2xl bg-beige p-5 shadow-md">
                <OrderCard order={order}>
                    <p className="mt-3 text-sm">Payment: Cash on Delivery / Pickup</p>

                    {canCancel && (
                        <div className="mt-5 text-center">
                            <Link
                                href={cancel(order.id)}
                                as="button"
                                onBefore={() => confirm('Cancel this order?')}
                                className="rounded-full border border-red-600 bg-cream px-6 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                                Cancel order
                            </Link>
                            <p className="mt-2 text-xs">You can cancel within 1 minute while the order is Pending.</p>
                        </div>
                    )}
                </OrderCard>
            </div>
        </AppLayout>
    );
}
