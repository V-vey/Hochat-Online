import { Head } from '@inertiajs/react';
import PageHeader from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';

/**
 * Replace these with the café's real details.
 */
const details = [
    { label: 'Address', value: 'Add the café address here' },
    { label: 'Phone', value: 'Add the café phone number here' },
    { label: 'Email', value: 'Add the café email here' },
    { label: 'Opening hours', value: 'Add the opening hours here' },
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
                    {details.map(({ label, value }) => (
                        <div
                            key={label}
                            className="rounded-xl bg-cream p-4 shadow-sm"
                        >
                            <dt className="font-display text-sm text-gold">
                                {label}
                            </dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>

                <p className="mt-6 text-center text-sm">
                    You can also message us on Facebook or Instagram using the
                    links below.
                </p>
            </div>
        </AppLayout>
    );
}
