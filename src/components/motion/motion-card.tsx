"use client";

import clsx from "clsx";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ThemeAwareLogo } from "@/components/gallery/theme-aware-logo";
import {
  buildMotionCompareHref,
  buildMotionHref,
  describeMissingRun,
  getMotionModelLogo,
  type MotionClip,
} from "@/lib/motion";

export function MotionCard({ clips }: { clips: MotionClip[] }) {
  const firstFinished = clips.find((clip) => clip.run?.status === "ok") ?? clips[0];
  const [activeKey, setActiveKey] = useState(firstFinished.key);
  const video = useRef<HTMLVideoElement>(null);
  const clip = clips.find((c) => c.key === activeKey) ?? firstFinished;
  const ready = clip.run?.status === "ok";
  const compareTarget = clips.find((c) => c.key !== clip.key && c.run?.status === "ok");
  const logo = getMotionModelLogo(clip.model);
  const cost = clip.run?.usage?.costUsd;

  return (
    <article className="group gallery-card-shell gallery-elevated-surface relative flex flex-col overflow-hidden rounded-lg border bg-[var(--gallery-surface)]">
      <Link
        href={buildMotionHref(clip.group.id, clip.model.id, clip.iteration)}
        className="relative block aspect-video bg-black"
        onMouseEnter={() => video.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (!video.current) return;
          video.current.pause();
          video.current.currentTime = 0;
        }}
        aria-label={`${clip.model.label}, video ${clip.iteration}`}
      >
        {ready ? (
          <video
            key={clip.previewSrc}
            ref={video}
            src={clip.previewSrc}
            poster={clip.posterSrc}
            muted
            loop
            playsInline
            preload="none"
            className="size-full object-contain"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs text-white/50">
            {describeMissingRun(clip.run)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="flex min-w-0 flex-wrap items-center gap-2 text-lg font-medium tracking-tight text-[var(--gallery-text-primary)]">
            <span>{clip.model.label}</span>
            {logo ? (
              <ThemeAwareLogo
                lightSrc={logo.light}
                darkSrc={logo.dark}
                alt=""
                width={28}
                height={28}
                className="h-[1em] w-auto shrink-0 object-contain"
                aria-hidden
              />
            ) : null}
          </h3>
          {cost != null ? (
            <p title="API cost of the session that made all of this model's videos" className="shrink-0 text-sm tabular-nums text-[var(--gallery-text-tertiary)]">
              <span className="sr-only">Session cost: </span>${cost.toFixed(2)}
            </p>
          ) : null}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <div className="flex min-w-0 flex-wrap gap-1.5" role="group" aria-label={`${clip.model.label} videos`}>
            {clips.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={c.key === clip.key}
                aria-label={`Video ${c.iteration}`}
                onClick={() => setActiveKey(c.key)}
                className={clsx(
                  "inline-flex size-8 items-center justify-center rounded-md border text-xs font-medium tabular-nums leading-none transition-colors",
                  c.key === clip.key
                    ? "border-[var(--gallery-text-primary)] bg-[var(--gallery-text-primary)] text-[var(--gallery-surface)]"
                    : "border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] hover:text-[var(--gallery-text-primary)]",
                  c.key !== clip.key &&
                    (c.run?.status === "ok" ? "text-[var(--gallery-text-secondary)]" : "text-[var(--gallery-text-quaternary)]"),
                )}
              >
                {c.iteration}
              </button>
            ))}
          </div>
          {ready && compareTarget ? (
            <Link
              href={buildMotionCompareHref(clip.key, compareTarget.key)}
              aria-label={`Compare ${clip.model.label} videos`}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] text-[var(--gallery-text-secondary)] transition-colors hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] hover:text-[var(--gallery-text-primary)]"
            >
              <ArrowLeftRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
