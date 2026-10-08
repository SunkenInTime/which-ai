import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionSwitcher } from "@/components/motion/motion-switcher";
import {
  buildMotionCompareHref,
  buildMotionHref,
  describeMissingRun,
  getMotionClip,
  getMotionClipsForModel,
  getMotionModelLogo,
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

type Params = Promise<{ group: string; model: string; iteration: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { model: modelId, iteration } = await params;
  const model = motionModels.find((m) => m.id === modelId);
  return { title: model ? `${model.label} · video ${iteration} · Motion` : "Motion" };
}

export default async function MotionRunPage({ params }: { params: Params }) {
  const { group: groupId, model: modelId, iteration } = await params;
  const group = motionGroups.find((g) => g.id === groupId);
  const model = motionModels.find((m) => m.id === modelId);
  const n = Number(iteration);
  if (!group || !model || !MOTION_ITERATIONS.includes(n)) notFound();

  const clip = getMotionClip(group, model, n);
  const ready = clip.run?.status === "ok";
  const finished = (c: { run: { status: string } | null }) => c.run?.status === "ok";

  const models = motionModels.map((m) => {
    const target = getMotionClip(group, m, n);
    return {
      id: m.id,
      label: m.label,
      logo: getMotionModelLogo(m),
      // Switching models keeps the try number, like the gallery keeps the iteration.
      href: finished(target) || m.id === model.id ? buildMotionHref(group.id, m.id, n) : null,
    };
  });
  const compares = ready
    ? [
        ...motionModels
          .filter((m) => m.id !== model.id)
          .map((m) => {
            const target = getMotionClip(group, m, n);
            return {
              id: target.key,
              label: `${m.label} · video ${n}`,
              logo: getMotionModelLogo(m),
              href: finished(target) ? buildMotionCompareHref(clip.key, target.key) : null,
            };
          }),
        ...getMotionClipsForModel(group, model)
          .filter((c) => c.iteration !== n)
          .map((c) => ({
            id: c.key,
            label: `${model.label} · video ${c.iteration}`,
            logo: getMotionModelLogo(model),
            href: finished(c) ? buildMotionCompareHref(clip.key, c.key) : null,
          })),
      ]
    : [];

  return (
    <main className="fixed inset-0 bg-black">
      <MotionSwitcher
        modelId={model.id}
        modelLabel={model.label}
        logo={getMotionModelLogo(model)}
        iteration={n}
        iterations={getMotionClipsForModel(group, model).map((c) => ({
          n: c.iteration,
          href: buildMotionHref(group.id, model.id, c.iteration),
          hasVideo: finished(c),
        }))}
        models={models}
        compares={compares}
      />
      {ready ? (
        <video
          key={clip.videoSrc}
          src={clip.videoSrc}
          poster={clip.posterSrc}
          aria-label={`${model.label}, video ${n}`}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="size-full object-contain"
        />
      ) : (
        <div className="grid size-full place-items-center text-sm text-white/50">{describeMissingRun(clip.run)}</div>
      )}
    </main>
  );
}
