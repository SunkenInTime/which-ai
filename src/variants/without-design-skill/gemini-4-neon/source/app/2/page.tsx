import type { Metadata } from "next";
import { IterationTwo } from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/IterationTwo";

export const metadata: Metadata = {
  title: "Noema — Obsidian Constellation | Neural Second Brain",
  description:
    "A neural operating system for everything you know. Sub-millisecond local graph search, semantic recall, and plain Markdown sovereignty.",
};

export default function PageTwo() {
  return <IterationTwo />;
}
