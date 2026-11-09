import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { destroy, update } from '@/actions/App/Http/Controllers/CartController';
import { index as menuIndex } from '@/actions/App/Http/Controllers/MenuController';
import { store as placeOrder } from '@/actions/App/Http/Controllers/OrderController';
import { edit as profile } from '@/actions/App/Http/Controllers/ProfileController';
import PageHeader from '@/components/page-header';
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
    deliveryFee: number;
};

const roundButton =
    'flex h-7 w-7 items-center justify-center rounded-full border border-ink bg-gold text-white hover:bg-brown disabled:opacity-40';

export default function CartIndex({ items, total, deliveryFee }: Props) {
    const [orderType, setOrderType] = useState('Dine-In');
    const fee = orderType === 'Delivery' ? deliveryFee : 0;
    const grandTotal = (Number(total) + fee).toFixed(2);

    return (
        <AppLayout>
            <Head title="My Cart" />
            <PageHeader
                title="My Cart"
                backHref={menuIndex()}
                backLabel="Back to Menu"
            />

            {items.length === 0 ? (
                <div className="mx-auto max-w-xl rounded-2xl bg-beige p-10 text-center shadow-md">
                    <p className="mb-6 font-display text-gold">
                        Your cart is empty.
                    </p>
                    <Link href={menuIndex()} className="btn-pill">
                        Browse the menu
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
                    <div className="h-fit rounded-2xl bg-beige p-5 shadow-md">
                        <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                            Order Items
                        </h2>

                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-cream p-4 shadow-sm"
                                >
                                    <div className="min-w-32">
                                        <p className="font-display text-gold capitalize">
                                            {item.name}
                                        </p>
                                        <p className="text-sm">
                                            ₱ {item.price} each
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={update(item.id)}
                                            data={{
                                                quantity: item.quantity - 1,
                                            }}
                                            as="button"
                                            disabled={item.quantity === 1}
                                            preserveScroll
                                            aria-label="Decrease"
                                            className={roundButton}
                                        >
                                            −
                                        </Link>
                                        <span className="w-5 text-center font-display">
                                            {item.quantity}
                                        </span>
                                        <Link
                                            href={update(item.id)}
                                            data={{
                                                quantity: item.quantity + 1,
                                            }}
                                            as="button"
                                            preserveScroll
                                            aria-label="Increase"
                                            className={roundButton}
                                        >
                                            +
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <p className="w-24 text-right font-display text-gold">
                                            ₱ {item.subtotal}
                                        </p>
                                        <Link
                                            href={destroy(item.id)}
                                            as="button"
                                            preserveScroll
                                            aria-label={`Remove ${item.name}`}
                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                                        >
                                            ✕
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-fit rounded-2xl bg-beige p-5 shadow-md">
                        <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                            Order Summary
                        </h2>

                        <Form {...placeOrder.form()} className="space-y-4">
                            {({ errors, processing }) => (
                                <>
                                    <div>
                                        <p className="mb-2 font-display text-sm">
                                            Order type
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Dine-In', 'Delivery'].map(
                                                (type) => (
                                                    <label
                                                        key={type}
                                                        className="cursor-pointer rounded-full border border-gold bg-cream py-2 text-center font-display text-sm text-gold has-[:checked]:border-ink has-[:checked]:bg-brown has-[:checked]:text-white"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="order_type"
                                                            value={type}
                                                            checked={
                                                                orderType ===
                                                                type
                                                            }
                                                            onChange={() =>
                                                                setOrderType(
                                                                    type,
                                                                )
                                                            }
                                                            className="sr-only"
                                                        />
                                                        {type}
                                                    </label>
                                                ),
                                            )}
                                        </div>
                                        {errors.order_type && (
                                            <p className="mt-1 text-sm text-red-700">
                                                {errors.order_type}{' '}
                                                <Link
                                                    href={profile()}
                                                    className="font-display underline"
                                                >
                                                    Edit profile
                                                </Link>
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="scheduled_time"
                                            className="mb-2 block font-display text-sm"
                                        >
                                            Pre-order for later (optional)
                                        </label>
                                        <input
                                            id="scheduled_time"
                                            name="scheduled_time"
                                            type="datetime-local"
                                            className="w-full rounded-lg border border-gold bg-cream px-3 py-2 text-sm focus:border-brown focus:outline-none"
                                        />
                                        {errors.scheduled_time && (
                                            <p className="mt-1 text-sm text-red-700">
                                                {errors.scheduled_time}
                                            </p>
                                        )}
                                    </div>

                                    <div className="font-display text-sm">
                                        <div className="flex justify-between border-b border-line py-2">
                                            <span>Subtotal:</span>
                                            <span className="font-bold">
                                                ₱ {total}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b border-line py-2">
                                            <span>Delivery Fee:</span>
                                            <span className="font-bold">
                                                ₱ {fee.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span>Payment:</span>
                                            <span>
                                                Cash on Delivery / Pay at
                                                Counter
                                            </span>
                                        </div>
                                    </div>

                                    <p className="border-t border-line pt-3 font-display text-2xl text-gold">
                                        Total: ₱ {grandTotal}
                                    </p>

                                    {errors.cart && (
                                        <p className="text-sm text-red-700">
                                            {errors.cart}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-pill w-full py-3 text-lg"
                                    >
                                        {processing
                                            ? 'Placing order...'
                                            : 'Proceed to Checkout'}
                                    </button>
                                    <Link
                                        href={menuIndex()}
                                        className="btn-pill-light w-full py-2.5 text-sm"
                                    >
                                        Continue Shopping
                                    </Link>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
