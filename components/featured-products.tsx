"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { QuickLookModal } from "./quick-look-modal"
import Image from "next/image"
import { ArrowUpRight, Plus } from "lucide-react"

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
    accent: "#C4785A",
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

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
      className="relative bg-[#0F1311] overflow-hidden" 
      id="products"
    >
      {/* Atmospheric Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-[#C4785A]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7A9284]/[0.04] blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#FAF7F2 1px, transparent 1px), linear-gradient(90deg, #FAF7F2 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </motion.div>

      {/* Top Section - Header & Featured Preview */}
      <div className="relative pt-24 lg:pt-32 pb-16 lg:pb-20">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Left - Section Header */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="block w-12 h-[1px] bg-[#C4785A]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                  The Collection
                </span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-[#FAF7F2] leading-[1.05] mb-6">
                Four distinct styles,
                <span className="block italic font-light text-[#C4785A] mt-1">
                  crafted for you.
                </span>
              </h2>
              
              <p className="text-[#FAF7F2]/50 text-base lg:text-lg leading-relaxed max-w-md">
                Each blind type engineered for the unique light conditions and lifestyle 
                of Okanagan homes. Select to explore.
              </p>
            </motion.div>

            {/* Right - Stats/Info */}
            <motion.div 
              className="lg:col-span-7 lg:pl-12"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap gap-8 lg:gap-16 lg:justify-end">
                {[
                  { value: "4", label: "Signature Styles" },
                  { value: "50+", label: "Color Options" },
                  { value: "100%", label: "Custom Fit" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center lg:text-right"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="font-display text-4xl lg:text-5xl text-[#FAF7F2] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-[0.15em] text-[#7A9284]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-luxe">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FAF7F2]/10 to-transparent" />
      </div>

      {/* Main Grid - Editorial Product Cards */}
      <div className="relative py-16 lg:py-24">
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
                <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-[#1A1F1D]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311] via-[#0F1311]/40 to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F1311]/60 via-transparent to-transparent" />
                  
                  {/* Colored accent overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 mix-blend-overlay"
                    style={{ backgroundColor: product.accent }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.15 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                      {/* Number */}
                      <motion.span 
                        className="font-display text-6xl lg:text-7xl text-[#FAF7F2]/[0.08] leading-none select-none"
                        animate={{ 
                          opacity: hoveredIndex === index ? 0.15 : 0.08,
                          x: hoveredIndex === index ? 8 : 0 
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {product.number}
                      </motion.span>

                      {/* Arrow Button */}
                      <motion.div 
                        className="relative"
                        animate={{ 
                          scale: hoveredIndex === index ? 1 : 0.9,
                          opacity: hoveredIndex === index ? 1 : 0.6
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500"
                          style={{ 
                            backgroundColor: hoveredIndex === index ? product.accent : 'rgba(250, 247, 242, 0.1)',
                          }}
                        >
                          <ArrowUpRight 
                            size={20} 
                            className="text-[#FAF7F2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                      {/* Swatches */}
                      <motion.div 
                        className="flex gap-2 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredIndex === index ? 1 : 0,
                          y: hoveredIndex === index ? 0 : 10
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {product.swatches.map((swatch) => (
                          <div
                            key={swatch.name}
                            className="w-6 h-6 rounded-full border-2 border-[#FAF7F2]/30 shadow-lg"
                            style={{ backgroundColor: swatch.color }}
                            title={swatch.name}
                          />
                        ))}
                        <div className="w-6 h-6 rounded-full border-2 border-[#FAF7F2]/20 flex items-center justify-center bg-[#FAF7F2]/5">
                          <Plus size={12} className="text-[#FAF7F2]/60" />
                        </div>
                      </motion.div>

                      {/* Title & Tagline */}
                      <div className="mb-4">
                        <h3 className="font-display text-2xl lg:text-3xl text-[#FAF7F2] mb-1 leading-tight">
                          {product.name}
                          <span className="italic font-light text-[#FAF7F2]/60 ml-2">
                            Blinds
                          </span>
                        </h3>
                        <p className="text-[#FAF7F2]/50 text-sm">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Features Row */}
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredIndex === index ? 1 : 0.7,
                          y: hoveredIndex === index ? 0 : 0
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {product.materials.map((material, i) => (
                          <span 
                            key={material}
                            className="px-3 py-1.5 text-xs uppercase tracking-wider text-[#FAF7F2]/70 bg-[#FAF7F2]/[0.08] backdrop-blur-sm"
                          >
                            {material}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ backgroundColor: product.accent }}
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
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C4785A]/10 via-[#1A1F1D] to-[#7A9284]/10" />
              
              {/* Border */}
              <div className="absolute inset-0 border border-[#FAF7F2]/10" />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C4785A] to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-[#C4785A] to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#C4785A] to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-[#C4785A] to-transparent" />
              </div>

              <div className="relative py-12 lg:py-16 px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <p className="font-display text-2xl lg:text-3xl text-[#FAF7F2] mb-2">
                      Need help choosing the{" "}
                      <span className="italic text-[#C4785A]">perfect style?</span>
                    </p>
                    <p className="text-[#FAF7F2]/50 text-sm lg:text-base max-w-md">
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
                    <div className="absolute inset-0 bg-[#C4785A] transition-all duration-500 group-hover:bg-[#A65D3F]" />
                    
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
