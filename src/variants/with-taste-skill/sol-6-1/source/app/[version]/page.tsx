import { notFound } from "next/navigation";
import Landing from "../components/landing";
export function generateStaticParams() { return [1,2,3,4,5].map(version => ({version: String(version)})); }
export default async function Page({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  if (!/^[1-5]$/.test(version)) notFound();
  return <Landing version={Number(version)} />;
}
