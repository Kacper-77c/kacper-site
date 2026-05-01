"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

export function LenisProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inicjalizacja Lenis z parametrami filmowymi
    const lenis = new Lenis({
      duration: 1.2, // jak długo trwa easing po scroll wheel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // mobile używa native — Lenis na touch jest zwykle bugowate
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // GSAP ScrollTrigger integration
    // Lenis jest źródłem prawdy o scroll, ScrollTrigger podpina się pod nie
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // GSAP nie kompensuje opóźnień klatek

    // Refresh wszystkich ScrollTriggers po inicjalizacji
    // (calculated positions mogą się zmienić)
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return null;
}
