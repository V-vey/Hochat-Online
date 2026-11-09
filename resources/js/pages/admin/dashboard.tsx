import { Head, Link } from '@inertiajs/react';
import { index as ordersIndex } from '@/actions/App/Http/Controllers/Admin/OrderController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/Admin/MenuItemController';
export default function Dashboard() {
    return (
        <>
            <Head title="Staff Dashboard" />
            <h1>Staff Dashboard</h1>
            <Link href={ordersIndex()}>Manage Orders</Link>
            <br />
            <Link href={menuIndex()}>Manage Menu</Link>
        </>
    );
}