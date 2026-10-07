import { notFound } from "next/navigation";
import { LandingPage } from "../components/landing-pages";
export function generateStaticParams() {
  return [1, 2, 3, 4, 5].map((iteration) => ({ iteration: String(iteration) }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ iteration: string }>;
}) {
  const { iteration } = await params;
  if (!/^[1-5]$/.test(iteration)) notFound();
  return <LandingPage variant={Number(iteration)} />;
}
