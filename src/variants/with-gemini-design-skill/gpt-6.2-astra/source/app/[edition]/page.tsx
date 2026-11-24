import { notFound } from "next/navigation";
import Landing from "../ui/Landing";
import { editions } from "../ui/editions";

export const dynamicParams = false;
export function generateStaticParams() {
  return editions.map((_, i) => ({ edition: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  return { title: `Folio · ${editions[Number(edition) - 1]?.name ?? "Notebook"}` };
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  if (!/^[1-5]$/.test(edition)) notFound();
  return <Landing edition={Number(edition)} />;
}
