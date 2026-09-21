import Link from "next/link";
import { Coffee, Github } from "lucide-react";
import { GalleryRankingsNav } from "@/components/gallery/gallery-rankings-nav";
import { GalleryHomeGroups } from "@/components/gallery/gallery-home-groups";
import { GenerationPrompt } from "@/components/gallery/generation-prompt";
import {
  ANTHROPIC_FRONTEND_DESIGN_SKILL_URL,
} from "@/lib/gallery-anthropic-skill";
import { galleryManifest } from "@/lib/gallery-manifest";
import { sortGalleryEntriesForHome } from "@/lib/gallery-model-order";
import { getGalleryReferenceTime } from "@/lib/gallery-recency";

/** Re-render daily so new-arrival badges expire on schedule without a redeploy. */
export const revalidate = 86400;

export default function HomePage() {
  // One reference clock for both the sort and the card badges.
  const now = getGalleryReferenceTime();
  const groups = [
    "with-design-skill",
    "with-taste-skill",
    "with-ui-sh-skill",
    "without-design-skill",
    "miscellaneous",
  ] as const;
  const generationPrompt =
    "I want you to design the landing page for a note-taking application as essentially a second brain. You should design five iterations and each of them should be accessible within the slash one, slash two, slash three like pages directory. And then you should add a little button that lets me switch between them easily.";

  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-[98rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-4">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
            Which AI Made This?
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--gallery-text-secondary)]">
            A comparison of how different AI models approach UI design, with and without{" "}
            <Link
              href={ANTHROPIC_FRONTEND_DESIGN_SKILL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--gallery-text-primary)] underline decoration-[var(--gallery-divider-strong)] underline-offset-2 transition-colors hover:text-[var(--gallery-accent)] hover:decoration-[var(--gallery-accent)]"
            >
              Anthropic&apos;s frontend design skill
            </Link>{" "}
            enabled.
          </p>
          <GenerationPrompt prompt={generationPrompt} />
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--gallery-text-tertiary)]">
            <Link
              href="https://github.com/sunkenintime"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--gallery-text-primary)]"
            >
              <Github className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              <span>Dara A.</span>
            </Link>
            <Link
              href="https://x.com/daradoescode"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--gallery-text-primary)]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 fill-current opacity-70"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.493h2.039L6.486 3.238H4.298z" />
              </svg>
              <span>@daradoescode</span>
            </Link>
            <Link
              href="https://www.buymeacoffee.com/daradoescode"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--gallery-text-primary)]"
            >
              <Coffee className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              <span>Fund more generations</span>
            </Link>
          </div>
        </header>

        <GalleryHomeGroups
          groups={groups.map((group) => ({
            group,
            entries: sortGalleryEntriesForHome(
              galleryManifest.filter((entry) => entry.group === group),
              { now },
            ),
          }))}
          referenceTime={now}
        />

        <section
          aria-labelledby="sponsors-heading"
          className="mt-16 border-t border-[var(--gallery-divider)] pt-8 sm:mt-20 sm:pt-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--gallery-text-quaternary)]">
              Project support
            </p>
            <h2
              id="sponsors-heading"
              className="mt-2 text-xl font-medium tracking-tight text-[var(--gallery-text-primary)]"
            >
              Sponsors
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--gallery-text-tertiary)]">
              These open-source programs help cover the code review and model usage behind
              WhichAI.dev.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-stretch gap-3">
            <a
              href="https://www.greptile.com/?utm_source=oss_badge&utm_medium=website&utm_campaign=greptile_for_open_source"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-28 min-w-64 flex-1 flex-col items-start justify-center gap-3 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-surface)] px-5 py-4 transition-colors hover:border-[var(--gallery-divider-strong)] sm:max-w-sm"
            >
              {/* Greptile publishes this animated OSS badge for project attribution. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.greptile.com/badge.svg"
                alt="Greptile: The War on Bugs"
                className="h-auto w-full max-w-[300px] shrink-0"
              />
              <span className="text-sm leading-snug text-[var(--gallery-text-tertiary)]">
                Open Source Program
              </span>
            </a>

            <a
              href="https://openai.com/form/codex-for-oss/"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-20 min-w-64 flex-1 items-center gap-4 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-surface)] px-5 py-4 transition-colors hover:border-[var(--gallery-divider-strong)] sm:max-w-sm"
            >
              <span className="text-lg font-semibold tracking-[-0.03em] text-[var(--gallery-text-primary)]">
                OpenAI
              </span>
              <span className="text-sm leading-snug text-[var(--gallery-text-tertiary)]">
                Codex for Open Source
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
