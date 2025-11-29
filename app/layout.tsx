import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Inter, Geist as V0_Font_Geist } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lucky Blinds — Quality Window Blinds in Kelowna | Free Estimates",
  description:
    "Premium window blinds and shades in Kelowna & the Okanagan. Quality meets affordability with free in-home consultations and professional installation.",
  generator: "v0.app",
  alternates: {
    canonical: "https://luckyblinds.ca/",
  },
  openGraph: {
    siteName: "Lucky Blinds",
    title: "Quality Window Blinds in Kelowna | Lucky Blinds",
    description:
      "Premium window blinds and shades in Kelowna & the Okanagan. Quality meets affordability with free in-home consultations and professional installation.",
    type: "website",
    url: "https://luckyblinds.ca/",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Window Blinds in Kelowna | Lucky Blinds",
    description: "Premium window blinds and shades in Kelowna & the Okanagan. Quality meets affordability.",
    site: "@luckyblinds",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">{children}</body>
    </html>
  )
}
