import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/without-design-skill/opus-5.5/source/app/layout";
import Page1 from "@/variants/without-design-skill/opus-5.5/source/app/1/page";
import Page2 from "@/variants/without-design-skill/opus-5.5/source/app/2/page";
import Page3 from "@/variants/without-design-skill/opus-5.5/source/app/3/page";
import Page4 from "@/variants/without-design-skill/opus-5.5/source/app/4/page";
import Page5 from "@/variants/without-design-skill/opus-5.5/source/app/5/page";
const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;
const variantModule: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return <RootLayout><Page /></RootLayout>;
  },
};

export default variantModule;
