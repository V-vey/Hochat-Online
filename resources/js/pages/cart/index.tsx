import { Head, Link } from '@inertiajs/react';
import { update, destroy } from '@/actions/App/Http/Controllers/CartController';

// ...your CartItem type stays here...
type CartItem = {
    id: number;
    name: string;
    price: string;
    quantity: number;
    subtotal: string;
};

export default function CartIndex({ items, total }: { items: CartItem[]; total: string }) {
    return (
        <>
            <Head title="Cart" />
            <h1>Your Cart</h1>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div key={item.id}>
                            <p>{item.name} — ₱{item.price} × {item.quantity} = ₱{item.subtotal}</p>

                            <Link
                                href={update(item.id)}
                                data={{ quantity: item.quantity - 1 }}
                                as="button"
                                disabled={item.quantity === 1}
                                preserveScroll
                            >
                                −
                            </Link>

                            <Link href={update(item.id)} data={{ quantity: item.quantity + 1 }} as="button" preserveScroll>
                                +
                            </Link>

                            <Link href={destroy(item.id)} as="button" preserveScroll>
                                Remove
                            </Link>
                        </div>
                    ))}

                    <p>Total: ₱{total}</p>
                </>
            )}
        </>
    );
}