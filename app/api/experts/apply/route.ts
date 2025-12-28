import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendExpertApplicationConfirmationEmail } from "@/lib/resend";
import { z } from "zod";

const expertSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    tags: z.array(z.string()),
    ratePer15: z.number(),
    bio: z.string(),
    timezone: z.string().optional(),
    languages: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = expertSchema.parse(body);

        const application = await prisma.expertApplication.create({
            data: {
                name: data.name,
                email: data.email,
                linksJson: {
                    linkedin: data.linkedin,
                    github: data.github,
                },
                tags: data.tags,
                ratePer15: data.ratePer15,
                bio: data.bio,
                timezone: data.timezone,
                languages: data.languages,
                status: "pending",
            },
        });

        // Send confirmation email
        await sendExpertApplicationConfirmationEmail(data.email, data.name);

        return NextResponse.json({ success: true, applicationId: application.id });
    } catch (error) {
        console.error("Expert application error:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}
