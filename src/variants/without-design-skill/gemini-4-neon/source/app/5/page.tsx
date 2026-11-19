import type { Metadata } from "next";
import TerminalLanding from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/TerminalLanding";

export const metadata: Metadata = {
  title: "Engram — Cognitive Deck (Iteration 5)",
  description: "A tactile hardware-inspired cognitive terminal landing page for a second brain app.",
};

export default function PageFive() {
  return <TerminalLanding />;
}
