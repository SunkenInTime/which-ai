import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/without-design-skill/gpt-6.2-astra/source/app/layout";
import Landing from "@/variants/without-design-skill/gpt-6.2-astra/source/app/components/Landing";
import type { Edition } from "@/variants/without-design-skill/gpt-6.2-astra/source/app/components/editions";

// The source's /[edition] route renders <Landing edition={n} />; the gallery renders the same component.
const variant: VariantModule = {
  render({ iteration }) {
    const edition = Number(iteration) as Edition;
    return (
      <RootLayout>
        <Landing key={edition} edition={edition} />
      </RootLayout>
    );
  },
};

export default variant;
