import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/variants/with-taste-skill/swe-2-flash/source/components/Reveal";
import {
  ArrowRight,
  ClockCounterClockwise,
  Graph,
  LinkSimple,
  MagnifyingGlass,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const ACCENT = "#6ee7b7";

function Wordmark() {
  return (
    <Link href="/with-taste-skill/swe-2-flash/1" className="flex items-center gap-2.5">
      <span
        className="grid size-6 place-items-center rounded-md text-[13px] font-bold text-zinc-950"
        style={{ backgroundColor: ACCENT }}
      >
        P
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
        Palimpsest
      </span>
    </Link>
  );
}

function NotePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#101014] shadow-[0_32px_80px_-16px_rgb(0_0_0/0.7)]">
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 px-4 py-3">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 text-xs text-zinc-400">
          Second brain - Palimpsest
        </span>
      </div>
      <div className="grid grid-cols-[180px_1fr]">
        <div className="border-r border-zinc-800/80 p-3">
          <div className="mb-3 flex items-center gap-1.5 rounded-md bg-zinc-800/60 px-2 py-1.5 text-[11px] text-zinc-400">
            <MagnifyingGlass size={11} />
            Search everything
          </div>
          <p className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Recent
          </p>
          {[" spaced repetition notes", "essay: attention", "reading list"].map(
            (t, i) => (
              <p
                key={t}
                className={`truncate px-2 py-1 text-[11px] ${i === 0 ? "text-zinc-200" : "text-zinc-400"}`}
              >
                {t}
              </p>
            ),
          )}
          <p className="px-2 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Projects
          </p>
          {[" thesis", "garden"].map((t) => (
            <p key={t} className="truncate px-2 py-1 text-[11px] text-zinc-400">
              {t}
            </p>
          ))}
        </div>
        <div className="p-5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Note
          </p>
          <h3 className="mt-1 text-[15px] font-semibold text-zinc-100">
            Attention is a muscle
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
            Attention is not a fixed resource but a trainable faculty. The notes
            you keep about focus compound like interest.
          </p>
          <div className="mt-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              Linked from
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["deep work essay", "reading list", "thesis"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-700/80 px-2 py-0.5 text-[10px] text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
            <Sparkle size={12} style={{ color: ACCENT }} />
            <p className="text-[11px] text-zinc-400">
              3 notes mention this idea. Resurface weekly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphPreview() {
  const nodes = [
    { x: "8%", y: "12%", label: "Attention", active: true },
    { x: "38%", y: "4%", label: "Deep work" },
    { x: "66%", y: "18%", label: "Reading list" },
    { x: "86%", y: "6%", label: "Thesis" },
    { x: "20%", y: "52%", label: "Spaced recall" },
    { x: "52%", y: "44%", label: "Essay: flow" },
    { x: "80%", y: "58%", label: "Garden" },
    { x: "34%", y: "80%", label: "Attention", active: false },
    { x: "64%", y: "82%", label: "Margins" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 4],
    [0, 7],
    [1, 2],
    [2, 3],
    [2, 5],
    [4, 5],
    [5, 6],
    [6, 8],
    [7, 8],
  ];
  const pos = nodes.map((n) => ({
    x: parseFloat(n.x),
    y: parseFloat(n.y),
  }));
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d10]">
      <svg className="absolute inset-0 size-full" aria-hidden>
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={`${pos[a].x}%`}
            y1={`${pos[a].y}%`}
            x2={`${pos[b].x}%`}
            y2={`${pos[b].y}%`}
            stroke={a === 0 || b === 0 ? ACCENT : "#3f3f46"}
            strokeOpacity={a === 0 || b === 0 ? 0.55 : 0.5}
            strokeWidth="1"
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: n.x, top: n.y }}
        >
          <div
            className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm ${
              n.active
                ? "border-transparent text-zinc-950"
                : "border-zinc-700/80 bg-zinc-900/80 text-zinc-300"
            }`}
            style={n.active ? { backgroundColor: ACCENT } : undefined}
          >
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    icon: LinkSimple,
    title: "Links that maintain themselves",
    body: "Type [[ and Palimpsest suggests notes you have already written. Every connection stays live as your thinking evolves.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Resurfacing, not archiving",
    body: "Notes you have not touched in months return when they become relevant again, so nothing you wrote is ever really lost.",
  },
  {
    icon: MagnifyingGlass,
    title: "Search that understands context",
    body: "Full-text search across notes, highlights, and voice memos, ranked by how connected each result is to the rest of your brain.",
  },
];

const testimonials = [
  {
    quote:
      "I stopped maintaining a filing system. I just write, and the links do the organizing for me.",
    name: "Mara Ellison",
    role: "PhD candidate, uses it daily",
  },
  {
    quote:
      "The graph view showed me a connection between two projects I thought were unrelated. It changed the direction of my work.",
    name: "Tomas Reyes",
    role: "Product designer",
  },
];

export default function IterationOne() {
  return (
    <div className="flex-1 bg-[#09090b] font-sans text-zinc-100">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-zinc-100">
            Features
          </a>
          <a href="#graph" className="transition-colors hover:text-zinc-100">
            Graph
          </a>
          <a href="#pricing" className="transition-colors hover:text-zinc-100">
            Pricing
          </a>
        </nav>
        <a
          href="#pricing"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98]"
        >
          Start free
        </a>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 md:grid-cols-[1.05fr_1fr] md:pb-28 md:pt-20">
          <Reveal>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Your second brain, finally calm.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              Palimpsest turns scattered notes into a linked second brain that
              resurfaces what matters.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98]"
              >
                Start free
                <ArrowRight size={15} weight="bold" />
              </a>
              <a
                href="#graph"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500"
              >
                See the graph
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} y={32}>
            <NotePreview />
          </Reveal>
        </section>

        <section id="features" className="border-t border-zinc-800/70">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:py-28">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Written once.
                <br />
                Connected forever.
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-zinc-400">
                Most note apps wait for you to organize. Palimpsest links every
                idea as you write it.
              </p>
            </Reveal>
            <div>
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div
                    className={`flex gap-5 py-7 ${i > 0 ? "border-t border-zinc-800/70" : ""}`}
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-zinc-800 bg-zinc-900/60">
                      <f.icon size={18} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-zinc-100">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-zinc-400">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800/70">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src="https://picsum.photos/seed/palimpsest-ink-desk/1800/770"
                  alt="A dim desk with an open notebook, pen, and a cup of coffee"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                Where the second brain gets written.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="graph" className="border-t border-zinc-800/70">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <Reveal className="order-2 md:order-1">
              <GraphPreview />
            </Reveal>
            <Reveal className="order-1 md:order-2" delay={0.1}>
              <Graph size={28} style={{ color: ACCENT }} />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                See what your thinking looks like.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
                Every note is a node. Every link is an edge. The graph shows you
                the shape of what you know, and the gaps where it is thin.
              </p>
              <a
                href="#pricing"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: ACCENT }}
              >
                Start free
                <ArrowRight size={14} weight="bold" />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-zinc-800/70">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal>
              <Quotes size={28} style={{ color: ACCENT }} />
              <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
                Researchers, writers, and the chronically curious.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <blockquote className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                    <p className="text-lg leading-relaxed text-zinc-200">
                      “{t.quote}”
                    </p>
                    <footer className="mt-4">
                      <p className="text-sm font-medium text-zinc-100">{t.name}</p>
                      <p className="text-sm text-zinc-400">{t.role}</p>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-zinc-800/70">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_auto] md:items-end md:py-28">
            <Reveal>
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight md:text-5xl">
                Start writing. The brain grows itself.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
                Free forever for personal use. Pro adds graph analytics,
                publishing, and team spaces.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-zinc-800 bg-[#101014] p-6">
                <p className="text-sm text-zinc-400">
                  Free plan, no card required
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  $0
                  <span className="ml-1 text-sm font-normal text-zinc-400">
                    forever
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-transform active:scale-[0.98]"
                >
                  Start free
                  <ArrowRight size={15} weight="bold" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Changelog
            </a>
          </div>
          <p className="text-sm text-zinc-400">
            Palimpsest, written in ink and links.
          </p>
        </div>
      </footer>
    </div>
  );
}
