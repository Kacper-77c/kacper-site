"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetodaStepProps {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  manifesto: string;
  duration: string;
  index: number;
  className?: string;
}

export function MetodaStep({
  number,
  title,
  subtitle,
  body,
  manifesto,
  duration,
  index,
  className,
}: MetodaStepProps) {
  return (
    <motion.article
      className={cn("relative border-t border-paper/15 py-12 first:border-t-0 md:py-16", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className="mb-2 flex items-baseline gap-4">
        <span className="font-mono text-sm uppercase tracking-[0.14em] text-earth/90">{number}</span>
        <h3 className="fraunces-display text-[clamp(32px,4vw,56px)] leading-[1] text-paper">{title}</h3>
      </header>

      <p className="fraunces-body mb-8 ml-[calc(2rem+1rem)] text-lg text-paper/80 leading-snug md:text-xl">
        {subtitle}
      </p>

      <div className="ml-[calc(2rem+1rem)] max-w-2xl space-y-6">
        <p className="fraunces-body text-base text-paper/90 leading-relaxed md:text-lg">{body}</p>

        <p className="fraunces-body text-base font-semibold text-paper leading-relaxed md:text-lg">
          {manifesto}
        </p>

        <div className="flex items-center gap-3 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80">CZAS</span>
          <span className="font-archivo text-sm text-paper/70">{duration}</span>
        </div>
      </div>
    </motion.article>
  );
}
