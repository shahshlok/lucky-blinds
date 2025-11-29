"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Phone, User, Home, MessageSquare } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitted(true)
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <BlurPanel className="p-8 lg:p-12 bg-background/40 backdrop-blur-md grain-texture">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  <AnimatedText text="Get your " delay={0.2} />
                  <span className="italic font-light text-primary">
                    <AnimatedText text="free quote." delay={0.5} />
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Schedule a free in-home consultation. We'll measure your windows and provide a no-obligation quote.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={20} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full pl-12 pr-4 py-4 bg-background/60 backdrop-blur-sm border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                        errors.name ? "border-destructive focus:ring-destructive" : "border-border"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={20} className="text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className={`w-full pl-12 pr-4 py-4 bg-background/60 backdrop-blur-sm border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                        errors.phone ? "border-destructive focus:ring-destructive" : "border-border"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Home size={20} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address (optional)"
                      className="w-full pl-12 pr-4 py-4 bg-background/60 backdrop-blur-sm border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <MessageSquare size={20} className="text-muted-foreground" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project (optional)"
                      rows={3}
                      className="w-full pl-12 pr-4 py-4 bg-background/60 backdrop-blur-sm border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {(errors.name || errors.phone) && (
                    <motion.p
                      className="text-sm text-destructive text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Please fill in your name and phone number
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Free Quote
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-brand-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Thank you, {formData.name}!</h3>
                  <p className="text-muted-foreground">
                    We've received your request. A Lucky Blinds specialist will contact you within 24 hours to schedule
                    your free consultation.
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-6">
                Serving Kelowna, West Kelowna, Lake Country, and the entire Okanagan Valley.
              </p>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
