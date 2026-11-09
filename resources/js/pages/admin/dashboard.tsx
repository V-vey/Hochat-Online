import { Form, Head, Link, usePage } from '@inertiajs/react';
import { index as menuIndex } from '@/actions/App/Http/Controllers/Admin/MenuItemController';
import { index as ordersIndex } from '@/actions/App/Http/Controllers/Admin/OrderController';
import PageHeader from '@/components/page-header';
import StatusBadge from '@/components/status-badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';

type ReportOrder = {
    id: number;
    order_type: string;
    status: string;
    total_amount: string;
    created_at: string;
    user: { name: string };
};

type Props = {
    from: string;
    to: string;
    statusCounts: Record<string, number>;
    totalOrders: number;
    completedSales: string;
    menuItemCount: number;
    soldOutCount: number;
    orders: ReportOrder[];
};

const statusCards = [
    { status: 'Pending', color: 'border-yellow-400' },
    { status: 'Preparing', color: 'border-blue-400' },
    { status: 'Ready', color: 'border-purple-400' },
    { status: 'Completed', color: 'border-green-500' },
    { status: 'Cancelled', color: 'border-gray-400' },
];

/** Formats a date as YYYY-MM-DD in the viewer's local time. */
const ymd = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const today = new Date();
const quickRanges = [
    { label: 'Today', from: ymd(today), to: ymd(today) },
    {
        label: 'Last 7 days',
        from: ymd(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 6,
            ),
        ),
        to: ymd(today),
    },
    {
        label: 'This month',
        from: ymd(new Date(today.getFullYear(), today.getMonth(), 1)),
        to: ymd(today),
    },
];

const dateInput =
    'rounded-full border border-gold bg-cream px-4 py-2 font-display text-sm focus:border-brown focus:outline-none';

export default function Dashboard({
    from,
    to,
    statusCounts,
    totalOrders,
    completedSales,
    menuItemCount,
    soldOutCount,
    orders,
}: Props) {
    const { errors } = usePage().props;
    const period = from === to ? from : `${from} to ${to}`;

    return (
        <AppLayout>
            <Head title="Order Status Report" />
            <PageHeader title="Order Status Report" />

            <div className="mb-8 rounded-2xl bg-beige p-5 shadow-md print:hidden">
                <Form
                    {...dashboard.form()}
                    className="flex flex-wrap items-end justify-center gap-3"
                >
                    {() => (
                        <>
                            <label className="font-display text-sm">
                                From
                                <input
                                    type="date"
                                    name="from"
                                    defaultValue={from}
                                    className={`${dateInput} ml-2`}
                                />
                            </label>
                            <label className="font-display text-sm">
                                To
                                <input
                                    type="date"
                                    name="to"
                                    defaultValue={to}
                                    className={`${dateInput} ml-2`}
                                />
                            </label>
                            <button
                                type="submit"
                                className="btn-pill px-5 py-2 text-sm"
                            >
                                Show report
                            </button>
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="btn-pill-light px-5 py-2 text-sm"
                            >
                                Print
                            </button>
                            {errors.to && (
                                <p className="w-full text-center text-sm text-red-700">
                                    {errors.to}
                                </p>
                            )}
                        </>
                    )}
                </Form>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {quickRanges.map((range) => (
                        <Link
                            key={range.label}
                            href={dashboard({
                                query: { from: range.from, to: range.to },
                            })}
                            className={
                                range.from === from && range.to === to
                                    ? 'rounded-full border border-ink bg-brown px-4 py-1 font-display text-xs text-white'
                                    : 'rounded-full border border-gold bg-cream px-4 py-1 font-display text-xs text-gold hover:bg-beige'
                            }
                        >
                            {range.label}
                        </Link>
                    ))}
                </div>
            </div>

            <p className="mb-3 text-center font-display text-gold">
                Report period: {period}
            </p>

            <h2 className="mb-3 font-display text-lg">Orders by status</h2>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {statusCards.map(({ status, color }) => (
                    <Link
                        key={status}
                        href={ordersIndex({ query: { status, from, to } })}
                        className={`rounded-xl border-l-4 bg-beige p-4 shadow-sm hover:ring-2 hover:ring-line ${color}`}
                    >
                        <p className="text-sm">{status}</p>
                        <p className="font-display text-4xl">
                            {statusCounts[status] ?? 0}
                        </p>
                    </Link>
                ))}
            </div>

            <h2 className="mb-3 font-display text-lg">Summary</h2>
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-xl bg-beige p-4 shadow-sm">
                    <p className="text-sm">Total orders</p>
                    <p className="font-display text-3xl">{totalOrders}</p>
                </div>
                <div className="rounded-xl bg-beige p-4 shadow-sm">
                    <p className="text-sm">Sales (completed)</p>
                    <p className="font-display text-3xl">₱ {completedSales}</p>
                </div>
                <div className="rounded-xl bg-beige p-4 shadow-sm">
                    <p className="text-sm">Menu items</p>
                    <p className="font-display text-3xl">{menuItemCount}</p>
                </div>
                <div className="rounded-xl bg-beige p-4 shadow-sm">
                    <p className="text-sm">Sold out</p>
                    <p className="font-display text-3xl">{soldOutCount}</p>
                </div>
            </div>

            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-lg">Orders in this period</h2>
                {totalOrders > orders.length && (
                    <p className="text-sm">
                        Showing the latest {orders.length} of {totalOrders}{' '}
                        orders.{' '}
                        <Link
                            href={ordersIndex({ query: { from, to } })}
                            className="font-display text-gold underline"
                        >
                            See all in Manage Orders
                        </Link>
                    </p>
                )}
            </div>
            <div className="mb-8 overflow-x-auto rounded-2xl bg-beige shadow-md">
                <table className="w-full text-left text-sm">
                    <thead className="bg-beige-dark font-display text-xs tracking-wide text-brown uppercase">
                        <tr>
                            <th className="px-4 py-3">Order</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Total</th>
                            <th className="px-4 py-3">Placed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center font-display text-gold"
                                >
                                    No orders in this period.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-cream">
                                    <td className="px-4 py-2 font-display">
                                        #HOCHAT-{order.id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.user.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.order_type}
                                    </td>
                                    <td className="px-4 py-2">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        ₱ {order.total_amount}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap justify-center gap-3 print:hidden">
                <Link href={ordersIndex()} className="btn-pill">
                    Manage Orders
                </Link>
                <Link href={menuIndex()} className="btn-pill-light">
                    Manage Menu
                </Link>
            </div>
        </AppLayout>
    );
}
