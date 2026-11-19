import type { Metadata } from "next";
import GardenLanding from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/GardenLanding";

export const metadata: Metadata = {
  title: "Engram — Digital Garden (Iteration 4)",
  description: "An organic botanical digital-garden landing page for a second brain app.",
};

export default function PageFour() {
  return <GardenLanding />;
}
