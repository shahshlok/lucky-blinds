"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { ArrowRight } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "Classic Roller Blinds",
    price: "From $149",
    image: "/elegant-white-roller-blinds-in-modern-living-room-.jpg",
    badge: "Popular" as const,
    materials: ["Light Filtering", "Easy Clean Fabric"],
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
  },
  {
    id: "2",
    name: "Faux Wood Venetians",
    price: "From $199",
    image: "/elegant-faux-wood-venetian-blinds-in-warm-kitchen.jpg",
    badge: "Best Seller" as const,
    materials: ["Moisture Resistant", '2" Slats'],
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
  },
  {
    id: "3",
    name: "Motorized Cellular",
    price: "From $349",
    image: "/modern-motorized-cellular-honeycomb-shades-in-luxu.jpg",
    badge: "Smart Home" as const,
    materials: ["Energy Efficient", "Cordless Safety"],
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
  },
]

export function OurCollection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof featuredProducts[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: typeof featuredProducts[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] relative overflow-hidden" id="products">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F5F0E8] to-transparent opacity-50" />
      
      <div className="container-luxe relative">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-[1px] bg-[#C4785A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                Our Collection
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0F1311] leading-[1.1]">
              Signature pieces for
              <span className="block italic font-light text-[#C4785A]">every room.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg text-[#2D3B35]/80 leading-relaxed mb-6">
              Our most requested window coverings, each crafted for style, durability, 
              and the unique light of Okanagan living.
            </p>
            <motion.a
              href="#collection"
              className="group inline-flex items-center gap-3 text-[#C4785A] font-medium uppercase tracking-wider text-sm"
              whileHover={{ x: 4 }}
            >
              View All Products
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>

        {/* Products Grid - Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Large Featured Card */}
          <motion.div
            className="lg:col-span-7 lg:row-span-2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard 
              product={featuredProducts[0]} 
              onQuickLook={handleQuickLook}
              variant="featured"
            />
          </motion.div>

          {/* Stacked Cards */}
          {featuredProducts.slice(1).map((product, index) => (
            <motion.div
              key={product.id}
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard 
                product={product} 
                onQuickLook={handleQuickLook}
                variant="compact"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 py-8 px-8 sm:px-12 bg-[#F5F0E8] border border-[#E8E0D4]">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl text-[#0F1311] mb-1">Can't decide?</p>
              <p className="text-[#7A9284] text-sm">Let us help you find the perfect match.</p>
            </div>
            <motion.a
              href="#contact"
              className="btn-primary whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
