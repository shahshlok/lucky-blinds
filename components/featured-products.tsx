"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { QuickLookModal } from "./quick-look-modal"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const blindTypes = [
  {
    id: "1",
    name: "Cellular",
    fullName: "Cellular Blinds",
    tagline: "Energy efficiency meets elegance",
    price: "From $249",
    image: "/modern-home-interior-honeycomb-cellular-shades-ene.jpg",
    materials: ["Energy Efficient", "Cordless Safety"],
    features: ["Honeycomb insulation", "Noise reduction", "UV protection"],
    swatches: [
      { name: "Snow", color: "#FFFAFA" },
      { name: "Champagne", color: "#F7E7CE" },
      { name: "Slate", color: "#708090" },
    ],
    quickLookImages: [
      "/honeycomb-cellular-shade-close-up.jpg",
      "/motorized-blinds-remote-control.jpg",
      "/cellular-shades-energy-efficient.jpg",
    ],
    dimensions: "Custom sizes available",
    accent: "#7A9284",
    number: "01",
  },
  {
    id: "2",
    name: "Roller",
    fullName: "Roller Blinds",
    tagline: "Sleek simplicity for modern spaces",
    price: "From $149",
    image: "/elegant-white-roller-blinds-in-modern-living-room-.jpg",
    materials: ["Light Filtering", "Easy Clean Fabric"],
    features: ["Minimal design", "Easy maintenance", "Blackout options"],
    swatches: [
      { name: "Pure White", color: "#FFFFFF" },
      { name: "Linen", color: "#E8E4D9" },
      { name: "Charcoal", color: "#36454F" },
    ],
    quickLookImages: [
      "/white-roller-blinds-close-up.jpg",
      "/roller-blinds-mechanism-detail.jpg",
      "/roller-blinds-in-bedroom.jpg",
    ],
    dimensions: "Custom sizes available",
    accent: "#8A9A5B",
    number: "02",
  },
  {
    id: "3",
    name: "Zebra",
    fullName: "Zebra Blinds",
    tagline: "Dynamic light at your fingertips",
    price: "From $199",
    image: "/modern-roller-blinds-in-stylish-room-natural-light.jpg",
    materials: ["Light Control", "Modern Design"],
    features: ["Adjustable opacity", "Contemporary style", "Dual fabric"],
    swatches: [
      { name: "Pure White", color: "#FFFFFF" },
      { name: "Beige", color: "#E8E4D9" },
      { name: "Charcoal", color: "#36454F" },
    ],
    quickLookImages: [
      "/modern-roller-blinds-in-stylish-room-natural-light.jpg",
      "/roller-blinds-mechanism-detail.jpg",
      "/roller-blinds-in-bedroom.jpg",
    ],
    dimensions: "Custom sizes available",
    accent: "#C9A962",
    number: "03",
  },
  {
    id: "4",
    name: "Faux Wood",
    fullName: "Faux Wood Blinds",
    tagline: "Timeless warmth, lasting beauty",
    price: "From $179",
    image: "/elegant-faux-wood-venetian-blinds-in-warm-kitchen.jpg",
    materials: ["Moisture Resistant", '2" Slats'],
    features: ["Humidity resistant", "Classic aesthetic", "Durable finish"],
    swatches: [
      { name: "White Oak", color: "#D4C4A8" },
      { name: "Espresso", color: "#3C2415" },
      { name: "Gray Wash", color: "#9E9E9E" },
    ],
    quickLookImages: [
      "/faux-wood-blinds-detail.jpg",
      "/venetian-blinds-tilted-open.jpg",
      "/faux-wood-blinds-bathroom.jpg",
    ],
    dimensions: "Custom sizes available",
    accent: "#5C7268",
    number: "04",
  },
]

type Product = typeof blindTypes[0]

export function OurCollection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleQuickLook = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#F5F0E8] overflow-hidden" 
      id="products"
    >
      {/* Clean Background with subtle warm gradients */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8A9A5B]/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#7A9284]/[0.04] blur-[100px]" />
      </motion.div>

      {/* Top Section - Header */}
      <div className="relative pt-16 lg:pt-24 pb-10 lg:pb-12">
        <div className="container-luxe">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                The Collection
              </span>
              <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-[#0F1311] leading-[1.05] mb-6">
              Your view,
              <span className="block italic font-light text-[#8A9A5B] mt-1">
                your rules.
              </span>
            </h2>
            
            <p className="text-[#5C7268] text-base lg:text-lg leading-relaxed">
              The Okanagan gives you the light. We help you decide what to do with it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Grid - Editorial Product Cards */}
      <div className="relative pb-16 lg:pb-24">
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
            {blindTypes.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative cursor-pointer"
                onClick={() => handleQuickLook(product)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm">
                  {/* Image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      scale: hoveredIndex === index ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={product.image}
                      alt={product.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/80 via-[#0F1311]/20 to-transparent" />
                  
                  {/* Colored accent overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-[#8A9A5B] mix-blend-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.15 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    {/* Arrow Button - Top Right, only visible on hover */}
                    <motion.div 
                      className="absolute top-6 right-6 lg:top-8 lg:right-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        scale: hoveredIndex === index ? 1 : 0.8,
                        opacity: hoveredIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full grid place-items-center bg-[#8A9A5B] shadow-lg">
                        <ArrowUpRight 
                          size={20} 
                          strokeWidth={2}
                          className="text-[#FAF7F2]" 
                        />
                      </div>
                    </motion.div>

                    {/* Bottom Content */}
                    <div>
                      {/* Title & Tagline */}
                      <h3 className="font-display text-3xl lg:text-4xl text-[#FAF7F2] mb-1.5 leading-none tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-[#FAF7F2]/70 text-sm lg:text-base">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[3px] bg-[#8A9A5B]"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative pb-24 lg:pb-32">
        <div className="container-luxe">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* CTA Card */}
            <div className="relative overflow-hidden bg-[#E8E0D4] border border-[#D4C4A8]">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A9A5B]/5 via-transparent to-[#7A9284]/5" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8A9A5B] to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-[#8A9A5B] to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#8A9A5B] to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-[#8A9A5B] to-transparent" />
              </div>

              <div className="relative py-12 lg:py-16 px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <p className="font-display text-2xl lg:text-3xl text-[#0F1311] mb-2">
                      Need help choosing the{" "}
                      <span className="italic text-[#8A9A5B]">perfect style?</span>
                    </p>
                    <p className="text-[#5C7268] text-sm lg:text-base max-w-md">
                      Our window treatment specialists bring samples directly to your home
                      for a personalized consultation.
                    </p>
                  </div>
                  
                  <motion.a
                    href="#contact"
                    className="group relative inline-flex items-center gap-4 px-8 py-4 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background */}
                    <div className="absolute inset-0 bg-[#8A9A5B] transition-all duration-500 group-hover:bg-[#6F7D48]" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    
                    <span className="relative text-[#FAF7F2] text-sm font-medium uppercase tracking-[0.1em]">
                      Book Free Consultation
                    </span>
                    <ArrowUpRight 
                      size={18} 
                      className="relative text-[#FAF7F2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
