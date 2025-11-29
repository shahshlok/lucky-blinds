"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Check, Phone } from "lucide-react"

interface QuickLookModalProps {
  product: {
    id: string
    name: string
    price: string
    image: string
    materials: string[]
    swatches: { name: string; color: string }[]
    quickLookImages: string[]
    dimensions: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function QuickLookModal({ product, isOpen, onClose }: QuickLookModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSwatch, setSelectedSwatch] = useState(0)

  if (!product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.quickLookImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.quickLookImages.length) % product.quickLookImages.length)
  }

  const features = [
    "Custom-fitted to your windows",
    "Premium materials sourced locally",
    "Professional installation included",
    "5-year warranty coverage",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-[#0F1311]/70 backdrop-blur-sm" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-[#FAF7F2] shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-30 w-10 h-10 bg-[#0F1311] text-[#FAF7F2] flex items-center justify-center hover:bg-[#7A9B6D] transition-colors duration-300"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto lg:overflow-hidden">
              {/* Image Gallery */}
              <div className="relative bg-[#F5F0E8]">
                <div className="relative aspect-square lg:h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={product.quickLookImages[currentImageIndex] || product.image}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {product.quickLookImages.length > 1 && (
                    <>
                      <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF7F2] text-[#0F1311] flex items-center justify-center hover:bg-[#7A9B6D] hover:text-[#FAF7F2] transition-all duration-300 shadow-lg"
                        onClick={prevImage}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF7F2] text-[#0F1311] flex items-center justify-center hover:bg-[#7A9B6D] hover:text-[#FAF7F2] transition-all duration-300 shadow-lg"
                        onClick={nextImage}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0F1311]/80 text-[#FAF7F2] text-xs tracking-wider">
                    {currentImageIndex + 1} / {product.quickLookImages.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.quickLookImages.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-14 h-14 overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index 
                          ? "border-[#7A9B6D]" 
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col p-8 lg:p-10 lg:overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block w-8 h-[1px] bg-[#7A9B6D]" />
                    <span className="text-xs uppercase tracking-[0.2em] text-[#7A9284]">
                      Quick Look
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl text-[#0F1311] mb-2">
                    {product.name}
                  </h2>
                  <p className="text-[#7A9284]">{product.materials.join(" · ")}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-[#E8E0D4]">
                  <span className="font-display text-3xl text-[#7A9B6D]">{product.price}</span>
                  <span className="block text-sm text-[#7A9284] mt-1">{product.dimensions}</span>
                </div>

                {/* Color Swatches */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-[0.15em] text-[#7A9284] mb-4">
                    Available Finishes
                  </h4>
                  <div className="flex gap-3">
                    {product.swatches.map((swatch, index) => (
                      <button
                        key={index}
                        className={`relative w-10 h-10 rounded-full transition-all duration-200 ${
                          selectedSwatch === index 
                            ? "ring-2 ring-[#7A9B6D] ring-offset-2" 
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        onClick={() => setSelectedSwatch(index)}
                        title={swatch.name}
                      >
                        {swatch.color === "#FFFFFF" || swatch.color === "#FFFAFA" ? (
                          <span className="absolute inset-0 border border-[#E8E0D4] rounded-full" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-[#7A9284] mt-2">
                    Selected: <span className="text-[#0F1311]">{product.swatches[selectedSwatch].name}</span>
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-[0.15em] text-[#7A9284] mb-4">
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#2D3B35]">
                        <div className="w-5 h-5 bg-[#7A9B6D]/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#7A9B6D]" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto space-y-3">
                  <motion.a
                    href="#contact"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#7A9B6D] text-[#FAF7F2] font-medium uppercase tracking-wider text-sm hover:bg-[#5F8A52] transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                  >
                    Request Quote for This Product
                  </motion.a>
                  <a
                    href="tel:+12501234567"
                    className="flex items-center justify-center gap-2 w-full py-3 text-[#7A9284] text-sm hover:text-[#7A9B6D] transition-colors"
                  >
                    <Phone size={14} />
                    Or call: (250) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
