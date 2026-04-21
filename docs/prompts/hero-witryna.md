```markdown
# PROMPT DLA CURSORA: HERO "WITRYNA" (nr 01)

## CEL TEJ SESJI

Zbuduj kompletny hero section dla strony `app/page.tsx`. To JEDYNA sekcja, którą budujesz teraz. Nie rozszerzaj scope na inne sekcje, nawet jeśli ci się nasuną. Hero ma być gotowy do deploy na Vercel pod koniec tej sesji.

Projekt jest strony osobistej Kacpra Krawczyka — freelancera web design dla polskich MŚP. DNA estetyczne: "Pracownia projektanta etykiet zapałczanych z 1963 roku, w której ktoś postawił terminal vim."

## KONTEKST TECHNICZNY (CO JUŻ ISTNIEJE)

Projekt Next.js 15 App Router z TypeScript strict. Tailwind CSS 4 z custom theme. Zainstalowane: `framer-motion`, `clsx`, `tailwind-merge`. Istniejące pliki:

- `lib/fonts.ts` — Fraunces, Archivo, IBM Plex Mono przez next/font/google z latin-ext
- `lib/utils.ts` — `cn()` helper
- `app/globals.css` — Tailwind 4 `@theme` z CSS variables (paper, ink, stamp, scenic, earth, matchbox-*) + utility classes (fraunces-display, fraunces-body, font-archivo, font-mono, vertical-meta, section-number)
- `app/layout.tsx` — fonts loaded, NoiseOverlay component embedded, lang="pl"
- `components/ui/stamp-button.tsx` — ISTNIEJE, używaj jak jest, nie nadpisuj

Design system pełny: `docs/design-system.md` (konsultuj przed zmianami).

## DODATKOWE ZALEŻNOŚCI DO ZAINSTALOWANIA

Przed rozpoczęciem:

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Te biblioteki są potrzebne dla Three.js 3D ASCII renderingu. Nie pomijaj.

## DECYZJE STRATEGICZNE (ZAMKNIĘTE — NIE PODWAŻAJ)

- **Framework tematyczny:** Pracownia/Atelier. Sekcja hero nazywa się `WITRYNA`, nie DIAGNOZA.
- **Strategia copy:** benefit-first — bohaterem jest klient i to, co może zyskać. Nie pain-first. Nie medyczne metafory.
- **Tło hero:** `--color-paper` (kremowe #F7F4EF). NIE czerwone, NIE inne.
- **Signature moment:** 3D ASCII Torus Knot renderowany przez Three.js + @react-three/drei `AsciiRenderer`.
- **Kolor ASCII:** ciemny (`--color-ink`) jako dominanta + akcenty `--color-stamp` (zielony).
- **Tytuł typograficzny:** Fraunces Display BEZ italiku wavy. Prosty, pewny, bez WONK axis.
- **Polski ton:** "ty", nie "pan". Zero korpomowy. Zero "dedykowane rozwiązania", "synergia", "wartość dodana".

## CO MASZ ZBUDOWAĆ (LISTA KOMPONENTÓW)

### NOWE komponenty UI (tworzysz teraz)

1. `components/ui/section-number.tsx` — "nr XX — NAZWA"
2. `components/ui/vertical-meta.tsx` — pionowy kod meta po krawędzi
3. `components/ui/hand-underline.tsx` — ręcznie rysowany SVG underline
4. `components/ui/round-stamp.tsx` — okrągła pieczęć K·K
5. `components/ui/perforated-edge.tsx` — kropki perforacji jak z książeczki zapałek
6. `components/ui/ascii-torus.tsx` — Three.js canvas z ASCII renderem

### NOWY layout component

1. `components/layout/masthead.tsx` — top bar minimalny

### NOWA sekcja (orkiestruje wszystko powyżej)

1. `components/sections/hero.tsx` — kompletne hero

### UPDATE

1. `app/page.tsx` — renderuje `<Hero />` + przygotowuje miejsce na kolejne sekcje

## SPECYFIKACJA HERO — LAYOUT

Full viewport (min-h-screen). Tło `bg-paper`. Padding zewnętrzny: 80px desktop (`px-20`), 24px mobile (`px-6`).

### Layout desktop (≥1024px) — asymetryczny split 55/45

```
┌─── PERFORATED EDGE (left) ────────────────────────────────┐
│                                                           │
│  MASTHEAD (top, full width)                               │
│  ─────────────────────────────────────────────────────── │
│                                                           │
│  ┌── LEFT 55% ─────────┐  ┌── RIGHT 45% ──────────┐      │
│  │                      │  │                        │  VM  │
│  │  nr 01 — WITRYNA     │  │                        │  ↓   │
│  │                      │  │    [3D ASCII TORUS]    │      │
│  │  Strony,             │  │                        │      │
│  │  których się         │  │                        │      │
│  │  nie zapomina.       │  │                        │      │
│  │  ~~~~~~~~~~~~        │  │                        │      │
│  │                      │  │                        │      │
│  │  Dla małych firm,    │  │                        │      │
│  │  które...            │  │                        │      │
│  │                      │  │                        │      │
│  │  [STAMP CTA]         │  │                        │      │
│  │  Zobacz realizacje ↓ │  │                        │      │
│  └──────────────────────┘  └────────────────────────┘      │
│                                                            │
│                                          egz. 1/1 · PN-26  │
└────────────────────────────────────────────────────────────┘
```

Round stamp K·K w prawym górnym rogu (absolutnie pozycjonowany, wystaje poza grid).
Vertical meta po prawej krawędzi (poza gridem, sticky przy prawej stronie viewport).

### Layout mobile (<768px) — stacked

```
┌───────────────────┐
│  MASTHEAD (burger)│
├───────────────────┤
│                   │
│ nr 01 — WITRYNA   │
│                   │
│ Strony,           │
│ których się       │
│ nie zapomina.     │
│ ~~~~~~~           │
│                   │
│ Dla małych...     │
│                   │
│ [STAMP CTA]       │
│ Zobacz ↓          │
│                   │
│ ┌─────────────┐   │
│ │   3D ASCII  │   │
│ │  (static)   │   │
│ └─────────────┘   │
└───────────────────┘
```

Vertical meta ukryta na mobile. Round stamp mniejszy, w prawym górnym rogu ale scale down.

### Layout tablet (768-1024px)

Jak desktop, ale 60/40 zamiast 55/45. ASCII mniejszy. Vertical meta widoczna ale węższa.

## SPECYFIKACJA KOMPONENTÓW

### `components/ui/section-number.tsx`

```tsx
interface SectionNumberProps {
  number: string;  // "01", "02", itd.
  label: string;   // "WITRYNA", "WARSZTAT", itd.
  className?: string;
}
```

Renderuje: `nr {number} — {label}` w klasie `section-number` (już zdefiniowana w globals.css).  
`nr` lowercase. `{number}` dwucyfrowe. em-dash `—` (U+2014 z spacjami po obu stronach). `{label}` uppercase.

Przykład output: `nr 01 — WITRYNA`

### `components/ui/vertical-meta.tsx`

```tsx
interface VerticalMetaProps {
  segments: string[];  // ["KK-01", "WITRYNA", "PRACOWNIA", "WROCŁAW", "2026"]
  position?: "left" | "right";  // default "right"
  className?: string;
}
```

Renderuje pionowy tekst po krawędzi viewport. Używa klasy `vertical-meta` (zdefiniowanej w globals.css, `writing-mode: vertical-rl`, uppercase, letter-spacing 0.08em, Archivo Bold, color earth).

Separator między segmentami: `·` (U+00B7 z spacjami).

Pozycjonowany `fixed right-4 top-1/2 -translate-y-1/2` (lub `left-4` dla position left). Hidden poniżej md breakpointu (`hidden md:block`).

### `components/ui/hand-underline.tsx`

```tsx
interface HandUnderlineProps {
  color?: "stamp" | "earth" | "ink";  // default "stamp"
  delay?: number;  // w ms, opóźnienie animacji rysowania
  className?: string;
}
```

SVG path rysujący nierówny, pędzelkowy underline. NIE prosty `<line>` — użyj `<path>` z `d` opisującym lekko falującą linię z dwoma-trzema "przerwami" w grubości (kilka stroke-width zmian w obrębie długości).

Przykładowy path: `"M 0 10 Q 50 6, 100 9 T 200 8 Q 250 12, 300 9 T 400 10"`

Animacja rysowania: używa Framer Motion `pathLength` od 0 do 1 w 800ms ease-out, z opcjonalnym delay z props. Strokewidth 2-3px, stroke-linecap round. Kolor z CSS variable.

Renderuj jako inline SVG pod tekstem — ma być dziecięco wolny, nie perfekcyjny.

### `components/ui/round-stamp.tsx`

```tsx
interface RoundStampProps {
  topText?: string;  // "K·K" default
  bottomText?: string;  // "Zał. 2026" default
  size?: "sm" | "md" | "lg";  // default "md"
  className?: string;
}
```

Okrągła pieczęć SVG. Zewnętrzny okrąg 2-3px stroke. Tekst na górze zakrzywiony po łuku (użyj `<textPath>` z `<path id="top-arc">`). Tekst na dole zakrzywiony w dół.

Rozmiary: sm 60px, md 80px, lg 120px.  
Kolor default: `--color-ink`. W hero użyj default.  
Lekkie przekrzywienie (`rotate-[-3deg]`) — imitacja ręcznego odciśnięcia.

Fontem top i bottom: Archivo Bold uppercase, letter-spacing 0.15em. Top tekst ~11px, bottom tekst ~9px.

### `components/ui/perforated-edge.tsx`

```tsx
interface PerforatedEdgeProps {
  side?: "left" | "right" | "top" | "bottom";  // default "left"
  density?: number;  // default 20 (liczba kropek)
  className?: string;
}
```

Pionowy (lub poziomy) rząd kropek imitujących perforację książeczki zapałek. Użyj flex z równym spacingiem. Każda kropka: `w-1 h-1 rounded-full bg-earth/40`.

Dla "left": `fixed left-6 top-0 bottom-0 flex flex-col justify-around`. Analogicznie dla innych stron.  
Hidden na mobile (`hidden md:flex`).

### `components/ui/ascii-torus.tsx`

NAJWAŻNIEJSZY komponent tej sesji. Three.js ASCII torus knot.

```tsx
interface AsciiTorusProps {
  className?: string;
}
```

```tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
```

**Implementacja:**

```tsx
function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // auto-rotate + mouse influence
    meshRef.current.rotation.x += delta * 0.15 + mouse.y * delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2 + mouse.x * delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
      <meshStandardMaterial color="#2D6A4F" />
    </mesh>
  );
}

export function AsciiTorus({ className }: AsciiTorusProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Fallback dla reduced motion i mobile
  if (prefersReducedMotion) {
    return <StaticAsciiFallback className={className} />;
  }

  return (
    <div className={cn("w-full h-full aspect-square", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <TorusKnot />
        <AsciiRenderer 
          fgColor="#1C1814" 
          bgColor="#F7F4EF"
          characters=" .:-+*=%@#"
          resolution={0.15}
          invert={false}
        />
      </Canvas>
    </div>
  );
}

function StaticAsciiFallback({ className }: { className?: string }) {
  // Static ASCII art representing a torus knot
  return (
    <pre className={cn(
      "font-mono text-xs leading-[0.9] text-ink whitespace-pre text-center",
      className
    )}>
{`          .:*+=:.           
       .=%@@@@%=.         
     :+@@%*+**%@@+:       
    +@@*.      .*@@+      
   %@#.          .#@%     
  +@*              *@+    
  @+     ..::.      +@    
  @     :%@@@@%:     @    
  @+     ::::.      +@    
  +@*              *@+    
   %@#.          .#@%     
    +@@*.      .*@@+      
     :+@@%*+**%@@+:       
       .=%@@@@%=.         
          .:*+=:.         `}
    </pre>
  );
}
```

**Uwagi:**

- `AsciiRenderer` z @react-three/drei to jedna linia, która robi 80% roboty. Szczegóły: [https://drei.docs.pmnd.rs/misc/ascii-renderer](https://drei.docs.pmnd.rs/misc/ascii-renderer)
- `resolution={0.15}` — liczba pikseli/znaków. Niższe = gęstszy ASCII. Dostosuj eksperymentalnie (zakres 0.1-0.2).
- `characters=" .:-+*=%@#"` — od najjaśniejszego do najciemniejszego. Możesz eksperymentować.
- `fgColor`/`bgColor`: ciemny ink na kremie paper. Zgodnie z naszą paletą.
- Dla mobile: rozważ lazy-loading Canvas (dynamic import) żeby nie blokować FCP na słabych urządzeniach.

### `components/layout/masthead.tsx`

Top bar, full width, nad hero. Height ~60px desktop, 50px mobile.

```tsx
interface MastheadProps {
  className?: string;
}
```

**Desktop:**

- Left: `Kacper Krawczyk` — Fraunces Display, 18px, color ink, z `.fraunces-display` class ale override `opsz` do 24
- Right: 3 tekstowe linki w Archivo Regular, 13px, kolor earth, hover → stamp: "warsztat", "realizacje", "zamówienie". Separator `·`
- Linki kotwice: `#warsztat`, `#realizacje`, `#zamowienie` (smooth scroll)

**Mobile:**

- Left: "Kacper Krawczyk"
- Right: hamburger icon button (use `lucide-react` — `Menu` icon, stroke current color) → toggles mobile menu panel
- Mobile menu panel: overlay fixed right side, slide-in z prawej, Framer Motion. Trzy linki dużą czcionką (Fraunces Display) centered. Close button X.

### `components/sections/hero.tsx`

Kompozycja wszystkiego powyżej.

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionNumber } from "@/components/ui/section-number";
import { VerticalMeta } from "@/components/ui/vertical-meta";
import { HandUnderline } from "@/components/ui/hand-underline";
import { RoundStamp } from "@/components/ui/round-stamp";
import { PerforatedEdge } from "@/components/ui/perforated-edge";
import { AsciiTorus } from "@/components/ui/ascii-torus";
import { Masthead } from "@/components/layout/masthead";
import { StampButton } from "@/components/ui/stamp-button";
```

**Struktura JSX:**

```tsx
<section className="relative min-h-screen bg-paper px-6 md:px-20 overflow-hidden">
  <PerforatedEdge side="left" />
  <VerticalMeta segments={["KK-01", "WITRYNA", "PRACOWNIA", "WROCŁAW", "2026"]} position="right" />
  
  <Masthead />
  
  <div className="absolute top-20 right-8 md:right-20 z-10">
    <RoundStamp size="md" topText="K·K" bottomText="Zał. 2026" />
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 mt-24 md:mt-32 max-w-7xl mx-auto">
    {/* LEWA: TEKST */}
    <div className="flex flex-col justify-center">
      <motion.div {/* reveal sequence */}>
        <SectionNumber number="01" label="WITRYNA" />
      </motion.div>
      
      <h1 className="fraunces-display text-[clamp(48px,8vw,120px)] leading-[0.95] mt-8 mb-6">
        <motion.span className="block" /* delay 0 */>Strony,</motion.span>
        <motion.span className="block" /* delay 100 */>których się</motion.span>
        <motion.span className="block relative" /* delay 200 */>
          nie zapomina.
          <HandUnderline delay={800} className="absolute -bottom-2 left-0 w-full" />
        </motion.span>
      </h1>
      
      <motion.p className="fraunces-body text-lg md:text-xl max-w-xl text-ink/90 mb-10" /* delay 600 */>
        Dla małych firm, które mają coś do pokazania
        i nie chcą wyglądać jak wszyscy.
      </motion.p>
      
      <motion.div className="flex flex-col sm:flex-row gap-4 items-start" /* delay 1200 */>
        <StampButton>Umów bezpłatną konsultację →</StampButton>
        <button className="font-archivo font-bold uppercase tracking-[0.08em] text-sm text-stamp hover:underline underline-offset-4 self-center">
          Zobacz realizacje ↓
        </button>
      </motion.div>
    </div>
    
    {/* PRAWA: ASCII */}
    <motion.div className="flex items-center justify-center min-h-[400px] md:min-h-[600px]" /* delay 400 */>
      <AsciiTorus className="max-w-md" />
    </motion.div>
  </div>
  
  <div className="absolute bottom-8 right-8 md:right-20 font-archivo text-xs uppercase tracking-[0.08em] text-earth">
    egz. 1/1 · PN-26
  </div>
</section>
```

## ANIMACJE — SEKWENCJA ENTRY

Framer Motion, wszystkie respect `prefers-reduced-motion` (fallback: wszystko od razu widoczne).

**Timeline (ms od załadowania strony):**


| Element                         | Opóźnienie | Czas  | Efekt                                    |
| ------------------------------- | ---------- | ----- | ---------------------------------------- |
| SectionNumber (nr 01 — WITRYNA) | 0          | 400ms | fade-in + translate-y 8px → 0            |
| Tytuł linia 1 "Strony,"         | 100        | 600ms | fade-in + translate-y 20px → 0           |
| Tytuł linia 2 "których się"     | 200        | 600ms | fade-in + translate-y 20px → 0           |
| Tytuł linia 3 "nie zapomina."   | 300        | 600ms | fade-in + translate-y 20px → 0           |
| ASCII Torus pojawia się         | 400        | 800ms | fade-in (opacity 0 → 1) + scale 0.95 → 1 |
| Sub-paragraph                   | 600        | 600ms | fade-in + translate-y 12px → 0           |
| HandUnderline rysuje się        | 800        | 800ms | pathLength 0 → 1                         |
| CTA stamp + secondary link      | 1200       | 500ms | fade-in + translate-y 8px → 0            |
| Vertical meta                   | 400        | 800ms | fade-in                                  |
| Round stamp K·K                 | 500        | 500ms | fade-in + scale 0.9 → 1                  |
| "egz. 1/1 · PN-26"              | 1500       | 400ms | fade-in                                  |


Easing: `easeOut` default dla wszystkich, except underline który ma `easeInOut`.

## CZEGO NIE ROBIĆ (ANTI-PATTERNS — AUTOMATIC REJECTION)

- NIE dodawaj parallax na scroll. Hero jest statyczny po załadowaniu.
- NIE używaj `<Button>` z shadcn. Używaj `StampButton`.
- NIE używaj Lucide ikon jako "fill" dla żadnego elementu dekoracyjnego. Hamburger w mobile menu jest OK bo funkcjonalny.
- NIE dodawaj gradientów purple/blue/purple-to-pink nigdzie.
- NIE używaj `backdrop-blur` / glassmorphism.
- NIE zmieniaj palety — masz ją w `globals.css`. Używaj `bg-paper`, `text-ink`, `text-stamp` etc.
- NIE użyj `font-family: 'Inter'` gdziekolwiek. Trzy fonty: Fraunces, Archivo, Plex Mono.
- NIE dodawaj carouselu, slidera, czy przełączalnej zawartości w hero.
- NIE pisz copy innego niż zdefiniowane powyżej. "Strony, których się nie zapomina." — dokładnie tak.
- NIE nadpisuj `stamp-button.tsx` — już istnieje i działa.

## RESPONSYWNOŚĆ

- Mobile-first Tailwind.
- Breakpoints: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`.
- Mobile (<md): stacked layout, vertical meta ukryta, ASCII pod tekstem (z Canvas, ale z ograniczonym resolution dla performance).
- Tablet (md-lg): 60/40 split, ASCII mniejszy, vertical meta ukryta.
- Desktop (≥lg): 55/45 split jak w spec.
- Touch targets: stamp button ma min 44px height (już ma).

## DOSTĘPNOŚĆ (WCAG AA — OBOWIĄZKOWE)

- Kontrast: `--ink` (#1C1814) na `--paper` (#F7F4EF) = ~15:1 ✓. `--paper` na `--stamp` (#2D6A4F) = ~5.2:1 ✓. Sprawdź każdą inną parę.
- Wszystkie interaktywne elementy mają focus ring (`focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2`).
- `<h1>` tylko jeden w hero (główny tytuł).
- `ASCII torus` ma aria-hidden="true" (dekoracja).
- `VerticalMeta` ma aria-hidden="true" (dekoracja).
- `RoundStamp` ma aria-label z treścią ("K·K Zał. 2026").
- `PerforatedEdge` ma aria-hidden="true".
- Mobile menu: trap focus inside, escape key closes, close button ma aria-label.
- `prefers-reduced-motion`: wszystkie animacje Framer Motion zredukowane do natychmiastowego fade (duration 100ms, żadnych transform).
- Lang attribute na html to "pl" (już ustawione w layout).

## TESTY POLSKICH DIAKRYTYKÓW

Upewnij się że wszystkie polskie znaki renderują się poprawnie: `ą`, `ć`, `ę`, `ł`, `ń`, `ó`, `ś`, `ź`, `ż`. Szczególnie w:

- Tytule: "Strony, których się nie zapomina." (ó, ę)
- Sub: "Dla małych firm, które mają coś do pokazania i nie chcą wyglądać jak wszyscy." (ł, ą, ś, ą, ć, ą, ą, ą)
- CTA: "Umów bezpłatną konsultację" (ó, ę, ł, ą, ę)
- Vertical meta: "WROCŁAW" (Ł)

Font `latin-ext` subset w `lib/fonts.ts` już jest ustawiony. Jeśli coś się nie renderuje — to bug, nie feature.

## VALIDATION CHECKLIST (URUCHOM PRZED ODDANIEM)

- `npm run dev` startuje bez błędów
- `npm run build` przechodzi bez błędów TypeScript
- Hero renderuje się pod `http://localhost:3000`
- Desktop (1440px): asymetryczny split 55/45, wszystkie elementy widoczne
- Mobile (375px): stacked layout, menu burger w mastheadzie, ASCII poniżej tekstu
- 3D ASCII Torus obraca się (wolno, autopilot), reaguje na mouse move
- Sekwencja entry — widzisz reveal po kolei (SectionNumber → tytuł linia-po-linii → sub → CTA)
- HandUnderline rysuje się po ostatniej linii tytułu (z delay ~800ms)
- Primary CTA to StampButton (okrągły, obrócony -2°, hover prostuje)
- Round stamp K·K widoczny w prawym górnym rogu, lekko przekrzywiony
- Vertical meta widoczny po prawej krawędzi na desktop/tablet, ukryty na mobile
- Perforowana krawędź (kropki) widoczna po lewej na desktop/tablet, ukryta na mobile
- "egz. 1/1 · PN-26" widoczny w prawym dolnym rogu
- Polskie diakrytyki wszystkie renderują się poprawnie
- Focus states działają (tab przez elementy klikalne)
- `prefers-reduced-motion: reduce` → wszystko statyczne, zero animacji (test przez DevTools)

## ZASADY PRACY W TEJ SESJI

1. **Nie rozszerzaj scope.** Tylko hero. Nie buduj Gabinetu / Warsztatu / jakichkolwiek innych sekcji.
2. **Konsultuj `docs/design-system.md`** przed każdą decyzją designerską, której nie ma wprost w tym prompcie.
3. **Jeśli coś jest ambiguous w prompcie** — decyduj zgodnie z AD Statement "Pracownia projektanta etykiet zapałczanych z 1963 roku, w której ktoś postawił terminal vim" i zapisz komentarz `{/* TODO: Kacper — decyzja dot. X */}`.
4. **Commituj incrementally.** Osobny commit per komponent (SectionNumber, VerticalMeta, HandUnderline, RoundStamp, PerforatedEdge, AsciiTorus, Masthead, Hero). Osiem commitów.
5. **Testuj w przeglądarce po każdym commit.** Odpalaj `npm run dev`, sprawdzaj że nic się nie rozwaliło.
6. **Po skończonym hero** — napisz wiadomość "Hero WITRYNA gotowy, proszę review." i na tym skończ.

---

**Zacznij od instalacji zależności Three.js. Potem kolejne komponenty w kolejności z listy. Hero jako ostatnie, komponujące wszystko.**

```

```

