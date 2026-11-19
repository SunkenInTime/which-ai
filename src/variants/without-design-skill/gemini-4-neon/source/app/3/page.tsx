import type { Metadata } from "next";
import { IterationThree } from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/IterationThree";

export const metadata: Metadata = {
  title: "Noema — Swiss Grid Edition | Architectural Second Brain",
  description:
    "Externalize every thought. A disciplined, keyboard-first second brain engineered with International Typographic clarity and local Markdown files.",
};

export default function PageThree() {
  return <IterationThree />;
}
