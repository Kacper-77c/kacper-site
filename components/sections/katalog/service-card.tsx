"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ServiceCardTorus } from "./service-card-torus";
import { StampButton } from "@/components/ui/stamp-button";

interface ServiceCardProps {
  code: string;
  serial: string;
  title: string;
  subtitle: string;
  forWhom: string;
  whatYouGet: string[];
  duration: string;
  torusRotation: "classic" | "profile" | "topdown";
  index: number;
  className?: string;
}

export function ServiceCard({
  code,
  serial,
  title,
  subtitle,
  forWhom,
  whatYouGet,
  duration,
  torusRotation,
  index,
  className,
}: ServiceCardProps) {
  return (
    <motion.article
      className={cn(
        "relative border border-ink/10 bg-paper",
        "flex flex-col gap-6 p-8 md:p-10",
        "transition-colors duration-300 hover:border-ink/25",
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className="font-mono text-[11px] uppercase tracking-[0.12em] text-earth flex items-start justify-between">
        <span>{code}</span>
        <span>{serial}</span>
      </header>

      <div className="self-start">
        <ServiceCardTorus rotation={torusRotation} />
      </div>

      <div className="space-y-1">
        <h3 className="fraunces-display text-[clamp(28px,3vw,40px)] leading-[1] text-ink">{title}</h3>
        <p className="fraunces-body text-base text-ink/70 leading-snug md:text-lg">{subtitle}</p>
      </div>

      <div className="border-t border-ink/10" />

      <div className="flex-1 space-y-5">
        <Field label="DLA KOGO">
          <p className="text-ink/85 leading-relaxed">{forWhom}</p>
        </Field>

        <Field label="CO DOSTAJESZ">
          <ul className="space-y-1.5 text-ink/85">
            {whatYouGet.map((item) => (
              <li key={item} className="flex gap-2 leading-relaxed">
                <span className="mt-1.5 flex-shrink-0 text-earth">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="CZAS">
            <p className="text-ink/85">{duration}</p>
          </Field>
          <Field label="WYCENA">
            <p className="text-ink/85">po rozmowie</p>
          </Field>
        </div>
      </div>

      <div className="pt-4">
        <StampButton
          variant="secondary"
          className="w-full justify-center"
          onClick={() => {
            document.getElementById("zamowienie")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Umów rozmowę →
        </StampButton>
      </div>
    </motion.article>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth">{label}</div>
      <div className="fraunces-body text-[15px]">{children}</div>
    </div>
  );
}
