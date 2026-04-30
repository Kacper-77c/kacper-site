import { Hero } from "@/components/sections/hero";
import { Warsztat } from "@/components/sections/warsztat";
import { Katalog } from "@/components/sections/katalog";
import { Metoda } from "@/components/sections/metoda";
import { Realizacje } from "@/components/sections/realizacje";

export default function Home() {
  return (
    <main>
      <Hero />
      <Warsztat />
      <Katalog />
      <Metoda />
      <Realizacje />
    </main>
  );
}
