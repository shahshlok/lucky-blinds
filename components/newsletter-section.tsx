"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Phone, MapPin, ArrowRight, ArrowLeft, Sparkles, Rows3, Layers, Blinds, TreePine } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const blindTypes = [
  { 
    id: "cellular", 
    name: "Cellular", 
    icon: Layers,
    description: "Energy efficient honeycomb",
    image: "/new_images/cellular.jpg"
  },
  { 
    id: "roller", 
    name: "Roller", 
    icon: Blinds,
    description: "Sleek & minimal",
    image: "/new_images/roller.jpg"
  },
  { 
    id: "zebra", 
    name: "Zebra", 
    icon: Rows3,
    description: "Dynamic light control",
    image: "/new_images/zebra.jpg"
  },
  { 
    id: "faux-wood", 
    name: "Faux Wood", 
    icon: TreePine,
    description: "Classic warmth",
    image: "/new_images/faux.jpeg"
  },
]

const contactTimes = [
  { id: "morning", label: "Morning", time: "9am - 12pm" },
  { id: "afternoon", label: "Afternoon", time: "12pm - 5pm" },
  { id: "evening", label: "Evening", time: "5pm - 8pm" },
]

export function NewsletterSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    blindType: "",
    name: "",
    phone: "",
    address: "",
    contactTime: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [completedFields, setCompletedFields] = useState<string[]>([])

  const totalSteps = 3

  useEffect(() => {
    const completed: string[] = []
    if (formData.blindType) completed.push("blindType")
    if (formData.name.trim()) completed.push("name")
    if (formData.phone.trim()) completed.push("phone")
    if (formData.address.trim()) completed.push("address")
    if (formData.contactTime) completed.push("contactTime")
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

  const nextStep = () => {
    if (step === 2) {
      const newErrors: Record<string, boolean> = {}
      if (!formData.name.trim()) newErrors.name = true
      if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = true
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const selectBlindType = (id: string) => {
    setFormData((prev) => ({ ...prev, blindType: id }))
    setTimeout(() => nextStep(), 300)
  }

  const stepVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 40 : -40, opacity: 0 }),
  }

  return (
    <section className="pt-24 pb-32 lg:pt-32 lg:pb-40 bg-[#0F1311] relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(138,154,91,0.08)_0%,_transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(201,169,98,0.05)_0%,_transparent_70%)]" />
      
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
              <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/60 font-medium">
                Free Consultation
              </span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2] leading-[1.1] mb-6">
              Let&apos;s transform
              <span className="block italic font-light text-[#8A9A5B]">your space.</span>
            </h2>
            
            <p className="text-lg text-[#FAF7F2]/60 leading-relaxed mb-10 max-w-md">
              Schedule a free in-home consultation. We&apos;ll measure your windows, 
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
                  <div className="w-5 h-5 bg-[#8A9A5B]/20 flex items-center justify-center">
                    <Check size={12} className="text-[#8A9A5B]" />
                  </div>
                  <span className="text-[#FAF7F2]/80">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Service Areas */}
            <motion.div 
              className="relative p-6 bg-gradient-to-br from-[#1A1F1C] to-[#0F1311] border border-[#8A9A5B]/30 shadow-[0_0_30px_rgba(138,154,91,0.1)]"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(138,154,91,0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8A9A5B] to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#8A9A5B] to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#8A9A5B] to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#8A9A5B] to-transparent" />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#8A9A5B]/20 flex items-center justify-center">
                  <MapPin size={16} className="text-[#8A9A5B]" />
                </div>
                <span className="text-sm font-medium uppercase tracking-wider text-[#FAF7F2]/90">
                  Service Areas
                </span>
              </div>
              <p className="text-[#FAF7F2]/60 leading-relaxed">
                Kelowna · West Kelowna · Lake Country · Peachland · Vernon · Penticton
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Multi-Step Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#FAF7F2] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    {/* Progress Bar */}
                    <div className="h-1 bg-[#E8E0D4]">
                      <motion.div
                        className="h-full bg-[#8A9A5B]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>

                    <div className="p-8 lg:p-10">
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((s) => (
                            <motion.div
                              key={s}
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                                s === step
                                  ? "bg-[#8A9A5B] text-[#FAF7F2]"
                                  : s < step
                                  ? "bg-[#8A9A5B]/20 text-[#8A9A5B]"
                                  : "bg-[#E8E0D4] text-[#7A9284]"
                              )}
                              animate={{ scale: s === step ? 1.1 : 1 }}
                            >
                              {s < step ? <Check size={14} /> : s}
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs uppercase tracking-wider text-[#7A9284]">
                          Step {step} of {totalSteps}
                        </span>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait" custom={step}>
                          {/* Step 1: Blind Type Selection */}
                          {step === 1 && (
                            <motion.div
                              key="step1"
                              custom={1}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <h3 className="font-display text-2xl text-[#0F1311] mb-2">
                                What catches your eye?
                              </h3>
                              <p className="text-[#7A9284] text-sm mb-6">
                                Select a style you&apos;re interested in (or skip to continue)
                              </p>

                              <div className="grid grid-cols-2 gap-3 mb-6">
                                {blindTypes.map((blind, index) => {
                                  const Icon = blind.icon
                                  return (
                                    <motion.button
                                      key={blind.id}
                                      type="button"
                                      onClick={() => selectBlindType(blind.id)}
                                      className={cn(
                                        "group relative overflow-hidden text-left transition-all duration-300",
                                        "border-2 hover:border-[#8A9A5B]",
                                        formData.blindType === blind.id
                                          ? "border-[#8A9A5B] bg-[#8A9A5B]/5"
                                          : "border-[#E8E0D4]"
                                      )}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <div className="relative h-24 overflow-hidden">
                                        <Image
                                          src={blind.image}
                                          alt={blind.name}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1311]/80 to-transparent" />
                                      </div>
                                      <div className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Icon size={14} className="text-[#8A9A5B]" />
                                          <span className="font-medium text-[#0F1311]">{blind.name}</span>
                                        </div>
                                        <p className="text-xs text-[#7A9284]">{blind.description}</p>
                                      </div>
                                      {formData.blindType === blind.id && (
                                        <motion.div
                                          className="absolute top-2 right-2 w-6 h-6 bg-[#8A9A5B] rounded-full flex items-center justify-center"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                          <Check size={12} className="text-[#FAF7F2]" />
                                        </motion.div>
                                      )}
                                    </motion.button>
                                  )
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={nextStep}
                                className="text-sm text-[#7A9284] hover:text-[#8A9A5B] transition-colors underline underline-offset-4"
                              >
                                Skip, I&apos;m not sure yet
                              </button>
                            </motion.div>
                          )}

                          {/* Step 2: Contact Info */}
                          {step === 2 && (
                            <motion.div
                              key="step2"
                              custom={2}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <h3 className="font-display text-2xl text-[#0F1311] mb-2">
                                How can we reach you?
                              </h3>
                              <p className="text-[#7A9284] text-sm mb-6">
                                We&apos;ll contact you within 24 hours
                              </p>

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

                                {/* Address Field */}
                                <div className="relative">
                                  <motion.label
                                    className={cn(
                                      "absolute left-0 transition-all duration-300 pointer-events-none",
                                      focusedField === "address" || formData.address
                                        ? "top-0 text-xs text-[#8A9A5B]"
                                        : "top-4 text-[#7A9284]"
                                    )}
                                  >
                                    Address (optional)
                                  </motion.label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("address")}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pt-5 pb-2 bg-transparent border-b-2 border-[#E8E0D4] hover:border-[#8A9A5B]/50 focus:border-[#8A9A5B] transition-all duration-300 text-[#0F1311] focus:outline-none"
                                  />
                                  {completedFields.includes("address") && (
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

                                {(errors.name || errors.phone) && (
                                  <motion.p
                                    className="text-sm text-[#B44D4D]"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                  >
                                    Please fill in your name and a valid phone number
                                  </motion.p>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* Step 3: Preferences */}
                          {step === 3 && (
                            <motion.div
                              key="step3"
                              custom={3}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <h3 className="font-display text-2xl text-[#0F1311] mb-2">
                                Almost there!
                              </h3>
                              <p className="text-[#7A9284] text-sm mb-6">
                                When&apos;s the best time to call?
                              </p>

                              {/* Contact Time Selection */}
                              <div className="flex gap-2 mb-6">
                                {contactTimes.map((time) => (
                                  <motion.button
                                    key={time.id}
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, contactTime: time.id }))}
                                    className={cn(
                                      "flex-1 py-3 px-2 border-2 transition-all duration-300 text-center",
                                      formData.contactTime === time.id
                                        ? "border-[#8A9A5B] bg-[#8A9A5B]/10"
                                        : "border-[#E8E0D4] hover:border-[#8A9A5B]/50"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span className="block text-sm font-medium text-[#0F1311]">{time.label}</span>
                                    <span className="block text-xs text-[#7A9284]">{time.time}</span>
                                  </motion.button>
                                ))}
                              </div>

                              {/* Message Field */}
                              <div className="relative mb-6">
                                <motion.label
                                  className={cn(
                                    "absolute left-0 transition-all duration-300 pointer-events-none",
                                    focusedField === "message" || formData.message
                                      ? "top-0 text-xs text-[#8A9A5B]"
                                      : "top-4 text-[#7A9284]"
                                  )}
                                >
                                  Anything else we should know? (optional)
                                </motion.label>
                                <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField("message")}
                                  onBlur={() => setFocusedField(null)}
                                  rows={3}
                                  className="w-full pt-5 pb-2 bg-transparent border-b-2 border-[#E8E0D4] hover:border-[#8A9A5B]/50 focus:border-[#8A9A5B] transition-all duration-300 text-[#0F1311] focus:outline-none resize-none"
                                />
                              </div>

                              {/* Summary */}
                              <div className="bg-[#F5F0E8] p-4 mb-6">
                                <p className="text-xs uppercase tracking-wider text-[#7A9284] mb-2">Your request</p>
                                <div className="space-y-1 text-sm">
                                  {formData.blindType && (
                                    <p className="text-[#0F1311]">
                                      <span className="text-[#7A9284]">Interest:</span>{" "}
                                      {blindTypes.find((b) => b.id === formData.blindType)?.name} Blinds
                                    </p>
                                  )}
                                  <p className="text-[#0F1311]">
                                    <span className="text-[#7A9284]">Name:</span> {formData.name}
                                  </p>
                                  <p className="text-[#0F1311]">
                                    <span className="text-[#7A9284]">Phone:</span> {formData.phone}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 mt-8">
                          {step > 1 && (
                            <motion.button
                              type="button"
                              onClick={prevStep}
                              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#E8E0D4] text-[#7A9284] hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ArrowLeft size={16} />
                              Back
                            </motion.button>
                          )}
                          
                          {step < totalSteps ? (
                            <motion.button
                              type="button"
                              onClick={nextStep}
                              className="flex-1 group flex items-center justify-center gap-3 bg-[#8A9A5B] text-[#FAF7F2] py-4 font-medium text-sm uppercase tracking-wider hover:bg-[#6F7D48] transition-colors duration-300"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              Continue
                              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                          ) : (
                            <motion.button
                              type="submit"
                              className="flex-1 group flex items-center justify-center gap-3 bg-[#8A9A5B] text-[#FAF7F2] py-4 font-medium text-sm uppercase tracking-wider hover:bg-[#6F7D48] transition-colors duration-300"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <Sparkles size={16} />
                              Get My Free Quote
                            </motion.button>
                          )}
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
                        A Lucky Blinds specialist will reach out 
                        {formData.contactTime && ` in the ${formData.contactTime}`} to schedule your free consultation.
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
        <div className="container-luxe">
          <div className="relative flex items-center justify-center py-8">
            {/* Left line */}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8A9A5B]/40 to-[#8A9A5B]/60" />
            
            {/* Center ornament */}
            <div className="relative mx-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#8A9A5B]/40 rotate-45" />
              <div className="w-2 h-2 border border-[#8A9A5B]/60 rotate-45" />
              <div className="w-3 h-3 border-2 border-[#8A9A5B] rotate-45" />
              <div className="w-2 h-2 border border-[#8A9A5B]/60 rotate-45" />
              <div className="w-1.5 h-1.5 bg-[#8A9A5B]/40 rotate-45" />
            </div>
            
            {/* Right line */}
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#8A9A5B]/40 to-[#8A9A5B]/60" />
          </div>
        </div>
      </div>
    </section>
  )
}
