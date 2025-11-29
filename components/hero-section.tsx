"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, Star } from "lucide-react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6]);

    return (
        <section
            ref={containerRef}
            className="relative h-[100svh] min-h-[700px] overflow-hidden"
        >
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale, y: imageY }}
            >
                <Image
                    src="/modern-living-room-with-large-windows-and-elegant-.jpg"
                    alt="Luxurious living room with premium window blinds overlooking Okanagan Lake"
                    fill
                    className="object-cover backdrop-blur-sm"
                    priority
                    sizes="100vw"
                    quality={90}
                />
                {/* Warm overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#0F1311]/60 via-[#0F1311]/40 to-[#0F1311]/70"
                    style={{ opacity: overlayOpacity }}
                />
                {/* Terracotta gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C4785A]/20 via-transparent to-transparent" />
                {/* Left-to-right gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F1311]/70 via-[#0F1311]/50 to-[#0F1311]/30" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0F1311]/30 to-transparent z-10" />

            {/* Side Accent Line */}
            <motion.div
                className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C4785A] to-transparent z-20"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
            />

            {/* Main Content */}
            <motion.div
                className="relative z-20 h-full flex flex-col justify-center"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="container-luxe">
                    <div className="max-w-4xl">
                        {/* Eyebrow */}
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <span className="block w-12 h-[1px] bg-[#C4785A]" />
                            <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/80 font-medium">
                                Kelowna & Okanagan Valley
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            className="font-display text-[#FAF7F2] mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.span
                                className="block text-display-xl leading-[0.9]"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                Crafted for
                            </motion.span>
                            <motion.span
                                className="block text-display-xl leading-[0.9] italic font-light text-[#C4785A]"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                lakeside living.
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-lg md:text-xl text-[#FAF7F2]/85 max-w-xl leading-relaxed mb-10"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            Bespoke window coverings designed for the Okanagan
                            lifestyle. From sun-drenched mornings to vineyard
                            sunsets.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <motion.a
                                href="#contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C4785A] text-[#FAF7F2] text-sm font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#A65D3F]"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Book Free Consultation
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </motion.a>
                            <motion.a
                                href="#products"
                                className="inline-flex items-center gap-3 px-8 py-4 border border-[#FAF7F2]/40 text-[#FAF7F2] text-sm font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#FAF7F2]/10 hover:border-[#FAF7F2]/60"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Explore Collection
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Info Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <div className="bg-gradient-to-t from-[#0F1311]/80 to-transparent pt-20 pb-8">
                    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-[#FAF7F2]/70 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="text-[#C9A962] fill-[#C9A962]"
                                            />
                                        ))}
                                    </div>
                                    <span>5.0 Rating</span>
                                </div>
                                <span className="hidden md:block w-[1px] h-4 bg-[#FAF7F2]/20" />
                                <span>Free In-Home Estimates</span>
                                <span className="hidden md:block w-[1px] h-4 bg-[#FAF7F2]/20" />
                                <span>Professional Installation</span>
                            </div>

                            {/* Scroll Indicator */}
                            <motion.div
                                className="flex flex-col items-center gap-2 text-[#FAF7F2]/60"
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <span className="text-xs uppercase tracking-[0.2em]">
                                    Scroll
                                </span>
                                <ArrowDown size={16} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>


        </section>
    );
}
