"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Phone, User, Home, MessageSquare, MapPin, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  const inputClasses = (fieldName: string) => `
    w-full pl-12 pr-4 py-4 
    bg-transparent 
    border-b-2 transition-all duration-300
    text-[#0F1311] placeholder-[#7A9284] 
    focus:outline-none
    ${errors[fieldName] 
      ? "border-[#B44D4D]" 
      : focusedField === fieldName 
        ? "border-[#C4785A]" 
        : "border-[#E8E0D4] hover:border-[#C4785A]/50"
    }
  `

  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#F5F0E8] to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border border-[#E8E0D4] rounded-full -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-20 right-20 w-32 h-32 border border-[#C4785A]/20 rounded-full" />
      
      <div className="container-luxe relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-[1px] bg-[#C4785A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
                Free Consultation
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0F1311] leading-[1.1] mb-6">
              Let's transform
              <span className="block italic font-light text-[#C4785A]">your space.</span>
            </h2>
            
            <p className="text-lg text-[#2D3B35]/80 leading-relaxed mb-10 max-w-md">
              Schedule a free in-home consultation. We'll measure your windows, 
              discuss your style, and provide a no-obligation quote.
            </p>

            {/* Trust points */}
            <div className="space-y-4 mb-10">
              {[
                "Free professional measurement",
                "Same-week consultations available", 
                "No-obligation quotes"
              ].map((point, index) => (
                <motion.div 
                  key={point}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-5 h-5 bg-[#C4785A]/10 flex items-center justify-center">
                    <Check size={12} className="text-[#C4785A]" />
                  </div>
                  <span className="text-[#2D3B35]">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Service Areas */}
            <div className="p-6 bg-[#F5F0E8] border border-[#E8E0D4]">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-[#C4785A]" />
                <span className="text-sm font-medium uppercase tracking-wider text-[#2D3B35]">
                  Service Areas
                </span>
              </div>
              <p className="text-[#7A9284]">
                Kelowna · West Kelowna · Lake Country · Peachland · Vernon · Penticton
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white p-8 lg:p-10 shadow-[0_8px_40px_-8px_rgba(15,19,17,0.1)] border border-[#E8E0D4]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-8">
                      <h3 className="font-display text-2xl text-[#0F1311] mb-2">
                        Request Your Quote
                      </h3>
                      <p className="text-[#7A9284] text-sm">
                        Fill out the form and we'll be in touch within 24 hours.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                        <User size={18} className="text-[#7A9284]" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name *"
                        className={inputClasses("name")}
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                        <Phone size={18} className="text-[#7A9284]" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Phone number *"
                        className={inputClasses("phone")}
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                        <Home size={18} className="text-[#7A9284]" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("address")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Address (optional)"
                        className={inputClasses("address")}
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute top-4 left-0 pl-0 flex items-start pointer-events-none">
                        <MessageSquare size={18} className="text-[#7A9284]" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your project (optional)"
                        rows={3}
                        className={`${inputClasses("message")} resize-none`}
                      />
                    </div>

                    {(errors.name || errors.phone) && (
                      <motion.p
                        className="text-sm text-[#B44D4D]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Please fill in your name and phone number
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      className="group w-full flex items-center justify-center gap-3 bg-[#C4785A] text-[#FAF7F2] py-4 font-medium text-sm uppercase tracking-wider hover:bg-[#A65D3F] transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Request Free Quote
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>

                    <p className="text-xs text-[#7A9284] text-center">
                      By submitting, you agree to be contacted about your project.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-20 h-20 bg-[#C4785A]/10 flex items-center justify-center mx-auto mb-6">
                      <Check size={32} className="text-[#C4785A]" />
                    </div>
                    <h3 className="font-display text-2xl text-[#0F1311] mb-3">
                      Thank you, {formData.name}!
                    </h3>
                    <p className="text-[#7A9284] mb-8 max-w-sm mx-auto">
                      We've received your request. A Lucky Blinds specialist will contact 
                      you within 24 hours to schedule your free consultation.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-[#C4785A]">
                      <Phone size={14} />
                      <span>Or call us now: (250) 123-4567</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
