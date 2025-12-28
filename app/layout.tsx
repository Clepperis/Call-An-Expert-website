"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Last 20 - Get unstuck in 15 minutes</title>
                <meta name="description" content="Stuck at 80%? Book a 15-minute screenshare with an expert and ship." />
            </head>
            <body className="flex flex-col min-h-screen">
                <SessionProvider>
                    <ToastProvider>
                        <Navbar />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </ToastProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
