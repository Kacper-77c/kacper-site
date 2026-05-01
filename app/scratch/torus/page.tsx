"use client";

import { useRef } from "react";
import ClosingTorus from "@/components/sections/Zamowienie/ClosingTorus";
import ClosingCopyCrossfade from "@/components/sections/Zamowienie/ClosingCopyCrossfade";

const TEST_PROGRESS = 0.5;

export default function TorusScratchPage() {
  const progressRef = useRef({ value: TEST_PROGRESS });

  return (
    <main className="h-screen w-screen bg-matchbox-navy overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2 gap-12 px-16 py-20">
        <div className="relative flex items-center justify-center">
          <ClosingTorus progressRef={progressRef} />
        </div>
        <div className="relative flex items-center">
          <ClosingCopyCrossfade progressRef={progressRef} />
        </div>
      </div>
    </main>
  );
}















