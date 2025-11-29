"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Sun, Moon, Thermometer, Check, MapPin, Wrench } from "lucide-react"

const features = [
  {
    id: "light-control",
    name: "Light Control",
    tagline: "Master the sun",
    description: "From gentle filtering to complete blackout, control exactly how much natural light enters your space throughout the day.",
    backgroundImage: "/bright-modern-room-with-light-filtering-roller-bli.jpg",
    icon: Sun,
    benefits: ["UV protection", "Glare reduction", "Adjustable opacity"],
  },
  {
    id: "privacy",
    name: "Privacy",
    tagline: "Your sanctuary",
    description: "Create intimate spaces without sacrificing style. Our solutions offer privacy exactly when and where you need it.",
    backgroundImage: "/cozy-bedroom-with-blackout-blinds-privacy-elegant.jpg",
    icon: Moon,
    benefits: ["Top-down options", "View-through fabrics", "Room darkening"],
  },
  {
    id: "energy-saving",
    name: "Energy Saving",
    tagline: "Comfort year-round",
    description: "Honeycomb cellular shades trap air in distinct pockets, reducing energy transfer and keeping your home comfortable in every season.",
    backgroundImage: "/modern-home-interior-honeycomb-cellular-shades-ene.jpg",
    icon: Thermometer,
    benefits: ["Insulating cells", "Reduced HVAC costs", "Eco-friendly"],
  },
  {
    id: "locally-owned",
    name: "Locally Owned",
    tagline: "Okanagan proud",
    description: "We're your neighbors, not a faceless corporation. As a locally owned Okanagan business, we're invested in our community and your complete satisfaction.",
    backgroundImage: "/kelowna-aerial.jpg",
    icon: MapPin,
    benefits: ["Family operated", "Community focused", "Personal service"],
  },
  {
    id: "professional-installation",
    name: "Professional Installation",
    tagline: "Done right, guaranteed",
    description: "Our trained technicians handle every installation with precision and care. We measure twice, install once, and stand behind our work with a satisfaction guarantee.",
    backgroundImage: "/professional-installation-service.jpg",
    icon: Wrench,
    benefits: ["Expert technicians", "Precise fitting", "Warranty included"],
  },
]

export function MaterialsSection() {
  const [activeFeature, setActiveFeature] = useState("light-control")
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  const activeFeatureData = features.find((f) => f.id === activeFeature) || features[0]
  const ActiveIcon = activeFeatureData.icon

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden" 
      id="about"
    >
      {/* Background Images with Transitions - All preloaded */}
      <div className="absolute inset-0 z-0">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: feature.id === activeFeature ? 1 : 0,
              scale: feature.id === activeFeature ? 1 : 1.1
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="relative w-full h-full"
              style={{ scale: imageScale }}
            >
              <Image
                src={feature.backgroundImage || "/placeholder.svg"}
                alt={`${feature.name} - window blinds feature`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 3}
                loading={index < 3 ? "eager" : "lazy"}
              />
            </motion.div>
          </motion.div>
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1311]/90 via-[#0F1311]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/50 via-transparent to-[#0F1311]/30" />
      </div>

      {/* Content */}
      <div className="container-luxe relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/60 font-medium">
                  Why Choose Us
                </span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2] leading-[1.1] mb-8">
                Designed for how
                <span className="block italic font-light text-[#8A9A5B]">you live.</span>
              </h2>
              
              <p className="text-lg text-[#FAF7F2]/70 leading-relaxed max-w-md mb-12">
                Every home in the Okanagan is unique. Our window coverings are crafted to 
                enhance your lifestyle—from morning yoga to evening wine.
              </p>
            </motion.div>

            {/* Feature Tabs */}
            <motion.div 
              className="space-y-2 md:space-y-4"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {features.map((feature) => {
                const Icon = feature.icon
                const isActive = activeFeature === feature.id
                
                return (
                  <button
                    key={feature.id}
                    className={cn(
                      "w-full text-left p-3 md:p-5 lg:p-6 border transition-all duration-500 group backdrop-blur-2xl shadow-xl",
                      isActive 
                        ? "border-[#8A9A5B] bg-[#1a1f1d]/70 shadow-[#8A9A5B]/10" 
                        : "border-white/20 bg-[#1a1f1d]/50 hover:border-white/40 hover:bg-[#1a1f1d]/60"
                    )}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={cn(
                        "w-9 h-9 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center transition-colors duration-300 border-2",
                        isActive ? "bg-[#8A9A5B] text-[#FAF7F2] border-[#8A9A5B]" : "bg-[#FAF7F2]/10 text-[#FAF7F2]/60 border-[#FAF7F2]/30"
                      )}>
                        <Icon size={18} className="md:w-5 md:h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0.5 md:gap-2">
                          <h3 className={cn(
                            "font-display text-base md:text-xl transition-colors duration-300 truncate",
                            isActive ? "text-[#FAF7F2]" : "text-[#FAF7F2]/70"
                          )}>
                            {feature.name}
                          </h3>
                          <span className={cn(
                            "text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-300 flex-shrink-0",
                            isActive ? "text-[#FAF7F2]/60" : "text-[#FAF7F2]/40"
                          )}>
                            {feature.tagline}
                          </span>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {/* Mobile: Show description inline */}
                              <p className="text-sm text-[#FAF7F2]/80 leading-relaxed mt-2 lg:hidden">
                                {feature.description}
                              </p>
                              <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3">
                                {feature.benefits.map((benefit) => (
                                  <span 
                                    key={benefit}
                                    className="inline-flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs text-[#FAF7F2]/80 bg-[#FAF7F2]/10 px-2 md:px-3 py-1 md:py-1.5"
                                  >
                                    <Check size={10} className="md:w-3 md:h-3 text-[#8A9A5B]" />
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column - Large Feature Display */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] max-w-md ml-auto">
              {/* Outer decorative frame - olive/sage green */}
              <div className="absolute -inset-4 border-[3px] border-[#8A9A5B]/80" />
              {/* Inner decorative frame - light cream/white */}
              <div className="absolute -inset-1 border-[2px] border-[#FAF7F2]/50" />
              
              {/* Glassy backdrop with enhanced blur for readability */}
              <div className="absolute inset-0 bg-[#FAF7F2]/5 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/10" />
              
              {/* Feature icon display */}
              <div className="relative h-full flex flex-col items-center justify-center text-center p-8 lg:p-12">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-sm"
                >
                  {/* Glowing icon container */}
                  <div className="relative w-20 h-20 mx-auto mb-10">
                    {/* Soft outer glow */}
                    <div className="absolute inset-0 bg-[#FAF7F2]/10 blur-xl scale-150" />
                    {/* Icon square */}
                    <div className="relative w-full h-full bg-[#FAF7F2]/10 border border-[#FAF7F2]/30 flex items-center justify-center">
                      <ActiveIcon size={32} strokeWidth={1.5} className="text-[#FAF7F2]/80" />
                    </div>
                  </div>
                  
                  <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl text-[#FAF7F2] mb-5 tracking-tight">
                    {activeFeatureData.name}
                  </h3>
                  
                  {/* Accent line divider */}
                  <span className="block w-10 h-[2px] bg-[#8A9A5B] mx-auto mb-8" />
                  
                  <p className="text-base lg:text-lg text-[#FAF7F2]/75 leading-relaxed mb-6 max-w-xs mx-auto">
                    {activeFeatureData.description}
                  </p>
                  
                  <p className="text-lg lg:text-xl italic text-[#FAF7F2]/50 font-display tracking-wide">
                    {activeFeatureData.tagline}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  )
}
