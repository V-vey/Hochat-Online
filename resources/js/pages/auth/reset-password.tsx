import { Form, Head } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Auth/PasswordResetController';
import AuthLayout from '@/layouts/auth-layout';

type Props = {
    token: string;
    email: string;
};

const inputClass =
    'w-full rounded-lg border border-ink/70 bg-cream px-4 py-3 font-display shadow-sm placeholder:text-ink/50 focus:border-brown focus:outline-none';

export default function ResetPassword({ token, email }: Props) {
    return (
        <AuthLayout>
            <Head title="Set a new password" />

            <Form
                {...update.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="mx-auto max-w-sm space-y-5"
            >
                {({ errors, processing }) => (
                    <>
                        <p className="text-center font-display">
                            Set a new password for your account.
                        </p>

                        <input type="hidden" name="token" value={token} />

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={email}
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
                            <label htmlFor="password" className="sr-only">
                                New password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="New password"
                                required
                                autoFocus
                                className={inputClass}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="sr-only"
                            >
                                Confirm new password
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                placeholder="Confirm new password"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-pill px-8 py-2.5"
                            >
                                Save new password
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
