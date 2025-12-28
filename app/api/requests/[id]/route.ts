import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const request = await prisma.request.findUnique({
            where: { id: params.id },
        });

        if (!request) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ request });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch request" }, { status: 500 });
    }
}
