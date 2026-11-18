import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { editions } from "../editions";
import { Landing, landingMetadata } from "../landing";

export const dynamicParams = false;

export function generateStaticParams() {
  return editions.map(({ id }) => ({ edition: id }));
}

async function getEdition(params: { params: Promise<{ edition: string }> }["params"]) {
  const { edition } = await params;
  const match = editions.find(({ id }) => id === edition);
  if (!match) notFound();
  return match;
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  return landingMetadata(await getEdition(params));
}

export async function generateViewport({ params }: { params: Promise<{ edition: string }> }): Promise<Viewport> {
  return { viewportFit: "cover", themeColor: (await getEdition(params)).theme };
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  return <Landing edition={await getEdition(params)} />;
}
