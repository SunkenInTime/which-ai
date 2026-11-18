import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-design-skill/sol-6-2/source/app/layout";
import { LandingPage, editions } from "@/variants/with-design-skill/sol-6-2/source/app/landing";

// The source's /[edition] route renders <LandingPage design={edition} />; the gallery renders the same component.
const variant: VariantModule = {
  render({ iteration }) {
    const design = editions.find(({ id }) => id === iteration)!;
    return (
      <RootLayout>
        <LandingPage key={design.id} design={design} />
      </RootLayout>
    );
  },
};

export default variant;
