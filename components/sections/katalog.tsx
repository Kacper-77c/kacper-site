"use client";

import { motion } from "framer-motion";
import { ScrollSection } from "@/components/layout/scroll-section";
import { ServiceCard } from "./katalog/service-card";
import { HandUnderline } from "@/components/ui/hand-underline";
import { SectionBridge } from "@/components/ui/section-bridge";

const SERVICES = [
  {
    code: "RX-01",
    serial: "PN-26",
    title: "Nowa strona.",
    subtitle: "Od pierwszej rozmowy do gotowego wdrożenia.",
    forWhom:
      "Dla firm, które dopiero zaczynają albo wiedzą, że obecna strona nie odzwierciedla tego, kim są dzisiaj.",
    whatYouGet: [
      "projekt w Figmie (z realnymi tekstami, nie „lorem ipsum\")",
      "wdrożenie w Next.js — szybkie, wyszukiwarki je lubią",
      "hosting i dokumentację jak z niej korzystać",
      "30 dni wsparcia po starcie",
    ],
    duration: "3–5 tygodni",
    torusRotation: "classic" as const,
  },
  {
    code: "RX-02",
    serial: "PN-26",
    title: "Odświeżenie.",
    subtitle: "Ta strona co masz, ale lepsza.",
    forWhom: "Dla firm, które mają już stronę — ale nie wygląda tak, jak chcieliby, żeby ich zobaczono.",
    whatYouGet: [
      "audyt: co gubi klientów, co wygląda źle, co nie działa",
      "przeprojektowanie kluczowych sekcji",
      "wdrożenie na istniejącej technologii (bez migracji)",
      "przyspieszenie ładowania",
    ],
    duration: "2–3 tygodnie",
    torusRotation: "profile" as const,
  },
  {
    code: "RX-03",
    serial: "PN-26",
    title: "Tożsamość cyfrowa.",
    subtitle: "Jak Cię widzi internet, gdy Cię szuka.",
    forWhom: "Dla firm, które zadbały o stronę, ale reszta cyfrowej obecności została po drodze.",
    whatYouGet: [
      "logo i monogram dopasowane do charakteru firmy",
      "projekt wizytówki i szablonu mejla",
      "spójność w Google Maps, profilach społecznościowych",
      "mini-brand book (żeby nie zgubić tego za rok)",
    ],
    duration: "3–4 tygodnie",
    torusRotation: "topdown" as const,
  },
];

export function Katalog() {
  return (
    <ScrollSection
      id="katalog"
      number="03"
      label="KATALOG"
      background="paper"
      transition="peek"
      verticalMetaSegments={["KK-03", "KATALOG", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
      <motion.div
        className="max-w-4xl mx-auto mb-16 text-center md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="fraunces-display text-[clamp(40px,6vw,88px)] leading-[0.95] text-ink mb-6">
          Trzy sposoby,{" "}
          <span className="relative inline-block">
            na które
            <HandUnderline color="stamp" delay={800} className="absolute -bottom-1 left-0 w-full" />
          </span>{" "}
          możemy pracować.
        </h2>
        <p className="fraunces-body text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto md:text-xl">
          Każdy projekt zaczyna się od rozmowy.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.code} {...service} index={index} />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto mt-16 md:mt-24 font-mono text-[10px] uppercase tracking-[0.14em] text-earth flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span>kat. 03 · wydanie 2026/I</span>
        <span>egz. 1/∞ · pn-26</span>
      </motion.div>
      <SectionBridge
        nextNumber="04"
        nextLabel="METODA"
        nextDescription="cztery kroki"
        variant="light"
      />
    </ScrollSection>
  );
}
