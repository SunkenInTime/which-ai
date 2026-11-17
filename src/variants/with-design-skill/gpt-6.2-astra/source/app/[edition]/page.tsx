import { notFound } from "next/navigation";
import Landing from "../components/Landing";
import { editions } from "../components/content";

export function generateStaticParams() {
  return editions.map(({ id }) => ({ edition: String(id) }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const design = editions.find(({ id }) => String(id) === edition);
  if (!design) notFound();
  return <Landing edition={design.id} key={design.id} />;
}
