import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/sol-6-1/source/app/layout";
import { LandingPage } from "@/variants/with-taste-skill/sol-6-1/source/app/components/landing-pages";
const variantModule: VariantModule = {
  render({ iteration }) { return <RootLayout><LandingPage variant={Number(iteration)} /></RootLayout>; }
};
export default variantModule;
