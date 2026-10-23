import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/kimi-k3-1-pro/source/app/layout";
import { MotionController } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/chrome";
import { VersionOne as Page1 } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/one";
import { VersionTwo as Page2 } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/two";
import { VersionThree as Page3 } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/three";
import { VersionFour as Page4 } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/four";
import { VersionFive as Page5 } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/five";

const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;

const variant: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return (
      <RootLayout>
        <>
          <MotionController current={Number(iteration)} />
          <Page />
        </>
      </RootLayout>
    );
  },
};

export default variant;
