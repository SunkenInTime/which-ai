import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/sol-6-1/source/app/layout";
import Landing from "@/variants/with-taste-skill/sol-6-1/source/app/components/landing";
const variantModule: VariantModule = {
  render({ iteration }) { return <RootLayout><Landing version={Number(iteration)} /></RootLayout>; }
};
export default variantModule;
