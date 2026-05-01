"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { ScrollSection } from "@/components/layout/scroll-section";
import { MetodaStepReveal } from "./metoda/metoda-step-reveal";
import { GrowingTorus } from "./metoda/growing-torus";
import { HandUnderline } from "@/components/ui/hand-underline";
import { SectionBridge } from "@/components/ui/section-bridge";

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

const PIN_VH = 320;
const STEP_COUNT = STEPS.length;

export function Metoda() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      if (!pinContainerRef.current || !pinTargetRef.current) return;

      const st = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: `+=${PIN_VH}%`,
        pin: pinTargetRef.current,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const stepIndex = Math.min(Math.floor(progress * STEP_COUNT), STEP_COUNT - 1);
          setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      scope: pinContainerRef,
    }
  );

  return (
    <ScrollSection
      id="metoda"
      number="04"
      label="METODA"
      background="turquoise"
      transition="hard"
      verticalMetaSegments={["KK-04", "METODA", "PRACOWNIA", "WROCŁAW", "2026"]}
    >
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
          Bez pośpiechu, bez Slacka o 23:00, bez „szybkich poprawek na jutro".
        </p>
      </motion.div>

      <div className="hidden lg:block">
        <div ref={pinContainerRef} className="relative" style={{ height: `${PIN_VH + 100}vh` }}>
          <div ref={pinTargetRef} className="h-screen w-full flex items-center">
            <div className="lg:grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto w-full h-[80vh]">
              <div className="relative h-full">
                {STEPS.map((step, index) => (
                  <MetodaStepReveal
                    key={step.number}
                    {...step}
                    isActive={activeStep === index}
                    stepIndex={index}
                  />
                ))}
              </div>
              <div className="relative h-full flex items-center justify-center">
                <div className="w-full aspect-square max-w-[500px]">
                  <GrowingTorus scrollProgress={scrollProgress} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:hidden">
        <MobileMetoda steps={STEPS} />
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
      <SectionBridge
        nextNumber="05"
        nextLabel="REALIZACJE"
        nextDescription="projekty"
        variant="dark"
      />
    </ScrollSection>
  );
}

function MobileMetoda({ steps }: { steps: typeof STEPS }) {
  return (
    <div className="space-y-12 px-6 py-12">
      {steps.map((step) => (
        <article key={step.number} className="border-t border-paper/15 pt-8 first:border-t-0 first:pt-0">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-base uppercase tracking-[0.14em] text-earth/90">
              {step.number}
            </span>
            <h3 className="fraunces-display text-[clamp(28px,6vw,44px)] leading-[1.0] text-paper">
              {step.title}
            </h3>
          </div>
          <p className="fraunces-body text-lg text-paper/80 mb-4">{step.subtitle}</p>
          <p className="fraunces-body text-base text-paper/90 mb-4 leading-relaxed">{step.body}</p>
          <p className="fraunces-body text-base text-paper font-semibold mb-4 leading-relaxed">
            {step.manifesto}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-paper/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80">CZAS</span>
            <span className="font-archivo text-sm text-paper/70">{step.duration}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
