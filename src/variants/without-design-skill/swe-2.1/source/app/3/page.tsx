import type { Metadata } from "next";
import VariantThree from "@/variants/without-design-skill/swe-2.1/source/components/landing/variant-three";

export const metadata: Metadata = {
  title: "Command Center",
  description: "A high-density modular landing page concept for Engram, the second-brain notebook.",
};

export default function Page() {
  return <VariantThree />;
}
