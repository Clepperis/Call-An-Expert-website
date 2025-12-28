"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "border-b border-gray-200/50 bg-white/80 backdrop-blur-md"
                : "border-b border-transparent bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className={`text-xl font-bold ${scrolled ? "text-gray-900" : "text-white"}`}>
                            Last 20
                        </Link>
                        <div className="hidden md:flex gap-6">
                            {["How it works", "Pricing", "FAQ"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
                                    className={`hover:opacity-80 transition-colors ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"
                                        }`}
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                href="/experts"
                                className={`hover:opacity-80 transition-colors ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"
                                    }`}
                            >
                                Become an expert
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <Link href="/requests">
                                    <Button variant="ghost" size="sm">
                                        My Requests
                                    </Button>
                                </Link>
                                <Link href="/book">
                                    <Button size="sm">Book a session</Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" onClick={() => signIn()}>
                                    Sign in
                                </Button>
                                <Link href="/book">
                                    <Button size="sm">Book a session</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
