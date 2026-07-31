# kacper-site



## Demo

Podgląd: [kacper-site.vercel.app](https://kacper-site.vercel.app)


## Najważniejsze funkcje

- **Sześć sekcji full-bleed**: Witryna, Warsztat, Katalog (usługi), Metoda (proces), Realizacje (case studies), Zamówienie (kontakt). Każda w innym kolorze tła, twarde przejścia między sekcjami.
- **Interaktywny 3D ASCII torus w hero**: Three.js meshPhongMaterial z AsciiRenderer, mouse-driven shader distortion, reagujący na ruch kursora w promieniu 0.5 unit.
- **Pinned scroll z word-level reveal (Metoda)**: sekcja przypina się do viewportu na 320vh scrollu, cztery kroki procesu wjeżdżają jako word-splitted animacja przez GSAP SplitText, w tle rosnący torus, którego geometria płynnie zmienia się od tube 0.08 do 0.4 razem z scroll progressem.
- **Dwa sekwencyjne pinned case studies (Realizacje)**: mechanika inspirowana intmagic.com, w każdym pinned case study trzy CSS device frames (desktop, tablet, phone) wjeżdżają z określonych kierunków (dół, lewa, prawa) w miarę scrollu, z blurem i skalowaniem.
- **Torus jako brand thread**: powracający motyw w różnych formach przez całą stronę, pełny interaktywny w hero, trzy mini w kartach Katalogu, rosnący w Metodzie, fast-rotating między case studies Realizacji.
- **Lenis smooth scroll**: zsynchronizowany z GSAP ScrollTrigger, natywne wheel events zastąpione filmowym easingiem z momentum.
- **Bridge labels między sekcjami**: subtelne etykiety zapowiadające następną sekcję (`↓ nr 04 · METODA · cztery kroki`), fade-in scroll-triggered przy dolnej krawędzi każdej sekcji.
- **Signature typograficzny system**: trzy fonty w rolach zamkniętych, Fraunces dla display i body, Archivo dla UI i etykiet, IBM Plex Mono dla numerów sekcji, kodów i ASCII.
- **Vertical metadata**: po prawej krawędzi każdej sekcji pionowa etykieta z formatu matchbox label (np. `KK-04 · METODA · PRACOWNIA · WROCŁAW · 2026`).
- **Responsywność mobile-first**: piny wyłączone poniżej breakpointa `lg` (1024px), fallback do prostych vertical stacków, wszystkie animacje respektują `prefers-reduced-motion`.

## Wybrane decyzje techniczne

- **Next.js App Router zamiast Pages Router**: strona statyczna, bez backendu, ale App Router daje czystszą kolokację komponentów per sekcja i lepszą kontrolę nad Server Components, co redukuje bundle JavaScriptu wysyłanego do klienta.
- **Tailwind 4 z `@theme` w globals.css zamiast JS configu**: kolory brandowe (paper, ink, stamp, earth, matchbox-navy, matchbox-red, matchbox-turquoise) trzymane jako CSS variables, dostępne zarówno z klas Tailwindowych jak i inline w SVG czy Three.js material color. Jedno źródło prawdy.
- **GSAP zamiast Framer Motion dla pinned scroll**: Framer Motion nie ma stabilnego API dla `pin` z pełną kontrolą nad `scrub` i `anticipatePin`. GSAP ScrollTrigger to sprawdzone rozwiązanie, plus SplitText obsługuje polskie diakrytyki natywnie w wersji 3.13+.
- **Framer Motion tylko dla lokalnych scroll-driven micro-animacji**: `useScroll` z `useTransform` dla bridge labels, scroll progress indicator, oraz torusa między case studies. Prostsze niż GSAP timeline dla efektów bez pinu.
- **Lenis 1.2+ zamiast CSS `scroll-behavior: smooth`**: natywny smooth scroll w przeglądarce nie ma kontroli nad easingiem ani momentum. Lenis daje płynność na poziomie `apple.com`, plus jest sync-owalny z GSAP ScrollTrigger przez `gsap.ticker.add` i `lenis.on('scroll', ScrollTrigger.update)`.
- **Fix Framer Motion useScroll z Lenis**: Lenis przechwytuje natywne scroll eventy, więc `useScroll` z Framer Motion nie dostaje updateów. Rozwiązane przez `window.dispatchEvent(new Event('scroll'))` wewnątrz Lenis scroll callbacka, syntetyczny event budzi Framer Motion bez ingerencji w wewnętrzne API.
- **Three.js z `@react-three/fiber` i AsciiRenderer**: torus jako `meshPhongMaterial`, `meshStandardMaterial` daje realistyczne cieniowanie, ale AsciiRenderer wymaga silnych krawędzi rozjaśnienia, żeby dobrze mapować gradient znaków. Phong z `shininess: 80` i specular reflections daje wyraźniejsze ASCII niż standard PBR.
- **Throttle geometry rebuild w rosnącym torusie (Metoda)**: `torusKnotGeometry` jest droga w rebuildzie. Zamiast przebudowy co frame, throttle do 0.02 progressa (około 50 rebuildów na pełne 320vh scrollu), reszta to tylko rotacja przez `useFrame`. FPS utrzymany na 60 nawet na słabszych laptopach.
- **CSS device frames zamiast photorealistic mockupów w Realizacjach**: cienka border w earth color, `aspect-ratio` CSS property i subtle shadow. Editorial, spójne z brandem Pracownia, zero external assets do hostowania, pełna kontrola nad kolorystyką placeholderów.
- **Trzy piny na jednej stronie z `anticipatePin: 1` i `invalidateOnRefresh: true`**: nested pinning nie jest wspierany przez ScrollTrigger, więc każdy pin (Metoda, PLON, Kasetka) ma osobny trigger i `pinSpacing: true`. Global `ScrollTrigger.refresh()` w helperze `ScrollTriggerRefresh` odpalany po `document.fonts.ready`, żeby wysokości sekcji były policzone po załadowaniu Fraunces variable font.
- **shadcn/ui zamiast pełnej biblioteki UI**: potrzebne tylko dwa komponenty bazowe (Button, Slot), reszta pisana od zera w spójnym stylu. Rzemieślniczy brand nie znosi generycznych komponentów typu Material Design.
- **Word-splitting tylko `words`, nie `chars`**: Metoda ma cztery kroki, każdy z tytułem, subtitle, body i manifestem. Split do słów daje około 60 elementów DOM per krok, do znaków dawałoby ponad 1600. Word-level wystarcza wizualnie, DOM zarządzalny.

## Stack

**Frontend**
- Next.js 15/16 (App Router)
- React 19
- TypeScript (strict mode)

**Styling i typografia**
- Tailwind CSS 4 (`@theme` in `globals.css`)
- Fraunces (display i body, variable font, latin-ext subset)
- Archivo (UI, buttons, etykiety)
- IBM Plex Mono (numery sekcji, kody RX, ASCII)

**Animacje i scroll**
- GSAP 3.13+ (ScrollTrigger, SplitText)
- `@gsap/react` (`useGSAP` hook z automatycznym cleanupem)
- Framer Motion (`useScroll`, `useTransform`, `useSpring`)
- Lenis 1.2+ (smooth scroll z GSAP integration)

**3D i grafika**
- Three.js
- `@react-three/fiber`
- `@react-three/drei` (AsciiRenderer)

**Deployment i infra**
- Vercel (auto-deploy z main branch)

## Architektura w skrócie

```
app/
  layout.tsx              // fonts, LenisProvider, ScrollProgressIndicator
  page.tsx                // 6 sekcji w kolejności
  globals.css             // Tailwind @theme, CSS variables kolorów, keyframes

components/
  layout/
    masthead.tsx                  // sticky top nav
    scroll-section.tsx            // wrapper per sekcja, background w wariantach (paper, navy, red, turquoise, ink)
    lenis-provider.tsx            // Lenis + GSAP sync + window scroll dispatch
    scroll-trigger-refresh.tsx    // global refresh po font-load
    scroll-progress-indicator.tsx // lewa krawędź, active section tracker

  ui/
    stamp-button.tsx        // primary CTA
    section-number.tsx      // "nr 0X — NAZWA"
    vertical-meta.tsx       // pionowa metadata prawa krawędź
    hand-underline.tsx      // ręcznie rysowane SVG podkreślenie
    round-stamp.tsx         // okrągła pieczęć K·K
    perforated-edge.tsx     // kropki jak z matchbook
    ascii-torus.tsx         // 3D interaktywny torus dla hero
    torus-seal.tsx          // statyczny mini torus
    section-bridge.tsx      // etykieta zapowiadająca następną sekcję

  sections/
    hero.tsx
    warsztat.tsx
    warsztat/terminal-log.tsx     // animowany build log
    katalog.tsx
    katalog/
      service-card.tsx            // karta-recepta
      service-card-torus.tsx      // mini torus w orientacji per usługa
    metoda.tsx                    // orchestrator z pin i scroll progress
    metoda/
      metoda-step-reveal.tsx      // word-level reveal per krok
      growing-torus.tsx           // torus z throttled geometry rebuild
    realizacje.tsx
    realizacje/
      case-study-pin.tsx          // pin + device reveal per case study
      device-frame.tsx            // CSS frame desktop/tablet/phone
      case-study-reveal-torus.tsx // fast rotating torus między
    zamowienie.tsx

lib/
  gsap-config.ts          // idempotent plugin registration
  fonts.ts                // Fraunces, Archivo, Plex Mono z latin-ext
  utils.ts                // cn helper
```

Wzorzec: każda sekcja to komponent w `components/sections/`, złożone sekcje mają podfolder z subkomponentami. Wszystkie sekcje owinięte w `ScrollSection`, który dostarcza background, transition, vertical meta, section number, perforated edge, plus adaptuje kolorystykę do wariantu (dark tekst na paper, light tekst na ink/navy/turquoise/red).

## Uruchomienie lokalne

Wymagania:
- Node.js 20 lub nowszy
- npm (repo używa `package-lock.json`)

Kroki:

```bash
git clone https://github.com/kacperkrawczyk/kacper-site.git
cd kacper-site
npm install
npm run dev
```

Strona dostępna pod `http://localhost:3000`.

## Skrypty

```bash
npm run dev        # dev server, Next.js Turbopack
npm run build      # production build
npm run start      # start production build lokalnie
npm run lint       # ESLint
```
