"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSection } from "@/components/layout/scroll-section";
import { HandUnderline } from "@/components/ui/hand-underline";
import { TerminalLog } from "./warsztat/terminal-log";

gsap.registerPlugin(ScrollTrigger);

export function Warsztat() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !containerRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { scale: 0.95, opacity: 0.7 },
        {
          scale: 1.05,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <ScrollSection
      id="warsztat"
      number="02"
      label="WARSZTAT"
      background="navy"
      transition="hard"
      verticalMetaSegments={["KK-02", "WARSZTAT", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center min-h-fit pb-16 md:pb-24"
      >
        <div className="flex flex-col justify-center max-w-3xl pt-8 md:pt-16">
          <h2
            ref={titleRef}
            className="fraunces-display text-[clamp(48px,8vw,128px)] leading-[0.95] mb-12 origin-left"
          >
            Nazywam się{" "}
            <span className="relative inline-block">
              Kacper
              <HandUnderline color="stamp" delay={1000} className="absolute -bottom-2 left-0 w-full" />
            </span>
            .
          </h2>

          <motion.div
            className="fraunces-body text-lg md:text-xl text-paper/90 space-y-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              Studiuję informatykę we Wrocławiu, projektuję strony dla małych firm, które mają coś
              konkretnego do powiedzenia. Pracuję z Cursorem i vim-em, piję za dużo kawy, a
              większość moich projektów zaczyna się od rozmowy, nie od formularza.
            </p>
            <p>
              Jeśli masz wizję biznesu i nie umiesz jej pokazać w internecie — pewnie się dogadamy.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-paper/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="font-mono text-xs text-earth/80 mb-3 tracking-wide">na biurku:</p>
            <p className="font-archivo text-sm text-paper/70 tracking-wide leading-relaxed">
              terminal vim · Fraunces · kawa z Drop Coffee · notatnik A5 · klawiatura HHKB
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:flex items-center justify-center w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <TerminalLog />
        </motion.div>
      </div>
    </ScrollSection>
  );
}
