import type { VariantModule } from "@/lib/gallery-types";
import Page1 from "@/variants/without-design-skill/grok-4.7/source/app/one/page";
import Page2 from "@/variants/without-design-skill/grok-4.7/source/app/two/page";
import Page3 from "@/variants/without-design-skill/grok-4.7/source/app/three/page";
import Page4 from "@/variants/without-design-skill/grok-4.7/source/app/four/page";
import Page5 from "@/variants/without-design-skill/grok-4.7/source/app/five/page";
import "@/generated/scoped-variant-css/without-design-skill/grok-4.7/source/app/globals.css";

const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;

const variantModule: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return <Page />;
  },
};

export default variantModule;
