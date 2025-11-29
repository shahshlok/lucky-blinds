"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: string
    image: string
    badge?: "New" | "Back in stock" | "Limited" | "Popular" | "Best Seller" | "Smart Home"
    materials: string[]
    swatches: { name: string; color: string }[]
    quickLookImages: string[]
    dimensions: string
  }
  onQuickLook: (product: any) => void
  variant?: "featured" | "compact" | "default"
}

const badgeStyles = {
  "New": "bg-[#7A9284] text-[#FAF7F2]",
  "Back in stock": "bg-[#5B8A9A] text-[#FAF7F2]",
  "Limited": "bg-[#C9A962] text-[#0F1311]",
  "Popular": "bg-[#7A9B6D] text-[#FAF7F2]",
  "Best Seller": "bg-[#C9A962] text-[#0F1311]",
  "Smart Home": "bg-[#5B8A9A] text-[#FAF7F2]",
}

export function ProductCard({ product, onQuickLook, variant = "default" }: ProductCardProps) {
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <motion.div
      className={cn(
        "group relative bg-[#FAF7F2] overflow-hidden cursor-pointer",
        isFeatured ? "h-full min-h-[600px] lg:min-h-[700px]" : isCompact ? "h-[320px] lg:h-[340px]" : "h-[480px]"
      )}
      onClick={() => onQuickLook(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          />
          {/* Warm overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/70 via-[#0F1311]/20 to-transparent" />
          <motion.div 
            className="absolute inset-0 bg-[#7A9B6D]/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Badge */}
      {product.badge && (
        <motion.div 
          className="absolute top-5 left-5 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className={cn(
            "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
            badgeStyles[product.badge]
          )}>
            {product.badge}
          </span>
        </motion.div>
      )}

      {/* Quick Look Button */}
      <motion.button
        className="absolute top-5 right-5 z-20 w-10 h-10 bg-[#FAF7F2] text-[#0F1311] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => {
          e.stopPropagation()
          onQuickLook(product)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Eye size={18} />
      </motion.button>

      {/* Content Overlay */}
      <div className={cn(
        "absolute left-0 right-0 bottom-0 z-10 p-6 lg:p-8",
        isFeatured && "lg:p-10"
      )}>
        {/* Swatches - Only on featured */}
        {isFeatured && (
          <motion.div 
            className="flex gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {product.swatches.map((swatch, index) => (
              <motion.div
                key={swatch.name}
                className="w-6 h-6 rounded-full border-2 border-[#FAF7F2]/50 shadow-lg"
                style={{ backgroundColor: swatch.color }}
                whileHover={{ scale: 1.2, borderColor: 'rgba(250, 247, 242, 1)' }}
                title={swatch.name}
              />
            ))}
          </motion.div>
        )}

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className={cn(
            "font-display text-[#FAF7F2] tracking-wide",
            isFeatured ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
          )}>
            {product.name}
          </h3>
          
          <p className={cn(
            "text-[#FAF7F2]/70 text-sm",
            isFeatured && "lg:text-base"
          )}>
            {product.materials.join(" · ")}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className={cn(
              "font-medium text-[#FAF7F2]",
              isFeatured ? "text-xl lg:text-2xl" : "text-lg"
            )}>
              {product.price}
            </span>
            
            <motion.span 
              className="text-[#FAF7F2]/60 text-xs uppercase tracking-[0.15em] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              Quick Look
              <span>→</span>
            </motion.span>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      {isFeatured && (
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-6 right-6 w-[1px] h-12 bg-[#FAF7F2]/20" />
          <div className="absolute top-6 right-6 w-12 h-[1px] bg-[#FAF7F2]/20" />
        </div>
      )}
    </motion.div>
  )
}
