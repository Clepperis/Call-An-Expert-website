import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata = {
    title: "Last 20 - Get unstuck in 15 minutes",
    description: "Stuck at 80%? Book a 15-minute screenshare with an expert and ship.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Providers>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

