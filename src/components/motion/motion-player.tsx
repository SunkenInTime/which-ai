"use client";

import clsx from "clsx";
import { LoaderCircle, Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { switcherButtonClass } from "@/components/gallery/variant-header";
import { bufferedAhead, formatClock, Scrubber, useVideoClock } from "@/components/motion/motion-controls";

const hideAfterMs = 2200;

/**
 * A full-window player with the app's own controls in place of the browser's. The bar fades out while the video
 * plays and the pointer rests, and comes back on any movement or key.
 * Keys: Space or K play/pause, ← → a second (Shift for five), M sound, F full screen.
 */
export function MotionPlayer({
  src,
  poster,
  label,
  hasAudio,
}: {
  src: string;
  poster: string;
  label: string;
  hasAudio: boolean;
}) {
  const shell = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | null>(null);
  const overBar = useRef(false);
  // Whether playback should pick up again when a drag on the timeline ends.
  const resumeAfterScrub = useRef<boolean | null>(null);

  useVideoClock(video, playing, setTime);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (!overBar.current && resumeAfterScrub.current === null) setIdle(true);
    }, hideAfterMs);
  }, []);

  const togglePlay = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = video.current;
    if (!v || !hasAudio) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, [hasAudio]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shell.current?.requestFullscreen().catch(() => {});
  }, []);

  const seek = useCallback((seconds: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = seconds;
    setTime(seconds);
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === shell.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.defaultPrevented ||
        e.isComposing ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      // A focused button or link already answers Space and Enter itself.
      const onControl = target?.tagName === "BUTTON" || target?.tagName === "A";
      if ((key === " " && !onControl) || key === "k") togglePlay();
      else if (key === "m") toggleMute();
      else if (key === "f") toggleFullscreen();
      else if ((key === "arrowleft" || key === "arrowright") && target?.getAttribute("role") !== "slider") {
        const v = video.current;
        if (!v) return;
        const step = (e.shiftKey ? 5 : 1) * (key === "arrowleft" ? -1 : 1);
        seek(Math.min(v.duration || 0, Math.max(0, v.currentTime + step)));
      } else return;
      e.preventDefault();
      wake();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [seek, toggleFullscreen, toggleMute, togglePlay, wake]);

  const hidden = playing && idle;

  return (
    <div
      ref={shell}
      className={clsx("relative size-full bg-black", hidden && "cursor-none")}
      onPointerMove={wake}
      onPointerDown={wake}
    >
      <video
        ref={video}
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        onPlay={() => {
          setPlaying(true);
          wake();
        }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onProgress={(e) => setBuffered(bufferedAhead(e.currentTarget))}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        className="size-full object-contain"
      />

      {waiting && playing ? (
        <LoaderCircle
          className="pointer-events-none absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 animate-spin text-white/70"
          aria-hidden
        />
      ) : null}

      <div
        className={clsx(
          "absolute inset-x-0 bottom-0 flex justify-center px-5 pb-5 transition-opacity duration-300 focus-within:opacity-100 sm:px-6 sm:pb-6",
          hidden ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <div
          role="group"
          aria-label="Video controls"
          className="gallery-elevated-surface flex w-full max-w-[46rem] items-center gap-1 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] p-1 text-[var(--gallery-text-tertiary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px]"
          onPointerEnter={() => (overBar.current = true)}
          onPointerLeave={() => (overBar.current = false)}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            title={playing ? "Pause (K)" : "Play (K)"}
            className={switcherButtonClass}
          >
            {playing ? (
              <Pause className="size-3.5" fill="currentColor" strokeWidth={0} aria-hidden />
            ) : (
              <Play className="size-3.5 translate-x-px" fill="currentColor" strokeWidth={0} aria-hidden />
            )}
          </button>
          <span className="w-[5.75rem] shrink-0 text-center text-[11px] font-medium tabular-nums text-[var(--gallery-text-secondary)]">
            {formatClock(time)} / {formatClock(duration)}
          </span>
          <Scrubber
            time={time}
            duration={duration}
            buffered={buffered}
            label="Seek"
            onSeek={seek}
            onScrubChange={(scrubbing) => {
              const v = video.current;
              if (!v) return;
              if (scrubbing) {
                resumeAfterScrub.current = !v.paused;
                v.pause();
              } else {
                if (resumeAfterScrub.current) void v.play().catch(() => {});
                resumeAfterScrub.current = null;
                wake();
              }
            }}
          />
          <span className="w-2 shrink-0" aria-hidden />
          <button
            type="button"
            onClick={toggleMute}
            disabled={!hasAudio}
            aria-label={!hasAudio ? "This video has no sound" : muted ? "Turn sound on" : "Turn sound off"}
            title={!hasAudio ? "No sound" : muted ? "Sound on (M)" : "Sound off (M)"}
            className={clsx(switcherButtonClass, "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent")}
          >
            {muted || !hasAudio ? (
              <VolumeX className="size-4 opacity-80" aria-hidden />
            ) : (
              <Volume2 className="size-4 opacity-80" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Full screen"}
            title={fullscreen ? "Exit full screen (F)" : "Full screen (F)"}
            className={switcherButtonClass}
          >
            {fullscreen ? (
              <Minimize className="size-4 opacity-80" aria-hidden />
            ) : (
              <Maximize className="size-4 opacity-80" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
