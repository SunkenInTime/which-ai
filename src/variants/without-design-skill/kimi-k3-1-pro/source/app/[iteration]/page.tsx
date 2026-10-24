import { notFound } from "next/navigation";
import { LandingProvider } from "../_components/interactions";
import { IterationOne } from "../_components/iteration-one";
import { IterationTwo } from "../_components/iteration-two";
import { IterationThree } from "../_components/iteration-three";
import { IterationFour } from "../_components/iteration-four";
import { IterationFive } from "../_components/iteration-five";

const iterations = [IterationOne, IterationTwo, IterationThree, IterationFour, IterationFive];

export function generateStaticParams() {
  return iterations.map((_, index) => ({ iteration: String(index + 1) }));
}

export default async function IterationPage({ params }: { params: Promise<{ iteration: string }> }) {
  const { iteration } = await params;
  const index = Number(iteration) - 1;
  const Design = iterations[index];
  if (!Design || !/^[1-5]$/.test(iteration)) notFound();

  return (
    <LandingProvider>
      <Design />

    </LandingProvider>
  );
}
