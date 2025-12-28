"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

export function HeroSection() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Background Video / Image Fallback */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/hero-image.jpg")' }}
            >
                <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover relative z-0"
                    poster="/hero-poster.jpg"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                    <source src="/hero.webm" type="video/webm" />
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                        15-minute screenshare • from $49
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Stuck at 80%? <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                            Get unstuck in 15 minutes.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                    Upload context. Get matched with someone who's hit that wall before. Quick screenshare. Ship.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/book">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white border-0">
                                Book a Session ($49)
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="/experts">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-lg text-white border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                            >
                                Become an Expert
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
