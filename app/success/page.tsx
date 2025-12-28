"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [requestId, setRequestId] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            // Verify payment on the server
            fetch(`/api/verify-payment?session_id=${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    setRequestId(data.requestId);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    if (loading) {
        return <div className="max-w-3xl mx-auto px-4 py-20">Verifying payment...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Alert variant="success" className="mb-6">
                <h2 className="text-xl font-bold mb-2">Payment received!</h2>
                <p>Thank you for booking a session with Last 20.</p>
            </Alert>

            <Card>
                <CardContent className="py-6 space-y-4">
                    <h3 className="text-lg font-semibold">What happens next?</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>• We'll email you within 2 hours with an expert match and meeting link</li>
                        <li>• Check your email for confirmation details</li>
                        <li>• You can view your request status anytime</li>
                    </ul>
                    {requestId && (
                        <div className="pt-4">
                            <Link href={`/requests/${requestId}`}>
                                <Button>View request status</Button>
                            </Link>
                        </div>
                    )}
                    <div className="pt-4">
                        <Link href="/requests">
                            <Button variant="outline">View all requests</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
