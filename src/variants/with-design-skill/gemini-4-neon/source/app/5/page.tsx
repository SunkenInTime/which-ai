import type { Metadata } from "next";
import { IterationFive } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationFive";

export const metadata: Metadata = {
  title: "Cairn — Reading room",
  description:
    "A digital commonplace book and second brain built for quiet reading, linked thoughts, and plain local files.",
};

export default function PageFive() {
  return <IterationFive />;
}
