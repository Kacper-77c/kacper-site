"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface StampButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function StampButton({
  variant = "primary",
  className,
  children,
  ...props
}: StampButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center",
        "rounded-full border-2 px-8 py-4",
        "font-archivo font-bold uppercase tracking-[0.08em] text-sm",
        "transition-all duration-[120ms] ease-out",
        "rotate-[-2deg] hover:rotate-0 hover:-translate-y-0.5",
        "active:translate-y-0 active:scale-[0.98]",
        variant === "primary" &&
          "border-stamp bg-stamp text-paper hover:bg-stamp/90",
        variant === "secondary" &&
          "border-stamp bg-transparent text-stamp hover:bg-stamp/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}