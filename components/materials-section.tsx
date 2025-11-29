"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const features = [
  {
    id: "light-control",
    name: "Light Control",
    description: "Perfect ambiance with adjustable light filtering options",
    backgroundImage: "/bright-modern-room-with-light-filtering-roller-bli.jpg",
  },
  {
    id: "privacy",
    name: "Privacy",
    description: "Complete privacy when you need it, without sacrificing style",
    backgroundImage: "/cozy-bedroom-with-blackout-blinds-privacy-elegant.jpg",
  },
  {
    id: "energy-saving",
    name: "Energy Saving",
    description: "Cellular shades that reduce heating and cooling costs year-round",
    backgroundImage: "/modern-home-interior-honeycomb-cellular-shades-ene.jpg",
  },
]

export function MaterialsSection() {
  const [activeFeature, setActiveFeature] = useState("light-control")

  const activeFeatureData = features.find((f) => f.id === activeFeature) || features[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="features">
      <div className="absolute inset-0 z-0">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="absolute inset-0"
            initial={{ opacity: feature.id === activeFeature ? 1 : 0 }}
            animate={{ opacity: feature.id === activeFeature ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={feature.backgroundImage || "/placeholder.svg"}
              alt={`${feature.name} - window blinds feature`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      <div className="absolute top-[120px] left-0 right-0 z-10">
        <div className="container-custom text-primary-foreground">
          <Reveal>
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold mb-6 text-7xl"
                >
                  <AnimatedText text={activeFeatureData.name} delay={0.2} />
                </motion.h2>
              </AnimatePresence>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl">
                Our premium window blinds are designed to enhance your home's comfort and style. From light filtering to
                complete blackout, we have the perfect solution for every room in your Okanagan home.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                    activeFeature === feature.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/20 text-primary-foreground hover:bg-background/30",
                  )}
                  onClick={() => setActiveFeature(feature.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
