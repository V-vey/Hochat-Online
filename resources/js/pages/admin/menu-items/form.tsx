import { Form, Head, Link } from '@inertiajs/react';
import { index, store, update } from '@/actions/App/Http/Controllers/Admin/MenuItemController';

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

export default function MenuItemForm({ categories, menuItem }: Props) {
    const isEditing = menuItem !== null;

    return (
        <>
            <Head title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'} />
            <h1>{isEditing ? `Edit ${menuItem.name}` : 'Add Menu Item'}</h1>

            <Form {...(isEditing ? update.form(menuItem.id) : store.form())}>
                {({ errors, processing }) => (
                    <>
                        <div>
                            <label htmlFor="category_id">Category</label>
                            <select id="category_id" name="category_id" defaultValue={menuItem?.category_id ?? ''}>
                                <option value="" disabled>
                                    Choose a category
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <p>{errors.category_id}</p>}
                        </div>

                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" defaultValue={menuItem?.name ?? ''} />
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="price">Price (₱)</label>
                            <input id="price" name="price" type="number" step="0.01" defaultValue={menuItem?.price ?? ''} />
                            {errors.price && <p>{errors.price}</p>}
                        </div>

                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="is_available"
                                    value="1"
                                    defaultChecked={menuItem?.is_available ?? true}
                                />{' '}
                                Available
                            </label>
                        </div>

                        <div>
                            <label htmlFor="photo">Photo</label>
                            {menuItem?.photo_url && <img src={menuItem.photo_url} alt={menuItem.name} width={100} />}
                            <input id="photo" name="photo" type="file" accept="image/*" />
                            {errors.photo && <p>{errors.photo}</p>}
                        </div>

                        <button type="submit" disabled={processing}>
                            {isEditing ? 'Save changes' : 'Add item'}
                        </button>
                        <Link href={index()}> Cancel</Link>
                    </>
                )}
            </Form>
        </>
    );
}