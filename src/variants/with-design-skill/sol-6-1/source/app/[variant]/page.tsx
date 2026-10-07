import { notFound } from "next/navigation";
import Landing from "../components/Landing";
export function generateStaticParams() { return [1, 2, 3, 4, 5].map(variant => ({ variant: String(variant) })); }
export default async function VariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!/^[1-5]$/.test(variant)) notFound();
  return <Landing variant={Number(variant)} />;
}
