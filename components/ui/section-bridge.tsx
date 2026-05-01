"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionBridgeProps {
  nextNumber: string;
  nextLabel: string;
  nextDescription: string;
  className?: string;
  variant?: "light" | "dark";
}

export function SectionBridge({
  nextNumber,
  nextLabel,
  nextDescription,
  className,
  variant = "dark",
}: SectionBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.8], [10, 0]);

  const colorClass = variant === "dark" ? "text-earth/70" : "text-earth";

  return (
    <div ref={ref} className={cn("w-full flex justify-center pt-12 pb-8", className)}>
      <motion.div
        style={{ opacity, y }}
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.18em] flex items-center gap-3",
          colorClass
        )}
      >
        <span className="text-base">↓</span>
        <span>nr {nextNumber}</span>
        <span>·</span>
        <span>{nextLabel}</span>
        <span>·</span>
        <span>{nextDescription}</span>
      </motion.div>
    </div>
  );
}
