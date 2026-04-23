"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ScrollSection } from "@/components/layout/scroll-section";
import { MetodaStep } from "./metoda/metoda-step";
import { GrowingTorus } from "./metoda/growing-torus";
import { HandUnderline } from "@/components/ui/hand-underline";

const STEPS = [
  {
    number: "01",
    title: "ROZMOWA PRZY KAWIE",
    subtitle: "Najpierw słucham.",
    body: "Przychodzisz z wizją — albo mglistym pomysłem. Pytam o biznes, o klientów, o to, czego nie lubisz w obecnej stronie. Zapisuję, wysyłam notatki, potwierdzam czy dobrze zrozumiałem.",
    manifesto: "Jeśli się nie rozumiemy, nie zaczynamy.",
    duration: "1–2 rozmowy, 2–3 dni",
  },
  {
    number: "02",
    title: "DOSTARCZENIE SZKICÓW",
    subtitle: "Zanim Figma — kartka.",
    body: "Rysuję strukturę strony na kartce: jakie sekcje, w jakiej kolejności, co ma przyciągać, co ma przekonywać. Dostajesz szkice — pytasz, dodajesz, odrzucasz.",
    manifesto: "Lepiej poprawić rysunek niż pięćdziesiąt ekranów w Figmie.",
    duration: "2–3 dni, jedna runda feedbacku",
  },
  {
    number: "03",
    title: "BUDOWA",
    subtitle: "Ze szkicu robi się strona.",
    body: "Projektuję w Figmie, potem piszę kod w Next.js. Na każdym etapie masz podgląd — możesz zajrzeć, skomentować, zapytać. Testy na telefonie, tablecie, laptopie.",
    manifesto: "Pod koniec wiesz dokładnie, jak działa strona, zanim pójdzie na żywo.",
    duration: "2–4 tygodnie, 2–3 rundy feedbacku",
  },
  {
    number: "04",
    title: "START I OPIEKA",
    subtitle: "Wdrożenie i pierwsze 30 dni.",
    body: "Wdrażam na Vercel, podpinam domenę, konfiguruję analytics. Przekazuję dostępy i dokumentację — jak samodzielnie edytować teksty i obrazy.",
    manifesto: "Przez trzydzieści dni po starcie jestem pod telefonem — jak coś, dzwoń.",
    duration: "3–5 dni wdrożenia + 30 dni opieki",
  },
];

export function Metoda() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(Math.max(0, Math.min(1, latest)));
    });
  }, [scrollYProgress]);

  return (
    <ScrollSection
      id="metoda"
      number="04"
      label="METODA"
      background="turquoise"
      transition="peek"
      verticalMetaSegments={["KK-04", "METODA", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
      <div ref={sectionRef}>
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="fraunces-display text-[clamp(40px,6vw,88px)] leading-[0.95] text-paper mb-6">
            Cztery{" "}
            <span className="relative inline-block">
              spokojne
              <HandUnderline color="earth" delay={800} className="absolute -bottom-1 left-0 w-full" />
            </span>{" "}
            kroki.
          </h2>
          <p className="fraunces-body text-lg text-paper/80 leading-relaxed max-w-2xl mx-auto md:text-xl">
            Bez pośpiechu, bez Slack&apos;a o 23:00, bez „szybkich poprawek na jutro".
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-0">
            {STEPS.map((step, index) => (
              <MetodaStep key={step.number} {...step} index={index} />
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-24 w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
              <GrowingTorus scrollProgress={scrollProgress} className="w-full h-full" />
            </div>
          </div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto mt-16 md:mt-24 font-mono text-[10px] uppercase tracking-[0.14em] text-earth/90 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>met. 04 · protokół 2026/I</span>
          <span>4 kroków · bez pośpiechu</span>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
