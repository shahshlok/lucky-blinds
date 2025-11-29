"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
  },
]

type Product = typeof blindTypes[0]

interface CollectionCardProps {
  product: Product
  onQuickLook: (product: Product) => void
  index: number
}

function CollectionCard({ product, onQuickLook, index }: CollectionCardProps) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className="group relative cursor-pointer"
      onClick={() => onQuickLook(product)}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card Container */}
      <div className={`relative ${isEven ? 'lg:mt-0' : 'lg:mt-12'}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D4]">
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#FAF7F2]/30 z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#FAF7F2]/30 z-10 pointer-events-none" />
          
          {/* Image */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.image}
              alt={product.fullName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/90 via-[#0F1311]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: product.accent }}
          />

          {/* Hover Arrow */}
          <motion.div 
            className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center shadow-lg">
              <ArrowUpRight size={18} className="text-[#0F1311]" />
            </div>
          </motion.div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
            {/* Swatches */}
            <div className="flex gap-1.5 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              {product.swatches.map((swatch) => (
                <div
                  key={swatch.name}
                  className="w-5 h-5 rounded-full border-2 border-[#FAF7F2]/50 shadow-sm"
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.name}
                />
              ))}
            </div>

            {/* Product Name */}
            <h3 className="font-display text-2xl lg:text-3xl text-[#FAF7F2] mb-1 leading-tight">
              {product.name}
            </h3>
            
            {/* Tagline */}
            <p className="text-[#FAF7F2]/70 text-sm leading-relaxed">
              {product.tagline}
            </p>

            {/* Quick Look hint */}
            <span className="text-xs uppercase tracking-[0.15em] text-[#FAF7F2]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 inline-block">
              Quick Look →
            </span>
          </div>
        </div>

        {/* Features Strip - Shows on Hover */}
        <motion.div 
          className="absolute -bottom-2 left-4 right-4 bg-[#FAF7F2] px-4 py-3 shadow-lg opacity-0 group-hover:opacity-100 group-hover:-bottom-6 transition-all duration-500 z-30"
          style={{ borderLeft: `3px solid ${product.accent}` }}
        >
          <div className="flex items-center gap-3 text-xs text-[#0F1311]/70 overflow-hidden">
            {product.features.map((feature, i) => (
              <span key={feature} className="flex items-center gap-3 whitespace-nowrap">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-[#C4785A]" />}
                {feature}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function OurCollection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-24 lg:py-36 bg-[#F5F0E8] relative overflow-hidden" id="products">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C4785A]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#7A9284]/5 to-transparent pointer-events-none" />
      
      {/* Vertical Text Accent */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#C4785A] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A9284] writing-mode-vertical transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Window Solutions
          </span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#C4785A] to-transparent" />
        </div>
      </div>

      <div className="container-luxe relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block w-12 h-[1px] bg-[#C4785A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                Our Collection
              </span>
              <span className="block w-12 h-[1px] bg-[#C4785A]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0F1311] leading-[1.1] mb-6">
              Four styles,
              <span className="block italic font-light text-[#C4785A]">infinite possibilities.</span>
            </h2>
            <p className="text-[#7A9284] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Each blind type crafted to perfection, designed for the unique light 
              and lifestyle of Okanagan homes.
            </p>
          </motion.div>
        </div>

        {/* Products Grid - Staggered 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
          {blindTypes.map((product, index) => (
            <CollectionCard
              key={product.id}
              product={product}
              onQuickLook={handleQuickLook}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 lg:mt-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative bg-[#FAF7F2] border border-[#E8E0D4] py-10 lg:py-14 px-8 lg:px-14 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#C4785A]/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#C4785A]/20" />
            <div className="absolute top-1/2 left-0 w-1 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#C4785A] to-transparent" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <p className="font-display text-2xl lg:text-3xl text-[#0F1311] mb-2">
                  Can't decide on the <span className="italic text-[#C4785A]">perfect style?</span>
                </p>
                <p className="text-[#7A9284] text-sm lg:text-base">
                  Our experts will help you find the ideal match for your space and lifestyle.
                </p>
              </div>
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-[#C4785A] text-[#FAF7F2] text-sm font-medium uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#A65D3F] whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Free Consultation
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
