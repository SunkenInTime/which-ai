import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/gpt-6.2-astra/source/app/layout";
import Landing from "@/variants/with-taste-skill/gpt-6.2-astra/source/app/components/Landing";
import TasteRuntime from "@/variants/with-taste-skill/gpt-6.2-astra/source/app/TasteRuntime";
import type { Design } from "@/variants/with-taste-skill/gpt-6.2-astra/source/app/components/content";

// The source's /[design] route renders <Landing design={n} />; the gallery renders the same component, plus
// TasteRuntime, which starts the taste skill's motion modules the source's layout loaded (see that file).
const variant: VariantModule = {
  render({ iteration }) {
    const design = Number(iteration) as Design;
    return (
      <RootLayout>
        <Landing key={design} design={design} />
        <TasteRuntime design={design} />
      </RootLayout>
    );
  },
};

export default variant;
