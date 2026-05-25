import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Curriculum } from "@/components/sections/Curriculum";
import { FreeIntroCourse } from "@/components/sections/FreeIntroCourse";
import { WhoFor } from "@/components/sections/WhoFor";
import { Instructor } from "@/components/sections/Instructor";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Pillars />
      <Curriculum />
      <FreeIntroCourse />
      <WhoFor />
      <Instructor />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
