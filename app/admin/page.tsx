import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminClient from "./admin-client";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    // Check if user is admin
    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    // Fetch all requests with user data
    const requests = await prisma.request.findMany({
        include: {
            user: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Fetch all expert applications
    const expertApplications = await prisma.expertApplication.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <AdminClient
            user={session.user}
            requests={requests}
            expertApplications={expertApplications}
        />
    );
}
