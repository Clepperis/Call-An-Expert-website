import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendRequestConfirmationEmail } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const { requestId, paymentId, userId, tier, type } = session.metadata || {};

        try {
            // Update payment status
            if (paymentId) {
                await prisma.payment.update({
                    where: { id: paymentId },
                    data: { status: "paid" },
                });
            }

            // Handle session payment
            if (type !== "agency" && requestId && userId) {
                // Update request status
                const request = await prisma.request.update({
                    where: { id: requestId },
                    data: { status: "paid" },
                    include: { user: true },
                });

                // Send confirmation email
                if (request.user.email) {
                    await sendRequestConfirmationEmail(request.user.email, {
                        id: request.id,
                        title: request.title,
                        tags: request.tags,
                    });
                }
            }

            // Handle agency payment
            if (type === "agency" && tier && userId) {
                // Create or update agency account
                await prisma.agencyAccount.upsert({
                    where: { ownerUserId: userId },
                    update: {
                        tier: tier as any,
                        status: "active",
                    },
                    create: {
                        ownerUserId: userId,
                        tier: tier as any,
                        status: "active",
                    },
                });

                // Link payment to agency account
                const agencyAccount = await prisma.agencyAccount.findUnique({
                    where: { ownerUserId: userId },
                });

                if (agencyAccount && paymentId) {
                    await prisma.payment.update({
                        where: { id: paymentId },
                        data: { agencyAccountId: agencyAccount.id },
                    });
                }
            }
        } catch (error) {
            console.error("Webhook processing error:", error);
            return NextResponse.json({ error: "Processing failed" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
