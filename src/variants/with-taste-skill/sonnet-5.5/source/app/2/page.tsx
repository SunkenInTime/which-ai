import { Board } from "./_components/Board";
import { Cta } from "./_components/Cta";
import { Diagram } from "./_components/Diagram";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { GrowCell } from "./_components/GrowCell";
import { Hero } from "./_components/Hero";
import { NameBand } from "./_components/NameBand";
import { Plans } from "./_components/Plans";
import { RevealRoot } from "./_components/RevealRoot";

export default function Page() {
  return (
    <RevealRoot>
      <Hero />
      <main>
        <GrowCell />
        <Board />
        <NameBand />
        <Diagram />
        <Plans />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </RevealRoot>
  );
}
