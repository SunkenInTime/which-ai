import type { Metadata } from "next";
import { outfit } from "./fonts";
import {
  Bento,
  Closing,
  Day,
  Footer,
  Hero,
  ImportStrip,
  Nav,
  Voices,
} from "./sections";

export const metadata: Metadata = { title: "4 Glass" };

/*
  Iteration 4: Glass.
  Premium consumer. Outfit in light and regular weights, cold silver and
  graphite with one deep rose, soft 28px shapes, pill controls, and a
  frosted-glass approximation (not Apple's Liquid Glass) on the floating UI.
  DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 3.
*/
export default function Page() {
  return (
    <div className={`v4 ${outfit.variable} min-h-dvh bg-[color:var(--bg)] font-[family-name:var(--v-body)] text-[color:var(--fg)]`}>
      <Nav />
      <main>
        <Hero />
        <ImportStrip />
        <Bento />
        <Day />
        <Voices />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
