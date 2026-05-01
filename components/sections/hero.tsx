"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Masthead } from "@/components/layout/masthead";
import { ScrollSection } from "@/components/layout/scroll-section";
import { AsciiTorus } from "@/components/ui/ascii-torus";
import { HandUnderline } from "@/components/ui/hand-underline";
import { RoundStamp } from "@/components/ui/round-stamp";
import { StampButton } from "@/components/ui/stamp-button";

type RevealConfig = {
  delay: number;
  duration: number;
  y?: number;
  scale?: number;
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = ({ delay, duration, y = 0, scale = 1 }: RevealConfig) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0, duration: 0.1, ease: "easeOut" as const },
      };
    }

    return {
      initial: { opacity: 0, y, scale },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { delay: delay / 1000, duration: duration / 1000, ease: "easeOut" as const },
    };
  };

  return (
    <>
      <Masthead />
      <ScrollSection
        id="witryna"
        number="01"
        label="WITRYNA"
        background="paper"
        transition="hard"
        compact={true}
        verticalMetaSegments={["KK-01", "WITRYNA", "PRACOWNIA", "WROCŁAW", "2026"]}
      >
        <motion.div {...reveal({ delay: 400, duration: 800 })} />
        <motion.div
          className="absolute top-32 right-4 md:top-40 md:right-16 z-10 scale-90 md:scale-100"
          {...reveal({ delay: 500, duration: 500, scale: 0.9 })}
        >
          <RoundStamp size="sm" topText="K·K" bottomText="Zał. 2026" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 max-w-7xl mx-auto items-center min-h-[calc(100vh-14rem)]">
          <div className="flex flex-col justify-center">
            <h1 className="fraunces-display text-[clamp(44px,7vw,108px)] leading-[0.92] mt-4 mb-6 text-ink">
              <motion.span className="block" {...reveal({ delay: 100, duration: 600, y: 20 })}>
                Strony,
              </motion.span>
              <motion.span className="block" {...reveal({ delay: 200, duration: 600, y: 20 })}>
                których się
              </motion.span>
              <motion.span
                className="block relative"
                {...reveal({ delay: 300, duration: 600, y: 20 })}
              >
                nie zapomina.
                <HandUnderline delay={800} className="absolute -bottom-2 left-0 w-full" />
              </motion.span>
            </h1>

            <motion.p
              className="fraunces-body text-lg md:text-xl max-w-xl text-ink/90 mb-10"
              {...reveal({ delay: 600, duration: 600, y: 12 })}
            >
              Dla małych firm, które mają coś do pokazania i nie chcą wyglądać jak wszyscy.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start"
              {...reveal({ delay: 1200, duration: 500, y: 8 })}
            >
              <StampButton className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2">
                Umów bezpłatną konsultację →
              </StampButton>
              <a
                href="#realizacje"
                className="font-archivo font-bold uppercase tracking-[0.08em] text-sm text-stamp hover:underline underline-offset-4 self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
              >
                Zobacz realizacje ↓
              </a>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center justify-center h-full w-full"
            {...reveal({ delay: 400, duration: 800, scale: 0.95 })}
          >
            <AsciiTorus className="w-full h-full" />
            <div className="flex items-center justify-center mt-2 font-mono text-[10px] text-earth tracking-wide">
              <span>FIG. 01 · TOROID PARAMETRYCZNY</span>
              <span className="mx-3 opacity-40">·</span>
              <span className="hidden md:block opacity-70 animate-pulse motion-reduce:animate-none">
                PORUSZ KURSOREM
              </span>
              <span className="block md:hidden opacity-70">STATYCZNY RENDER</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 right-8 md:right-20 font-archivo text-xs uppercase tracking-[0.08em] text-earth"
          {...reveal({ delay: 1500, duration: 400 })}
        >
          egz. 1/1 · PN-26
        </motion.div>
        <motion.button
          onClick={() => {
            document.getElementById("warsztat")?.scrollIntoView();
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-archivo text-[11px] uppercase tracking-[0.12em] text-earth hover:text-stamp transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-4 focus-visible:ring-offset-paper rounded-sm p-2"
          aria-label="Przewiń do sekcji warsztat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span>Niżej · Warsztat</span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </motion.button>
      </ScrollSection>
    </>
  );
}
