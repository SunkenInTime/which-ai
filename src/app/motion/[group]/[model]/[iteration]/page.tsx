import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryRankingsNav } from "@/components/gallery/gallery-rankings-nav";
import {
  buildMotionCompareHref,
  buildMotionHref,
  describeMissingRun,
  formatMotionSeconds,
  getMotionClip,
  getMotionClipsForModel,
  MOTION_ITERATIONS,
  motionGroups,
  motionModels,
} from "@/lib/motion";

export const dynamicParams = false;

export function generateStaticParams() {
  return motionGroups.flatMap((group) =>
    motionModels.flatMap((model) =>
      MOTION_ITERATIONS.map((n) => ({ group: group.id, model: model.id, iteration: String(n) })),
    ),
  );
}

export default async function MotionRunPage({
  params,
}: {
  params: Promise<{ group: string; model: string; iteration: string }>;
}) {
  const { group: groupId, model: modelId, iteration } = await params;
  const group = motionGroups.find((g) => g.id === groupId);
  const model = motionModels.find((m) => m.id === modelId);
  const n = Number(iteration);
  if (!group || !model || !MOTION_ITERATIONS.includes(n)) notFound();

  const clip = getMotionClip(group, model, n);
  const siblings = getMotionClipsForModel(group, model);
  const run = clip.run;
  const rivals = motionModels.filter((m) => m.id !== model.id);

  return (
    <>
      <GalleryRankingsNav />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Link
          href="/motion"
          className="text-sm text-[var(--gallery-text-tertiary)] transition-colors hover:text-[var(--gallery-text-primary)]"
        >
          ← Motion
        </Link>
        <div className="mt-3 mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[var(--gallery-text-tertiary)]">
              {model.lab} · {clip.harness.label}
              {run ? ` ${run.harnessVersion}` : ""} · {group.label}
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)]">
              {model.label}
            </h1>
          </div>
          <nav className="flex gap-1.5" aria-label="Videos">
            {siblings.map((s) => (
              <Link
                key={s.key}
                href={buildMotionHref(group.id, model.id, s.iteration)}
                aria-current={s.iteration === n ? "page" : undefined}
                className={clsx(
                  "inline-flex size-9 items-center justify-center rounded-md border text-sm font-medium tabular-nums transition-colors",
                  s.iteration === n
                    ? "border-[var(--gallery-text-primary)] bg-[var(--gallery-text-primary)] text-[var(--gallery-surface)]"
                    : "border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] hover:border-[var(--gallery-divider-strong)] hover:text-[var(--gallery-text-primary)]",
                  s.iteration !== n &&
                    (s.run?.status === "ok" ? "text-[var(--gallery-text-secondary)]" : "text-[var(--gallery-text-quaternary)]"),
                )}
              >
                {s.iteration}
              </Link>
            ))}
          </nav>
        </div>

        <div className="overflow-hidden rounded-lg border border-[var(--gallery-border)] bg-black">
          {run?.status === "ok" ? (
            <video
              src={clip.videoSrc}
              poster={clip.posterSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="aspect-video w-full object-contain"
            />
          ) : (
            <div className="grid aspect-video place-items-center text-sm text-white/50">{describeMissingRun(run)}</div>
          )}
        </div>

        {run ? (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
            <MotionStat label="Agent time" value={formatMotionSeconds(run.wallSeconds) + (run.timedOut ? " (timed out)" : "")} />
            <MotionStat label="Video length" value={run.video ? formatMotionSeconds(run.video.durationSec) : "—"} />
            <MotionStat
              label="Resolution"
              value={run.video?.width ? `${run.video.width}×${run.video.height} · ${run.video.fps ?? "?"} fps` : "—"}
            />
            <MotionStat label="Cost" value={run.usage?.costUsd != null ? `$${run.usage.costUsd.toFixed(2)}` : "—"} />
          </dl>
        ) : null}

        {run?.status === "ok" ? (
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[var(--gallery-text-tertiary)]">Compare with</span>
            {rivals.map((m) => (
              <Link
                key={m.id}
                href={buildMotionCompareHref(clip.key, `${group.id}/${m.id}/${n}`)}
                className="rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] px-2.5 py-1 text-[var(--gallery-text-secondary)] transition-colors hover:border-[var(--gallery-divider-strong)] hover:text-[var(--gallery-text-primary)]"
              >
                {m.label}
              </Link>
            ))}
          </div>
        ) : null}
      </main>
    </>
  );
}

function MotionStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[var(--gallery-text-tertiary)]">{label}</dt>
      <dd className="mt-0.5 tabular-nums text-[var(--gallery-text-primary)]">{value}</dd>
    </div>
  );
}
