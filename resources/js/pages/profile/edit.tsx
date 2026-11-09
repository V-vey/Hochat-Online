import { Form, Head, usePage } from '@inertiajs/react';
import {
    update,
    updatePassword,
} from '@/actions/App/Http/Controllers/ProfileController';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';

type Props = {
    user: {
        name: string;
        email: string;
        phone: string;
        address: string | null;
    };
};

const inputClass =
    'w-full rounded-lg border border-gold bg-cream px-4 py-2.5 focus:border-brown focus:outline-none';
const labelClass = 'mb-1 block font-display text-sm';
const errorClass = 'mt-1 text-sm text-red-700';

export default function ProfileEdit({ user }: Props) {
    const { status } = usePage().props;

    return (
        <AppLayout>
            <Head title="My Profile" />
            <PageHeader title="My Profile" />

            {status && (
                <p className="mx-auto mb-6 max-w-2xl rounded-xl bg-green-100 px-4 py-3 text-center font-display text-green-800">
                    {status}
                </p>
            )}

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-beige p-6 shadow-md">
                    <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                        Contact &amp; Delivery
                    </h2>

                    <Form {...update.form()} className="space-y-4">
                        {({ errors, processing }) => (
                            <>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className={labelClass}
                                    >
                                        Full name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        defaultValue={user.name}
                                        required
                                        className={inputClass}
                                    />
                                    {errors.name && (
                                        <p className={errorClass}>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className={labelClass}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user.email}
                                        required
                                        className={inputClass}
                                    />
                                    {errors.email && (
                                        <p className={errorClass}>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className={labelClass}
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        defaultValue={user.phone}
                                        required
                                        className={inputClass}
                                    />
                                    {errors.phone && (
                                        <p className={errorClass}>
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className={labelClass}
                                    >
                                        Delivery address
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        defaultValue={user.address ?? ''}
                                        placeholder="Street, Barangay, Gerona, Tarlac"
                                        className={inputClass}
                                    />
                                    <p className="mt-1 text-xs">
                                        We only deliver within Gerona.
                                    </p>
                                    {errors.address && (
                                        <p className={errorClass}>
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-pill w-full py-2.5"
                                >
                                    Save profile
                                </button>
                            </>
                        )}
                    </Form>
                </div>

                <div className="h-fit rounded-2xl bg-beige p-6 shadow-md">
                    <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                        Change Password
                    </h2>

                    <Form
                        {...updatePassword.form()}
                        resetOnSuccess
                        className="space-y-4"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div>
                                    <label
                                        htmlFor="current_password"
                                        className={labelClass}
                                    >
                                        Current password
                                    </label>
                                    <input
                                        id="current_password"
                                        name="current_password"
                                        type="password"
                                        required
                                        className={inputClass}
                                    />
                                    {errors.current_password && (
                                        <p className={errorClass}>
                                            {errors.current_password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className={labelClass}
                                    >
                                        New password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className={inputClass}
                                    />
                                    {errors.password && (
                                        <p className={errorClass}>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className={labelClass}
                                    >
                                        Confirm new password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-pill w-full py-2.5"
                                >
                                    Change password
                                </button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
