import type { Metadata } from "next";
import { IterationThree } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationThree";

export const metadata: Metadata = {
  title: "Commonplace — Swiss Spatial Studio (Design 3)",
  description:
    "A quiet room for long-term thinking in plain Markdown with instant backlinks.",
};

export default function IterationThreePage() {
  return <IterationThree />;
}
