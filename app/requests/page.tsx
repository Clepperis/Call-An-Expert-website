"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RequestsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
            return;
        }

        if (status === "authenticated") {
            fetch("/api/requests")
                .then((res) => res.json())
                .then((data) => {
                    setRequests(data.requests || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [status, router]);

    if (loading) {
        return <div className="max-w-5xl mx-auto px-4 py-20">Loading...</div>;
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "submitted":
                return "default" as const;
            case "paid":
                return "warning" as const;
            case "matched":
                return "success" as const;
            case "closed":
                return "default" as const;
            default:
                return "default" as const;
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">My requests</h1>

            {requests.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center text-gray-600">
                        <p className="mb-4">You haven't submitted any requests yet.</p>
                        <Link href="/book" className="text-primary hover:underline">
                            Book your first session →
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <Link key={request.id} href={`/requests/${request.id}`}>
                            <Card className="hover:border-gray-400 transition-colors cursor-pointer">
                                <CardContent className="py-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-2">{request.title}</h3>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {request.tags.slice(0, 3).map((tag: string) => (
                                                    <Badge key={tag} variant="default">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {request.tags.length > 3 && (
                                                    <Badge variant="default">+{request.tags.length - 3}</Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <Badge variant={getStatusVariant(request.status)}>
                                            {request.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
