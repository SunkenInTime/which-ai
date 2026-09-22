import type { VariantModule } from "@/lib/gallery-types";
import RootLayout from "@/variants/with-taste-skill/opus-5.5/source/app/layout";
import Page1 from "@/variants/with-taste-skill/opus-5.5/source/app/1/page";
import Layout1 from "@/variants/with-taste-skill/opus-5.5/source/app/1/layout";
import Page2 from "@/variants/with-taste-skill/opus-5.5/source/app/2/page";
import Layout2 from "@/variants/with-taste-skill/opus-5.5/source/app/2/layout";
import Page3 from "@/variants/with-taste-skill/opus-5.5/source/app/3/page";
import Layout3 from "@/variants/with-taste-skill/opus-5.5/source/app/3/layout";
import Page4 from "@/variants/with-taste-skill/opus-5.5/source/app/4/page";
import Layout4 from "@/variants/with-taste-skill/opus-5.5/source/app/4/layout";
import Page5 from "@/variants/with-taste-skill/opus-5.5/source/app/5/page";
import Layout5 from "@/variants/with-taste-skill/opus-5.5/source/app/5/layout";
const pages = { "1": () => <Layout1><Page1 /></Layout1>, "2": () => <Layout2><Page2 /></Layout2>, "3": () => <Layout3><Page3 /></Layout3>, "4": () => <Layout4><Page4 /></Layout4>, "5": () => <Layout5><Page5 /></Layout5> } as const;
const variantModule: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return <RootLayout><Page /></RootLayout>;
  },
};

export default variantModule;
