import type { Metadata } from "next";
import VariantOne from "@/variants/without-design-skill/swe-2.1/source/components/landing/variant-one";

export const metadata: Metadata = {
  title: "Neural Noir",
  description: "A graph-first cinematic landing page concept for Engram, the second-brain notebook.",
};

export default function Page() {
  return <VariantOne />;
}
