import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "No session ID" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const { requestId } = session.metadata || {};

            // Ensure request is marked as paid (fallback if webhook didn't process)
            if (requestId) {
                await prisma.request.update({
                    where: { id: requestId },
                    data: { status: "paid" },
                });
            }

            return NextResponse.json({
                success: true,
                requestId,
            });
        }

        return NextResponse.json({ success: false });
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
