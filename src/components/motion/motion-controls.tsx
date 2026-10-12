"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** 0:07 */
export function formatClock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds + 1e-3));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Reads the video's time every frame while it plays; `timeupdate` alone moves the bar in visible jumps. */
export function useVideoClock(
  video: RefObject<HTMLVideoElement | null>,
  running: boolean,
  onTime: (seconds: number) => void,
) {
  useEffect(() => {
    if (!running) return;
    let frame = requestAnimationFrame(function tick() {
      if (video.current) onTime(video.current.currentTime);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [running, video, onTime]);
}

/** The timeline: drag or click to seek, arrow keys step a second (five with Shift). */
export function Scrubber({
  time,
  duration,
  buffered = 0,
  label,
  onSeek,
  onScrubChange,
}: {
  time: number;
  duration: number;
  /** How far the video has loaded past the playhead, drawn behind the progress. */
  buffered?: number;
  label: string;
  onSeek: (seconds: number) => void;
  /** True while a drag is in progress, so the caller can hold playback. */
  onScrubChange?: (scrubbing: boolean) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const timeAt = (clientX: number) => {
    const rect = track.current?.getBoundingClientRect();
    if (!rect?.width) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * duration;
  };
  const percent = (seconds: number) => `${duration ? Math.min(100, (seconds / duration) * 100) : 0}%`;
  const end = () => {
    if (!dragging) return;
    setDragging(false);
    onScrubChange?.(false);
  };

  return (
    <div
      ref={track}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(time)}
      aria-valuetext={`${formatClock(time)} of ${formatClock(duration)}`}
      data-dragging={dragging || undefined}
      className="group/scrub relative flex h-7 min-w-0 flex-1 cursor-pointer touch-none items-center rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]"
      onPointerDown={(e) => {
        if (e.button !== 0 || !duration) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        onScrubChange?.(true);
        onSeek(timeAt(e.clientX));
      }}
      onPointerMove={(e) => {
        if (dragging) onSeek(timeAt(e.clientX));
      }}
      onPointerUp={end}
      onPointerCancel={end}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 5 : 1;
        const next =
          e.key === "ArrowLeft" || e.key === "ArrowDown"
            ? time - step
            : e.key === "ArrowRight" || e.key === "ArrowUp"
              ? time + step
              : e.key === "Home"
                ? 0
                : e.key === "End"
                  ? duration
                  : null;
        if (next === null) return;
        e.preventDefault();
        onSeek(Math.min(duration, Math.max(0, next)));
      }}
    >
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--gallery-text-tertiary)_55%,var(--gallery-text-quaternary))] transition-[height] duration-150 group-hover/scrub:h-1.5 group-data-[dragging]/scrub:h-1.5">
        <div
          className="absolute inset-y-0 left-0 bg-[color-mix(in_oklab,var(--gallery-text-secondary)_50%,var(--gallery-text-tertiary))]"
          style={{ width: percent(Math.max(buffered, time)) }}
        />
        <div className="absolute inset-y-0 left-0 bg-[var(--gallery-accent)]" style={{ width: percent(time) }} />
      </div>
      <div
        className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gallery-accent)] opacity-0 shadow-[var(--gallery-shadow-sm)] transition-opacity duration-150 group-hover/scrub:opacity-100 group-focus-visible/scrub:opacity-100 group-data-[dragging]/scrub:opacity-100"
        style={{ left: percent(time) }}
      />
    </div>
  );
}

/** How far the video has loaded without a gap from the playhead. */
export function bufferedAhead(video: HTMLVideoElement) {
  const ranges = video.buffered;
  for (let i = 0; i < ranges.length; i++) {
    if (ranges.start(i) <= video.currentTime + 0.05 && video.currentTime <= ranges.end(i)) return ranges.end(i);
  }
  return video.currentTime;
}
