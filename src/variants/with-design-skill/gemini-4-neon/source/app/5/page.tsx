import type { Metadata } from "next";
import { IterationFive } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationFive";

export const metadata: Metadata = {
  title: "Commonplace — Risograph Notebook (Design 5)",
  description:
    "Catch sparks before they cool in a tactile digital notebook that links every page automatically.",
};

export default function IterationFivePage() {
  return <IterationFive />;
}
