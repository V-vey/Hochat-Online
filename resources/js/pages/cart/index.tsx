import { Form, Head, Link } from '@inertiajs/react';
import { destroy, update } from '@/actions/App/Http/Controllers/CartController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { store as placeOrder } from '@/actions/App/Http/Controllers/OrderController';
import AppLayout from '@/layouts/app-layout';

type CartItem = {
    id: number;
    name: string;
    price: string;
    quantity: number;
    subtotal: string;
};

type Props = {
    items: CartItem[];
    total: string;
};

export default function CartIndex({ items, total }: Props) {
    const qtyButton =
        'flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-lg hover:bg-orange-100 disabled:opacity-40';

    return (
        <AppLayout>
            <Head title="Cart" />
            <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

            {items.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                    <p className="mb-4 text-gray-500">Your cart is empty.</p>
                    <Link
                        href={menuIndex()}
                        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
                    >
                        Browse the menu
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-3 lg:col-span-2">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm"
                            >
                                <div>
                                    <p className="font-semibold capitalize">{item.name}</p>
                                    <p className="text-sm text-gray-500">₱{item.price} each</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={update(item.id)}
                                        data={{ quantity: item.quantity - 1 }}
                                        as="button"
                                        disabled={item.quantity === 1}
                                        preserveScroll
                                        className={qtyButton}
                                    >
                                        −
                                    </Link>
                                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                                    <Link
                                        href={update(item.id)}
                                        data={{ quantity: item.quantity + 1 }}
                                        as="button"
                                        preserveScroll
                                        className={qtyButton}
                                    >
                                        +
                                    </Link>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="w-24 text-right font-semibold text-orange-600">₱{item.subtotal}</p>
                                    <Link
                                        href={destroy(item.id)}
                                        as="button"
                                        preserveScroll
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">Checkout</h2>

                        <Form {...placeOrder.form()} className="space-y-5">
                            {({ errors, processing }) => (
                                <>
                                    <div>
                                        <p className="mb-2 text-sm font-medium">Order type</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <label className="cursor-pointer rounded-md border border-gray-300 p-3 text-center text-sm has-[:checked]:border-orange-600 has-[:checked]:bg-orange-50 has-[:checked]:font-semibold">
                                                <input
                                                    type="radio"
                                                    name="order_type"
                                                    value="Dine-In"
                                                    defaultChecked
                                                    className="sr-only"
                                                />
                                                Dine-in
                                            </label>
                                            <label className="cursor-pointer rounded-md border border-gray-300 p-3 text-center text-sm has-[:checked]:border-orange-600 has-[:checked]:bg-orange-50 has-[:checked]:font-semibold">
                                                <input type="radio" name="order_type" value="Delivery" className="sr-only" />
                                                Delivery
                                            </label>
                                        </div>
                                        {errors.order_type && (
                                            <p className="mt-1 text-sm text-red-600">{errors.order_type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="scheduled_time" className="mb-2 block text-sm font-medium">
                                            Pre-order for later (optional)
                                        </label>
                                        <input
                                            id="scheduled_time"
                                            name="scheduled_time"
                                            type="datetime-local"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                                        />
                                        {errors.scheduled_time && (
                                            <p className="mt-1 text-sm text-red-600">{errors.scheduled_time}</p>
                                        )}
                                    </div>

                                    <div className="rounded-md bg-orange-50 p-3 text-sm">
                                        <span className="font-medium">Payment:</span> Cash on Delivery / Pickup
                                    </div>

                                    <div className="flex items-center justify-between border-t pt-4 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-orange-600">₱{total}</span>
                                    </div>

                                    {errors.cart && <p className="text-sm text-red-600">{errors.cart}</p>}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-md bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Placing order...' : 'Place Order'}
                                    </button>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}