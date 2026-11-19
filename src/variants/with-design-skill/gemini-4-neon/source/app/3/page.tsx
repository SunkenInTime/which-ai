import type { Metadata } from "next";
import { IterationThree } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationThree";

export const metadata: Metadata = {
  title: "Cairn — Index drawer",
  description:
    "Think on digital index cards that connect across topics. Plain local Markdown files with instant recall.",
};

export default function PageThree() {
  return <IterationThree />;
}
