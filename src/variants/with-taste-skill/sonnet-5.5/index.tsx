import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/sonnet-5.5/source/app/layout";
import Layout1 from "@/variants/with-taste-skill/sonnet-5.5/source/app/1/layout";
import Layout2 from "@/variants/with-taste-skill/sonnet-5.5/source/app/2/layout";
import Layout3 from "@/variants/with-taste-skill/sonnet-5.5/source/app/3/layout";
import Layout4 from "@/variants/with-taste-skill/sonnet-5.5/source/app/4/layout";
import Layout5 from "@/variants/with-taste-skill/sonnet-5.5/source/app/5/layout";
import Page1 from "@/variants/with-taste-skill/sonnet-5.5/source/app/1/page";
import Page2 from "@/variants/with-taste-skill/sonnet-5.5/source/app/2/page";
import Page3 from "@/variants/with-taste-skill/sonnet-5.5/source/app/3/page";
import Page4 from "@/variants/with-taste-skill/sonnet-5.5/source/app/4/page";
import Page5 from "@/variants/with-taste-skill/sonnet-5.5/source/app/5/page";

// Each source route has its own layout (fonts and the page's root class), so render it around its page.
const routes = {
  "1": [Layout1, Page1],
  "2": [Layout2, Page2],
  "3": [Layout3, Page3],
  "4": [Layout4, Page4],
  "5": [Layout5, Page5],
} as const;

const variantModule: VariantModule = {
  render({ iteration }) {
    const [Layout, Page] = routes[iteration];
    return (
      <RootLayout>
        <Layout>
          <Page />
        </Layout>
      </RootLayout>
    );
  },
};

export default variantModule;
