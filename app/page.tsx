import { StampButton } from "@/components/ui/stamp-button";

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-24">
      <p className="section-number mb-4">nr 00 — TEST</p>
      <h1 className="fraunces-display text-6xl text-ink mb-8">
        Zażółć gęślą jaźń.
      </h1>
      <p className="fraunces-body text-lg text-ink max-w-xl mb-8">
        Jeśli widzisz ten tekst w Fraunces, a numer sekcji wyżej w monospace —
        wszystko działa.
      </p>
      <div className="flex gap-4 mb-8">
        <StampButton>Umów konsultację →</StampButton>
        <StampButton variant="secondary">Portfolio ↓</StampButton>
      </div>
      <p className="font-archivo font-bold uppercase tracking-[0.08em] text-sm text-stamp">
        archivo w roli UI
      </p>
    </main>
  );
}