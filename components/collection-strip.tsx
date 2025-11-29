"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const collections = [
  {
    id: "roller-blinds",
    name: "Roller Blinds",
    description: "Clean lines, modern simplicity",
    image: "/modern-roller-blinds-in-stylish-room-natural-light.jpg",
    count: "12 styles",
  },
  {
    id: "venetian-blinds",
    name: "Venetian",
    description: "Timeless slat control",
    image: "/white-aluminum-venetian-blinds-modern-office.jpg",
    count: "8 styles",
  },
  {
    id: "vertical-blinds",
    name: "Vertical",
    description: "Perfect for large windows",
    image: "/vertical-blinds-large-patio-door-modern-home.jpg",
    count: "10 styles",
  },
  {
    id: "cellular-shades",
    name: "Cellular",
    description: "Energy-efficient honeycomb",
    image: "/modern-home-interior-honeycomb-cellular-shades-ene.jpg",
    count: "6 styles",
  },
  {
    id: "faux-wood",
    name: "Faux Wood",
    description: "Natural warmth, easy care",
    image: "/elegant-faux-wood-venetian-blinds-in-warm-kitchen.jpg",
    count: "9 styles",
  },
  {
    id: "blackout",
    name: "Blackout",
    description: "Complete light control",
    image: "/cozy-bedroom-with-blackout-blinds-privacy-elegant.jpg",
    count: "7 styles",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section 
      ref={containerRef} 
      className="py-24 lg:py-32 bg-[#1A1F1D] relative overflow-hidden"
      id="collection"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%2F%3E%3C%2Fsvg%3E')] opacity-20" />
      </div>

      {/* Section Header */}
      <div className="container-luxe mb-12 lg:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-12 h-[1px] bg-[#C4785A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                Browse Categories
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2] leading-[1.1]">
              Our Collection
            </h2>
          </div>
          
          <p className="text-[#FAF7F2]/60 text-sm max-w-md lg:text-right">
            Drag to explore our complete range of window coverings — 
            from classic to contemporary.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        <motion.div
          ref={scrollRef}
          className="flex gap-6 px-6 lg:px-12 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          dragElastic={0.1}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-[300px] md:w-[360px] lg:w-[400px] group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-5">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    sizes="400px"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/60 via-transparent to-transparent" />
                  <motion.div 
                    className="absolute inset-0 bg-[#C4785A]/0 group-hover:bg-[#C4785A]/10 transition-colors duration-500"
                  />
                </motion.div>
                
                {/* Count badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#FAF7F2] text-[#0F1311] text-xs font-medium uppercase tracking-wider">
                  {collection.count}
                </div>
              </div>
              
              {/* Text content */}
              <div className="space-y-1">
                <h3 className="font-display text-2xl text-[#FAF7F2] group-hover:text-[#C4785A] transition-colors duration-300">
                  {collection.name}
                </h3>
                <p className="text-[#FAF7F2]/50 text-sm">
                  {collection.description}
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div
            className="flex-shrink-0 w-[300px] md:w-[360px] lg:w-[400px] flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center p-8 border border-[#FAF7F2]/20 h-full flex flex-col items-center justify-center">
              <span className="text-[#C4785A] text-6xl font-display mb-4">+</span>
              <h3 className="font-display text-2xl text-[#FAF7F2] mb-2">
                Custom Orders
              </h3>
              <p className="text-[#FAF7F2]/50 text-sm mb-6">
                Can't find what you're looking for? We offer fully custom solutions.
              </p>
              <motion.a
                href="#contact"
                className="px-6 py-3 border border-[#C4785A] text-[#C4785A] text-sm uppercase tracking-wider font-medium hover:bg-[#C4785A] hover:text-[#FAF7F2] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="container-luxe mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-4 text-[#FAF7F2]/40">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#FAF7F2]/20 to-transparent" />
          <span className="text-xs uppercase tracking-[0.2em]">Drag to explore</span>
          <span className="text-lg">←→</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-[#FAF7F2]/20 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
