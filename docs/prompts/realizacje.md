# PROMPT DLA CURSORA: SEKCJA REALIZACJE (nr 05) — INTMAGIC-STYLE CASE STUDIES

## CEL SESJI

Zbudować sekcję Realizacje (nr 05) z dwoma case studies (PLON + Kasetka) 
w mechanice inspirowanej intmagic.com:
- Każdy case study pinuje się do viewportu
- Podczas scrollu przez pin, 3 urządzenia (desktop, tablet, mobile) 
  pojawiają się w określonej sekwencji (desktop center, tablet left, 
  phone right)
- Między case studies pełnoekranowy moment torusa (100vh scrollu)
- Dark cinematic background (#0a0a0a)
- CSS device frames zamiast photorealistic mockups
- Metadata projektu (tytuł, rok, stack, rola) jako duży wjazdowy tytuł 
  przed obrazem
- Kliknięcie w case study prowadzi do /portfolio/plon i /portfolio/kasetka 
  (podstrony na razie nie istnieją — acceptable 404)

Po tej sesji strona ma pięć kompletnych sekcji: Hero → Warsztat → 
Katalog → Metoda → Realizacje.

---

## RESEARCH TECHNOLOGICZNY — KLUCZOWE USTALENIA

### Nested pinning jest niewspierane

Z dokumentacji GSAP: "nested pinning is not supported". Nie robimy 
"jeden mega-pin z dwoma sub-pinami". Zamiast tego **dwa sekwencyjne 
piny** na stronie, z fullscreen torus (bez pinu) pomiędzy.

Struktura:
1. Pin #1: Case Study PLON (300vh scrollu)
2. Unpin → fullscreen torus section (100vh scrollu, BEZ pinu, 
   useScroll + useTransform)
3. Pin #2: Case Study Kasetka (300vh scrollu)

Łącznie Realizacje zajmują ~800vh scrollu (dwa piny + torus + bufory).

### Wiele pinów na jednej stronie — zabezpieczenia

Metoda już pinuje (320vh). Teraz Realizacje pinują 2x. Łącznie 
3 piny na jednej stronie. Wymagane:

1. **Każdy pin ma unikalny trigger** — osobny ref, nie współdzielony
2. **`pinSpacing: true`** dla każdego
3. **`anticipatePin: 1`** — zapobiega flash pre-pinnowanego contentu
4. **`invalidateOnRefresh: true`** — przy resize recalculate
5. **Global `ScrollTrigger.refresh()`** po font-load i po mount 
   (bo fonts.ready może wpłynąć na calculated positions)

### React Strict Mode + useGSAP

`useGSAP` hook z `@gsap/react` auto-cleanupuje ScrollTriggers przy 
unmount. `scope: containerRef` per pin — nie konfliktują.

### Hydration

Wszystkie komponenty z pinami = `"use client"`. Pin calculation 
wymaga DOM measurements — musi być po hydration.

---

## ARCHITEKTURA

```
components/sections/
  realizacje.tsx                          (orkestrator, hosts 2 case studies + torus)
  realizacje/
    case-study-pin.tsx                    (jeden pinowany case study)
    device-frame.tsx                      (CSS frame desktop/tablet/mobile)
    case-study-reveal-torus.tsx           (pełnoekranowy torus między)

components/layout/
  scroll-trigger-refresh.tsx              (NOWY, global refresh helper)
  scroll-section.tsx                      (MODIFIED, add "ink" background)
```

---

## KROK 1 — Komponent DeviceFrame

### `components/sections/realizacje/device-frame.tsx`

CSS-only urządzenie frame. Trzy warianty: desktop (16:10), tablet (3:4), 
phone (9:19.5). Styl editorial: cienka ramka earth/40, subtle shadow, 
brak photorealistic mockups. Placeholder mode dla projektów bez real 
screens.

```tsx
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  type: "desktop" | "tablet" | "phone";
  src: string;
  alt: string;
  className?: string;
  placeholderText?: string;
  placeholderGradient?: string;
}

const DEVICE_RATIOS = {
  desktop: "16 / 10",
  tablet: "3 / 4",
  phone: "9 / 19.5",
};

const DEVICE_SIZES = {
  desktop: "max-w-[min(760px,50vw)]",
  tablet: "max-w-[280px]",
  phone: "max-w-[200px]",
};

const FRAME_RADIUS = {
  desktop: "rounded-md",
  tablet: "rounded-xl",
  phone: "rounded-[28px]",
};

const FRAME_PADDING = {
  desktop: "p-2",
  tablet: "p-1.5",
  phone: "p-1",
};

const INNER_RADIUS = {
  desktop: "rounded-sm",
  tablet: "rounded-lg",
  phone: "rounded-[22px]",
};

export function DeviceFrame({
  type,
  src,
  alt,
  className,
  placeholderText,
  placeholderGradient,
}: DeviceFrameProps) {
  const isPlaceholder = !src || src === "" || src.startsWith("placeholder:");
  
  return (
    <div
      className={cn(
        "w-full relative",
        DEVICE_SIZES[type],
        FRAME_RADIUS[type],
        FRAME_PADDING[type],
        "bg-paper/5",
        "border border-earth/40",
        "shadow-2xl shadow-black/60",
        className
      )}
      style={{
        aspectRatio: DEVICE_RATIOS[type],
      }}
    >
      <div
        className={cn(
          "w-full h-full overflow-hidden",
          INNER_RADIUS[type],
          "bg-ink/20"
        )}
        style={{
          background: isPlaceholder && placeholderGradient ? placeholderGradient : undefined,
        }}
      >
        {isPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center p-6">
            {placeholderText && (
              <div className="text-center font-mono text-[10px] md:text-xs uppercase tracking-[0.14em] text-ink/80">
                {placeholderText}
              </div>
            )}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 760px"
          />
        )}
      </div>
    </div>
  );
}
```

**Decyzje:**
- `aspect-ratio` CSS property, nie sztywne height
- Placeholder mode z gradient fallback — możliwość deployu bez real screens
- Earth border subtle, shadow black duży = urządzenie unosi się nad dark bg
- Next.js `<Image>` gotowy dla future real screens, teraz placeholder path

---

## KROK 2 — Komponent CaseStudyPin

### `components/sections/realizacje/case-study-pin.tsx`

Serce mechaniki intmagic. Jeden case study = jeden pin + scroll-driven 
reveal.

Fazy scrollu (progress 0-1):
- Faza 1 (0-0.15): caption z metadata widoczny
- Faza 2 (0.15-0.40): desktop frame wjeżdża z dołu + scale-up + blur-clear
- Faza 3 (0.40-0.65): tablet slide z lewej
- Faza 4 (0.65-0.90): phone slide z prawej
- Faza 5 (0.90-1.0): CTA "zobacz pełne case study" pojawia się

```tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { DeviceFrame } from "./device-frame";

interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  stack: string[];
  screens: {
    desktop: string;
    tablet: string;
    phone: string;
  };
  placeholders?: {
    desktop: { text: string; gradient: string };
    tablet: { text: string; gradient: string };
    phone: { text: string; gradient: string };
  };
}

interface CaseStudyPinProps {
  data: CaseStudyData;
}

export function CaseStudyPin({ data }: CaseStudyPinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || !pinTargetRef.current) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinTargetRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        id: `case-study-${data.slug}`,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      scope: containerRef,
    }
  );

  // Derived animation states
  const captionOpacity = progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 10);
  const captionY = progress < 0.15 ? 0 : -(progress - 0.15) * 100;

  const desktopProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.25));
  const desktopOpacity = desktopProgress;
  const desktopScale = 0.85 + desktopProgress * 0.15;
  const desktopBlur = (1 - desktopProgress) * 8;
  const desktopY = (1 - desktopProgress) * 60;

  const tabletProgress = Math.max(0, Math.min(1, (progress - 0.40) / 0.25));
  const tabletOpacity = tabletProgress;
  const tabletX = -200 + tabletProgress * 200;
  const tabletBlur = (1 - tabletProgress) * 6;

  const phoneProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.25));
  const phoneOpacity = phoneProgress;
  const phoneX = 200 - phoneProgress * 200;
  const phoneBlur = (1 - phoneProgress) * 6;

  const ctaOpacity = progress > 0.90 ? (progress - 0.90) * 10 : 0;

  return (
    <>
      {/* DESKTOP: pinned scroll version */}
      <div
        ref={containerRef}
        className="hidden lg:block relative"
        style={{ height: "400vh" }}
      >
        <div
          ref={pinTargetRef}
          className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
        >
          {/* CAPTION */}
          <div
            className="absolute top-[8vh] left-0 right-0 px-6 md:px-20 text-center z-20"
            style={{
              opacity: captionOpacity,
              transform: `translateY(${captionY}px)`,
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.14em] text-earth/80">
              <span>REALIZACJA · {data.year}</span>
              <span>·</span>
              <span>{data.role}</span>
            </div>
            <h3 className="fraunces-display text-[clamp(56px,9vw,140px)] leading-[0.92] text-paper mb-4">
              {data.title}
            </h3>
            <p className="fraunces-body text-lg md:text-xl text-paper/70 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              {data.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth/70 px-3 py-1 border border-earth/20 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* DEVICES as Link (clickable area) */}
          <Link
            href={`/portfolio/${data.slug}`}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Zobacz pełne case study: ${data.title}`}
          >
            <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
              {/* DESKTOP — center */}
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) scale(${desktopScale}) translateY(${desktopY}px)`,
                  opacity: desktopOpacity,
                  filter: `blur(${desktopBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="desktop"
                  src={data.screens.desktop}
                  alt={`${data.title} — widok desktop`}
                  placeholderText={data.placeholders?.desktop.text}
                  placeholderGradient={data.placeholders?.desktop.gradient}
                />
              </div>

              {/* TABLET — left */}
              <div
                className="absolute top-1/2 left-[5%] md:left-[12%]"
                style={{
                  transform: `translate(${tabletX}px, -50%)`,
                  opacity: tabletOpacity,
                  filter: `blur(${tabletBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="tablet"
                  src={data.screens.tablet}
                  alt={`${data.title} — widok tablet`}
                  placeholderText={data.placeholders?.tablet.text}
                  placeholderGradient={data.placeholders?.tablet.gradient}
                />
              </div>

              {/* PHONE — right */}
              <div
                className="absolute top-1/2 right-[5%] md:right-[12%]"
                style={{
                  transform: `translate(${phoneX}px, -50%)`,
                  opacity: phoneOpacity,
                  filter: `blur(${phoneBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="phone"
                  src={data.screens.phone}
                  alt={`${data.title} — widok mobile`}
                  placeholderText={data.placeholders?.phone.text}
                  placeholderGradient={data.placeholders?.phone.gradient}
                />
              </div>
            </div>
          </Link>

          {/* CTA hint — bottom */}
          <div
            className="absolute bottom-[8vh] left-0 right-0 text-center z-20"
            style={{ opacity: ctaOpacity }}
          >
            <Link
              href={`/portfolio/${data.slug}`}
              className="inline-flex items-center gap-2 font-archivo text-sm uppercase tracking-[0.14em] text-paper/80 hover:text-paper transition-colors border-b border-paper/30 hover:border-paper pb-1"
            >
              zobacz pełne case study
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE: static vertical stack */}
      <div className="lg:hidden w-full py-16 px-6">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.14em] text-earth/80">
            <span>REALIZACJA · {data.year}</span>
          </div>
          <h3 className="fraunces-display text-[clamp(48px,10vw,88px)] leading-[0.92] text-paper mb-4">
            {data.title}
          </h3>
          <p className="fraunces-body text-lg text-paper/70 max-w-xl mx-auto mb-4">
            {data.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
            {data.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-earth/70 px-3 py-1 border border-earth/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/portfolio/${data.slug}`}
          className="space-y-6 block"
        >
          <div className="flex justify-center">
            <DeviceFrame
              type="desktop"
              src={data.screens.desktop}
              alt={`${data.title} desktop`}
              placeholderText={data.placeholders?.desktop.text}
              placeholderGradient={data.placeholders?.desktop.gradient}
            />
          </div>
          <div className="flex gap-4 justify-center">
            <DeviceFrame
              type="tablet"
              src={data.screens.tablet}
              alt={`${data.title} tablet`}
              placeholderText={data.placeholders?.tablet.text}
              placeholderGradient={data.placeholders?.tablet.gradient}
            />
            <DeviceFrame
              type="phone"
              src={data.screens.phone}
              alt={`${data.title} phone`}
              placeholderText={data.placeholders?.phone.text}
              placeholderGradient={data.placeholders?.phone.gradient}
            />
          </div>
        </Link>

        <div className="mt-8 text-center">
          <Link
            href={`/portfolio/${data.slug}`}
            className="inline-flex items-center gap-2 font-archivo text-sm uppercase tracking-[0.14em] text-paper/80 border-b border-paper/30 pb-1"
          >
            zobacz pełne case study
            <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
```

**Kluczowe decyzje:**
- 300vh pinu → 4 fazy reveal → komfort czytania
- Link wrapper na devices = klikalna cała strefa
- `willChange` na transform/opacity/filter = GPU acceleration
- Progres fazy derived z `progress` (0-1), bez osobnych useState — 
  jedna aktualizacja na scroll tick
- Mobile: zero pinu, vertical stack, ten sam layout metadata → devices → CTA

---

## KROK 3 — Komponent CaseStudyRevealTorus

### `components/sections/realizacje/case-study-reveal-torus.tsx`

Pełnoekranowy moment torusa. **Inny charakter niż torus Metody** (nie 
rośnie, tylko rotuje szybko). Scroll-driven opacity (fade in/out), 
bez pinu.

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function FastRotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.45;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
      <meshPhongMaterial
        color="#2D6A4F"
        shininess={80}
        specular={new THREE.Color("#ffffff")}
      />
    </mesh>
  );
}

export function CaseStudyRevealTorus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.8]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[120vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative w-full max-w-[600px] aspect-square"
      >
        {prefersReducedMotion ? (
          <div className="w-full h-full flex items-center justify-center">
            <pre className="font-mono text-[0.7rem] leading-none text-paper/80">
{`     .::=**##%%@@##**=::.     
   :=*#%@@@@@@@@@@@@@@%#*=:   
 =#@@@@%#==-::::--==#%@@@@#=  
#@@@%+.                  .+%@@@#
 =#@@@@%#==-::::--==#%@@@@#=  
   :=*#%@@@@@@@@@@@@@@%#*=:   
     .::=**##%%@@##**=::.     `}
            </pre>
          </div>
        ) : (
          <Canvas 
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ 
              alpha: true,
              antialias: true,
              powerPreference: "low-power"
            }}
          >
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.8} />
            <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
            <FastRotatingTorus />
            <AsciiRenderer
              fgColor="#F7F4EF"
              bgColor="transparent"
              characters=' .`"^,:;Il!i+*=%@#'
              resolution={0.16}
              invert={false}
            />
          </Canvas>
        )}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-[15vh] left-0 right-0 text-center"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth/60">
          pauza między dziełami
        </p>
      </motion.div>
    </div>
  );
}
```

**Decyzje:**
- useScroll + useTransform zamiast GSAP — nie potrzebujemy pinu
- 2x rotacja prędkości względem Metody (0.35/0.45 vs 0.15/0.20) = 
  odróżnia, budzi intensywność
- 120vh wysokości — bufor, żeby torus był widoczny przez znaczną 
  część scrollu
- Subtelny caption "pauza między dziełami" — cicha narracja brand

---

## KROK 4 — Komponent ScrollTriggerRefresh

### `components/layout/scroll-trigger-refresh.tsx`

Global helper dla odświeżania ScrollTrigger po wszystkich DOM 
operations (font-load, image-load, dynamic content). Krytyczny dla 
stabilności 3 pinów na jednej stronie.

```tsx
"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";

export function ScrollTriggerRefresh() {
  useEffect(() => {
    // Refresh po ~300ms — większość fonts/images powinna być loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Plus eksplicitny refresh po font-load
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
```

Dodaj go do `app/layout.tsx` — po `<body>` tag, przed children:

```tsx
import { ScrollTriggerRefresh } from "@/components/layout/scroll-trigger-refresh";

// W RootLayout return:
<body>
  <ScrollTriggerRefresh />
  {children}
</body>
```

Jeśli już jest taki helper (np. GSAPProvider) — nie duplikuj. Dodaj 
tylko jeśli brak.

---

## KROK 5 — Orkestrator Realizacje

### `components/sections/realizacje.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { ScrollSection } from "@/components/layout/scroll-section";
import { CaseStudyPin } from "./realizacje/case-study-pin";
import { CaseStudyRevealTorus } from "./realizacje/case-study-reveal-torus";
import { HandUnderline } from "@/components/ui/hand-underline";

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
      verticalMetaSegments={[
        "KK-05",
        "REALIZACJE",
        "PRACOWNIA",
        "WROCŁAW",
        "2026",
      ]}
    >
      {/* INTRO */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="fraunces-display text-[clamp(40px,6vw,88px)] leading-[0.95] text-paper mb-6">
          Co udało się{" "}
          <span className="relative inline-block">
            zrobić
            <HandUnderline
              color="paper"
              delay={800}
              className="absolute -bottom-1 left-0 w-full"
            />
          </span>
          .
        </h2>
        <p className="fraunces-body text-lg md:text-xl text-paper/70 max-w-2xl mx-auto leading-relaxed">
          Dwa projekty — każdy zaczynał się od rozmowy i jednej kartki papieru.
        </p>
      </motion.div>

      {/* CASE STUDIES + TORUS pomiędzy */}
      <div className="w-full">
        <CaseStudyPin data={CASE_STUDIES[0]} />
        <CaseStudyRevealTorus />
        <CaseStudyPin data={CASE_STUDIES[1]} />
      </div>

      {/* FOOTER */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 md:mt-24 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-earth/80 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <span>kat. 05 · realizacje 2026/I</span>
        <span>2 z ∞ · w pracowni</span>
      </motion.div>
    </ScrollSection>
  );
}
```

---

## KROK 6 — Rozszerzenie ScrollSection o "ink" background

W `components/layout/scroll-section.tsx`:

Znajdź interface `ScrollSectionProps`:

```tsx
background: "paper" | "navy" | "red" | "turquoise";
```

Rozszerz:

```tsx
background: "paper" | "navy" | "red" | "turquoise" | "ink";
```

Znajdź mapę `bgClass`:

```tsx
const bgClass = {
  paper: "bg-paper text-ink",
  navy: "bg-matchbox-navy text-paper",
  red: "bg-matchbox-red text-paper",
  turquoise: "bg-[#4A9B8E] text-paper",
}[background];
```

Dodaj:

```tsx
const bgClass = {
  paper: "bg-paper text-ink",
  navy: "bg-matchbox-navy text-paper",
  red: "bg-matchbox-red text-paper",
  turquoise: "bg-[#4A9B8E] text-paper",
  ink: "bg-[#0a0a0a] text-paper",
}[background];
```

Znajdź `isDark`:

```tsx
const isDark = background === "navy" || background === "red" || background === "turquoise";
```

Dodaj ink:

```tsx
const isDark = 
  background === "navy" || 
  background === "red" || 
  background === "turquoise" || 
  background === "ink";
```

---

## KROK 7 — Update page.tsx

```tsx
import { Hero } from "@/components/sections/hero";
import { Warsztat } from "@/components/sections/warsztat";
import { Katalog } from "@/components/sections/katalog";
import { Metoda } from "@/components/sections/metoda";
import { Realizacje } from "@/components/sections/realizacje";

export default function Home() {
  return (
    <>
      <Hero />
      <Warsztat />
      <Katalog />
      <Metoda />
      <Realizacje />
    </>
  );
}
```

---

## PROTOKÓŁ DEBUGOWANIA

### Problem: "Pin Realizacje flashuje / odpina się przedwcześnie"

**Przyczyna:** `pinSpacing` konfliktuje z wcześniejszym pinem (Metoda).  
**Fix:** weryfikuj `invalidateOnRefresh: true` wszędzie. Dodaj 
ScrollTriggerRefresh component (Krok 4).

### Problem: "Pierwszy case study (PLON) zaczyna się za wcześnie"

**Przyczyna:** intro section "Co udało się zrobić" za krótkie — pin 
PLON startuje zanim intro w pełni widoczne.  
**Fix:** w intro dodaj `min-h-[50vh]` do wrapper div. Intro powinno 
mieć chwilę zaistnieć przed pinem.

### Problem: "Case study 2 (Kasetka) zaczyna się gdy torus jeszcze 
widoczny"

**Przyczyna:** 120vh torusa za mały bufor.  
**Fix:** Zwiększ `h-[120vh]` na `h-[140vh]` w CaseStudyRevealTorus.

### Problem: "Device frames na desktop wyglądają małe"

**Przyczyna:** `max-w-[min(760px,50vw)]` przy wąskim laptopie (1280px) 
daje 640px — może być za mało wizualnie.  
**Fix:** zmień na `max-w-[min(760px,60vw)]` lub dostosuj per breakpoint.

### Problem: "Tablet i Phone nachodzą na Desktop"

**Przyczyna:** left-[5%] / right-[5%] na małym laptopie daje overlap.  
**Fix:** zwiększ offsety na laptopie średnim. W CaseStudyPin zmień:
- `md:left-[12%]` na `md:left-[5%] lg:left-[12%]`
- `md:right-[12%]` na `md:right-[5%] lg:right-[12%]`

### Problem: "Link w devices nie działa"

**Przyczyna:** motion/style properties pozwalają event bubble, ale 
child div może blokować pointer-events.  
**Fix:** weryfikuj że `<Link>` jest najbardziej outer element nad 
devices, nie wewnątrz div z pointer-events-none.

### Problem: "Hydration mismatch w case-study-pin"

**Przyczyna:** progress state starts at 0 SSR vs potential client 
different value.  
**Fix:** useState(0) + wszystkie derived values bazują na progress → 
konsystentne SSR i client. Jeśli nadal występuje, dodaj 
`suppressHydrationWarning` do pinTargetRef outer div.

### Problem: "Fast torus między case studies flickeruje"

**Przyczyna:** rotation prędkość 0.35/0.45 + AsciiRenderer resolution 
0.16 → artefakty.  
**Fix:** Obniż rotation do 0.25/0.30, lub zmień resolution na 0.20.

### Problem: "Mobile: devices się nie renderują poprawnie"

**Przyczyna:** class `hidden lg:block` vs `lg:hidden` — mismatch 
między desktop pin i mobile version.  
**Fix:** weryfikuj że w CaseStudyPin mamy DWA return blocks:
- `<div className="hidden lg:block">` = desktop pin
- `<div className="lg:hidden">` = mobile static

### Problem: "Footer Realizacji pokazuje się w środku sekcji"

**Przyczyna:** footer wchodzi w viewport PRZED końcem ostatniego 
pinu.  
**Fix:** weryfikuj że CaseStudyPin[1] ma pełne 400vh height 
(containerRef) — pin-spacer wtedy pushuje footer w dół.

---

## CHECKLIST PRZED COMMITEM

### Kod
- [ ] `components/sections/realizacje.tsx` utworzony
- [ ] `components/sections/realizacje/case-study-pin.tsx` utworzony
- [ ] `components/sections/realizacje/device-frame.tsx` utworzony
- [ ] `components/sections/realizacje/case-study-reveal-torus.tsx` utworzony
- [ ] `components/layout/scroll-trigger-refresh.tsx` utworzony
- [ ] ScrollSection rozszerzony o background "ink"
- [ ] app/layout.tsx dodaje `<ScrollTriggerRefresh />`
- [ ] app/page.tsx importuje i renderuje `<Realizacje />` po Metodzie

### Test wizualny desktop (≥1024px)
- [ ] Scroll z Metody kończy się, wchodzi ciemne tło Realizacji
- [ ] Intro "Co udało się zrobić" z HandUnderline pod "zrobić"
- [ ] Scroll dalej → pin PLON, caption wjazdowy z metadata
- [ ] Desktop frame wjeżdża z dołu z scale + blur
- [ ] Tablet wjeżdża z lewej
- [ ] Phone wjeżdża z prawej
- [ ] CTA "zobacz pełne case study →" pojawia się na końcu
- [ ] Scroll dalej → fullscreen torus z caption "pauza między dziełami"
- [ ] Scroll dalej → pin Kasetka, taka sama mechanika
- [ ] Po Kasetce footer "kat. 05 · realizacje"

### Test wizualny mobile (<1024px)
- [ ] BRAK pinu
- [ ] Case study: metadata → desktop frame → tablet + phone obok 
      siebie → link
- [ ] Torus między: mniejszy, ale widoczny
- [ ] Drugi case study analogicznie

### Test linków
- [ ] Kliknięcie w PLON → /portfolio/plon (404 acceptable)
- [ ] Kliknięcie w Kasetka → /portfolio/kasetka (404 acceptable)
- [ ] Kliknięcie w "zobacz pełne case study" = ten sam link

### Test konfliktów z Metodą
- [ ] Scroll z Metody do Realizacji — brak jumpu, brak flashu
- [ ] Pin Metody kończy się przed startem Realizacji (pinSpacing)
- [ ] Pin PLON nie overlappuje z pinem Kasetki
- [ ] Resize window → wszystkie piny refreshują (`invalidateOnRefresh`)

### Test performance
- [ ] DevTools Performance: scroll PLON → Torus → Kasetka
- [ ] FPS ≥ 45 (z Canvas torusem i 3 pinami w ciągu strony)
- [ ] Brak long tasks > 100ms

### Test accessibility
- [ ] prefers-reduced-motion → torus renderuje static ASCII
- [ ] Linki mają aria-label z tytułem case study
- [ ] Tab navigation przechodzi przez linki case studies

### Polish + typography
- [ ] "Tożsamość", "piekarnia rzemieślnicza", "Wrocław" — polskie znaki OK
- [ ] Fraunces Display renderuje tytuły (PLON, KASETKA)
- [ ] Plex Mono renderuje kody RX, tags

### Build
- [ ] `npm run build` przechodzi bez errorów
- [ ] Brak warning'ów hydration

---

## ZASADY PRACY

1. **Wykonaj kroki 1-7 PO KOLEI.** Commit per krok.

2. **Po Kroku 5 (orkestrator) przetestuj całą mechanikę.** Jeśli 
   broken, fix tu, przed Krokami 6-7.

3. **Jeśli problem z wieloma pinami** — protokół debugowania. 
   Zazwyczaj fix: `invalidateOnRefresh: true` + ScrollTriggerRefresh 
   helper.

4. **NIE modyfikuj Hero/Warsztat/Katalog/Metoda.**

5. **NIE buduj Księgi Gości ani Zamówienia.**

6. **Po skończeniu wrzuć screen/video:**
   - Scroll przez PLON (wszystkie 4 fazy reveal)
   - Moment torusa między case studies
   - Scroll przez Kasetka
   - Mobile w Chrome DevTools responsive

---

## PODSUMOWANIE TECHNICZNE

**Co budujemy:**
- Dwa pinowane case studies (GSAP ScrollTrigger, 300vh każdy)
- Scroll-driven reveal 3 device frames (desktop center + tablet left + phone right)
- Fullscreen torus między (useScroll + useTransform, bez pinu)
- CSS device frames (editorial, nie photorealistic)
- Dark cinematic background (#0a0a0a)
- Placeholder system dla screens (gradient + text)
- Link to /portfolio/slug (case study pages TBD)
- Mobile fallback (vertical stack, bez pinu)

**Stack:**
- Next.js 15 App Router
- React 19
- GSAP 3.13+ (ScrollTrigger, useGSAP)
- Framer Motion (useScroll dla torusa, motion dla intro/footer)
- Three.js + @react-three/fiber + @react-three/drei
- next/image, next/link

**Scroll budget Realizacji:**
- Intro: ~50vh
- Pin PLON: 300vh (400vh container z buforem)
- Torus: 120vh
- Pin Kasetka: 300vh (400vh container z buforem)
- Footer: ~20vh
- **Łącznie: ~1290vh (czyli ~12.9 wysokości viewportu scrollu)**

To jest dużo — ale nic innego w internecie nie daje takiego efektu. 
To jest **unique selling point** tej strony.

**Nowe pliki: 5** (4 sekcji + 1 layout helper)  
**Modified: 3** (scroll-section, page, layout)  
**Bez zmian: reszta** (Hero, Warsztat, Katalog, Metoda i ich podkomponenty)