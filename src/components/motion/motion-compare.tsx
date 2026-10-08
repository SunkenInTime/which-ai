"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildMotionCompareHref, type MotionClip } from "@/lib/motion";

const selectClass =
  "mb-3 w-full rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface)] px-3 py-2 text-sm text-[var(--gallery-text-primary)]";

/** How far apart (seconds) the players may drift before the one ahead is pulled back. */
const MAX_DRIFT = 0.12;

function whenReady(video: HTMLVideoElement) {
  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("error", done, { once: true });
    setTimeout(done, 5_000);
  });
}

/** Two players on one shared clock so the motion lines up second for second. */
export function MotionCompare({ clips }: { clips: MotionClip[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const left = clips.find((c) => c.key === params.get("left")) ?? clips[0];
  // Fall back to the first clip that isn't already on the left, so both sides never match.
  const right =
    clips.find((c) => c.key === params.get("right") && c.key !== left?.key) ??
    clips.find((c) => c.key !== left?.key) ??
    clips[1];
  const leftVideo = useRef<HTMLVideoElement>(null);
  const rightVideo = useRef<HTMLVideoElement>(null);
  const clock = useRef(0);
  // Bumped by pause, clip changes, and unmount, so a "Play both" still waiting on loads can't start later.
  const playRequest = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videos = useCallback(
    () => [leftVideo.current, rightVideo.current].filter((v): v is HTMLVideoElement => v !== null),
    [],
  );

  const measure = useCallback(() => {
    setDuration(Math.max(0, ...videos().map((v) => (Number.isFinite(v.duration) ? v.duration : 0))));
  }, [videos]);

  // Put both players at the shared position. A shorter clip parks on its last frame.
  const seekAll = useCallback(
    (t: number) => {
      clock.current = t;
      setTime(t);
      for (const v of videos()) v.currentTime = Number.isFinite(v.duration) ? Math.min(t, v.duration) : t;
    },
    [videos],
  );

  useEffect(
    () => () => {
      playRequest.current += 1;
    },
    [],
  );

  // While playing, one loop owns the clock: it holds both players while either is buffering,
  // pulls the one ahead back to the one behind, and stops once every clip has ended.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const all = videos();
      const running = all.filter((v) => !v.ended);
      if (!running.length) {
        setPlaying(false);
        return;
      }
      const stalled = running.some((v) => v.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
      for (const v of running) {
        if (stalled && !v.paused) v.pause();
        if (!stalled && v.paused) void v.play().catch(() => {});
      }
      const behind = Math.min(...running.map((v) => v.currentTime));
      for (const v of running) if (v.currentTime - behind > MAX_DRIFT) v.currentTime = behind;
      clock.current = behind;
      setTime(behind);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, videos]);

  if (clips.length < 2) {
    return (
      <p className="mt-6 text-[15px] text-[var(--gallery-text-secondary)]">
        Comparing needs at least two finished videos.
      </p>
    );
  }

  const pause = () => {
    playRequest.current += 1;
    for (const v of videos()) v.pause();
    setPlaying(false);
  };

  const play = async () => {
    const request = ++playRequest.current;
    seekAll(clock.current >= duration - 0.05 ? 0 : clock.current);
    const startable = videos().filter((v) => !v.ended);
    // Neither side gets a head start: wait until both can play from here.
    await Promise.all(startable.map(whenReady));
    if (request !== playRequest.current) return;
    await Promise.all(startable.map((v) => v.play().catch(() => {})));
    if (request !== playRequest.current) {
      for (const v of startable) v.pause();
      return;
    }
    setPlaying(true);
  };

  const choose = (side: "left" | "right", key: string) => {
    if (key === (side === "left" ? left.key : right.key)) return;
    // Only the changed side remounts; stop the other and start both from zero.
    pause();
    seekAll(0);
    router.replace(
      buildMotionCompareHref(side === "left" ? key : left.key, side === "right" ? key : right.key),
      { scroll: false },
    );
  };

  const sides = [
    { side: "left", clip: left, other: right, ref: leftVideo },
    { side: "right", clip: right, other: left, ref: rightVideo },
  ] as const;

  return (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sides.map(({ side, clip, other, ref }) => (
          <figure key={side}>
            <select
              value={clip.key}
              onChange={(e) => choose(side, e.target.value)}
              className={selectClass}
              aria-label={`${side === "left" ? "Left" : "Right"} video`}
            >
              {clips.map((c) => (
                <option key={c.key} value={c.key} disabled={c.key === other.key}>
                  {c.model.label} · video {c.iteration} · {c.group.label}
                </option>
              ))}
            </select>
            <div className="overflow-hidden rounded-lg border border-[var(--gallery-border)] bg-black">
              <video
                key={clip.videoSrc}
                ref={ref}
                src={clip.videoSrc}
                poster={clip.posterSrc}
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={measure}
                className="aspect-video w-full object-contain"
              />
            </div>
            <figcaption className="mt-2 text-xs text-[var(--gallery-text-tertiary)]">
              {clip.model.lab} · {clip.harness.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => (playing ? pause() : void play())}
          className="w-28 rounded-md bg-[var(--gallery-text-primary)] px-4 py-2 text-sm font-medium text-[var(--gallery-surface)]"
        >
          {playing ? "Pause" : "Play both"}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={time}
          onChange={(e) => seekAll(Number(e.target.value))}
          className="flex-1 accent-[var(--gallery-accent)]"
          aria-label="Scrub both videos"
        />
        <span className="w-24 text-right text-xs tabular-nums text-[var(--gallery-text-tertiary)]">
          {time.toFixed(1)}s / {duration.toFixed(1)}s
        </span>
      </div>
    </>
  );
}
