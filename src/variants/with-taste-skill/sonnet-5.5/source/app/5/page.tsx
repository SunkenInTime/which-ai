import type { Metadata } from "next";
import { bricolage } from "./fonts";
import {
  Closing,
  Features,
  Footer,
  Hero,
  ImportStrip,
  Nav,
  Privacy,
  Quotes,
  Try,
} from "./sections";

export const metadata: Metadata = { title: "5 Highlighter" };

/*
  Iteration 5: Highlighter.
  Playful. Bricolage Grotesque, cool grey with one marker-yellow accent used
  as a highlighter would be. The hero desk is draggable on large screens.
  DESIGN_VARIANCE 9, MOTION_INTENSITY 8, VISUAL_DENSITY 3.
*/
export default function Page() {
  return (
    <div className={`v5 ${bricolage.variable} min-h-dvh bg-[color:var(--bg)] font-[family-name:var(--v-body)] text-[color:var(--fg)]`}>
      <Nav />
      <main>
        <Hero />
        <ImportStrip />
        <Features />
        <Try />
        <Quotes />
        <Privacy />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
