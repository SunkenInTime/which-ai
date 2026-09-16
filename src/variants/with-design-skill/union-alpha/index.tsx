import type { VariantModule } from "@/lib/gallery-types";
import { DM_Sans, Manrope, Lora } from "next/font/google";
import Page1 from "./source/app/one/page";
import Page2 from "./source/app/two/page";
import Page3 from "./source/app/three/page";
import Page4 from "./source/app/four/page";
import Page5 from "./source/app/five/page";
import "@/generated/scoped-variant-css/with-design-skill/union-alpha/source/app/globals.css";

const sans = DM_Sans({ variable: "--font-union-sans", subsets: ["latin"] });
const display = Manrope({ variable: "--font-union-display", subsets: ["latin"] });
const serif = Lora({ variable: "--font-union-serif", subsets: ["latin"] });

const pages = { "1": Page1, "2": Page2, "3": Page3, "4": Page4, "5": Page5 } as const;

const variantModule: VariantModule = {
  render({ iteration }) {
    const Page = pages[iteration];
    return <div className={`${sans.variable} ${display.variable} ${serif.variable} union-alpha-fonts`}><Page /></div>;
  },
};

export default variantModule;
