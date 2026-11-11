import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us" />

            <h1 className="mb-8 text-center text-4xl font-bold">
                The Hochat Cafe Story
            </h1>

            <div className="mx-auto grid max-w-3xl items-start gap-6 md:grid-cols-[2fr_3fr]">
                <div className="mx-auto w-full max-w-xs space-y-1">
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

                <div className="space-y-4 text-justify leading-snug">
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
                        silog meals and crispy chicken dishes to sweet graham
                        desserts and refreshing beverages, every item on the
                        menu was crafted to give customers a comforting and
                        satisfying experience.
                    </p>
                    <p>
                        Over time, HoChat Cafe grew not only as a dining place
                        but also as a community hub — a space where people could
                        relax, study, catch up, and create memories. Beyond the
                        cafe, HoChat also sets up mini stalls during special
                        occasions and local events, bringing its well-loved food
                        and drinks even closer to the community. With its warm
                        ambiance and friendly service, it became a favorite spot
                        for everyday conversations and special moments alike.
                    </p>
                    <p>
                        From the beginning, HoChat Cafe set out to be more than
                        just a cafe. It became a place that celebrates good
                        food, warm connections, and Filipino hospitality —
                        bringing a sense of comfort and belonging with every cup
                        and every meal.
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink/60 bg-beige px-8 py-6 text-center">
                <h2 className="mx-auto mb-3 max-w-[6ch] text-4xl leading-tight font-bold">
                    Our Mission
                </h2>
                <p className="mx-auto max-w-[16ch] text-lg leading-snug">
                    Every dish, every drink, every story shared — brings us
                    together in one warm space.
                </p>
            </div>
        </AppLayout>
    );
}
