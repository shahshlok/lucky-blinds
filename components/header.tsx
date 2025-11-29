"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Phone } from "lucide-react"
import { Logo } from "@/components/logo"

const navLinks = [
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled 
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D4]/50" 
            : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Logo variant={isScrolled ? "dark" : "light"} />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300 relative group",
                    isScrolled 
                      ? "text-[#2D3B35] hover:text-[#8A9A5B]" 
                      : "text-[#FAF7F2]/90 hover:text-[#FAF7F2]"
                  )}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full",
                    isScrolled ? "bg-[#8A9A5B]" : "bg-[#FAF7F2]"
                  )} />
                </motion.a>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.a
                href="tel:+12501234567"
                className={cn(
                  "hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors duration-300 relative overflow-hidden group",
                  isScrolled
                    ? "bg-[#8A9A5B] text-[#FAF7F2]"
                    : "bg-[#FAF7F2] text-[#8A9A5B]"
                )}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={cn(
                  "absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out",
                  isScrolled ? "bg-[#FAF7F2]" : "bg-[#8A9A5B]"
                )} />
                <Phone size={14} className={cn(
                  "relative z-10 transition-colors duration-300",
                  isScrolled ? "group-hover:text-[#8A9A5B]" : "group-hover:text-[#FAF7F2]"
                )} />
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  isScrolled ? "group-hover:text-[#8A9A5B]" : "group-hover:text-[#FAF7F2]"
                )}>Free Quote</span>
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                className={cn(
                  "lg:hidden p-2 transition-colors duration-300",
                  isScrolled ? "text-[#0F1311]" : "text-[#FAF7F2]"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-[#0F1311]/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-[#FAF7F2] shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                <nav className="flex-1 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block py-4 font-display text-3xl text-[#0F1311] hover:text-[#8A9A5B] transition-colors border-b border-[#E8E0D4]"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
                
                <motion.div
                  className="mt-8 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <a
                    href="tel:+12501234567"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#8A9A5B] text-[#FAF7F2] font-medium uppercase tracking-wider text-sm"
                  >
                    <Phone size={16} />
                    Call for Free Quote
                  </a>
                  <p className="text-center text-sm text-[#7A9284]">
                    Serving the Okanagan Valley
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
