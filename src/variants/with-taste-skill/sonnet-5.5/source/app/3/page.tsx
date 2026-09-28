import type { Metadata } from "next";
import { archivo, plexMono } from "./fonts";
import {
  Closing,
  Faq,
  Footer,
  Hero,
  LogoMarquee,
  Nav,
  Pricing,
  Stack,
  Statement,
} from "./sections";

export const metadata: Metadata = { title: "3 Poster" };

/*
  Iteration 3: Poster.
  Neo-brutalist poster type: Archivo at its widest and heaviest, 2px ink
  borders, radius 0, one vermilion accent on neutral stone.
  DESIGN_VARIANCE 9, MOTION_INTENSITY 8, VISUAL_DENSITY 3.
*/
export default function Page() {
  return (
    <div className={`v3 ${archivo.variable} ${plexMono.variable} min-h-dvh bg-[color:var(--bg)] font-[family-name:var(--v-body)] text-[color:var(--fg)]`}>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Stack />
        <Statement />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
