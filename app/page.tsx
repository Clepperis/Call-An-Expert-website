"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function HomePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Stuck at 80%? Get unstuck in 15 minutes.
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Upload context. Get matched with someone who's hit that wall before. Quick screenshare. Ship.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/book">
                        <Button size="lg">Book a session</Button>
                    </Link>
                    <Link href="/experts">
                        <Button size="lg" variant="outline">
                            Become an expert
                        </Button>
                    </Link>
                </div>
                <div className="mt-8 text-sm text-gray-500">
                    Secure payments • Private by default • Cancel anytime
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-2">Describe the block + upload context</h3>
                            <p className="text-gray-600">
                                Tell us what's blocking you. Share your repo, error logs, or zip up your project.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Pay and pick a time window</h3>
                            <p className="text-gray-600">
                                Quick checkout. Tell us when you're available for a 15-minute screenshare.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Hop on a 15-min screenshare and unblock</h3>
                            <p className="text-gray-600">
                                Get matched with an expert who's solved this before. Get unstuck fast.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Common blockers we help with</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Stripe webhook failing after API update",
                            "Auth redirect loop",
                            "Vercel deploy works locally but fails in production",
                            "React state edge case",
                            "Zapier integration stopped triggering",
                            "Database migration breaking in production",
                        ].map((useCase, i) => (
                            <Card key={i}>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700">{useCase}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>

                    {/* Session pricing */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold text-center mb-8">One-time sessions</h3>
                        <Card className="max-w-md mx-auto text-center">
                            <CardHeader>
                                <CardTitle>15-minute expert session</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold mb-4">$49</div>
                                <ul className="text-left space-y-2 text-gray-700">
                                    <li>• 15-minute screenshare</li>
                                    <li>• Matched expert in your stack</li>
                                    <li>• Direct help with your blocker</li>
                                </ul>
                                <Link href="/book">
                                    <Button className="w-full mt-6">Book now</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Agency pricing */}
                    <div>
                        <h3 className="text-2xl font-semibold text-center mb-8">Agency annual plans</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Starter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold mb-4">$99<span className="text-base font-normal text-gray-600">/year</span></div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• 1 seat</li>
                                        <li>• Standard matching</li>
                                        <li>• Pay per session</li>
                                    </ul>
                                    <Link href="/agency">
                                        <Button variant="outline" className="w-full mt-6">Choose plan</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Studio</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold mb-4">$249<span className="text-base font-normal text-gray-600">/year</span></div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Up to 5 seats</li>
                                        <li>• Priority matching</li>
                                        <li>• Team dashboard</li>
                                    </ul>
                                    <Link href="/agency">
                                        <Button variant="outline" className="w-full mt-6">Choose plan</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Agency</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold mb-4">$499<span className="text-base font-normal text-gray-600">/year</span></div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• Up to 20 seats</li>
                                        <li>• Priority matching</li>
                                        <li>• Consolidated billing</li>
                                    </ul>
                                    <Link href="/agency">
                                        <Button variant="outline" className="w-full mt-6">Choose plan</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "How quickly will I get matched?",
                                a: "We aim to match you with an expert within 2 hours during business hours.",
                            },
                            {
                                q: "What if the session doesn't solve my problem?",
                                a: "We focus on getting you unstuck, not guaranteeing a complete solution. Most blockers can be identified and addressed in 15 minutes.",
                            },
                            {
                                q: "Can I upload sensitive code?",
                                a: "We recommend you don't upload API keys or passwords. Share context carefully.",
                            },
                            {
                                q: "What tech stacks do you support?",
                                a: "We have experts across Next.js, React, Node.js, Python, Stripe, auth systems, databases, and more.",
                            },
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-gray-200 pb-4">
                                <button
                                    className="w-full text-left font-semibold flex justify-between items-center"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    {faq.q}
                                    <span className="text-gray-500">{openFaq === i ? "−" : "+"}</span>
                                </button>
                                {openFaq === i && (
                                    <p className="mt-2 text-gray-600">{faq.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
