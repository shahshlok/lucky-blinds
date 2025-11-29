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
        "flex flex-col items-center leading-none font-logo",
        colorConfig.text,
        className
      )}
    >
      <span className="text-[1.75rem] uppercase tracking-wider">Lucky</span>
      <span className="text-[0.6rem] uppercase tracking-[0.3em] mt-1 opacity-90">Blinds</span>
    </div>
  );
}
