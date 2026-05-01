"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import TypedEmail from "./TypedEmail";
import { ClosingTorus } from "./ClosingTorus";
import MagneticButton from "@/components/shared/MagneticButton";

export default function PostPinReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const colophonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(
        [accentRef.current, emailRef.current, buttonRef.current, colophonRef.current],
        { opacity: 0, y: 16 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(accentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(
          emailRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "+=0.4"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
          "+=1.4"
        )
        .to(
          colophonRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "+=0.4"
        );

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-matchbox-navy text-paper pt-12 pb-16 px-6 md:px-20"
    >
      {/* Mini ASCII torus knot accent — top right */}
      <div
        ref={accentRef}
        className="absolute top-8 right-6 md:right-20 w-16 h-16 opacity-70"
      >
        <ClosingTorus scrollProgress={1.0} className="w-full h-full" />
      </div>

      {/* Editorial spread — email/button left, colophon right */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Email + Button — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              ref={emailRef}
              className="font-mono text-xl md:text-2xl lg:text-3xl text-paper"
              style={{ willChange: "transform, opacity" }}
            >
              <TypedEmail email="kacper@kacperkrawczyk.pl" />
            </div>
            <div ref={buttonRef} style={{ willChange: "transform, opacity" }}>
              <MagneticButton href="mailto:kacper@kacperkrawczyk.pl">
                NAPISZ →
              </MagneticButton>
            </div>
          </div>

          {/* Colophon — 5 cols, right-aligned (with meta line as first row) */}
          <div
            ref={colophonRef}
            className="lg:col-span-5 font-mono text-sm text-earth/70 leading-relaxed lg:text-right space-y-1"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[10px] uppercase tracking-[0.14em] text-earth/90 mb-3">
              zam. 06 · protokół 2026/I
            </p>
            <p>Odpisuję w 24 godziny.</p>
            <p>Wrocław · pracownia · 2026.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
