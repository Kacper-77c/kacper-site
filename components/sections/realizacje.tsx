"use client";

import { motion } from "framer-motion";
import { ScrollSection } from "@/components/layout/scroll-section";
import { HandUnderline } from "@/components/ui/hand-underline";
import { SectionBridge } from "@/components/ui/section-bridge";
import { CaseStudyPin } from "./realizacje/case-study-pin";
import { CaseStudyRevealTorus } from "./realizacje/case-study-reveal-torus";

const CASE_STUDIES = [
  {
    slug: "plon",
    title: "PLON",
    subtitle: "piekarnia rzemieślnicza, Wrocław",
    year: "2025",
    role: "projekt + kod",
    stack: ["Next.js", "Tailwind", "Sanity CMS"],
    screens: {
      desktop: "placeholder:plon-desktop",
      tablet: "placeholder:plon-tablet",
      phone: "placeholder:plon-phone",
    },
    placeholders: {
      desktop: {
        text: "PLON · widok strony · desktop",
        gradient: "linear-gradient(135deg, #F7F4EF 0%, #C8362B 100%)",
      },
      tablet: {
        text: "PLON · tablet",
        gradient: "linear-gradient(180deg, #F7F4EF 0%, #DB7F3F 100%)",
      },
      phone: {
        text: "PLON · mobile",
        gradient: "linear-gradient(180deg, #C8362B 0%, #F7F4EF 100%)",
      },
    },
  },
  {
    slug: "kasetka",
    title: "KASETKA",
    subtitle: "aplikacja oszczędności",
    year: "2026",
    role: "projekt + kod + UX",
    stack: ["Next.js", "Tailwind", "Supabase", "Framer Motion"],
    screens: {
      desktop: "placeholder:kasetka-desktop",
      tablet: "placeholder:kasetka-tablet",
      phone: "placeholder:kasetka-phone",
    },
    placeholders: {
      desktop: {
        text: "KASETKA · dashboard · desktop",
        gradient: "linear-gradient(135deg, #2A3B5F 0%, #4A9B8E 100%)",
      },
      tablet: {
        text: "KASETKA · tablet",
        gradient: "linear-gradient(180deg, #2A3B5F 0%, #3730A3 100%)",
      },
      phone: {
        text: "KASETKA · mobile app",
        gradient: "linear-gradient(180deg, #4A9B8E 0%, #2A3B5F 100%)",
      },
    },
  },
];

export function Realizacje() {
  return (
    <ScrollSection
      id="realizacje"
      number="05"
      label="REALIZACJE"
      background="ink"
      transition="hard"
      verticalMetaSegments={["KK-05", "REALIZACJE", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
      <motion.div
        className="mx-auto mb-16 min-h-[50vh] max-w-4xl px-6 text-center md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="fraunces-display mb-6 text-[clamp(40px,6vw,88px)] leading-[0.95] text-paper">
          Co udało się{" "}
          <span className="relative inline-block">
            zrobić
            <HandUnderline color="paper" delay={800} className="absolute -bottom-1 left-0 w-full" />
          </span>
          .
        </h2>
        <p className="fraunces-body mx-auto max-w-2xl text-lg leading-relaxed text-paper/70 md:text-xl">
          Dwa projekty - każdy zaczynał się od rozmowy i jednej kartki papieru.
        </p>
      </motion.div>

      <div className="w-full">
        <CaseStudyPin data={CASE_STUDIES[0]} />
        <CaseStudyRevealTorus />
        <CaseStudyPin data={CASE_STUDIES[1]} />
      </div>

      <motion.div
        className="mx-auto mt-16 flex max-w-7xl items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80 md:mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span>kat. 05 · realizacje 2026/I</span>
        <span>2 z ∞ · w pracowni</span>
      </motion.div>
      <SectionBridge
        nextNumber="06"
        nextLabel="ZAMÓWIENIE"
        nextDescription="kontakt"
        variant="dark"
      />
    </ScrollSection>
  );
}
