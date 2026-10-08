import motionConfig from "@/lib/motion-config.json";
import motionRuns from "@/lib/motion-runs.json";

export type MotionModel = (typeof motionConfig.models)[number];
export type MotionHarness = (typeof motionConfig.harnesses)[number];
export type MotionGroup = (typeof motionConfig.groups)[number];
export type MotionRunStatus = "ok" | "no-video" | "failed";

export interface MotionRun {
  /** "runner" for headless sessions with isolated homes, "manual" for runs made by hand in an agent thread. */
  source?: "runner" | "manual";
  harnessVersion: string | null;
  modelArg: string;
  startedAt: string;
  /** Agent session time only; the render is timed separately. Null when a manual run didn't record it. */
  wallSeconds: number | null;
  timedOut: boolean;
  status: MotionRunStatus;
  failure?: string;
  video: {
    durationSec: number;
    width: number | null;
    height: number | null;
    fps: number | null;
  } | null;
  render?: { renderSeconds: number; workers: number; gl: string; renderer: string | null } | null;
  usage: { costUsd?: number | null; turns?: number | null } | null;
}

export interface MotionClip {
  key: string;
  group: MotionGroup;
  model: MotionModel;
  harness: MotionHarness;
  iteration: number;
  run: MotionRun | null;
  videoSrc: string;
  /** Small silent clip for hover playback on cards. */
  previewSrc: string;
  posterSrc: string;
}

/**
 * Videos and posters are served from the whichai-motion R2 bucket; `npm run motion:upload` fills it from
 * public/motion. Local dev reads public/motion directly. Set this to point either somewhere else.
 */
const VIDEO_BASE_URL = (
  process.env.NEXT_PUBLIC_MOTION_VIDEO_BASE_URL ??
  (process.env.NODE_ENV === "development" ? "/motion" : "https://media.whichai.dev")
).replace(/\/$/, "");

const runs = motionRuns as Record<string, MotionRun>;

export const MOTION_ITERATIONS = Array.from({ length: motionConfig.iterations }, (_, i) => i + 1);
export const motionGroups = motionConfig.groups;
/** Only models with at least one recorded run get a card and pages; the config can list models not run yet. */
export const motionModels = motionConfig.models.filter((model) =>
  Object.keys(runs).some((key) => key.split("/")[1] === model.id),
);

const LAB_LOGOS: Record<string, { light: string; dark?: string }> = {
  Anthropic: { light: "/anthropic-claude.webp" },
  OpenAI: { light: "/openai-gpt.svg", dark: "/openai-gpt-dark.svg" },
  xAI: { light: "/xai-light.svg", dark: "/xai-dark.svg" },
};

export function getMotionModelLogo(model: MotionModel) {
  return LAB_LOGOS[model.lab] ?? null;
}

export function getMotionHarness(model: MotionModel): MotionHarness {
  const harness = motionConfig.harnesses.find((h) => h.id === model.harness);
  if (!harness) throw new Error(`Unknown motion harness ${model.harness}`);
  return harness;
}

export function getMotionClip(group: MotionGroup, model: MotionModel, iteration: number): MotionClip {
  const key = `${group.id}/${model.id}/${iteration}`;
  const run = runs[key] ?? null;
  // A re-run overwrites the same object, so the run's start time busts long-lived CDN caches.
  const version = run ? `?v=${Date.parse(run.startedAt)}` : "";
  return {
    key,
    group,
    model,
    harness: getMotionHarness(model),
    iteration,
    run,
    videoSrc: `${VIDEO_BASE_URL}/${key}.mp4${version}`,
    previewSrc: `${VIDEO_BASE_URL}/${key}.preview.mp4${version}`,
    posterSrc: `${VIDEO_BASE_URL}/${key}.jpg${version}`,
  };
}

export function getMotionClipsForModel(group: MotionGroup, model: MotionModel): MotionClip[] {
  return MOTION_ITERATIONS.map((n) => getMotionClip(group, model, n));
}

export function getFinishedMotionClips(): MotionClip[] {
  return motionGroups.flatMap((group) =>
    motionModels.flatMap((model) =>
      getMotionClipsForModel(group, model).filter((clip) => clip.run?.status === "ok"),
    ),
  );
}

export function buildMotionHref(groupId: string, modelId: string, iteration: number) {
  return `/motion/${groupId}/${modelId}/${iteration}`;
}

export function buildMotionCompareHref(left: string, right: string) {
  return `/motion/compare?${new URLSearchParams({ left, right })}`;
}

export function formatMotionSeconds(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = Math.round(total % 60);
  return minutes ? `${minutes}m ${seconds.toString().padStart(2, "0")}s` : `${seconds}s`;
}

export function describeMissingRun(run: MotionRun | null) {
  if (!run) return "Not generated yet";
  if (run.status === "no-video") return "Finished without a video";
  return run.timedOut ? "Timed out" : "Run failed";
}
