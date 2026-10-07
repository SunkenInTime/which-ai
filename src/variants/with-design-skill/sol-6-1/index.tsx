import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-design-skill/sol-6-1/source/app/layout";
import Landing from "@/variants/with-design-skill/sol-6-1/source/app/components/Landing";
const variantModule: VariantModule = {
  render({ iteration }) { return <RootLayout><Landing variant={Number(iteration)} /></RootLayout>; }
};
export default variantModule;
