import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GalleryRankingsNav } from "@/components/gallery/gallery-rankings-nav";
import { MotionCompare } from "@/components/motion/motion-compare";
import { getFinishedMotionClips } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Compare motion · Which AI Made This?",
};

export default function MotionComparePage() {
  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-[98rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-4">
        <Link
          href="/motion"
          className="text-sm text-[var(--gallery-text-tertiary)] transition-colors hover:text-[var(--gallery-text-primary)]"
        >
          ← Motion
        </Link>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)]">
          Compare videos
        </h1>
        <Suspense>
          <MotionCompare clips={getFinishedMotionClips()} />
        </Suspense>
      </main>
    </>
  );
}
