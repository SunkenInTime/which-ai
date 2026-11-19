import type { Metadata } from "next";
import { IterationFive } from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/IterationFive";

export const metadata: Metadata = {
  title: "Noema — Tactile Studio Edition | Spatial Second Brain",
  description:
    "Unfold your brain on an infinite tactile canvas. Pin thoughts, snap synaptic threads, and turn messy curiosity into sharp finished work.",
};

export default function PageFive() {
  return <IterationFive />;
}
