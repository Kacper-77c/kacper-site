"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import TypedEmail from "./TypedEmail";
import KropkaPieczec from "./KropkaPieczec";
import MagneticButton from "@/components/shared/MagneticButton";

export default function PostPinReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kropkaRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const colophonRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(
        [kropkaRef.current, emailRef.current, buttonRef.current, colophonRef.current],
        {
          opacity: 0,
          y: 16,
        }
      );
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(kropkaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(emailRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.4")
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
        )
        .to(lineRef.current, { scaleX: 1, duration: 0.8, ease: "power3.out" }, "+=0.2");

      return () => tl.kill();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative bg-matchbox-navy text-paper py-32 px-16">
      <div ref={kropkaRef} className="absolute top-12 right-16">
        <KropkaPieczec />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div ref={emailRef} className="font-mono text-2xl xl:text-3xl text-paper">
          <TypedEmail email="kacper@kacperkrawczyk.pl" />
        </div>

        <div ref={buttonRef} style={{ willChange: "transform, opacity" }}>
          <MagneticButton href="mailto:kacper@kacperkrawczyk.pl">NAPISZ →</MagneticButton>
        </div>

        <div ref={colophonRef} className="font-mono text-sm text-earth/80 leading-relaxed mt-12">
          <p>Odpisuję w 24 godziny.</p>
          <p>Wrocław · pracownia · 2026.</p>
        </div>
      </div>

      <div
        ref={lineRef}
        className="absolute bottom-12 left-16 right-16 h-px bg-matchbox-red"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
