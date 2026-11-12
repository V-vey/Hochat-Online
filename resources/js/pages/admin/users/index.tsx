import { Head, Link, usePage } from '@inertiajs/react';
import { destroy } from '@/actions/App/Http/Controllers/Admin/UserController';
import AppLayout from '@/layouts/app-layout';

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    role: string;
    created_at: string;
    orders_count: number;
};

const roleBadge: Record<string, string> = {
    Administrator: 'bg-brown text-white',
    Staff: 'bg-blue-100 text-blue-800',
    User: 'bg-green-100 text-green-800',
};

export default function AdminUsersIndex({ users }: { users: User[] }) {
    const { auth, errors } = usePage().props;

    return (
        <AppLayout>
            <Head title="Manage Users" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-4xl">Manage Users</h1>
                <p className="font-display text-sm text-gray-600">
                    {users.length} accounts
                </p>
            </div>

            {errors.delete && (
                <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                    {errors.delete}
                </p>
            )}

            <div className="overflow-x-auto rounded-xl bg-beige shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-beige-dark font-display text-xs tracking-wide text-brown uppercase">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Orders</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-cream">
                                <td className="px-4 py-2 font-medium">
                                    {user.name}
                                </td>
                                <td className="px-4 py-2 text-gray-600">
                                    <p>{user.email}</p>
                                    <p>{user.phone}</p>
                                    {user.address && (
                                        <p className="text-xs">
                                            {user.address}
                                        </p>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadge[user.role] ?? ''}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {user.orders_count}
                                </td>
                                <td className="px-4 py-2 text-gray-600">
                                    {new Date(
                                        user.created_at,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                    {user.id === auth.user.id ? (
                                        <span className="text-xs text-gray-500">
                                            (you)
                                        </span>
                                    ) : (
                                        <Link
                                            href={destroy(user.id)}
                                            as="button"
                                            preserveScroll
                                            onBefore={() =>
                                                confirm(
                                                    `Permanently delete ${user.name} and their ${user.orders_count} order(s)? This cannot be undone.`,
                                                )
                                            }
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
