import type { Metadata } from "next";
import { IterationTwo } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationTwo";

export const metadata: Metadata = {
  title: "Cairn — Botanical archive",
  description:
    "A quiet nocturnal second brain that maps how your ideas connect across years of reading and writing.",
};

export default function PageTwo() {
  return <IterationTwo />;
}
