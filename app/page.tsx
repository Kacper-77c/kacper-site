import { Hero } from "@/components/sections/hero";
import { Warsztat } from "@/components/sections/warsztat";
import { Katalog } from "@/components/sections/katalog";

export default function Home() {
  return (
    <main>
      <Hero />
      <Warsztat />
      <Katalog />
    </main>
  );
}