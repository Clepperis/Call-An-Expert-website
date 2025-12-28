"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-xl font-bold">
                            Last 20
                        </Link>
                        <div className="hidden md:flex gap-6">
                            <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900">
                                How it works
                            </Link>
                            <Link href="/#pricing" className="text-gray-700 hover:text-gray-900">
                                Pricing
                            </Link>
                            <Link href="/#faq" className="text-gray-700 hover:text-gray-900">
                                FAQ
                            </Link>
                            <Link href="/experts" className="text-gray-700 hover:text-gray-900">
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
