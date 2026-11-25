import type { Metadata } from "next";
import VariantFive from "@/variants/without-design-skill/swe-2.1/source/components/landing/variant-five";

export const metadata: Metadata = {
  title: "Cortex Console",
  description: "A precision AI memory-console landing page concept for Engram, the second-brain notebook.",
};

export default function Page() {
  return <VariantFive />;
}
