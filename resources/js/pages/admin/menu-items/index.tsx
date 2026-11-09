import { Head, Link, usePage } from '@inertiajs/react';
import { create, destroy, edit } from '@/actions/App/Http/Controllers/Admin/MenuItemController';

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
        <>
            <Head title="Manage Menu" />
            <h1>Manage Menu</h1>

            <Link href={create()}>+ Add menu item</Link>

            {errors.delete && <p>{errors.delete}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.photo_url && <img src={item.photo_url} alt={item.name} width={60} />}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category.name}</td>
                            <td>₱{item.price}</td>
                            <td>{item.is_available ? 'Yes' : 'Sold out'}</td>
                            <td>
                                <Link href={edit(item.id)}>Edit</Link>
                                {isAdmin && (
                                    <Link
                                        href={destroy(item.id)}
                                        as="button"
                                        preserveScroll
                                        onBefore={() => confirm(`Delete ${item.name}?`)}
                                    >
                                        {' '}Delete
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}