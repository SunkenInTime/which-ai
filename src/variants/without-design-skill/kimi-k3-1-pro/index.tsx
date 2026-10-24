import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/layout";
import { LandingProvider } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/interactions";
import { IterationOne as Page1 } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/iteration-one";
import { IterationTwo as Page2 } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/iteration-two";
import { IterationThree as Page3 } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/iteration-three";
import { IterationFour as Page4 } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/iteration-four";
import { IterationFive as Page5 } from "@/variants/without-design-skill/kimi-k3-1-pro/source/app/_components/iteration-five";

const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;

const variant: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return (
      <RootLayout>
        <LandingProvider><Page /></LandingProvider>
      </RootLayout>
    );
  },
};

export default variant;
