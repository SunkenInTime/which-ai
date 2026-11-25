import type { Metadata } from "next";
import VariantFour from "@/variants/without-design-skill/swe-2.1/source/components/landing/variant-four";

export const metadata: Metadata = {
  title: "Ambient Memory",
  description: "A soft human-centered landing page concept for Engram, the second-brain notebook.",
};

export default function Page() {
  return <VariantFour />;
}
