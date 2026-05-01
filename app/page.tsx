import { Hero } from "@/components/sections/hero";
import { Warsztat } from "@/components/sections/warsztat";
import { Katalog } from "@/components/sections/katalog";
import { Metoda } from "@/components/sections/metoda";
import { Realizacje } from "@/components/sections/realizacje";
import ZamowienieSection from "@/components/sections/Zamowienie/ZamowienieSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Warsztat />
      <Katalog />
      <Metoda />
      <Realizacje />
      <ZamowienieSection />
    </main>
  );
}
