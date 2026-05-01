import type { Metadata } from "next";
import { fraunces, archivo, plexMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { ScrollTriggerRefresh } from "@/components/layout/scroll-trigger-refresh";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kacper Krawczyk — gabinet projektowy",
  description:
    "Strony internetowe dla polskich MŚP. Pain-first, bez korpomowy. Wrocław, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <NoiseOverlay />
        <LenisProvider />
        <ScrollTriggerRefresh />
        {children}
      </body>
    </html>
  );
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1000] opacity-[0.04] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }}
    />
  );
}