import { Form, Head, Link } from '@inertiajs/react';
import {
    index,
    store,
    update,
} from '@/actions/App/Http/Controllers/Admin/MenuItemController';
import AppLayout from '@/layouts/app-layout';

type Category = { id: number; name: string };

type MenuItem = {
    id: number;
    category_id: number;
    name: string;
    price: string;
    photo_url: string | null;
    is_available: boolean;
};

type Props = {
    categories: Category[];
    menuItem: MenuItem | null;
};

const inputClass =
    'w-full rounded-md border border-gold bg-cream px-3 py-2 text-sm focus:border-brown focus:outline-none';

export default function MenuItemForm({ categories, menuItem }: Props) {
    const isEditing = menuItem !== null;

    return (
        <AppLayout>
            <Head title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'} />

            <Link
                href={index()}
                className="mb-4 inline-block text-sm text-gold hover:underline"
            >
                ← Back to menu items
            </Link>

            <div className="mx-auto max-w-lg rounded-xl bg-beige p-6 shadow-sm">
                <h1 className="mb-6 font-display text-3xl capitalize">
                    {isEditing ? `Edit ${menuItem.name}` : 'Add Menu Item'}
                </h1>

                <Form
                    {...(isEditing ? update.form(menuItem.id) : store.form())}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    defaultValue={menuItem?.category_id ?? ''}
                                    className={inputClass}
                                >
                                    <option value="" disabled>
                                        Choose a category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    defaultValue={menuItem?.name ?? ''}
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="price"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Price (₱)
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={menuItem?.price ?? ''}
                                    className={inputClass}
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <label className="flex items-center gap-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    name="is_available"
                                    value="1"
                                    defaultChecked={
                                        menuItem?.is_available ?? true
                                    }
                                    className="h-4 w-4 accent-brown"
                                />
                                Available (untick to mark as sold out)
                            </label>

                            <div>
                                <label
                                    htmlFor="photo"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Photo
                                </label>
                                {menuItem?.photo_url && (
                                    <img
                                        src={menuItem.photo_url}
                                        alt={menuItem.name}
                                        className="mb-2 h-24 w-24 rounded-md object-cover"
                                    />
                                )}
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-beige file:px-3 file:py-2 file:text-brown hover:file:bg-beige-dark"
                                />
                                {errors.photo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.photo}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-full border border-ink bg-brown px-5 py-2.5 font-display font-semibold text-white hover:bg-brown-dark disabled:opacity-50"
                                >
                                    {isEditing ? 'Save changes' : 'Add item'}
                                </button>
                                <Link
                                    href={index()}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
