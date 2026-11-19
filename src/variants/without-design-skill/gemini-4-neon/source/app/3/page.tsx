import type { Metadata } from "next";
import SwissLanding from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/SwissLanding";

export const metadata: Metadata = {
  title: "Engram — Swiss Index (Iteration 3)",
  description: "A Swiss brutalist grid-system landing page for a second brain app.",
};

export default function PageThree() {
  return <SwissLanding />;
}
