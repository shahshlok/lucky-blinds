import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BlurPanelProps {
  children: ReactNode
  className?: string
  variant?: "light" | "dark"
}

export function BlurPanel({ children, className, variant = "dark" }: BlurPanelProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-md will-change-transform block w-fit mx-auto",
        variant === "dark" 
          ? "bg-[#0F1311]/60 border border-[#2D3B35]/30" 
          : "bg-[#FAF7F2]/80 border border-[#E8E0D4]/50",
        className
      )}
      role="region"
    >
      {children}
    </div>
  )
}
