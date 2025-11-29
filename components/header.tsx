"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "border-b border-border/[0.02]",
        isScrolled ? "bg-background/90" : "bg-background/[0.02]",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-center h-16 lg:h-20 relative">
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <a href="#" aria-label="Lucky Blinds Home">
              <Image
                src="/images/serving-20okanagan-20logo-20colour.jpg"
                alt="Lucky Blinds - Quality Meets Affordability"
                width={180}
                height={60}
                className="h-12 lg:h-14 w-auto transition-all duration-300"
                priority
              />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
