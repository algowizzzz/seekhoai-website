import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { UdemyShowcase } from "@/components/sections/UdemyShowcase";
import { WhoFor } from "@/components/sections/WhoFor";
import { Learnings } from "@/components/sections/Learnings";
import { Instructor } from "@/components/sections/Instructor";
import { Testimonials } from "@/components/sections/Testimonials";
import { FreeIntroCourse } from "@/components/sections/FreeIntroCourse";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <TrustStrip />
      <UdemyShowcase />
      <WhoFor />
      <Learnings />
      <Instructor />
      <Testimonials />
      <FreeIntroCourse />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
