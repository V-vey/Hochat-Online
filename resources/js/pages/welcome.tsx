import { Head, Link, usePage } from '@inertiajs/react';
import { create as loginPage, destroy as logout } from '@/actions/App/Http/Controllers/Auth/LoginController';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />

            {auth.user ? (
                <>
                    <p>Hello, {auth.user.name}</p>
                    <Link href={logout()} as="button">Log out</Link>
                </>
            ) : (
                <Link href={loginPage.url()}>Log in</Link>
            )}
        </>
    );
}