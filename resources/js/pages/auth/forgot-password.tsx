import { Form, Head, Link, usePage } from '@inertiajs/react';
import { create as loginPage } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { store } from '@/actions/App/Http/Controllers/Auth/PasswordResetController';
import AuthLayout from '@/layouts/auth-layout';

const inputClass =
    'w-full rounded-lg border border-ink/70 bg-cream px-4 py-3 font-display shadow-sm placeholder:text-ink/50 focus:border-brown focus:outline-none';

export default function ForgotPassword() {
    const { status } = usePage().props;

    return (
        <AuthLayout>
            <Head title="Forgot password" />

            <div className="mx-auto max-w-sm space-y-5">
                <p className="text-center font-display">
                    Forgot your password? Enter your email and we will send you
                    a link to set a new one.
                </p>

                {status && (
                    <p className="rounded-lg bg-green-100 px-4 py-3 text-center text-sm text-green-800">
                        {status}
                    </p>
                )}

                <Form {...store.form()} className="space-y-5">
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

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-pill px-8 py-2.5"
                                >
                                    Email reset link
                                </button>
                            </div>
                        </>
                    )}
                </Form>

                <p className="text-center">
                    <Link
                        href={loginPage()}
                        className="font-display font-bold underline"
                    >
                        Back to log in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
