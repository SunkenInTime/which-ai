import type { VariantModule } from "@/lib/gallery-types";
import LandingPage from "./source/app/components/landing-page";
import "@/generated/scoped-variant-css/without-design-skill/luna-6/source/app/globals.css";

const variantModule: VariantModule = {
  render({ iteration }) {
    return <LandingPage version={Number(iteration)} />;
  },
};

export default variantModule;
