import { Head } from '@inertiajs/react';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';

const FACEBOOK_URL = 'https://www.facebook.com/HochatCafe';

/**
 * Contact details from the café's Facebook page (facebook.com/HochatCafe).
 */
const details = [
    {
        label: 'Address',
        value: 'Poblacion 3, Gerona, Tarlac 2302',
        href: 'https://www.google.com/maps/search/?api=1&query=Hochat+Cafe+Poblacion+3+Gerona+Tarlac',
    },
    { label: 'Mobile', value: '0995 829 8402', href: 'tel:+639958298402' },
    {
        label: 'Email',
        value: 'hochatcafe@gmail.com',
        href: 'mailto:hochatcafe@gmail.com',
    },
    {
        label: 'Facebook',
        value: 'facebook.com/HochatCafe',
        href: FACEBOOK_URL,
    },
    {
        label: 'Services',
        value: 'Dine-in · Delivery within Gerona',
        href: null,
    },
    {
        label: 'Opening hours',
        value: 'See our Facebook page for today’s hours',
        href: FACEBOOK_URL,
    },
];

export default function Contact() {
    return (
        <AppLayout>
            <Head title="Contact Us" />
            <PageHeader title="Contact Us" />

            <div className="mx-auto max-w-2xl rounded-2xl bg-beige p-6 shadow-md">
                <h2 className="mb-4 border-b border-line pb-3 text-center font-display text-2xl text-gold">
                    Get in touch
                </h2>

                <dl className="space-y-3">
                    {details.map(({ label, value, href }) => (
                        <div
                            key={label}
                            className="rounded-xl bg-cream p-4 shadow-sm"
                        >
                            <dt className="font-display text-sm text-gold">
                                {label}
                            </dt>
                            <dd>
                                {href ? (
                                    <a
                                        href={href}
                                        target={
                                            href.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel="noreferrer"
                                        className="underline decoration-line underline-offset-2 hover:text-brown"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>

                <p className="mt-6 text-center text-sm">
                    For questions about your order, message us on Facebook or
                    call the number above.
                </p>
            </div>
        </AppLayout>
    );
}
