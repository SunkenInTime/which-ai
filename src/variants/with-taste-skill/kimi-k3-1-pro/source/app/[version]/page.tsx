import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionController, VersionSwitcher } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/chrome";
import { VersionOne } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/one";
import { VersionTwo } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/two";
import { VersionThree } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/three";
import { VersionFour } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/four";
import { VersionFive } from "@/variants/with-taste-skill/kimi-k3-1-pro/source/components/landing/versions/five";

const versions = [VersionOne, VersionTwo, VersionThree, VersionFour, VersionFive];

export function generateStaticParams() {
  return versions.map((_, index) => ({ version: String(index + 1) }));
}

export const metadata: Metadata = {
  title: "Morrow — Your second brain",
  description: "Five landing page directions for Morrow, a second brain for connected notes and natural recall.",
};

export default async function LandingPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  const current = Number(version);
  if (!Number.isInteger(current) || current < 1 || current > versions.length) notFound();
  const Version = versions[current - 1];

  return (
    <>
      <MotionController current={current} />
      <Version />
      <VersionSwitcher current={current} />
    </>
  );
}
