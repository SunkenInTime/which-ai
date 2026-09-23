import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "./source/app/layout";
import { IterationLanding, iterations } from "./source/components/iteration-landing";

const variantModule: VariantModule = {
  render({ iteration }) {
    return <RootLayout><IterationLanding iteration={iterations[Number(iteration) - 1]} /></RootLayout>;
  },
};

export default variantModule;
