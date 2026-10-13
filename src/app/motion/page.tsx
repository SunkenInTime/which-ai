import type { Metadata } from "next";
import { GalleryPageHeader } from "@/components/gallery/gallery-page-header";
import { GalleryRankingsNav } from "@/components/gallery/gallery-rankings-nav";
import { MotionGalleryGroups } from "@/components/motion/motion-gallery-groups";
import { getMotionClipsForModel, motionGroups, motionModels } from "@/lib/motion";
import { readMotionPrompt, summarizeMotionPrompt } from "@/lib/motion-prompt";

export const metadata: Metadata = {
  title: "Motion · Which AI Made This?",
  description: "The same 15-second motion-video prompt, given to each model in its recorded coding environment.",
};

export default function MotionPage() {
  // Every group gets the same brief, so the prompt sits in the header like the homepage's.
  const prompt = readMotionPrompt(motionGroups[0].id);

  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-[98rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-4">
        <GalleryPageHeader
          title="Which AI Made This Video?"
          description="A comparison of how different AI models approach motion design, with each model's coding environment shown alongside its results."
          prompt={prompt}
          promptSummary={prompt ? summarizeMotionPrompt(prompt) : undefined}
        />

        <MotionGalleryGroups
          groups={motionGroups.map((group) => ({
            group,
            models: motionModels.map((model) => getMotionClipsForModel(group, model)),
          }))}
        />
      </main>
    </>
  );
}
