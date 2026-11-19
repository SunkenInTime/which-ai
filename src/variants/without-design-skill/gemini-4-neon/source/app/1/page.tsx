import type { Metadata } from "next";
import EditorialLanding from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/EditorialLanding";

export const metadata: Metadata = {
  title: "Engram — Editorial Atelier (Iteration 1)",
  description: "A warm literary paper-and-ink second brain landing page.",
};

export default function PageOne() {
  return <EditorialLanding />;
}
