"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection } from "@/components/hero-section";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <HeroSection />

            {/* How it works */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">How it works</h2>
                        <p className="text-xl text-gray-600">
                            Get unblocked in 3 simple steps
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "1. Describe your problem",
                                description:
                                    "Share your context, tech stack, and what you're stuck on. You can upload logs or link a repo.",
                            },
                            {
                                title: "2. Book a session",
                                description:
                                    "Pick a 15-minute slot. $49 flat fee. We'll match you with an expert who knows your stack.",
                            },
                            {
                                title: "3. Get unstuck",
                                description:
                                    "Jump on a screenshare. We'll debug together, fix the issue, or point you in the exact right direction.",
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Card className="border-none shadow-lg h-full">
                                    <CardHeader>
                                        <CardTitle>{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            What we can help with
                        </h2>
                        <p className="text-xl text-gray-600">
                            Perfect for specific, tactical blockers
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Stripe webhook signature verification failing",
                            "Next.js App Router caching issues",
                            "Docker container networking errors",
                            "Tailwind CSS grid layout bugs",
                            "Prisma schema relation confusion",
                            "NextAuth Google provider 400 error",
                            "React useEffect infinite loops",
                            "TypeScript 'any' type refactoring",
                            "Vercel deployment build failures",
                        ].map((useCase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="p-4 rounded-lg bg-gray-50 border border-gray-100 font-medium text-gray-700 hover:border-blue-200 transition-colors"
                            >
                                {useCase}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
                        <p className="text-xl text-gray-600">
                            Pay only when you're stuck
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Session Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="h-full border-2 border-blue-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    POPULAR
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Single Session</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">$49</span>
                                        <span className="text-gray-600"> / 15 mins</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-8">
                                        {[
                                            "1-on-1 screenshare",
                                            "Expert matching",
                                            "Code review & debugging",
                                            "Follow-up notes",
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <svg
                                                    className="w-5 h-5 text-green-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/book" className="block">
                                        <Button className="w-full h-12 text-lg">
                                            Book Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Agency Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="h-full border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Agency Plan</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">$99+</span>
                                        <span className="text-gray-600"> / year</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-8">
                                        {[
                                            "Priority matching",
                                            "Multiple team seats",
                                            "Monthly consolidated billing",
                                            "Slack integration (soon)",
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/agency" className="block">
                                        <Button variant="outline" className="w-full h-12 text-lg">
                                            View Agency Plans
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">FAQ</h2>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "What if the expert can't solve it?",
                                a: "If we can't unblock you or point you in the right direction within 15 minutes, we'll refund your session. No questions asked.",
                            },
                            {
                                q: "Who are the experts?",
                                a: "They are Senior Engineers, CTOs, and specialized consultants who have deep experience in the specific tech stack you select.",
                            },
                            {
                                q: "Can I book a longer session?",
                                a: "Currently we focus on quick 15-minute unblocking sessions. If you need more time, you can book back-to-back sessions or discuss with the expert directly.",
                            },
                            {
                                q: "Do you sign NDAs?",
                                a: "Our Terms of Service includes a confidentiality clause. For Enterprise/Agency plans, we can sign custom NDAs.",
                            },
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{faq.q}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{faq.a}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
