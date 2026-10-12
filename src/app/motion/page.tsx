import type { Metadata } from "next";
import { GalleryModeSwitcher } from "@/components/gallery/gallery-mode-switcher";
import { GalleryRankingsNav } from "@/components/gallery/gallery-rankings-nav";
import { GenerationPrompt } from "@/components/gallery/generation-prompt";
import { MotionCard } from "@/components/motion/motion-card";
import { getMotionClipsForModel, motionGroups, motionModels } from "@/lib/motion";
import { readMotionPrompt, summarizeMotionPrompt } from "@/lib/motion-prompt";

export const metadata: Metadata = {
  title: "Motion · Which AI Made This?",
  description: "The same 15-second motion-video prompt, given to each model in its lab's own coding agent.",
};

export default function MotionPage() {
  // Every group gets the same brief, so the prompt sits in the header like the homepage's.
  const prompt = readMotionPrompt(motionGroups[0].id);

  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-[98rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-4">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
            Which AI Made This Video?
          </h1>
          {prompt ? <GenerationPrompt prompt={prompt} summary={summarizeMotionPrompt(prompt)} /> : null}
        </header>

        <div className="mt-12 space-y-12">
          {motionGroups.map((group, index) => (
            <section key={group.id} aria-labelledby={`motion-${group.id}`} className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  id={`motion-${group.id}`}
                  className="text-xl font-medium tracking-tight text-[var(--gallery-text-primary)]"
                >
                  {group.label}
                </h2>
                {index === 0 ? <GalleryModeSwitcher active="motion" /> : null}
              </div>
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {motionModels.map((model) => (
                  <MotionCard key={model.id} clips={getMotionClipsForModel(group, model)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
