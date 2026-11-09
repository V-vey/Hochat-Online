import { Form, Head, Link } from '@inertiajs/react';
import { create as loginPage } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { store } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import AuthLayout from '@/layouts/auth-layout';

const inputClass =
    'w-full rounded-lg border border-ink/70 bg-cream px-4 py-3 font-display shadow-sm placeholder:text-ink/50 focus:border-brown focus:outline-none';

export default function Register() {
    return (
        <AuthLayout>
            <Head title="Sign up" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="mx-auto max-w-md space-y-4"
            >
                {({ errors, processing }) => (
                    <>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Full name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Full name"
                                required
                                autoFocus
                                className={inputClass}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                className={inputClass}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="sr-only">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Phone"
                                required
                                className={inputClass}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="sr-only">
                                Address
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Address (needed for delivery)"
                                className={inputClass}
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="sr-only"
                                >
                                    Confirm password
                                </label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirm password"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-700">
                                {errors.password}
                            </p>
                        )}

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-pill px-14 py-2.5 text-xl"
                            >
                                Sign up
                            </button>
                        </div>

                        <p className="text-center font-display text-sm">
                            Already have an account?{' '}
                            <Link
                                href={loginPage()}
                                className="font-bold underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
