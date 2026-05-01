"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { MutableRefObject } from "react";

interface ClosingCopyCrossfadeProps {
  progressRef: MutableRefObject<{ value: number }>;
}

export default function ClosingCopyCrossfade({
  progressRef,
}: ClosingCopyCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLParagraphElement>(null);
  const phase2Ref = useRef<HTMLParagraphElement>(null);
  const phase3Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set([phase1Ref.current, phase2Ref.current, phase3Ref.current], {
        opacity: 0,
        y: 8,
      });

      const floatTween = gsap.to(phase3Ref.current, {
        y: -2,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      let rafId = 0;

      const updatePhases = () => {
        const p = progressRef.current.value;

        if (p < 0.05) {
          const t = p / 0.05;
          gsap.set(phase1Ref.current, { opacity: t, y: 8 - t * 8 });
        } else if (p < 0.28) {
          gsap.set(phase1Ref.current, { opacity: 1, y: 0 });
        } else if (p < 0.33) {
          const t = (p - 0.28) / 0.05;
          gsap.set(phase1Ref.current, { opacity: 1 - t, y: -8 * t });
        } else {
          gsap.set(phase1Ref.current, { opacity: 0, y: -8 });
        }

        if (p < 0.34) {
          gsap.set(phase2Ref.current, { opacity: 0, y: 8 });
        } else if (p < 0.39) {
          const t = (p - 0.34) / 0.05;
          gsap.set(phase2Ref.current, { opacity: t, y: 8 - t * 8 });
        } else if (p < 0.61) {
          gsap.set(phase2Ref.current, { opacity: 1, y: 0 });
        } else if (p < 0.66) {
          const t = (p - 0.61) / 0.05;
          gsap.set(phase2Ref.current, { opacity: 1 - t, y: -8 * t });
        } else {
          gsap.set(phase2Ref.current, { opacity: 0, y: -8 });
        }

        if (p < 0.67) {
          gsap.set(phase3Ref.current, { opacity: 0, y: 8, scale: 0.95 });
        } else if (p < 0.72) {
          const t = (p - 0.67) / 0.05;
          const eased = overshootEase(t);
          gsap.set(phase3Ref.current, {
            opacity: t,
            y: 8 - eased * 8,
            scale: 0.95 + eased * 0.05,
          });
        } else {
          gsap.set(phase3Ref.current, { opacity: 1, y: 0, scale: 1 });
        }

        if (p > 0.72 && p < 1.0) {
          if (floatTween.paused()) floatTween.resume();
        } else {
          if (!floatTween.paused()) floatTween.pause();
        }

        rafId = requestAnimationFrame(updatePhases);
      };

      rafId = requestAnimationFrame(updatePhases);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        floatTween.kill();
      };
    },
    { scope: containerRef }
  );

  function overshootEase(t: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  return (
    <div ref={containerRef} className="relative w-full grid place-items-start">
      <p
        ref={phase1Ref}
        className="col-start-1 row-start-1 font-display text-5xl xl:text-6xl text-paper leading-tight tracking-tight"
        style={{ willChange: "transform, opacity" }}
      >
        Strony których się nie zapomina.
      </p>
      <p
        ref={phase2Ref}
        className="col-start-1 row-start-1 font-display text-5xl xl:text-6xl text-paper leading-tight tracking-tight"
        style={{ willChange: "transform, opacity" }}
      >
        Każda zaczyna się jednym mailem.
      </p>
      <p
        ref={phase3Ref}
        className="col-start-1 row-start-1 font-display text-7xl xl:text-8xl text-paper leading-none tracking-tight font-medium"
        style={{ willChange: "transform, opacity" }}
      >
        Napisz.
      </p>
    </div>
  );
}
