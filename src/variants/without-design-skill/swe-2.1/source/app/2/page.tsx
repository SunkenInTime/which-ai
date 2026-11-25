import type { Metadata } from "next";
import VariantTwo from "@/variants/without-design-skill/swe-2.1/source/components/landing/variant-two";

export const metadata: Metadata = {
  title: "Editorial Zen",
  description: "A quiet editorial landing page concept for Engram, the second-brain notebook.",
};

export default function Page() {
  return <VariantTwo />;
}
