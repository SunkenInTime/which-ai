import { Capture } from "./capture";

const copy = {
  one: {
    eyebrow: "Cortex",
    headline: "A place to think out loud.",
    sub: "Notes that connect themselves while you write.",
    cta: "Start writing",
  },
};

export function Landing({ variant }: { variant: "one" }) {
  const c = copy[variant];
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        {c.eyebrow}
      </p>
      <h1 className="mt-4 max-w-[18ch] text-5xl font-semibold tracking-tighter text-zinc-950">
        {c.headline}
      </h1>
      <p className="mt-4 max-w-[40ch] text-lg text-zinc-600">{c.sub}</p>
      <div className="mt-8 max-w-md">
        <Capture />
      </div>
      <a
        href="#"
        className="mt-8 inline-flex w-fit items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-[0.98]"
      >
        {c.cta}
      </a>
    </main>
  );
}
