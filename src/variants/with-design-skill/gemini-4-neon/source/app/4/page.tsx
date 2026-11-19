import type { Metadata } from "next";
import { IterationFour } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationFour";

export const metadata: Metadata = {
  title: "Cairn — Cobalt studio",
  description:
    "One calm local workspace for everything you read, notice, and build. Editable Markdown notes with live backlinks.",
};

export default function PageFour() {
  return <IterationFour />;
}
