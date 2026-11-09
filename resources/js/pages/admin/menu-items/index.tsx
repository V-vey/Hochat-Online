import { Head, Link, usePage } from '@inertiajs/react';
import { create, destroy, edit } from '@/actions/App/Http/Controllers/Admin/MenuItemController';
import AppLayout from '@/layouts/app-layout';

type MenuItem = {
    id: number;
    name: string;
    price: string;
    photo_url: string | null;
    is_available: boolean;
    category: { name: string };
};

export default function AdminMenuItemsIndex({ menuItems }: { menuItems: MenuItem[] }) {
    const { auth, errors } = usePage().props;
    const isAdmin = auth.user.role === 'Administrator';

    return (
        <AppLayout>
            <Head title="Manage Menu" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-4xl">Manage Menu</h1>
                <Link
                    href={create()}
                    className="rounded-full border border-ink bg-brown font-display px-4 py-2 text-sm font-semibold text-white hover:bg-brown-dark"
                >
                    + Add menu item
                </Link>
            </div>

            {errors.delete && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{errors.delete}</p>}

            <div className="overflow-x-auto rounded-xl bg-beige shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-beige-dark font-display text-xs uppercase tracking-wide text-brown">
                        <tr>
                            <th className="px-4 py-3">Photo</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-cream">
                                <td className="px-4 py-2">
                                    {item.photo_url ? (
                                        <img
                                            src={item.photo_url}
                                            alt={item.name}
                                            className="h-12 w-12 rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-md bg-beige-dark" />
                                    )}
                                </td>
                                <td className="px-4 py-2 font-medium capitalize">{item.name}</td>
                                <td className="px-4 py-2 text-gray-600">{item.category.name}</td>
                                <td className="px-4 py-2">₱{item.price}</td>
                                <td className="px-4 py-2">
                                    {item.is_available ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                                            Sold out
                                        </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-right">
                                    <Link href={edit(item.id)} className="font-medium text-gold hover:underline">
                                        Edit
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            href={destroy(item.id)}
                                            as="button"
                                            preserveScroll
                                            onBefore={() => confirm(`Delete ${item.name}?`)}
                                            className="ml-4 font-medium text-red-600 hover:underline"
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
