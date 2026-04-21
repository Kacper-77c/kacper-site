import { Hero } from "@/components/sections/hero";
import { Warsztat } from "@/components/sections/warsztat";

export default function Home() {
  return (
    <main>
      <Hero />
      <Warsztat />
      {/* TODO: Kacper — kolejne sekcje po review warsztat */}
    </main>
  );
}