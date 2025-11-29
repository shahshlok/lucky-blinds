"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Judy Clarke",
    rating: 5,
    text: "We are so impressed with these friendly young men. They showed us all the choices we could make, and then after selection, measured all of our windows carefully. Once the blinds were in we received a text asking which day works for us. Blinds are up and look amazing. It modernized our space and are easy care and use. We would totally recommend this budding company.",
    highlight: "It modernized our space",
  },
  {
    id: 2,
    name: "Renata Steele",
    rating: 5,
    text: "I had an excellent experience with Lucky Blinds! From start to finish, their customer service was outstanding friendly, knowledgeable, and professional. They helped me choose the perfect blinds for my home, and the installation was quick, clean, and precise. The quality of the materials is top-notch, and my windows look absolutely amazing now. I truly appreciate their attention to detail and commitment to customer satisfaction. I highly recommend Lucky Blinds to anyone looking for great prices, beautiful designs, and reliable service!",
    highlight: "My windows look absolutely amazing",
  },
  {
    id: 3,
    name: "Gavin Brar",
    rating: 5,
    text: "I recently had Lucky Blinds install custom blinds throughout my home, and I couldn't be happier with the results! From the initial consultation to the final installation, their team was professional, knowledgeable, and incredibly helpful. The quality of the blinds is outstanding - they're well-made, durable, and look absolutely perfect in every room. Manav and Robin took great care to ensure everything was fitted perfectly. They even cleaned up completely after the job was done.",
    highlight: "Couldn't be happier with the results",
  },
  {
    id: 4,
    name: "Sandy Dinh",
    rating: 5,
    text: "Manav from Lucky Blinds recently installed my blinds, and I couldn't be happier. I really loved the quality of blinds and the prices are very reasonable. Great service from consulting to installing. Highly recommended!",
    highlight: "Quality and prices are very reasonable",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            "transition-colors",
            i < rating ? "fill-[#C9A962] text-[#C9A962]" : "fill-transparent text-[#E8E0D4]"
          )}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80])

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAF7F2]"
      id="testimonials"
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-[#8A9A5B]/[0.03] blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#C9A962]/[0.04] blur-[120px]" />
      </motion.div>

      {/* Large decorative quote */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <Quote size={400} strokeWidth={1} className="text-[#8A9A5B]" />
      </motion.div>

      <div className="container-luxe relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A9284] font-medium">
              Client Stories
            </span>
            <span className="block w-12 h-[1px] bg-[#8A9A5B]" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-[#0F1311] leading-[1.05] mb-6">
            Words from our
            <span className="block italic font-light text-[#8A9A5B] mt-1">
              happy clients.
            </span>
          </h2>

          <p className="text-[#5C7268] text-base lg:text-lg leading-relaxed">
            Every installation is a relationship built on trust, quality, and attention to detail.
          </p>
        </motion.div>

        {/* Featured Testimonial Card */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main card */}
          <div className="relative bg-[#F5F0E8] border border-[#E8E0D4] p-8 md:p-12 lg:p-16">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8A9A5B] to-transparent" />
              <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#8A9A5B] to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#8A9A5B] to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#8A9A5B] to-transparent" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {/* Quote icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 mb-8 bg-[#8A9A5B]/10 rounded-full">
                  <Quote size={24} className="text-[#8A9A5B]" />
                </div>

                {/* Highlight quote */}
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[#0F1311] leading-tight mb-8 italic">
                  &ldquo;{testimonials[activeIndex].highlight}&rdquo;
                </p>

                {/* Full testimonial */}
                <p className="text-[#5C7268] text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                  {testimonials[activeIndex].text}
                </p>

                {/* Divider */}
                <div className="w-16 h-[1px] bg-[#8A9A5B] mx-auto mb-6" />

                {/* Author info */}
                <div className="flex flex-col items-center gap-3">
                  <StarRating rating={testimonials[activeIndex].rating} />
                  <p className="font-display text-xl text-[#0F1311]">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7A9284]">
                    Verified Customer
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
              <motion.button
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center border border-[#E8E0D4] bg-[#FAF7F2] text-[#5C7268] hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
            </div>
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2">
              <motion.button
                onClick={next}
                className="w-12 h-12 flex items-center justify-center border border-[#E8E0D4] bg-[#FAF7F2] text-[#5C7268] hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-[#8A9A5B]"
                    : "w-2 bg-[#E8E0D4] hover:bg-[#D4C4A8]"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Mini testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={cn(
                "p-6 lg:p-8 border border-[#E8E0D4] bg-[#FAF7F2] transition-all duration-300 cursor-pointer",
                index === activeIndex
                  ? "border-[#8A9A5B] shadow-lg"
                  : "hover:border-[#D4C4A8]"
              )}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <StarRating rating={testimonial.rating} />
              <p className="font-display text-lg text-[#0F1311] mt-4 mb-3 leading-snug">
                &ldquo;{testimonial.highlight}&rdquo;
              </p>
              <p className="text-sm text-[#7A9284]">{testimonial.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
