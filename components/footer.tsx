"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Products: [
      { name: "Cellular Blinds", href: "#products" },
      { name: "Roller Blinds", href: "#products" },
      { name: "Zebra Blinds", href: "#products" },
      { name: "Faux Wood Blinds", href: "#products" },
    ],
    Services: [
      { name: "Free Consultation", href: "#contact" },
      { name: "Professional Measurement", href: "#contact" },
      { name: "Expert Installation", href: "#about" },
      { name: "In-Home Estimates", href: "#contact" },
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Our Collection", href: "#products" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-[#0F1311] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A9A5B]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7A9284]/5 rounded-full blur-2xl" />
      
      {/* Main Footer Content */}
      <div className="container-luxe py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#8A9A5B] flex items-center justify-center">
                <span className="font-display text-2xl text-[#FAF7F2]">L</span>
              </div>
              <div>
                <span className="block font-display text-xl tracking-wide">Lucky Blinds</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/50">
                  Okanagan Valley
                </span>
              </div>
            </div>
            
            <p className="text-[#FAF7F2]/60 leading-relaxed mb-8 max-w-sm">
              Proudly serving the Okanagan Valley with premium window blinds and shades. 
              Quality craftsmanship meets lakeside living.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+12501234567"
                className="flex items-center gap-3 text-[#FAF7F2]/70 hover:text-[#8A9A5B] transition-colors group"
              >
                <Phone size={16} />
                <span>(250) 123-4567</span>
              </a>
              <a
                href="mailto:info@luckyblinds.ca"
                className="flex items-center gap-3 text-[#FAF7F2]/70 hover:text-[#8A9A5B] transition-colors"
              >
                <Mail size={16} />
                <span>info@luckyblinds.ca</span>
              </a>
              <div className="flex items-center gap-3 text-[#FAF7F2]/70">
                <MapPin size={16} />
                <span>Kelowna, British Columbia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 border border-[#2D3B35] flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#8A9A5B] hover:bg-[#8A9A5B]/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#FAF7F2]/40 mb-5">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-[#FAF7F2]/70 hover:text-[#8A9A5B] transition-colors duration-200"
                        >
                          {link.name}
                          <ArrowUpRight 
                            size={12} 
                            className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" 
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2D3B35]">
        <div className="container-luxe py-6">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-[#FAF7F2]/40">
              &copy; {currentYear} Lucky Blinds. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-[#FAF7F2]/40">
              <a href="#" className="hover:text-[#FAF7F2]/70 transition-colors">
                Privacy Policy
              </a>
              <span className="w-[1px] h-3 bg-[#2D3B35]" />
              <a href="#" className="hover:text-[#FAF7F2]/70 transition-colors">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
