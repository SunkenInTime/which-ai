import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IterationFive from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationFive";
import IterationFour from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationFour";
import IterationOne from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationOne";
import IterationSwitcher from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationSwitcher";
import IterationThree from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationThree";
import IterationTwo from "@/variants/with-design-skill/swe-2.1/source/components/iterations/IterationTwo";

export const dynamicParams = false;

const designs = {
  "1": IterationOne,
  "2": IterationTwo,
  "3": IterationThree,
  "4": IterationFour,
  "5": IterationFive,
};

const metadataByIteration: Record<string, { title: string; description: string }> = {
  "1": {
    title: "Marginalia",
    description: "A literary, annotated-manuscript landing page for Commonplace.",
  },
  "2": {
    title: "Memory palace",
    description: "An architectural, spatial-memory landing page for Commonplace.",
  },
  "3": {
    title: "Neural observatory",
    description: "A celestial knowledge-graph landing page for Commonplace.",
  },
  "4": {
    title: "Field notes",
    description: "A tactile research-notebook landing page for Commonplace.",
  },
  "5": {
    title: "Mycelium",
    description: "An organic, living-network landing page for Commonplace.",
  },
};

export function generateStaticParams() {
  return Object.keys(designs).map((iteration) => ({ iteration }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ iteration: string }>;
}): Promise<Metadata> {
  const { iteration } = await params;
  return metadataByIteration[iteration] ?? metadataByIteration["1"];
}

export default async function IterationPage({
  params,
}: {
  params: Promise<{ iteration: string }>;
}) {
  const { iteration } = await params;
  const Design = designs[iteration as keyof typeof designs];

  if (!Design) {
    notFound();
  }

  return (
    <>
      <Design />
      <IterationSwitcher current={iteration} />
    </>
  );
}
