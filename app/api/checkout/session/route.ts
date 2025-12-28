import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PRICES } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { requestId } = await req.json();

        // Verify request exists and belongs to user
        const request = await prisma.request.findUnique({
            where: { id: requestId },
        });

        if (!request || request.userId !== session.user.id) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId: session.user.id,
                type: "session",
                requestId: requestId,
                stripeSessionId: "pending", // Will be updated after Stripe session creation
                amount: PRICES.session,
                currency: "usd",
                status: "created",
            },
        });

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Last 20 - 15-minute expert session",
                            description: request.title,
                        },
                        unit_amount: PRICES.session,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                requestId,
                paymentId: payment.id,
                userId: session.user.id,
            },
            success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
            customer_email: session.user.email || undefined,
        });

        // Update payment with Stripe session ID
        await prisma.payment.update({
            where: { id: payment.id },
            data: { stripeSessionId: checkoutSession.id },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Checkout session error:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}
