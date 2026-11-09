import { Form, Head, Link, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { create as forgotPassword } from '@/actions/App/Http/Controllers/Auth/PasswordResetController';
import { create as registerPage } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import AuthLayout from '@/layouts/auth-layout';

const inputClass =
    'w-full rounded-lg border border-ink/70 bg-cream px-4 py-3 font-display shadow-sm placeholder:text-ink/50 focus:border-brown focus:outline-none';

export default function Login() {
    const { status } = usePage().props;

    return (
        <AuthLayout>
            <Head title="Login" />

            {status && (
                <p className="mx-auto mb-5 max-w-sm rounded-lg bg-green-100 px-4 py-3 text-center text-sm text-green-800">
                    {status}
                </p>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="mx-auto max-w-sm space-y-5"
            >
                {({ errors, processing }) => (
                    <>
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
                                autoFocus
                                className={inputClass}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.email}
                                </p>
                            )}
                        </div>

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
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between font-display text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    value="1"
                                    className="accent-brown"
                                />{' '}
                                Remember me
                            </label>
                            <Link
                                href={forgotPassword()}
                                className="underline hover:text-brown"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-pill px-14 py-2.5 text-xl"
                            >
                                Log In
                            </button>
                        </div>

                        <p className="text-center">
                            <Link
                                href={registerPage()}
                                className="font-display font-bold underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
