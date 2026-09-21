import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Source_Serif_4 } from "next/font/google";
import { IndexSpread } from "./index-spread";

const sans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Index",
  description:
    "An index of one commonplace. Choose a letter and open the note it points to.",
};

export default function IndexPage() {
  return <IndexSpread sansClass={sans.className} serifClass={serif.className} />;
}
