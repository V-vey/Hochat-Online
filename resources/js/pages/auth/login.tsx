import { Form, Head, Link } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { create as registerPage } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import AppLayout from '@/layouts/app-layout';

const inputClass =
    'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none';

export default function Login() {
    return (
        <AppLayout>
            <Head title="Login" />

            <div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-center text-2xl font-bold">Log in</h1>

                <Form {...store.form()} resetOnSuccess={['password']} className="space-y-4">
                    {({ errors, processing }) => (
                        <>
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input id="email" name="email" type="email" required autoFocus className={inputClass} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                                    Password
                                </label>
                                <input id="password" name="password" type="password" required className={inputClass} />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" name="remember" value="1" /> Remember me
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-md bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
                            >
                                Log In
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href={registerPage()} className="font-medium text-orange-700 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
