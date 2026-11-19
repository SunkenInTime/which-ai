import type { Metadata } from "next";
import { IterationOne } from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/IterationOne";

export const metadata: Metadata = {
  title: "Noema — Editorial Paper Edition | Second Brain",
  description:
    "Think in threads, not folders. A warm literary Zettelkasten and local-first second brain for writers, researchers, and deep thinkers.",
};

export default function PageOne() {
  return <IterationOne />;
}
