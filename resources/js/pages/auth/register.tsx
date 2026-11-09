import { Form, Head, Link } from '@inertiajs/react';
import { create as loginPage } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { store } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import AppLayout from '@/layouts/app-layout';

const inputClass =
    'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none';

export default function Register() {
    return (
        <AppLayout>
            <Head title="Sign up" />

            <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-center text-2xl font-bold">Create an account</h1>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <div>
                                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                                    Full name
                                </label>
                                <input id="name" name="name" type="text" required autoFocus className={inputClass} />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input id="email" name="email" type="email" required className={inputClass} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                                    Phone
                                </label>
                                <input id="phone" name="phone" type="tel" required className={inputClass} />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="address" className="mb-1 block text-sm font-medium">
                                    Address <span className="font-normal text-gray-500">(needed for delivery)</span>
                                </label>
                                <input id="address" name="address" type="text" className={inputClass} />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="password" className="mb-1 block text-sm font-medium">
                                        Password
                                    </label>
                                    <input id="password" name="password" type="password" required className={inputClass} />
                                </div>
                                <div>
                                    <label htmlFor="password_confirmation" className="mb-1 block text-sm font-medium">
                                        Confirm password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-md bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
                            >
                                Sign up
                            </button>

                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href={loginPage()} className="font-medium text-orange-700 hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
