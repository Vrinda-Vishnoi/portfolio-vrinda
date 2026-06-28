import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CareerPath } from "@/components/CareerPath";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Extras } from "@/components/Extras";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <CareerPath />
      <Projects />
      <Skills />
      <Extras />
      <Contact />
    </main>
  );
}
