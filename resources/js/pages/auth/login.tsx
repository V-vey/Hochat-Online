import { Form, Head, Link } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { create as registerPage } from '@/actions/App/Http/Controllers/Auth/RegisterController';

export default function Login() {
    return (
        <>
            <Head title="Login" />

            <h1>Log in</h1>

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ errors, processing }) => (
                    <>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />
                        {errors.email && <p>{errors.email}</p>}

                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                        {errors.password && <p>{errors.password}</p>}
                        
                        <button type="submit" disabled={processing}>
                            Log In
                        </button>

                        <p>
                            Don't have an account? <Link href={registerPage.url()}>Sign up</Link>
                        </p>    
                    </>
                )}
            </Form>
        </>
    );
}