import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage, isVariant, variantMeta } from "@/variants/with-taste-skill/swe-2.1/source/app/components/landing";

export function generateStaticParams() {
  return [{ variant: "1" }, { variant: "2" }, { variant: "3" }, { variant: "4" }, { variant: "5" }];
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  if (!isVariant(variant)) return {};
  const meta = variantMeta[variant];
  return {
    title: `Notomind ${variant}: ${meta.short}`,
    description: meta.description,
    openGraph: {
      title: `Notomind ${variant}: ${meta.short}`,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!isVariant(variant)) notFound();
  return <LandingPage variant={variant} />;
}
