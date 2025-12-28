"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AGENCY_PLANS = [
    {
        tier: "starter",
        name: "Starter",
        price: 99,
        features: [
            "1 seat",
            "Standard matching",
            "Pay per session",
            "Email support",
        ],
    },
    {
        tier: "studio",
        name: "Studio",
        price: 249,
        features: [
            "Up to 5 seats",
            "Priority matching",
            "Team dashboard",
            "Email support",
        ],
    },
    {
        tier: "agency",
        name: "Agency",
        price: 499,
        features: [
            "Up to 20 seats",
            "Priority matching",
            "Consolidated billing",
            "Dedicated support",
        ],
    },
];

export default function AgencyPage() {
    const handleCheckout = async (tier: string) => {
        try {
            const res = await fetch("/api/checkout/agency", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier }),
            });

            if (!res.ok) throw new Error("Checkout failed");

            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Agency annual plans</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Get access for your entire team. One annual payment, priority matching, team management.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {AGENCY_PLANS.map((plan) => (
                    <Card key={plan.tier}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <div className="text-4xl font-bold mb-2">
                                    ${plan.price}
                                    <span className="text-base font-normal text-gray-600">/year</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => handleCheckout(plan.tier)}
                                className="w-full"
                                variant={plan.tier === "studio" ? "primary" : "outline"}
                            >
                                Choose {plan.name}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">All plans include:</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                    <span>• Expert matching</span>
                    <span>• 15-minute sessions</span>
                    <span>• Unlimited requests</span>
                    <span>• Payment per session</span>
                </div>
            </div>
        </div>
    );
}
