import type { Metadata } from "next";
import { jetbrains, sora } from "./fonts";
import {
  Bento,
  Closing,
  Files,
  Footer,
  Hero,
  ImportStrip,
  Nav,
  Quotes,
  WorkflowSection,
} from "./sections";

export const metadata: Metadata = { title: "2 Graph" };

/*
  Iteration 2: Graph.
  Dark tech, Sora + Geist + JetBrains Mono, near-black with one desaturated lime.
  Dark is the default here (the brand insists); the switcher can force light.
  The hero is a real canvas graph, not a picture of one.
  DESIGN_VARIANCE 7, MOTION_INTENSITY 7, VISUAL_DENSITY 4.
*/
export default function Page() {
  return (
    <div className={`v2 ${sora.variable} ${jetbrains.variable} min-h-dvh bg-[color:var(--bg)] font-[family-name:var(--v-body)] text-[color:var(--fg)]`}>
      <Nav />
      <main>
        <Hero />
        <ImportStrip />
        <Bento />
        <Files />
        <WorkflowSection />
        <Quotes />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
