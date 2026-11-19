import type { Metadata } from "next";
import { IterationFour } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationFour";

export const metadata: Metadata = {
  title: "Commonplace — Midnight Observatory (Design 4)",
  description:
    "Connect late-night hunches, reading highlights, and past notes inside a quiet nocturnal graph.",
};

export default function IterationFourPage() {
  return <IterationFour />;
}
