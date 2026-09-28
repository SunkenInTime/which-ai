import type { Metadata } from "next";
import {
  Ask,
  Closing,
  Features,
  Footer,
  Hero,
  ImportStrip,
  Nav,
  Quotes,
  Statement,
} from "./sections";

export const metadata: Metadata = { title: "1 Reading Room" };

/*
  Iteration 1: Reading Room.
  Editorial Swiss, sharp corners, Geist, cool paper + ink + cobalt.
  Photography is kept in grayscale so the single accent does the talking.
  DESIGN_VARIANCE 7, MOTION_INTENSITY 5, VISUAL_DENSITY 3.
*/
export default function Page() {
  return (
    <div className="v1 min-h-dvh bg-[color:var(--bg)] font-[family-name:var(--v-body)] text-[color:var(--fg)]">
      <Nav />
      <main>
        <Hero />
        <ImportStrip />
        <Features />
        <Statement />
        <Ask />
        <Quotes />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
