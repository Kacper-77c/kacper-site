"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

export function ScrollTriggerRefresh() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
