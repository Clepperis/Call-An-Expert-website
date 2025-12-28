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

        const { tier } = await req.json();

        if (!["starter", "studio", "agency"].includes(tier)) {
            return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
        }

        const amount = PRICES.agency[tier as keyof typeof PRICES.agency];

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId: session.user.id,
                type: "agency",
                stripeSessionId: "pending",
                amount,
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
                            name: `Last 20 - ${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan`,
                            description: "Annual agency plan",
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                tier,
                paymentId: payment.id,
                userId: session.user.id,
                type: "agency",
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
        console.error("Agency checkout error:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}
