"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OurCollection } from "@/components/featured-products"
import { MaterialsSection } from "@/components/materials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <OurCollection />
      <MaterialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
