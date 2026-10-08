"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { buildMotionCompareHref, type MotionClip } from "@/lib/motion";

const selectClass =
  "mb-3 w-full rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface)] px-3 py-2 text-sm text-[var(--gallery-text-primary)]";

/** Two players on one set of controls so the motion lines up second for second. */
export function MotionCompare({ clips }: { clips: MotionClip[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const pick = (key: string | null, fallback: number) => clips.find((c) => c.key === key) ?? clips[fallback];
  const left = pick(params.get("left"), 0);
  // A missing or unknown right key falls back to any other clip, so the page never compares a video with itself.
  const right = clips.find((c) => c.key === params.get("right")) ?? clips.find((c) => c.key !== left?.key) ?? clips[1];
  const leftVideo = useRef<HTMLVideoElement>(null);
  const rightVideo = useRef<HTMLVideoElement>(null);
  // What the visitor asked for. The players themselves may be paused for a moment while one of them buffers.
  const wantPlaying = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (clips.length < 2) {
    return (
      <p className="mt-6 text-[15px] text-[var(--gallery-text-secondary)]">
        Comparing needs at least two finished videos.
      </p>
    );
  }

  const both = (fn: (video: HTMLVideoElement) => void) =>
    [leftVideo.current, rightVideo.current].forEach((video) => video && fn(video));

  const setWantPlaying = (value: boolean) => {
    wantPlaying.current = value;
    setPlaying(value);
  };

  // Plays both only when both have data, from the same moment. If one stalls, the other waits for it,
  // and when both can go again the one ahead steps back to the one behind.
  const sync = () => {
    const [l, r] = [leftVideo.current, rightVideo.current];
    if (!wantPlaying.current || !l || !r) return;
    const ready = (video: HTMLVideoElement) => video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
    if (!ready(l) || !ready(r)) {
      // Hold the ready one. The other stays in play so it keeps loading; its `canplay` brings us back here.
      both((video) => (ready(video) ? video.pause() : void video.play().catch(() => {})));
      return;
    }
    if (Math.abs(l.currentTime - r.currentTime) > 0.1) {
      const t = Math.min(l.currentTime, r.currentTime);
      // The seek fires `seeked`, which comes back here to play.
      both((video) => {
        video.pause();
        video.currentTime = t;
      });
      return;
    }
    both((video) => void video.play().catch(() => {}));
  };

  const choose = (side: "left" | "right", key: string) => {
    // The other side's player survives the swap, so stop and rewind it too; both start together again from 0.
    both((video) => {
      video.pause();
      video.currentTime = 0;
    });
    setWantPlaying(false);
    setTime(0);
    setDuration(0);
    router.replace(
      buildMotionCompareHref(side === "left" ? key : left.key, side === "right" ? key : right.key),
      { scroll: false },
    );
  };

  const sides = [
    { side: "left", clip: left, ref: leftVideo },
    { side: "right", clip: right, ref: rightVideo },
  ] as const;

  return (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sides.map(({ side, clip, ref }) => (
          <figure key={side}>
            <select
              value={clip.key}
              onChange={(e) => choose(side, e.target.value)}
              className={selectClass}
              aria-label={`${side === "left" ? "Left" : "Right"} video`}
            >
              {clips.map((c) => (
                <option key={c.key} value={c.key}>
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
                onLoadedMetadata={(e) => {
                  const length = e.currentTarget.duration;
                  setDuration((d) => Math.max(d, length));
                }}
                onTimeUpdate={side === "left" ? (e) => setTime(e.currentTarget.currentTime) : undefined}
                onWaiting={sync}
                onCanPlay={sync}
                onSeeked={sync}
                onEnded={() => setWantPlaying(false)}
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
          onClick={() => {
            if (playing) {
              setWantPlaying(false);
              both((v) => v.pause());
            } else {
              setWantPlaying(true);
              sync();
            }
          }}
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
          onChange={(e) => {
            const t = Number(e.target.value);
            setTime(t);
            both((v) => {
              v.currentTime = Math.min(t, v.duration || t);
            });
          }}
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
