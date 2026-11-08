import { Form, Head } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/RegisterController';

export default function Register() {
    return (
        <>
            <Head title="Sign up" />

            <h1>Create an account</h1>

            <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']}>
                {({ errors, processing }) => (
                    <>
                        <label htmlFor="name">Full name</label>
                        <input id="name" name="name" type="text" required />
                        {errors.name && <p>{errors.name}</p>}

                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />
                        {errors.email && <p>{errors.email}</p>}

                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" required />
                        {errors.phone && <p>{errors.phone}</p>}

                        <label htmlFor="address">Address</label>
                        <input id="address" name="address" type="text" />
                        {errors.address && <p>{errors.address}</p>}

                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                        {errors.password && <p>{errors.password}</p>}

                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input id="password_confirmation" name="password_confirmation" type="password" required />

                        <button type="submit" disabled={processing}>
                            Sign up
                        </button>
                    </>
                )}
            </Form>
        </>
    );
}