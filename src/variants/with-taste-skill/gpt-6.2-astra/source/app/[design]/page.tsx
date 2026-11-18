import { notFound } from "next/navigation";
import Landing from "../components/Landing";
import { designs, type Design } from "../components/content";

export function generateStaticParams() {
  return designs.map((_, i) => ({ design: String(i + 1) }));
}
export const dynamicParams = false;

type DesignPageProps = { params: Promise<{ design: string }> };

export async function generateMetadata({ params }: DesignPageProps) {
  const { design } = await params;
  const edition = designs[Number(design) - 1];
  return { title: edition ? `Foliohm — ${edition.name}` : "Foliohm" };
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { design } = await params;
  if (!/^[1-5]$/.test(design)) notFound();
  return <Landing design={Number(design) as Design} />;
}
