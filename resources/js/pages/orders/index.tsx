import { Head, Link, usePoll } from '@inertiajs/react';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { show } from '@/actions/App/Http/Controllers/OrderController';
import type { OrderDetails } from '@/components/order-card';
import OrderCard from '@/components/order-card';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';

export default function OrdersIndex({ orders }: { orders: OrderDetails[] }) {
    // Show status changes from staff without reloading.
    usePoll(10_000);

    return (
        <AppLayout>
            <Head title="Transactions" />
            <PageHeader title="Transactions" backHref={home()} />

            <div className="mx-auto max-w-3xl rounded-2xl bg-beige p-5 shadow-md">
                <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                    Past Orders
                </h2>

                {orders.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="mb-6 font-display text-gold">
                            You have no orders yet.
                        </p>
                        <Link href={menuIndex()} className="btn-pill">
                            Order something
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order}>
                                <div className="mt-3 text-right">
                                    <Link
                                        href={show(order.id)}
                                        className="btn-pill-light px-4 py-1 text-sm"
                                    >
                                        View receipt
                                    </Link>
                                </div>
                            </OrderCard>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
