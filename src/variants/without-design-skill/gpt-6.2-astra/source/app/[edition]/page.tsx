import { notFound } from "next/navigation";
import Landing from "../components/Landing";
import { editions, type Edition } from "../components/editions";

export function generateStaticParams() {
  return editions.map((edition) => ({ edition: String(edition.id) }));
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ edition: string }>;
}) {
  const { edition } = await params;
  const design = editions.find((entry) => String(entry.id) === edition);
  if (!design) notFound();
  return <Landing key={design.id} edition={design.id as Edition} />;
}
