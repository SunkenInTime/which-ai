import type { Metadata } from "next";
import { IterationTwo } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationTwo";

export const metadata: Metadata = {
  title: "Commonplace — Botanical Garden (Design 2)",
  description:
    "Grow your thinking over decades in a living personal knowledge garden.",
};

export default function IterationTwoPage() {
  return <IterationTwo />;
}
