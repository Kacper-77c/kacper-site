"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { ScrollSection } from "@/components/layout/scroll-section";
import { ClosingTorus } from "./ClosingTorus";
import { ClosingCopyCrossfade } from "./ClosingCopyCrossfade";
import PostPinReveal from "./PostPinReveal";

const PIN_VH = 280;

export default function ZamowienieSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      if (!pinContainerRef.current || !pinTargetRef.current) return;

      const st = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: `+=${PIN_VH}%`,
        pin: pinTargetRef.current,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      scope: pinContainerRef,
    }
  );

  return (
    <ScrollSection
      id="zamowienie"
      number="06"
      label="ZAMOWIENIE"
      background="navy"
      transition="hard"
      verticalMetaSegments={["KK-06", "ZAMÓWIENIE", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
      {/* Intro headline — editorial moment przed pinned ceremony */}
      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="fraunces-display text-[clamp(40px,6vw,88px)] leading-[0.95] text-paper mb-6">
          Ostatni krok.
        </h2>
        <p className="fraunces-body text-lg text-paper/80 leading-relaxed max-w-2xl mx-auto md:text-xl">
          Strona zaczyna się od jednej rozmowy.
        </p>
      </motion.div>

      {/* Desktop pinned ceremony */}
      <div className="hidden lg:block">
        <div
          ref={pinContainerRef}
          className="relative"
          style={{ height: `${PIN_VH + 100}vh` }}
        >
          <div ref={pinTargetRef} className="h-screen w-full flex items-center">
            <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto w-full px-8">
              {/* Copy area — 9 cols, dominant */}
              <div className="col-span-9 flex items-center">
                <ClosingCopyCrossfade scrollProgress={scrollProgress} />
              </div>
              {/* Torus accent — 3 cols, decorative */}
              <div className="col-span-3 flex items-center justify-end">
                <div className="w-full aspect-square max-w-[240px]">
                  <ClosingTorus
                    scrollProgress={scrollProgress}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="w-full lg:hidden">
        <ZamowienieMobile />
      </div>

      {/* Footer meta */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 md:mt-24 font-mono text-[10px] uppercase tracking-[0.14em] text-earth/90 flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span>zam. 06 · protokół 2026/I</span>
        <span>napisz · zacznijmy</span>
      </motion.div>

      {/* Post-pin CTA — outside pinned, scroll-triggered reveal */}
      <PostPinReveal />
    </ScrollSection>
  );
}

// Mobile fallback — vertical stack, no pin
function ZamowienieMobile() {
  const phases = [
    "Strony których się nie zapomina.",
    "Każda zaczyna się jednym mailem.",
    "Napisz.",
  ];

  return (
    <div className="space-y-12 px-6 py-12">
      <div className="w-full aspect-square max-w-[280px] mx-auto mb-8">
        <ClosingTorus scrollProgress={0.5} className="w-full h-full" />
      </div>

      {phases.map((phase, i) => {
        const isLast = i === phases.length - 1;
        return (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <p
              className={
                isLast
                  ? "fraunces-display text-[clamp(48px,10vw,96px)] leading-[0.9] tracking-tight text-paper font-medium"
                  : "fraunces-display text-[clamp(28px,6vw,44px)] leading-[1.0] tracking-tight text-paper"
              }
            >
              {phase}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
