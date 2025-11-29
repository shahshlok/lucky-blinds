"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

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

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-foreground mb-4 lg:text-6xl">
              Popular <span className="italic font-light">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our most requested window coverings, each crafted for style, durability, and the Okanagan
              lifestyle.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
