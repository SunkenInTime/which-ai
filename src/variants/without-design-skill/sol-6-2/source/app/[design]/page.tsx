import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "../components/landing";
import { designs, isDesign } from "../components/designs";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(designs).map((design) => ({ design }));
}

export async function generateMetadata({ params }: { params: Promise<{ design: string }> }): Promise<Metadata> {
  const { design } = await params;

  if (!isDesign(design)) notFound();

  return { title: `Morrow — ${designs[design].title}` };
}

export default async function DesignPage({ params }: { params: Promise<{ design: string }> }) {
  const { design } = await params;

  if (!isDesign(design)) notFound();

  return <Landing design={design} />;
}
