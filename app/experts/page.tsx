"use client";

import { useState } from "react";
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

const expertSchema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    tags: z.array(z.string()).min(1, "Select at least 1 tag"),
    ratePer15: z.number().min(1, "Rate must be at least 1"),
    bio: z.string().min(1, "Required").max(600, "Max 600 characters"),
    timezone: z.string().optional(),
    languages: z.string().optional(),
});

type ExpertFormData = z.infer<typeof expertSchema>;

export default function ExpertsPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ExpertFormData>({
        resolver: zodResolver(expertSchema),
        defaultValues: {
            ratePer15: 40,
            tags: [],
        },
    });

    const toggleTag = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newTags);
        setValue("tags", newTags);
    };

    const onSubmit = async (data: ExpertFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/experts/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to submit application");
            }

            setSubmitted(true);
        } catch (error) {
            showToast("Failed to submit application. Please try again.", "error");
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12">
                <Alert variant="success">
                    <h2 className="text-xl font-bold mb-2">Application received!</h2>
                    <p>Thanks for applying. We'll review your application and get back to you soon.</p>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Become an expert</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Help builders get unstuck. Earn money solving problems you've already solved. Work on your schedule.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Flexible hours</h3>
                    <p className="text-gray-600">Set your own availability. Accept sessions when you want.</p>
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Good pay</h3>
                    <p className="text-gray-600">Set your own rate. Average is $40 per 15-minute session.</p>
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Help builders</h3>
                    <p className="text-gray-600">Share your expertise and get people unstuck fast.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Application</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <Input {...register("name")} error={errors.name?.message} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <Input {...register("email")} type="email" error={errors.email?.message} />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                                <Input {...register("linkedin")} error={errors.linkedin?.message} placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                <Input {...register("github")} error={errors.github?.message} placeholder="https://github.com/..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Skills / tech tags <span className="text-red-500">*</span>
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
                                Rate per 15 minutes (USD) <span className="text-red-500">*</span>
                            </label>
                            <Input
                                {...register("ratePer15", { valueAsNumber: true })}
                                type="number"
                                error={errors.ratePer15?.message}
                            />
                            <p className="text-sm text-gray-600 mt-1">Suggestion: $40</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Short bio <span className="text-red-500">*</span> (max 600 characters)
                            </label>
                            <Textarea
                                {...register("bio")}
                                error={errors.bio?.message}
                                rows={6}
                                placeholder="Tell us about your experience and what problems you're best at solving..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Timezone</label>
                                <Input {...register("timezone")} placeholder="e.g., America/New_York" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Languages</label>
                                <Input {...register("languages")} placeholder="e.g., English, Spanish" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit application"}
                </Button>
            </form>
        </div>
    );
}
