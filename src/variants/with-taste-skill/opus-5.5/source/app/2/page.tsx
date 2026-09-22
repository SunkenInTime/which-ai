import { Chapters } from "./_components/chapters";
import { Files } from "./_components/files";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { IndexSection } from "./_components/index-section";
import { Marginalia } from "./_components/marginalia";
import { Pricing } from "./_components/pricing";
import { Quotes } from "./_components/quotes";

export default function Page() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <main>
        <Marginalia />
        <IndexSection />
        <Chapters />
        <Quotes />
        <Files />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
