"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Phone, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendContactEmail } from "@/app/actions"

const contactTimes = []

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [completedFields, setCompletedFields] = useState<string[]>([])

  useEffect(() => {
    const completed: string[] = []
    if (formData.name.trim()) completed.push("name")
    if (formData.phone.trim()) completed.push("phone")
    if (formData.email.trim()) completed.push("email")
    if (formData.message.trim()) completed.push("message")
    setCompletedFields(completed)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
    setErrors((prev) => ({ ...prev, phone: false }))
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = true
    if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = true
    if (!formData.message.trim()) newErrors.message = true
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: "", phone: "", email: "", message: "" })
      } else {
        setServerError(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  

  return (
    <section className="py-24 lg:py-32 bg-[#0F1311] relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(138,154,91,0.08)_0%,_transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(201,169,98,0.05)_0%,_transparent_70%)]" />
      
      <div className="container-luxe relative">
        <div className="max-w-2xl mx-auto">
          <motion.div
          initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#FAF7F2] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    <div className="p-8 lg:p-10">
                      <h3 className="font-display text-2xl text-[#0F1311] mb-2">
                        Get your free consultation
                      </h3>
                      <p className="text-[#7A9284] text-sm mb-8">
                        We&apos;ll contact you within 24 hours
                      </p>

                      <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                          {/* Name Field */}
                          <div className="relative">
                            <motion.label
                              className={cn(
                                "absolute left-0 transition-all duration-300 pointer-events-none",
                                focusedField === "name" || formData.name
                                  ? "top-0 text-xs text-[#8A9A5B]"
                                  : "top-4 text-[#7A9284]"
                              )}
                            >
                              Your name *
                            </motion.label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              className={cn(
                                "w-full pt-5 pb-2 bg-transparent border-b-2 transition-all duration-300 text-[#0F1311] focus:outline-none",
                                errors.name
                                  ? "border-[#B44D4D]"
                                  : focusedField === "name"
                                  ? "border-[#8A9A5B]"
                                  : "border-[#E8E0D4] hover:border-[#8A9A5B]/50"
                              )}
                            />
                            {completedFields.includes("name") && (
                              <motion.div
                                className="absolute right-0 top-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check size={16} className="text-[#8A9A5B]" />
                              </motion.div>
                            )}
                          </div>

                          {/* Phone Field */}
                          <div className="relative">
                            <motion.label
                              className={cn(
                                "absolute left-0 transition-all duration-300 pointer-events-none",
                                focusedField === "phone" || formData.phone
                                  ? "top-0 text-xs text-[#8A9A5B]"
                                  : "top-4 text-[#7A9284]"
                              )}
                            >
                              Phone number *
                            </motion.label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              className={cn(
                                "w-full pt-5 pb-2 bg-transparent border-b-2 transition-all duration-300 text-[#0F1311] focus:outline-none",
                                errors.phone
                                  ? "border-[#B44D4D]"
                                  : focusedField === "phone"
                                  ? "border-[#8A9A5B]"
                                  : "border-[#E8E0D4] hover:border-[#8A9A5B]/50"
                              )}
                            />
                            {completedFields.includes("phone") && formData.phone.replace(/\D/g, "").length >= 10 && (
                              <motion.div
                                className="absolute right-0 top-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check size={16} className="text-[#8A9A5B]" />
                              </motion.div>
                            )}
                          </div>

                          {/* Email Field */}
                          <div className="relative">
                            <motion.label
                              className={cn(
                                "absolute left-0 transition-all duration-300 pointer-events-none",
                                focusedField === "email" || formData.email
                                  ? "top-0 text-xs text-[#8A9A5B]"
                                  : "top-4 text-[#7A9284]"
                              )}
                            >
                              Email address *
                            </motion.label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className={cn(
                                "w-full pt-5 pb-2 bg-transparent border-b-2 transition-all duration-300 text-[#0F1311] focus:outline-none",
                                errors.email
                                  ? "border-[#B44D4D]"
                                  : focusedField === "email"
                                  ? "border-[#8A9A5B]"
                                  : "border-[#E8E0D4] hover:border-[#8A9A5B]/50"
                              )}
                            />
                            {completedFields.includes("email") && validateEmail(formData.email) && (
                              <motion.div
                                className="absolute right-0 top-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check size={16} className="text-[#8A9A5B]" />
                              </motion.div>
                            )}
                          </div>

                          {/* Message Field */}
                          <div className="relative">
                            <motion.label
                              className={cn(
                                "absolute left-0 transition-all duration-300 pointer-events-none",
                                focusedField === "message" || formData.message
                                  ? "top-0 text-xs text-[#8A9A5B]"
                                  : "top-4 text-[#7A9284]"
                              )}
                            >
                              Message *
                            </motion.label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("message")}
                              onBlur={() => setFocusedField(null)}
                              rows={4}
                              className={cn(
                                "w-full pt-5 pb-2 bg-transparent border-b-2 transition-all duration-300 text-[#0F1311] focus:outline-none resize-none",
                                errors.message
                                  ? "border-[#B44D4D]"
                                  : focusedField === "message"
                                  ? "border-[#8A9A5B]"
                                  : "border-[#E8E0D4] hover:border-[#8A9A5B]/50"
                              )}
                            />
                            {completedFields.includes("message") && (
                              <motion.div
                                className="absolute right-0 top-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check size={16} className="text-[#8A9A5B]" />
                              </motion.div>
                            )}
                          </div>

                          {(errors.name || errors.phone || errors.email || errors.message) && (
                            <motion.p
                              className="text-sm text-[#B44D4D]"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              Please fill in all required fields with valid information
                            </motion.p>
                          )}
                          {serverError && (
                            <motion.p
                              className="text-sm text-[#B44D4D]"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {serverError}
                            </motion.p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                              "w-full group flex items-center justify-center gap-3 bg-[#8A9A5B] text-[#FAF7F2] py-4 font-medium text-sm uppercase tracking-wider transition-colors duration-300",
                              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#6F7D48]"
                            )}
                            whileHover={!isSubmitting ? { scale: 1.01 } : undefined}
                            whileTap={!isSubmitting ? { scale: 0.99 } : undefined}
                          >
                            {/*<Sparkles size={16} />*/}
                            {isSubmitting ? "Sending..." : "Get My Free Quote"}
                          </motion.button>
                        </div>

                        <p className="text-xs text-[#7A9284] text-center mt-4">
                          By submitting, you agree to be contacted about your project.
                        </p>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    className="relative p-8 lg:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Celebration particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-[#8A9A5B]"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            rotate: Math.random() * 360,
                          }}
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [1, 1, 0],
                            y: [0, -100 - Math.random() * 50],
                            x: [0, (Math.random() - 0.5) * 100],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-center py-8 relative">
                      <motion.div
                        className="w-24 h-24 bg-[#8A9A5B] flex items-center justify-center mx-auto mb-8"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Check size={40} className="text-[#FAF7F2]" strokeWidth={3} />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        className="font-display text-3xl text-[#0F1311] mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        You&apos;re all set, {formData.name.split(" ")[0]}!
                      </motion.h3>

                      <motion.p
                        className="text-[#7A9284] mb-8 max-w-sm mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        A Lucky Blinds specialist will reach out to schedule your free consultation.
                      </motion.p>

                      <motion.div
                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5F0E8]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Phone size={16} className="text-[#8A9A5B]" />
                        <span className="text-sm text-[#0F1311]">
                          Can&apos;t wait? Call us: <strong>(778) 645-0024</strong>
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#8A9A5B]/30 to-transparent" />
      </div>
    </section>
  )
}
