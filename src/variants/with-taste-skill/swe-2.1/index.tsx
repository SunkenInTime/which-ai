import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/swe-2.1/source/app/layout";
import { LandingPage } from "@/variants/with-taste-skill/swe-2.1/source/app/components/landing";

// The source serves all five from app/[variant]/page.tsx, which renders <LandingPage variant={n} />.
const variant: VariantModule = {
  render({ iteration }) {
    return (
      <RootLayout>
        <LandingPage variant={iteration} />
      </RootLayout>
    );
  },
};

export default variant;
