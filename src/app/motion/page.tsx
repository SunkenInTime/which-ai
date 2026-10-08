import type { Metadata } from "next";
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
  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-[98rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-4">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
            Which AI Made This Video?
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--gallery-text-secondary)]">
            Each model gets the same prompt in its lab&apos;s own coding agent and builds a 15-second piece as a web
            page. Every page is then rendered to video the same way, so the motion is the model&apos;s and not its
            tooling&apos;s. Every video comes from a fresh session with no skills. Hover a card to play it.
          </p>
        </header>

        {motionGroups.map((group) => {
          const prompt = readMotionPrompt(group.id);
          return (
            <section key={group.id} aria-labelledby={`motion-${group.id}`} className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <h2
                  id={`motion-${group.id}`}
                  className="text-xl font-medium tracking-tight text-[var(--gallery-text-primary)]"
                >
                  {group.label}
                </h2>
                <p className="max-w-xl text-sm text-[var(--gallery-text-tertiary)]">{group.description}</p>
              </div>
              {prompt ? <GenerationPrompt prompt={prompt} summary={summarizeMotionPrompt(prompt)} /> : null}
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {motionModels.map((model) => (
                  <MotionCard key={model.id} clips={getMotionClipsForModel(group, model)} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
