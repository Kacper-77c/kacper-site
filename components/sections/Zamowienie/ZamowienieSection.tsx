"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ClosingTorus from "./ClosingTorus";
import ClosingCopyCrossfade from "./ClosingCopyCrossfade";
import PostPinReveal from "./PostPinReveal";
import ZamowienieMobile from "./ZamowienieMobile";

const PIN_LENGTH = 280;

export default function ZamowienieSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const progressRef = useRef({ value: 0 });

  useGSAP(
    () => {
      if (!isDesktop || !pinRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${(PIN_LENGTH * window.innerHeight) / 100}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current.value = self.progress;
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  if (!isDesktop) {
    return (
      <section ref={sectionRef} id="zamowienie" className="relative bg-matchbox-navy">
        <ZamowienieMobile />
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="zamowienie" className="relative bg-matchbox-navy text-paper">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 gap-12 px-16 py-20">
          <div className="relative flex items-center justify-center">
            <ClosingTorus progressRef={progressRef} />
          </div>
          <div className="relative flex items-center">
            <ClosingCopyCrossfade progressRef={progressRef} />
          </div>
        </div>

        <div className="absolute top-8 right-16 font-mono text-sm text-earth/70 uppercase tracking-wider">
          06 — zamówienie
        </div>
      </div>

      <PostPinReveal />
    </section>
  );
}
