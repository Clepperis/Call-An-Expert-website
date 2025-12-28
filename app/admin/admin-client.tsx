"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import {
    updateRequestStatus,
    updateRequestDetails,
    updateExpertApplicationStatus,
} from "./actions";

export default function AdminClient({
    user,
    requests,
    expertApplications,
}: {
    user: any;
    requests: any[];
    expertApplications: any[];
}) {
    const [activeTab, setActiveTab] = useState<"requests" | "experts">("requests");
    const [editingRequest, setEditingRequest] = useState<string | null>(null);
    const [meetingLink, setMeetingLink] = useState("");
    const [adminNotes, setAdminNotes] = useState("");
    const { showToast } = useToast();

    // Check if user is admin
    if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        return null; // This won't render, but keeps TypeScript happy
    }

    const handleStatusChange = async (requestId: string, newStatus: string) => {
        try {
            await updateRequestStatus(requestId, newStatus);
            showToast("Status updated", "success");
        } catch (error) {
            showToast("Failed to update status", "error");
        }
    };

    const handleSaveDetails = async (requestId: string) => {
        try {
            await updateRequestDetails(requestId, meetingLink, adminNotes);
            setEditingRequest(null);
            setMeetingLink("");
            setAdminNotes("");
            showToast("Details saved", "success");
        } catch (error) {
            showToast("Failed to save details", "error");
        }
    };

    const handleExpertStatus = async (applicationId: string, status: string) => {
        try {
            await updateExpertApplicationStatus(applicationId, status);
            showToast("Application updated", "success");
        } catch (error) {
            showToast("Failed to update application", "error");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Admin dashboard</h1>

            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab("requests")}
                    className={`px-4 py-2 font-medium ${activeTab === "requests"
                            ? "border-b-2 border-primary"
                            : "text-gray-600"
                        }`}
                >
                    Requests ({requests.length})
                </button>
                <button
                    onClick={() => setActiveTab("experts")}
                    className={`px-4 py-2 font-medium ${activeTab === "experts"
                            ? "border-b-2 border-primary"
                            : "text-gray-600"
                        }`}
                >
                    Expert applications ({expertApplications.length})
                </button>
            </div>

            {activeTab === "requests" && (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <Card key={request.id}>
                            <CardContent className="py-4">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1">{request.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                User: {request.user.email}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {request.tags.map((tag: string) => (
                                                    <Badge key={tag} variant="default">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {new Date(request.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <select
                                                value={request.status}
                                                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="submitted">Submitted</option>
                                                <option value="paid">Paid</option>
                                                <option value="matched">Matched</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setEditingRequest(request.id);
                                                    setMeetingLink(request.meetingLink || "");
                                                    setAdminNotes(request.adminNotes || "");
                                                }}
                                            >
                                                Edit details
                                            </Button>
                                        </div>
                                    </div>

                                    {editingRequest === request.id && (
                                        <div className="border-t pt-4 space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Meeting link
                                                </label>
                                                <Input
                                                    value={meetingLink}
                                                    onChange={(e) => setMeetingLink(e.target.value)}
                                                    placeholder="https://meet.google.com/..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Admin notes
                                                </label>
                                                <Textarea
                                                    value={adminNotes}
                                                    onChange={(e) => setAdminNotes(e.target.value)}
                                                    rows={3}
                                                    placeholder="Internal notes for this request..."
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={() => handleSaveDetails(request.id)}>
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setEditingRequest(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {requests.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center text-gray-600">
                                No requests yet
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {activeTab === "experts" && (
                <div className="space-y-4">
                    {expertApplications.map((app) => (
                        <Card key={app.id}>
                            <CardContent className="py-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">{app.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{app.email}</p>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {app.tags.map((tag: string) => (
                                                <Badge key={tag}>{tag}</Badge>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">{app.bio}</p>
                                        <p className="text-sm text-gray-600">
                                            Rate: ${app.ratePer15} per 15 min
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(app.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Badge
                                            variant={
                                                app.status === "approved"
                                                    ? "success"
                                                    : app.status === "rejected"
                                                        ? "error"
                                                        : "default"
                                            }
                                        >
                                            {app.status}
                                        </Badge>
                                        {app.status === "pending" && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleExpertStatus(app.id, "approved")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleExpertStatus(app.id, "rejected")}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {expertApplications.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center text-gray-600">
                                No expert applications yet
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
