import type { Metadata } from "next";
import { IterationOne } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationOne";

export const metadata: Metadata = {
  title: "Cairn — Drafting desk",
  description:
    "A local-first second brain where every note stays a plain Markdown file and older thoughts surface beside your writing.",
};

export default function PageOne() {
  return <IterationOne />;
}
