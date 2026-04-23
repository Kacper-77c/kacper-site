"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  const globals = gsap.core.globals();
  if (!globals.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
