"use client";

import { useRef } from "react";
import ClosingTorus from "@/components/sections/Zamowienie/ClosingTorus";

const TEST_PROGRESS = 1.0;

export default function TorusScratchPage() {
  const progressRef = useRef({ value: TEST_PROGRESS });

  return (
    <main className="h-screen w-screen bg-matchbox-navy">
      <ClosingTorus progressRef={progressRef} />
    </main>
  );
}









