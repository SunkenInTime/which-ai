import Link from "next/link";
import type { ReactNode } from "react";
import { Coffee, Github } from "lucide-react";
import { GenerationPrompt } from "@/components/gallery/generation-prompt";

/**
 * The header both galleries open with: title, one-line pitch, the prompt, and credits. Frontend and Motion share it
 * so the search row and mode switcher under it sit at the same height on both pages.
 */
export function GalleryPageHeader({
  title,
  description,
  prompt,
  promptSummary,
}: {
  title: string;
  description: ReactNode;
  prompt: string | null;
  promptSummary?: string;
}) {
  return (
    <header className="max-w-2xl">
      <h1 className="text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-[var(--gallery-text-secondary)]">{description}</p>
      {/* Room for four lines of prompt (the frontend prompt's length from sm up) plus its top margin, so Motion's
          shorter brief leaves the search row and mode switcher where the frontend gallery has them. */}
      <div className="flow-root text-[15px] leading-relaxed sm:min-h-[calc(2rem+4lh)]">
        {prompt ? <GenerationPrompt prompt={prompt} summary={promptSummary} /> : null}
      </div>
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
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-current opacity-70">
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
  );
}
