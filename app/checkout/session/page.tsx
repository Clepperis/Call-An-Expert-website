"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";

export default function CheckoutSessionPage() {
    const searchParams = useSearchParams();
    const requestId = searchParams.get("requestId");
    const { data: session, status } = useSession();
    const router = useRouter();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
            return;
        }

        if (status === "authenticated" && requestId) {
            fetch(`/api/requests/${requestId}`)
                .then((res) => res.json())
                .then((data) => {
                    setRequest(data.request);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [status, requestId, router]);

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch("/api/checkout/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId }),
            });

            if (!res.ok) throw new Error("Checkout failed");

            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            alert("Payment failed. Please try again.");
            setIsProcessing(false);
        }
    };

    if (loading) {
        return <div className="max-w-3xl mx-auto px-4 py-20">Loading...</div>;
    }

    if (!request) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20">
                <Alert variant="error">Request not found</Alert>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Review and pay</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Request summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="text-sm text-gray-600 mb-1">Problem</div>
                        <div className="font-semibold">{request.title}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-1">Description</div>
                        <div className="text-gray-700">{request.description}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                            {request.tags.map((tag: string) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-1">Timezone</div>
                        <div>{request.timezone}</div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="py-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <div className="text-lg font-semibold">15-minute expert session</div>
                            <div className="text-sm text-gray-600">One-time payment</div>
                        </div>
                        <div className="text-3xl font-bold">$49</div>
                    </div>
                    <Button
                        onClick={handleCheckout}
                        size="lg"
                        className="w-full"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Pay $49"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
