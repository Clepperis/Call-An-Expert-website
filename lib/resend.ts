import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function sendRequestConfirmationEmail(
    to: string,
    requestData: {
        id: string;
        title: string;
        tags: string[];
    }
) {
    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject: "Last 20 — Payment confirmed",
            html: `
        <h2>Payment Received</h2>
        <p>We've received your payment for a 15-minute expert session.</p>
        <p><strong>Request ID:</strong> ${requestData.id}</p>
        <p><strong>Problem:</strong> ${requestData.title}</p>
        <p><strong>Tags:</strong> ${requestData.tags.join(", ")}</p>
        <hr />
        <p><strong>Next steps:</strong></p>
        <p>We'll email you within 2 hours with an expert match and meeting link.</p>
        <p>You can view your request status at: <a href="${process.env.NEXTAUTH_URL}/requests/${requestData.id}">View Request</a></p>
      `,
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

export async function sendExpertApplicationConfirmationEmail(
    to: string,
    name: string
) {
    try {
        await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject: "Last 20 — Expert application received",
            html: `
        <h2>Application Received</h2>
        <p>Hi ${name},</p>
        <p>Thanks for applying to join Last 20 as an expert. We'll review your application and get back to you soon.</p>
      `,
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}
