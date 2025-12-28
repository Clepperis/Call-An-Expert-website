"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Alert } from "@/components/ui/alert";

const TECH_TAGS = [
    "Next.js", "React", "Node.js", "Python", "Stripe", "Auth/OAuth",
    "Postgres/DB", "API integration", "Deploy/Vercel", "Replit",
    "Cursor", "Supabase", "Firebase", "Docker", "Webhooks",
    "TypeScript", "No-code/Zapier"
];

const bookingSchema = z.object({
    title: z.string().min(1, "Required").max(80, "Max 80 characters"),
    description: z.string().min(1, "Required").max(2000, "Max 2000 characters"),
    tags: z.array(z.string()).min(1, "Select at least 1 tag").max(6, "Max 6 tags"),
    repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    logs: z.string().max(3000, "Max 3000 characters").optional(),
    timezone: z.string().min(1, "Required"),
    availability: z.array(z.object({
        day: z.string().min(1, "Required"),
        startTime: z.string().min(1, "Required"),
        endTime: z.string().min(1, "Required"),
    })).length(3, "Provide 3 availability windows"),
    consent: z.boolean().refine((val) => val === true, "You must agree"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { showToast } = useToast();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            availability: [
                { day: "", startTime: "", endTime: "" },
                { day: "", startTime: "", endTime: "" },
                { day: "", startTime: "", endTime: "" },
            ],
            tags: [],
            consent: false,
        },
    });

    if (status === "loading") {
        return <div className="max-w-3xl mx-auto px-4 py-20">Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.push("/api/auth/signin");
        return null;
    }

    const toggleTag = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : selectedTags.length < 6
                ? [...selectedTags, tag]
                : selectedTags;
        setSelectedTags(newTags);
        setValue("tags", newTags);
    };

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        try {
            let uploadPath: string | undefined;

            // Upload file if present
            if (uploadedFile) {
                const formData = new FormData();
                formData.append("file", uploadedFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) {
                    throw new Error("File upload failed");
                }

                const uploadData = await uploadRes.json();
                uploadPath = uploadData.path;
            }

            // Create request
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    uploadPath,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create request");
            }

            const { requestId } = await res.json();
            router.push(`/checkout/session?requestId=${requestId}`);
        } catch (error) {
            showToast("Failed to submit request. Please try again.", "error");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Tell us what's blocking you</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Problem details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Problem title <span className="text-red-500">*</span>
                            </label>
                            <Input {...register("title")} error={errors.title?.message} placeholder="e.g., Stripe webhook failing after API update" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Describe the block <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Include: What worked before? What changed? What did you try? What does success look like in 15 minutes?
                            </p>
                            <Textarea {...register("description")} error={errors.description?.message} rows={8} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tech tags <span className="text-red-500">*</span> (select 1-6)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {TECH_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded border text-sm ${selectedTags.includes(tag)
                                                ? "bg-primary text-white border-primary"
                                                : "bg-white border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Repo URL (optional)
                            </label>
                            <Input {...register("repoUrl")} error={errors.repoUrl?.message} placeholder="https://github.com/..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Error message / logs (optional)
                            </label>
                            <Textarea {...register("logs")} rows={6} placeholder="Paste error messages or relevant logs..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Upload zip (optional, max 25MB)
                            </label>
                            <input
                                type="file"
                                accept=".zip"
                                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm border border-gray-300 rounded px-3 py-2"
                            />
                            {uploadedFile && uploadedFile.size > 25 * 1024 * 1024 && (
                                <p className="mt-1 text-sm text-red-600">File must be under 25MB</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Availability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Your timezone <span className="text-red-500">*</span>
                            </label>
                            <Input {...register("timezone")} error={errors.timezone?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                3 availability windows <span className="text-red-500">*</span>
                            </label>
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="grid grid-cols-3 gap-3 mb-3">
                                    <Input
                                        {...register(`availability.${i}.day`)}
                                        placeholder="Day (e.g., Mon)"
                                        error={errors.availability?.[i]?.day?.message}
                                    />
                                    <Input
                                        {...register(`availability.${i}.startTime`)}
                                        type="time"
                                        error={errors.availability?.[i]?.startTime?.message}
                                    />
                                    <Input
                                        {...register(`availability.${i}.endTime`)}
                                        type="time"
                                        error={errors.availability?.[i]?.endTime?.message}
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Alert variant="warning">
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" {...register("consent")} className="mt-1" />
                        <span className="text-sm">
                            I confirm I won't upload secrets (API keys, passwords). <span className="text-red-500">*</span>
                        </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}
                </Alert>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Continue to payment"}
                </Button>
            </form>
        </div>
    );
}
