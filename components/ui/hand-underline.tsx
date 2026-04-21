"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HandUnderlineProps {
  color?: "stamp" | "earth" | "ink";
  delay?: number;
  className?: string;
}

const colorMap: Record<NonNullable<HandUnderlineProps["color"]>, string> = {
  stamp: "var(--color-stamp)",
  earth: "var(--color-earth)",
  ink: "var(--color-ink)",
};

export function HandUnderline({
  color = "stamp",
  delay = 0,
  className,
}: HandUnderlineProps) {
  const stroke = colorMap[color];

  return (
    <svg
      viewBox="0 0 420 24"
      fill="none"
      preserveAspectRatio="none"
      className={cn("h-4 w-full", className)}
      aria-hidden="true"
    >
      <motion.path
        d="M 4 12 Q 45 8, 88 11 T 166 10 Q 192 12, 218 10 M 228 10 Q 271 13, 314 9 T 408 12"
        stroke={stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: delay / 1000,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M 24 14 Q 84 12, 142 13 M 252 12 Q 312 10, 374 13"
        stroke={stroke}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeOpacity="0.85"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.72,
          delay: delay / 1000 + 0.08,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
