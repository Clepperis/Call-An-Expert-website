import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        if (!file.name.endsWith(".zip")) {
            return NextResponse.json({ error: "Only .zip files allowed" }, { status: 400 });
        }

        // Validate file size (25MB)
        if (file.size > 25 * 1024 * 1024) {
            return NextResponse.json({ error: "File must be under 25MB" }, { status: 400 });
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "uploads");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const filename = `${timestamp}-${randomId}.zip`;
        const filepath = join(uploadsDir, filename);

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        return NextResponse.json({ path: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
