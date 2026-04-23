"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GrowingTorusFallbackProps {
  scrollProgress: number;
  className?: string;
}

const PHASES = [
  `
    .     .   .   .
  .    .     .     .
    .   .  .   .
  .     .     .   .
    .   .   .  .
`,
  `
     ·≈≈·  ·≈≈·
   ≈      ≈    ≈
  ≈        ≈     ≈
   ≈      ≈    ≈
     ·≈≈·  ·≈≈·
`,
  `
    ::=**##%%##**=::
   =*%@@@@%%@@@@%*=
  *%@@%#==--==#%@@%*
   =*%@@@@%%@@@@%*=
    ::=**##%%##**=::
`,
  `
     .::=**##%%@@##**=::.     
   :=*#%@@@@@@@@@@@@@@%#*=:   
 =#@@@@%#==-::::--==#%@@@@#=  
#@@@%+.                  .+%@@@#
 =#@@@@%#==-::::--==#%@@@@#=  
   :=*#%@@@@@@@@@@@@@@%#*=:   
     .::=**##%%@@##**=::.     
`,
];

export function GrowingTorusFallback({ scrollProgress, className }: GrowingTorusFallbackProps) {
  const currentPhase = useMemo(() => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress < 0.5) return 1;
    if (scrollProgress < 0.75) return 2;
    return 3;
  }, [scrollProgress]);

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <pre
        className="font-mono text-[0.5rem] md:text-[0.6rem] leading-none text-paper/90 transition-opacity duration-500"
        key={currentPhase}
      >
        {PHASES[currentPhase]}
      </pre>
    </div>
  );
}
