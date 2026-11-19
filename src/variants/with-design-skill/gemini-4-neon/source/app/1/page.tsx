import type { Metadata } from "next";
import { IterationOne } from "@/variants/with-design-skill/gemini-4-neon/source/components/iterations/IterationOne";

export const metadata: Metadata = {
  title: "Commonplace — Index-Card Desk (Design 1)",
  description:
    "Keep every useful thought within arm's reach with a digital slip-box modeled on physical index cards.",
};

export default function IterationOnePage() {
  return <IterationOne />;
}
