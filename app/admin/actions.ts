"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateRequestStatus(requestId: string, status: string) {
    await prisma.request.update({
        where: { id: requestId },
        data: { status: status as any },
    });
    revalidatePath("/admin");
}

export async function updateRequestDetails(
    requestId: string,
    meetingLink: string,
    adminNotes: string
) {
    await prisma.request.update({
        where: { id: requestId },
        data: {
            meetingLink: meetingLink || null,
            adminNotes: adminNotes || null,
        },
    });
    revalidatePath("/admin");
    revalidatePath(`/requests/${requestId}`);
}

export async function updateExpertApplicationStatus(
    applicationId: string,
    status: string
) {
    await prisma.expertApplication.update({
        where: { id: applicationId },
        data: { status: status as any },
    });
    revalidatePath("/admin");
}
