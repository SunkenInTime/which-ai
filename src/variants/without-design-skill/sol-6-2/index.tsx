import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/without-design-skill/sol-6-2/source/app/layout";
import { Landing } from "@/variants/without-design-skill/sol-6-2/source/app/components/landing";
import type { Design } from "@/variants/without-design-skill/sol-6-2/source/app/components/designs";

// The source's /[design] route renders <Landing design={n} />; the gallery renders the same component.
const variant: VariantModule = {
  render({ iteration }) {
    const design = iteration as Design;
    return (
      <RootLayout>
        <Landing key={design} design={design} />
      </RootLayout>
    );
  },
};

export default variant;
