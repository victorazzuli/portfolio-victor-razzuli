import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Cases } from "@/sections/Cases";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Cases />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
