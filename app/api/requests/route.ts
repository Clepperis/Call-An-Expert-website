import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const requestSchema = z.object({
    title: z.string().min(1).max(80),
    description: z.string().min(1).max(2000),
    tags: z.array(z.string()).min(1).max(6),
    repoUrl: z.string().optional(),
    logs: z.string().optional(),
    timezone: z.string().min(1),
    availability: z.array(z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    })),
    uploadPath: z.string().optional(),
    consent: z.boolean(),
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const data = requestSchema.parse(body);

        const request = await prisma.request.create({
            data: {
                userId: session.user.id,
                title: data.title,
                description: data.description,
                tags: data.tags,
                repoUrl: data.repoUrl || null,
                logs: data.logs || null,
                timezone: data.timezone,
                availabilityJson: data.availability,
                uploadPath: data.uploadPath || null,
                status: "submitted",
            },
        });

        return NextResponse.json({ requestId: request.id });
    } catch (error) {
        console.error("Request creation error:", error);
        return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const requests = await prisma.request.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ requests });
    } catch (error) {
        console.error("Request fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
}
