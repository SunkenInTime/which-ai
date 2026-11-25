import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-design-skill/swe-2.1/source/app/layout";
import IterationOne from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationOne";
import IterationTwo from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationTwo";
import IterationThree from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationThree";
import IterationFour from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationFour";
import IterationFive from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationFive";

// The source serves all five from app/[iteration]/page.tsx, which also renders its switcher; the gallery renders
// the same design components without it.
const pages = { "1": IterationOne, "2": IterationTwo, "3": IterationThree, "4": IterationFour, "5": IterationFive } as const;

const variant: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return (
      <RootLayout>
        <Page />
      </RootLayout>
    );
  },
};

export default variant;
