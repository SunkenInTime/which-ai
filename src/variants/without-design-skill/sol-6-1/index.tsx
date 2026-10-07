import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/without-design-skill/sol-6-1/source/app/layout";
import LandingPage from "@/variants/without-design-skill/sol-6-1/source/app/components/LandingPage";
const variantModule: VariantModule = {
  render({ iteration }) { return <RootLayout><LandingPage version={Number(iteration)} /></RootLayout>; }
};
export default variantModule;
