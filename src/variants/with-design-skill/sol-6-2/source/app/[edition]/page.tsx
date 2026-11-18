import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage, editions } from "../landing";

export function generateStaticParams() {
  return editions.map(({ id }) => ({ edition: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  const { edition } = await params;
  const design = editions.find(({ id }) => id === edition);
  if (!design) notFound();
  return { title: `Morrow — ${design.name}` };
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const design = editions.find(({ id }) => id === edition);
  if (!design) notFound();
  return <LandingPage key={design.id} design={design} />;
}
