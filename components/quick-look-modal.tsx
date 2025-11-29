"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Check, Phone, ChevronDown, Sun, Moon, MoveVertical, SunMoon, Sunrise } from "lucide-react"

interface BlindType {
  id: string
  name: string
  shortName: string
  description: string
  icon: "sun" | "moon" | "updown" | "daynight" | "solar"
  sizes: string[]
  image: string
}

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

const cellularTypes: BlindType[] = [
  {
    id: "topdown-bottomup",
    name: "Top Down & Bottom Up",
    shortName: "TD/BU",
    description: "Ultimate privacy control. Raise from bottom or lower from top for perfect light balance.",
    icon: "updown",
    sizes: ["38mm", "45mm"],
    image: "/new_images/topdownbottomupcellular.jpg",
  },
  {
    id: "light-filtering",
    name: "Light Filtering",
    shortName: "Light",
    description: "Softly diffuses natural light while maintaining privacy. Perfect for living spaces.",
    icon: "sun",
    sizes: ["38mm", "45mm"],
    image: "/new_images/lightcellular.jpeg",
  },
  {
    id: "blackout",
    name: "Blackout",
    shortName: "Dark",
    description: "Complete darkness for bedrooms and media rooms. Maximum energy efficiency.",
    icon: "moon",
    sizes: ["38mm", "45mm"],
    image: "/new_images/blackoutcellular.jpg",
  },
  {
    id: "day-night",
    name: "Day & Night",
    shortName: "D/N",
    description: "Dual fabric system. Switch between sheer and opaque with a simple adjustment.",
    icon: "daynight",
    sizes: [],
    image: "/new_images/daynightcellular.jpg",
  },
]

const zebraTypes: BlindType[] = [
  {
    id: "blackout",
    name: "Blackout",
    shortName: "Dark",
    description: "Complete privacy and darkness. The opaque stripes align perfectly to block all light.",
    icon: "moon",
    sizes: [],
    image: "/new_images/zebrablackout.jpg",
  },
  {
    id: "light-filtering",
    name: "Light Filtering",
    shortName: "Light",
    description: "Soft, diffused light with adjustable privacy. Align stripes to control the view.",
    icon: "sun",
    sizes: [],
    image: "/new_images/zebralightfilter.jpg",
  },
]

const rollerTypes: BlindType[] = [
  {
    id: "blackout",
    name: "Blackout",
    shortName: "Dark",
    description: "Total light blockage for bedrooms and media rooms. Sleep better with complete darkness.",
    icon: "moon",
    sizes: [],
    image: "/new_images/rollerblack.jpeg",
  },
  {
    id: "light-filtering",
    name: "Light Filtering",
    shortName: "Light",
    description: "Gently diffuses sunlight while maintaining your view. Ideal for living areas and kitchens.",
    icon: "sun",
    sizes: [],
    image: "/new_images/lightfilterroller.jpg",
  },
  {
    id: "solar",
    name: "Solar Shades",
    shortName: "Solar",
    description: "Reduces glare and UV rays while preserving your outdoor view. Perfect for sunny rooms.",
    icon: "solar",
    sizes: [],
    image: "/new_images/rollersolar.jpeg",
  },
]

const TypeIcon = ({ type, className }: { type: BlindType["icon"]; className?: string }) => {
  switch (type) {
    case "sun":
      return <Sun className={className} />
    case "moon":
      return <Moon className={className} />
    case "updown":
      return <MoveVertical className={className} />
    case "daynight":
      return <SunMoon className={className} />
    case "solar":
      return <Sunrise className={className} />
  }
}

const getProductTypes = (productName: string): { types: BlindType[]; hasTypes: boolean } => {
  const name = productName.toLowerCase()
  if (name.includes("cellular")) {
    return { types: cellularTypes, hasTypes: true }
  }
  if (name.includes("zebra")) {
    return { types: zebraTypes, hasTypes: true }
  }
  if (name.includes("roller")) {
    return { types: rollerTypes, hasTypes: true }
  }
  return { types: [], hasTypes: false }
}

export function QuickLookModal({ product, isOpen, onClose }: QuickLookModalProps) {
  const { types: productTypes, hasTypes } = product ? getProductTypes(product.name) : { types: [], hasTypes: false }
  
  const [selectedType, setSelectedType] = useState<BlindType | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("38mm")
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)

  useEffect(() => {
    if (productTypes.length > 0) {
      setSelectedType(productTypes[0])
    }
  }, [product?.name])

  useEffect(() => {
    if (selectedType?.sizes && selectedType.sizes.length > 0 && !selectedType.sizes.includes(selectedSize)) {
      setSelectedSize(selectedType.sizes[0])
    }
  }, [selectedType, selectedSize])

  if (!product) return null

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
            className="absolute inset-0 bg-[#0F1311]/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-[#FAF7F2] shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 z-30 w-11 h-11 bg-[#0F1311] text-[#FAF7F2] flex items-center justify-center hover:bg-[#8A9A5B] transition-colors duration-300"
              onClick={onClose}
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] max-h-[90vh] overflow-y-auto lg:overflow-hidden">
              {/* Image Section */}
              <div className="relative bg-[#E8E4DC] min-w-0 overflow-hidden">
                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hasTypes && selectedType ? selectedType.id : "default"}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={hasTypes && selectedType ? selectedType.image : product.image}
                        alt={hasTypes && selectedType ? selectedType.name : product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/40 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Type badge on image */}
                  {hasTypes && selectedType && (
                    <motion.div
                      className="absolute bottom-8 left-6 right-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="bg-[#FAF7F2]/95 backdrop-blur-sm p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#8A9A5B] flex items-center justify-center">
                            <TypeIcon type={selectedType.icon} className="w-5 h-5 text-[#FAF7F2]" />
                          </div>
                          <div className="min-h-[44px] flex flex-col justify-center">
                            <p className="font-display text-lg text-[#0F1311]">{selectedType.name}</p>
                            {selectedType.sizes.length > 0 ? (
                              <p className="text-xs text-[#7A9284] tracking-wide">{selectedSize} cell size</p>
                            ) : (
                              <p className="text-xs text-[#7A9284] tracking-wide">Single option</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col p-8 lg:p-10 lg:overflow-y-auto min-w-0">
                {/* Header */}
                <div className="mb-6">
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="block w-10 h-[2px] bg-[#8A9A5B]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                      Configure
                    </span>
                  </motion.div>
                  <motion.h2
                    className="font-display text-3xl lg:text-4xl text-[#0F1311] mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {product.name}
                  </motion.h2>
                  <motion.p
                    className="text-[#7A9284] text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.materials.join(" · ")}
                  </motion.p>
                </div>

                {/* Price */}
                <motion.div
                  className="mb-8 pb-6 border-b border-[#E8E0D4]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="font-display text-2xl text-[#8A9A5B]">{product.price}</span>
                  <span className="block text-xs text-[#7A9284] mt-1 tracking-wide">{product.dimensions}</span>
                </motion.div>

                {/* Type Selection */}
                {hasTypes && selectedType && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#7A9284] mb-4 font-medium">
                      Select Type
                    </h4>

                    {/* Custom Dropdown */}
                    <div className="relative mb-4">
                      <button
                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                        className="w-full flex items-center justify-between p-4 bg-[#F5F0E8] border border-[#E8E0D4] hover:border-[#8A9A5B] transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#8A9A5B]/10 flex items-center justify-center">
                            <TypeIcon type={selectedType.icon} className="w-4 h-4 text-[#8A9A5B]" />
                          </div>
                          <span className="text-[#0F1311] font-medium">{selectedType.name}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-[#7A9284] transition-transform duration-200 ${isTypeDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isTypeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 z-20 bg-[#FAF7F2] border border-[#E8E0D4] border-t-0 shadow-lg overflow-hidden"
                          >
                            {productTypes.map((type) => (
                              <button
                                key={type.id}
                                onClick={() => {
                                  setSelectedType(type)
                                  setIsTypeDropdownOpen(false)
                                }}
                                className={`w-full flex items-start gap-3 p-4 text-left hover:bg-[#F5F0E8] transition-colors duration-150 ${
                                  selectedType.id === type.id ? "bg-[#8A9A5B]/5" : ""
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                                    selectedType.id === type.id ? "bg-[#8A9A5B]" : "bg-[#E8E0D4]"
                                  }`}
                                >
                                  <TypeIcon
                                    type={type.icon}
                                    className={`w-4 h-4 ${selectedType.id === type.id ? "text-[#FAF7F2]" : "text-[#7A9284]"}`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`font-medium ${selectedType.id === type.id ? "text-[#8A9A5B]" : "text-[#0F1311]"}`}
                                  >
                                    {type.name}
                                  </p>
                                  <p className="text-xs text-[#7A9284] mt-0.5 line-clamp-2">{type.description}</p>
                                </div>
                                {selectedType.id === type.id && (
                                  <Check size={16} className="text-[#8A9A5B] flex-shrink-0 mt-1" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Description */}
                    <motion.p
                      key={selectedType.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-[#5A6B62] leading-relaxed"
                    >
                      {selectedType.description}
                    </motion.p>
                  </motion.div>
                )}

                {/* Size Selection - Only for types with sizes */}
                {hasTypes && selectedType && selectedType.sizes.length > 0 && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#7A9284] mb-4 font-medium">
                      Cell Size
                    </h4>
                    <div className="flex gap-3">
                      {selectedType.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`relative flex-1 py-3 px-4 border-2 transition-all duration-200 ${
                            selectedSize === size
                              ? "border-[#8A9A5B] bg-[#8A9A5B]/5"
                              : "border-[#E8E0D4] hover:border-[#C5CFC8]"
                          }`}
                        >
                          <span
                            className={`font-display text-lg ${selectedSize === size ? "text-[#8A9A5B]" : "text-[#0F1311]"}`}
                          >
                            {size}
                          </span>
                          <span className="block text-[10px] text-[#7A9284] mt-0.5 uppercase tracking-wider">
                            {size === "38mm" ? "Standard" : "Large"}
                          </span>
                          {selectedSize === size && (
                            <motion.div
                              layoutId="sizeIndicator"
                              className="absolute top-2 right-2 w-5 h-5 bg-[#8A9A5B] flex items-center justify-center"
                            >
                              <Check size={12} className="text-[#FAF7F2]" />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Features */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#7A9284] mb-4 font-medium">
                    What's Included
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#2D3B35]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + index * 0.05 }}
                      >
                        <div className="w-5 h-5 bg-[#8A9A5B]/10 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-[#8A9A5B]" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="mt-auto space-y-1 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a
                    href="#contact"
                    className="group flex items-center justify-center gap-3 w-full py-4 bg-[#0F1311] text-[#FAF7F2] font-medium uppercase tracking-[0.15em] text-xs hover:bg-[#8A9A5B] transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                  >
                    <span>Request Quote</span>
                    {hasTypes && selectedType && (
                      <span className="text-[#FAF7F2]/60 group-hover:text-[#FAF7F2]/80 transition-colors">
                        — {selectedType.shortName}
                        {selectedType.sizes.length > 0 && ` ${selectedSize}`}
                      </span>
                    )}
                  </motion.a>
                  <a
                    href="tel:+12501234567"
                    className="flex items-center justify-center gap-2 w-full py-3 text-[#7A9284] text-xs tracking-wide hover:text-[#8A9A5B] transition-colors"
                  >
                    <Phone size={12} />
                    Or call: (250) 123-4567
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
