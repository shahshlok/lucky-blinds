import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { ScrollDetector } from "@/components/scroll-detector"

import "./globals.css"

// Display font - elegant serif for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

// Body font - clean, modern sans-serif
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})



export const metadata: Metadata = {
  title: "Lucky Blinds — Premium Window Coverings in Kelowna | Free Consultation",
  description:
    "Elevate your Okanagan home with bespoke window blinds and shades. Exceptional craftsmanship meets lakeside living. Free in-home consultations.",
  generator: "v0.app",
  alternates: {
    canonical: "https://luckyblinds.ca/",
  },
  openGraph: {
    siteName: "Lucky Blinds",
    title: "Premium Window Coverings in Kelowna | Lucky Blinds",
    description:
      "Elevate your Okanagan home with bespoke window blinds and shades. Exceptional craftsmanship meets lakeside living.",
    type: "website",
    url: "https://luckyblinds.ca/",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Window Coverings in Kelowna | Lucky Blinds",
    description: "Elevate your Okanagan home with bespoke window blinds and shades.",
    site: "@luckyblinds",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-[#FAF7F2] text-[#0F1311]">
        <ScrollDetector />
        <div className="grain-overlay min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
