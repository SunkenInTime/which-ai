import type { Metadata } from "next";
import CosmosLanding from "@/variants/without-design-skill/gemini-4-neon/source/components/iterations/CosmosLanding";

export const metadata: Metadata = {
  title: "Engram — Neural Cosmos (Iteration 2)",
  description: "A dark spatial knowledge graph landing page for a second brain app.",
};

export default function PageTwo() {
  return <CosmosLanding />;
}
