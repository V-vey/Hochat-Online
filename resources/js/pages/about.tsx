import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us" />

            <h1 className="mb-10 text-center text-4xl font-bold">
                The Hochat Cafe Story
            </h1>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <img
                        src="/images/about-interior.jpg"
                        alt="Inside Hochat Cafe: colorful tables and chairs"
                        className="aspect-[416/228] w-full rounded-2xl object-cover shadow-sm"
                    />
                    <img
                        src="/images/about-storefront.jpg"
                        alt="The yellow Hochat Cafe storefront"
                        className="aspect-[416/564] w-full rounded-2xl object-cover shadow-sm"
                    />
                </div>

                <div className="space-y-4 text-justify leading-relaxed">
                    <p>
                        HoChat Cafe started as a welcoming neighborhood spot,
                        built on the idea of creating meaningful connections
                        through delicious food and refreshing drinks. What began
                        as a humble space quickly became a go-to hangout for
                        families, students, and food lovers in the community.
                    </p>
                    <p>
                        Founded on April 8, 2019, HoChat Cafe opened its doors
                        with the goal of offering more than just coffee. From
                        silog meals and crispy chicken dishes to sweet desserts
                        and refreshing beverages, every item on the menu was
                        crafted to give customers a comforting and satisfying
                        experience.
                    </p>
                    <p>
                        Over time, HoChat Cafe grew into a community hub, a
                        place where people could relax, study, catch up, and
                        create memories. With its warm ambiance and friendly
                        service, it became a favorite spot for everyday
                        conversations and special moments alike.
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-ink/40 bg-beige p-8 text-center">
                <h2 className="mb-3 text-3xl font-bold">Our Mission</h2>
                <p className="text-lg">
                    Every dish, every drink, every story shared brings us
                    together in one warm space.
                </p>
            </div>
        </AppLayout>
    );
}
