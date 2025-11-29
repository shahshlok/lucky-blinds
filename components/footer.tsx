"use client"
import { motion } from "framer-motion"
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Products: [
      { name: "Roller Blinds", href: "#" },
      { name: "Venetian Blinds", href: "#" },
      { name: "Vertical Blinds", href: "#" },
      { name: "Cellular Shades", href: "#" },
      { name: "Motorized Blinds", href: "#" },
    ],
    Services: [
      { name: "Free Consultation", href: "#" },
      { name: "Professional Measurement", href: "#" },
      { name: "Expert Installation", href: "#" },
      { name: "Commercial Projects", href: "#" },
      { name: "Repairs & Maintenance", href: "#" },
    ],
    "Areas Served": [
      { name: "Kelowna", href: "#" },
      { name: "West Kelowna", href: "#" },
      { name: "Lake Country", href: "#" },
      { name: "Peachland", href: "#" },
      { name: "Vernon", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-surface text-surface-foreground">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/serving-20okanagan-20logo-20colour.jpg"
                alt="Lucky Blinds"
                width={160}
                height={53}
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Proudly serving Kelowna and the Okanagan Valley with premium window blinds and shades. Quality meets
                affordability with every installation.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+12501234567"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} />
                  <span>(250) 123-4567</span>
                </a>
                <a
                  href="mailto:info@luckyblinds.ca"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  <span>info@luckyblinds.ca</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>Kelowna, BC</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-surface-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-surface-foreground mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 pb-4 border-t border-surface-border flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground text-center">
            <p>&copy; {currentYear} Lucky Blinds. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-surface-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-surface-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
