"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  const colors = {
    light: {
      text: "text-[#FAF7F2]",
    },
    dark: {
      text: "text-[#0F1311]",
    },
  };

  const colorConfig = colors[variant];

  return (
    <div 
      className={cn(
        "text-[1.5rem] tracking-[-0.01em] leading-none font-logo",
        colorConfig.text,
        className
      )}
    >
      <span className="italic">Lucky</span>
      {" "}
      <span className="not-italic">Blinds</span>
    </div>
  );
}
