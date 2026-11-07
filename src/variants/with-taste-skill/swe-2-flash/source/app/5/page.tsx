import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/variants/with-taste-skill/swe-2-flash/source/components/Reveal";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpen,
  Command,
  LinkSimple,
  MagnifyingGlass,
  Microphone,
  Planet,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";

const LINE = "#1c2333";
const CYAN = "#38e1ff";
const AMBER = "#ffb454";

function Wordmark() {
  return (
    <Link href="/with-taste-skill/swe-2-flash/5" className="flex items-center gap-2.5">
      <span className="relative grid size-7 place-items-center">
        <Planet size={26} style={{ color: CYAN }} weight="fill" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
        Palimpsest
      </span>
    </Link>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#1c2333] bg-[#0d1119]/80 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function EditorCell() {
  return (
    <Panel className="flex h-full flex-col p-5">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-zinc-700" />
        <span className="size-2 rounded-full bg-zinc-700" />
        <span className="size-2 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-[10px] text-zinc-400">
          attention.md
        </span>
      </div>
      <div className="mt-4 space-y-2.5 font-mono text-[11px] leading-relaxed">
        <p className="text-zinc-400"># Attention is a muscle</p>
        <p className="text-zinc-300">
          Attention is trainable{" "}
          <span
            className="rounded px-1"
            style={{ backgroundColor: "rgba(56,225,255,0.14)", color: CYAN }}
          >
            [[deep-work]]
          </span>{" "}
          argues the case with{" "}
          <span
            className="rounded px-1"
            style={{ backgroundColor: "rgba(56,225,255,0.14)", color: CYAN }}
          >
            [[flow-state]]
          </span>{" "}
          data.
        </p>
        <p className="text-zinc-400">- see also: spaced recall</p>
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4">
        <LinkSimple size={13} style={{ color: CYAN }} />
        <span className="font-mono text-[10px] text-zinc-400">
          4 backlinks, last touched 2d ago
        </span>
      </div>
    </Panel>
  );
}

function GraphCell() {
  const nodes: { x: number; y: number; label: string; hot?: boolean }[] = [
    { x: 50, y: 46, label: "Attention", hot: true },
    { x: 22, y: 22, label: "Deep work" },
    { x: 76, y: 18, label: "Flow" },
    { x: 18, y: 72, label: "Recall" },
    { x: 70, y: 66, label: "Reading" },
    { x: 44, y: 88, label: "Thesis" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <Panel className="relative h-full min-h-[280px] overflow-hidden bg-gradient-to-br from-[#0d1119] via-[#0d1119] to-[#0c1626]">
      <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
        knowledge.graph
      </div>
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={nodes[a].hot || nodes[b].hot ? CYAN : "#2a3550"}
            strokeOpacity={nodes[a].hot || nodes[b].hot ? 0.5 : 0.7}
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className="whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px]"
            style={
              n.hot
                ? {
                    borderColor: "rgba(56,225,255,0.5)",
                    backgroundColor: "rgba(56,225,255,0.12)",
                    color: CYAN,
                    boxShadow: "0 0 24px rgba(56,225,255,0.25)",
                  }
                : {
                    borderColor: LINE,
                    backgroundColor: "rgba(13,17,25,0.9)",
                    color: "#a1a1aa",
                  }
            }
          >
            {n.label}
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-5 font-mono text-[10px] text-zinc-400">
        1,284 nodes · 9,412 edges
      </div>
    </Panel>
  );
}

function SearchCell() {
  return (
    <Panel className="flex h-full flex-col p-5">
      <div className="flex items-center gap-2 rounded-lg border border-[#2a3550] bg-[#080b12] px-3 py-2.5">
        <MagnifyingGlass size={14} className="text-zinc-400" />
        <span className="font-mono text-[11px] text-zinc-300">
          notes about attention
        </span>
        <span className="ml-auto rounded border border-[#2a3550] px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
          ⌘K
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { t: "Attention is a muscle", m: "note · 2h ago", hot: true },
          { t: "Deep work, ch. 4 highlights", m: "book · 1d ago" },
          { t: "Voice memo: shower thoughts", m: "audio · 3d ago" },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center justify-between rounded-lg border border-[#1c2333] px-3 py-2.5"
            style={r.hot ? { borderColor: "rgba(56,225,255,0.35)" } : undefined}
          >
            <span className="text-[12px] font-medium text-zinc-200">{r.t}</span>
            <span className="font-mono text-[9px] text-zinc-400">{r.m}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function StatsCell() {
  const stats = [
    { k: "12,483", v: "notes indexed" },
    { k: "84,201", v: "links resolved" },
    { k: "97.2%", v: "search precision" },
  ];
  return (
    <Panel className="flex h-full flex-col justify-between p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
        corpus.telemetry
      </p>
      <div className="mt-4 space-y-4">
        {stats.map((s) => (
          <div key={s.v} className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-2xl font-semibold text-zinc-100">
              {s.k}
            </span>
            <span className="text-right text-[11px] text-zinc-400">{s.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#1c2333]">
        <div
          className="h-full rounded-full"
          style={{
            width: "78%",
            background: `linear-gradient(90deg, ${CYAN}, ${AMBER})`,
          }}
        />
      </div>
    </Panel>
  );
}

function CaptureCell() {
  return (
    <Panel className="flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <Microphone size={16} style={{ color: AMBER }} weight="fill" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
          voice.capture
        </span>
      </div>
      <div className="mt-4 flex h-16 items-end gap-1">
        {[40, 70, 55, 90, 35, 65, 80, 50, 95, 60, 45, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i % 3 === 0 ? AMBER : "#2a3550",
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">
        Speak a thought, get a transcribed note with links already resolved.
      </p>
    </Panel>
  );
}

const rows = [
  {
    icon: BookOpen,
    title: "Imports without the ceremony",
    body: "Bring notes from Notion, Apple Notes, Obsidian, and plain text. Palimpsest rebuilds your links on import.",
  },
  {
    icon: Command,
    title: "Everything one keystroke away",
    body: "A command palette that searches notes, actions, and settings. Never reach for the mouse.",
  },
  {
    icon: ArrowSquareOut,
    title: "Publish the good parts",
    body: "Turn any note cluster into a public page with one toggle. Your thinking, shareable.",
  },
];

export default function IterationFive() {
  return (
    <div className="relative flex-1 overflow-x-clip bg-[#080b12] font-sans text-zinc-100">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="aurora-blob absolute -top-40 left-[10%] size-[560px] rounded-full opacity-[0.16] blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${CYAN} 0%, transparent 65%)`,
            animation: "gallery-with-taste-skill-swe-2-flash-source-app-globals-drift 14s ease-in-out infinite",
          }}
        />
        <div
          className="aurora-blob absolute right-[5%] top-[30%] size-[480px] rounded-full opacity-[0.12] blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${AMBER} 0%, transparent 65%)`,
            animation: "gallery-with-taste-skill-swe-2-flash-source-app-globals-drift 18s ease-in-out infinite reverse",
          }}
        />
        <div
          className="aurora-blob absolute bottom-[10%] left-[35%] size-[420px] rounded-full opacity-[0.08] blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${CYAN} 0%, transparent 65%)`,
            animation: "gallery-with-taste-skill-swe-2-flash-source-app-globals-drift 22s ease-in-out infinite",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-7 font-mono text-[12px] text-zinc-400 md:flex">
          <a href="#system" className="transition-colors hover:text-zinc-100">
            System
          </a>
          <a href="#features" className="transition-colors hover:text-zinc-100">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-zinc-100">
            Pricing
          </a>
        </nav>
        <a
          href="#pricing"
          className="rounded-lg border border-[#2a3550] bg-[#0d1119] px-4 py-2 font-mono text-[12px] text-zinc-200 transition-colors hover:border-[#38e1ff]/50"
        >
          Start free
        </a>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-14 md:grid-cols-[1.05fr_1fr] md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: CYAN }}>
              Palimpsest OS
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-tight md:text-[56px]">
              A second brain with{" "}
              <span style={{ color: CYAN }}>a pulse.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Notes, links, and search wired into one local-first system. Your
              ideas connect while you write.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#080b12] transition-transform active:scale-[0.98]"
                style={{ backgroundColor: CYAN }}
              >
                Start free
                <ArrowRight size={15} weight="bold" />
              </a>
              <a
                href="#system"
                className="inline-flex items-center gap-2 rounded-lg border border-[#2a3550] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500"
              >
                Tour the system
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} y={32}>
            <Panel className="p-5">
              <div className="flex items-center gap-2 rounded-lg border border-[#2a3550] bg-[#080b12] px-3 py-2.5">
                <Command size={14} className="text-zinc-400" />
                <span className="font-mono text-[11px] text-zinc-400">
                  jump to note, action, or setting
                </span>
                <span className="ml-auto rounded border border-[#2a3550] px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                  ⌘K
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { t: "attention.md", m: "note", hot: true },
                  { t: "Publish essay cluster", m: "action" },
                  { t: "Toggle graph sync", m: "setting" },
                  { t: "reading-list.q4", m: "note" },
                ].map((r) => (
                  <div
                    key={r.t}
                    className="flex items-center justify-between rounded-lg border border-[#1c2333] px-3 py-2.5"
                  >
                    <span
                      className="font-mono text-[11px]"
                      style={r.hot ? { color: CYAN } : { color: "#d4d4d8" }}
                    >
                      {r.t}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-400">
                      {r.m}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </section>

        <section id="system" className="mx-auto max-w-6xl px-6 pb-28">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              One system. Every surface of your thinking.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            <Reveal className="md:col-span-4 md:row-span-2">
              <EditorCell />
            </Reveal>
            <Reveal delay={0.05} className="md:col-span-2">
              <SearchCell />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-2">
              <StatsCell />
            </Reveal>
            <Reveal delay={0.15} className="h-full md:col-span-3">
              <GraphCell />
            </Reveal>
            <Reveal delay={0.2} className="h-full md:col-span-3">
              <CaptureCell />
            </Reveal>
          </div>
        </section>

        <section id="features" className="border-t border-[#1c2333]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.3fr] md:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Serious machinery,
                <br />
                zero ceremony.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-zinc-400">
                The graph engine, sync layer, and search index run quietly
                underneath. You just write.
              </p>
            </Reveal>
            <div>
              {rows.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.06}>
                  <div
                    className={`flex gap-5 py-6 ${i > 0 ? "border-t border-[#1c2333]" : ""}`}
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#2a3550] bg-[#0d1119]">
                      <r.icon size={17} style={{ color: CYAN }} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-zinc-100">
                        {r.title}
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-400">
                        {r.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#1c2333]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <div className="relative aspect-[21/8] overflow-hidden rounded-2xl border border-[#1c2333] bg-[#0d1119]">
                <Image
                  src="https://picsum.photos/seed/palisade-dark-study/1600/620"
                  alt="A dark study desk with a laptop glowing beside stacked notebooks"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
              <p className="mt-3 font-mono text-[11px] text-zinc-400">
                Deep work, documented.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[#1c2333]">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <Reveal>
              <Quotes size={30} style={{ color: CYAN }} weight="fill" />
              <blockquote className="mt-6 max-w-3xl">
                <p className="text-2xl font-medium leading-snug tracking-tight text-zinc-100 md:text-[32px]">
                  “I exported my entire brain to plain text and it was still
                  coherent. That is the first time a notes app has ever made me
                  trust my own archive.”
                </p>
                <footer className="mt-6 font-mono text-[12px] text-zinc-400">
                  D. Okafor, computational linguist
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden border-t border-[#1c2333]">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background: `radial-gradient(ellipse 70% 90% at 50% 110%, rgba(56,225,255,0.12), transparent 60%), radial-gradient(ellipse 50% 70% at 85% -10%, rgba(255,180,84,0.08), transparent 55%)`,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 py-28 text-center md:py-36">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                Your corpus is already
                <br />
                <span style={{ color: CYAN }}>waiting to connect.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
                Free for personal use, forever. Pro adds publishing, graph
                analytics, and team sync for $6 per month.
              </p>
              <a
                href="#"
                className="mt-9 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-semibold text-[#080b12] transition-transform active:scale-[0.98]"
                style={{ backgroundColor: CYAN }}
              >
                Start free
                <ArrowRight size={17} weight="bold" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#1c2333]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <div className="flex items-center gap-7 font-mono text-[11px] text-zinc-400">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Docs
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Status
            </a>
          </div>
          <p className="font-mono text-[11px] text-zinc-400">
            Local-first. Encrypted. Yours.
          </p>
        </div>
      </footer>
    </div>
  );
}
