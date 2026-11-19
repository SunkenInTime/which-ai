import type { Metadata } from "next";
import { IterationFour } from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/IterationFour";

export const metadata: Metadata = {
  title: "Noema — Mind Garden Edition | Calm Second Brain",
  description:
    "A quiet digital garden where half-formed thoughts grow into clarity. Gentle spaced resurfacing, organic note-linking, and zero notification anxiety.",
};

export default function PageFour() {
  return <IterationFour />;
}
