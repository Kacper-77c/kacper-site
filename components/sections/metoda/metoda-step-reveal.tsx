"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface MetodaStepRevealProps {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  manifesto: string;
  duration: string;
  isActive: boolean;
  stepIndex: number;
  className?: string;
}

export function MetodaStepReveal({
  number,
  title,
  subtitle,
  body,
  manifesto,
  duration,
  isActive,
  stepIndex,
  className,
}: MetodaStepRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const splitsRef = useRef<SplitText[]>([]);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-center",
          "transition-opacity duration-500",
          isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none",
          className
        )}
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-earth/90">{number}</span>
            <h3 className="fraunces-display text-[clamp(40px,5vw,80px)] leading-[0.95] text-paper">
              {title}
            </h3>
          </div>

          <p className="fraunces-body mb-8 ml-[calc(2.5rem+1rem)] text-xl text-paper/80 leading-snug md:text-2xl">
            {subtitle}
          </p>
          <p className="fraunces-body mb-6 ml-[calc(2.5rem+1rem)] text-base text-paper/90 leading-relaxed md:text-lg">
            {body}
          </p>
          <p className="fraunces-body mb-8 ml-[calc(2.5rem+1rem)] text-base font-semibold text-paper leading-relaxed md:text-lg">
            {manifesto}
          </p>
          <div className="ml-[calc(2.5rem+1rem)] flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80">CZAS</span>
            <span className="font-archivo text-sm text-paper/70">{duration}</span>
          </div>
        </div>
      </div>
    );
  }

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !titleRef.current ||
        !subtitleRef.current ||
        !bodyRef.current ||
        !manifestoRef.current
      ) {
        return;
      }

      if (typeof window === "undefined") return;

      const titleSplit = new SplitText(titleRef.current, {
        type: "words",
        wordsClass: "word",
      });
      const subtitleSplit = new SplitText(subtitleRef.current, {
        type: "words",
        wordsClass: "word",
      });
      const bodySplit = new SplitText(bodyRef.current, {
        type: "words",
        wordsClass: "word",
      });
      const manifestoSplit = new SplitText(manifestoRef.current, {
        type: "words",
        wordsClass: "word",
      });

      splitsRef.current = [titleSplit, subtitleSplit, bodySplit, manifestoSplit];

      const allWords = [...titleSplit.words, ...subtitleSplit.words, ...bodySplit.words, ...manifestoSplit.words];

      gsap.set(allWords, {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
      });

      if (isActive) {
        gsap.to(allWords, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
          overwrite: "auto",
          delay: stepIndex * 0.01,
        });
      }

      return () => {
        splitsRef.current.forEach((split) => split.revert());
        splitsRef.current = [];
      };
    },
    {
      scope: containerRef,
      dependencies: [isActive, stepIndex],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 flex flex-col justify-center",
        "transition-opacity duration-500",
        isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none",
        className
      )}
    >
      <div className="max-w-2xl">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-mono text-sm uppercase tracking-[0.14em] text-earth/90">{number}</span>
          <h3 ref={titleRef} className="fraunces-display text-[clamp(40px,5vw,80px)] leading-[0.95] text-paper">
            {title}
          </h3>
        </div>

        <p
          ref={subtitleRef}
          className="fraunces-body mb-8 ml-[calc(2.5rem+1rem)] text-xl text-paper/80 leading-snug md:text-2xl"
        >
          {subtitle}
        </p>

        <p
          ref={bodyRef}
          className="fraunces-body mb-6 ml-[calc(2.5rem+1rem)] text-base text-paper/90 leading-relaxed md:text-lg"
        >
          {body}
        </p>

        <p
          ref={manifestoRef}
          className="fraunces-body mb-8 ml-[calc(2.5rem+1rem)] text-base font-semibold text-paper leading-relaxed md:text-lg"
        >
          {manifesto}
        </p>

        <div className="ml-[calc(2.5rem+1rem)] flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80">CZAS</span>
          <span className="font-archivo text-sm text-paper/70">{duration}</span>
        </div>
      </div>
    </div>
  );
}
