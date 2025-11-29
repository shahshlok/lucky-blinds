"use client"

import { useEffect } from "react"

export function ScrollDetector() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      document.documentElement.classList.add("is-scrolling")
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling")
      }, 1000) // Hide scrollbar 1 second after scrolling stops
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
