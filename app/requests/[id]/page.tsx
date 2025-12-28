"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default function RequestDetailPage() {
    const params = useParams();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetch(`/api/requests/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setRequest(data.request);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [params.id]);

    if (loading) {
        return <div className="max-w-4xl mx-auto px-4 py-20">Loading...</div>;
    }

    if (!request) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <Alert variant="error">Request not found</Alert>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex justify-between items-start mb-8">
                <h1 className="text-3xl font-bold">Request details</h1>
                <Badge
                    variant={
                        request.status === "matched"
                            ? "success"
                            : request.status === "paid"
                                ? "warning"
                                : "default"
                    }
                >
                    {request.status}
                </Badge>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Problem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="font-semibold text-lg mb-3">{request.title}</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{request.description}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-600 mb-2">Tags</div>
                            <div className="flex flex-wrap gap-2">
                                {request.tags.map((tag: string) => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </div>
                        </div>

                        {request.repoUrl && (
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Repository</div>
                                <a
                                    href={request.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    {request.repoUrl}
                                </a>
                            </div>
                        )}

                        {request.logs && (
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Logs / Error messages</div>
                                <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                                    {request.logs}
                                </pre>
                            </div>
                        )}

                        {request.uploadPath && (
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Uploaded file</div>
                                <div className="text-gray-700">File uploaded</div>
                            </div>
                        )}

                        <div>
                            <div className="text-sm text-gray-600 mb-1">Timezone</div>
                            <div>{request.timezone}</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-600 mb-1">Submitted</div>
                            <div>{new Date(request.createdAt).toLocaleString()}</div>
                        </div>
                    </CardContent>
                </Card>

                {request.status === "submitted" && (
                    <Alert variant="warning">
                        <p className="mb-4">This request hasn't been paid yet.</p>
                        <Link href={`/checkout/session?requestId=${request.id}`}>
                            <Button>Pay now</Button>
                        </Link>
                    </Alert>
                )}

                {request.status === "paid" && (
                    <Alert variant="info">
                        <p>We're matching you with an expert. You'll receive an email within 2 hours.</p>
                    </Alert>
                )}

                {request.status === "matched" && request.meetingLink && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Meeting details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="text-sm text-gray-600 mb-1">Meeting link</div>
                                <a
                                    href={request.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-lg"
                                >
                                    Join meeting →
                                </a>
                            </div>
                            {request.adminNotes && (
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Notes from admin</div>
                                    <p className="text-gray-700 whitespace-pre-wrap">{request.adminNotes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="mt-8">
                <Link href="/requests">
                    <Button variant="outline">← Back to requests</Button>
                </Link>
            </div>
        </div>
    );
}
