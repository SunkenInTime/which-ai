import { Inter, Instrument_Serif } from "next/font/google";
import { APP_NAME, steps, testimonials, logos } from "../lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-accent",
});

const sans = `${inter.className} ${serif.variable}`;
const accent = serif.className;

const glass =
  "rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-xl";

function MiniGraph() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <g stroke="#8B7CFF" strokeOpacity="0.5" strokeWidth="1">
        <line x1="40" y1="30" x2="100" y2="70" />
        <line x1="100" y1="70" x2="160" y2="40" />
        <line x1="100" y1="70" x2="90" y2="120" />
        <line x1="40" y1="30" x2="60" y2="110" />
        <line x1="160" y1="40" x2="150" y2="110" />
        <line x1="60" y1="110" x2="150" y2="110" />
      </g>
      <g>
        <circle cx="100" cy="70" r="6" fill="#7C6CFF" />
        <circle cx="40" cy="30" r="4" fill="#4DE3FF" />
        <circle cx="160" cy="40" r="4" fill="#4DE3FF" />
        <circle cx="90" cy="120" r="4" fill="#FF7AD9" />
        <circle cx="60" cy="110" r="3" fill="#7CFFB2" />
        <circle cx="150" cy="110" r="3" fill="#7CFFB2" />
      </g>
    </svg>
  );
}

function AppMock() {
  const notes = [
    { title: "On the topology of ideas", active: true, dot: "#7C6CFF" },
    { title: "The Memex, revisited", active: false, dot: "#4DE3FF" },
    { title: "Zettelkasten in practice", active: false, dot: "#FF7AD9" },
    { title: "Why folders fail thinkers", active: false, dot: "#7CFFB2" },
    { title: "Distributed cognition", active: false, dot: "#FBBF24" },
  ];
  return (
    <div className="flex h-full overflow-hidden">
      {/* sidebar */}
      <div className="hidden w-[180px] shrink-0 border-r border-white/[0.07] bg-black/20 p-3 sm:block">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-[11px] text-white/40">
          <span>⌕</span> Search notes…
          <span className="ml-auto rounded border border-white/10 px-1 text-[9px]">⌘K</span>
        </div>
        <p className="px-1 pb-2 text-[9px] font-semibold uppercase tracking-widest text-white/30">
          Today
        </p>
        {notes.map((n) => (
          <div
            key={n.title}
            className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
              n.active ? "bg-white/[0.08] text-white" : "text-white/50"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: n.dot }} />
            <span className="truncate">{n.title}</span>
          </div>
        ))}
      </div>
      {/* note */}
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/35">
          zettelkasten · ideas
        </p>
        <p className="mt-1.5 truncate text-[15px] font-semibold text-white">
          On the topology of ideas
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-white/[0.08]" />
          <div className="h-2 w-11/12 rounded-full bg-white/[0.08]" />
          <div className="h-2 w-4/5 rounded-full bg-white/[0.08]" />
          <div className="h-2 w-3/5 rounded-full bg-white/[0.08]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["#memory", "#links", "#graph"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#7C6CFF]/30 bg-[#7C6CFF]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#B8AEFF]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 border-t border-white/[0.07] pt-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-white/30">
            Linked from · 14 notes
          </p>
          <div className="mt-1.5 flex gap-1.5">
            {["The Memex", "Zettelkasten", "Folders"].map((n) => (
              <span
                key={n}
                className="rounded-md bg-white/[0.05] px-2 py-1 text-[10px] text-white/55"
              >
                ← {n}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* graph */}
      <div className="hidden w-[150px] shrink-0 border-l border-white/[0.07] bg-black/10 p-3 md:block">
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/30">
          Graph
        </p>
        <div className="h-[calc(100%-20px)]">
          <MiniGraph />
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  const row = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden py-8">
      <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-white/30">
        Powering second brains at
      </p>
      <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-16">
        {[...row, ...row].map((l, i) => (
          <span key={i} className="text-lg font-semibold tracking-tight text-white/35">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

const bentoData = [
  {
    title: "Graph view",
    body: "Watch your thinking take shape. Zoom from one note to the entire constellation.",
    span: "lg:col-span-2 lg:row-span-2",
    visual: "graph",
  },
  { title: "Backlinks", body: "Nothing gets orphaned. Every connection, both directions.", span: "", visual: "links" },
  { title: "Offline-first", body: "Capture anywhere. Syncs when you're back.", span: "", visual: "sync" },
  { title: "⌘K everything", body: "Search, link, and navigate at the speed of thought.", span: "", visual: "cmd" },
  { title: "Encrypted", body: "AES-256 end-to-end. Your mind stays yours.", span: "", visual: "shield" },
  { title: "Daily notes", body: "A fresh page every morning, on every device.", span: "lg:col-span-2", visual: "spark" },
];

function BentoVisual({ kind }: { kind: string }) {
  const base = "mt-4 flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-black/30";
  if (kind === "graph") {
    return (
      <div className={`${base} min-h-[140px] p-3`}>
        <MiniGraph />
      </div>
    );
  }
  if (kind === "links") {
    return (
      <div className={`${base} flex items-center justify-center gap-3 p-4`}>
        {["Note A", "Note B", "Note C"].map((n, i) => (
          <div key={n} className="flex items-center gap-3">
            <div className="rounded-lg bg-white/[0.06] px-3 py-2 text-[11px] text-white/60">{n}</div>
            {i < 2 && <span className="text-[#7C6CFF]">⟷</span>}
          </div>
        ))}
      </div>
    );
  }
  if (kind === "sync") {
    return (
      <div className={`${base} flex items-center justify-center gap-2 p-4 font-mono text-[11px] text-white/50`}>
        <span className="text-[#7CFFB2]">●</span> synced just now · offline ready
      </div>
    );
  }
  if (kind === "cmd") {
    return (
      <div className={`${base} flex items-center justify-center p-4`}>
        <div className="flex w-full max-w-[220px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-[12px] text-white/50">
          <span>⌘K</span>
          <span className="flex-1">link to…</span>
          <span className="rounded bg-white/10 px-1.5 text-[9px]">↵</span>
        </div>
      </div>
    );
  }
  if (kind === "shield") {
    return (
      <div className={`${base} flex items-center justify-center gap-2 p-4 font-mono text-[11px] text-white/50`}>
        <span className="text-[#4DE3FF]">🔒</span> end-to-end encrypted
      </div>
    );
  }
  return (
    <div className={`${base} flex items-center justify-center p-4`}>
      <p className={`${accent} text-2xl italic text-[#B8AEFF]`}>
        November 6, 2026
      </p>
    </div>
  );
}

export default function IterationFive() {
  return (
    <div className={`${sans} min-h-screen overflow-x-clip bg-[#0A0E1F] text-white antialiased`}>
      {/* aurora background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#7C6CFF]/20 blur-[160px]" />
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#4DE3FF]/10 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#FF7AD9]/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#7C6CFF] to-[#4DE3FF] text-sm text-white shadow-lg shadow-[#7C6CFF]/30">
            ✦
          </span>
          {APP_NAME}
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#features" className="transition-colors hover:text-white">Product</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
          <a href="#" className="transition-colors hover:text-white">Docs</a>
        </nav>
        <a
          href="#"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0A0E1F] transition-transform hover:-translate-y-0.5"
        >
          Get started
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-12 text-center md:pt-16">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition-colors hover:border-white/20"
        >
          <span className="rounded-full bg-gradient-to-r from-[#7C6CFF] to-[#4DE3FF] px-2 py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>
          Synapse Graph 2.0 is here
          <span className="text-white/40">→</span>
        </a>
        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem]">
          The second brain that{" "}
          <em className={`${accent} bg-gradient-to-r from-[#B8AEFF] to-[#4DE3FF] bg-clip-text font-normal italic text-transparent`}>
            thinks in connections
          </em>
          .
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
          {APP_NAME} links every note you take into a living knowledge graph.
          Capture anywhere, connect automatically, recall instantly.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-[#7C6CFF] to-[#4DE3FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7C6CFF]/30 transition-all hover:-translate-y-0.5"
          >
            Start free
          </a>
          <a
            href="#features"
            className={`rounded-full ${glass} px-8 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/[0.09]`}
          >
            See features
          </a>
        </div>

        {/* Hero app visual */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-[#7C6CFF]/25 via-transparent to-[#4DE3FF]/20 blur-2xl" />
          <div className={`${glass} overflow-hidden shadow-2xl shadow-black/50`}>
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <p className="font-mono text-[10px] text-white/30">synapse.app</p>
              <p className="text-[10px] font-medium text-[#7CFFB2]">● synced</p>
            </div>
            <div className="h-[380px] sm:h-[420px]">
              <AppMock />
            </div>
          </div>
          {/* floating chips */}
          <div className="absolute -left-3 top-20 hidden animate-[float-y_6s_ease-in-out_infinite] rounded-xl border border-white/10 bg-[#12172E]/90 px-4 py-2.5 text-xs font-medium text-white/80 shadow-xl backdrop-blur md:block">
            <span className="text-[#B8AEFF]">✦</span> Backlinked ×14
          </div>
          <div className="absolute -right-3 top-1/2 hidden animate-[float-y_7s_ease-in-out_infinite_1.2s] rounded-xl border border-white/10 bg-[#12172E]/90 px-4 py-2.5 text-xs font-medium text-white/80 shadow-xl backdrop-blur md:block">
            <span className="text-[#4DE3FF]">⚡</span> ⌘K → jump anywhere
          </div>
          <div className="absolute -bottom-4 left-10 hidden animate-[float-y_8s_ease-in-out_infinite_0.6s] rounded-xl border border-white/10 bg-[#12172E]/90 px-4 py-2.5 text-xs font-medium text-white/80 shadow-xl backdrop-blur lg:block">
            <span className="text-[#7CFFB2]">✓</span> End-to-end encrypted
          </div>
        </div>
      </section>

      <LogoStrip />

      {/* Bento features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8AEFF]">
          Everything you need
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Notes that work like{" "}
          <em className={`${accent} font-normal italic text-[#B8AEFF]`}>thought</em>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bentoData.map((b) => (
            <div
              key={b.title}
              className={`${glass} group flex flex-col p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] ${b.span}`}
            >
              <h3 className="text-base font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/50">{b.body}</p>
              <BentoVisual kind={b.visual} />
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className={`${glass} p-7`}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#7C6CFF]/30 to-[#4DE3FF]/20 text-sm font-bold text-[#B8AEFF]">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className={`${glass} flex flex-col p-7`}>
              <div className="flex gap-1 text-[#FBBF24]">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-white/75">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/[0.07] pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#7C6CFF]/20 via-[#141033] to-[#4DE3FF]/15 px-8 py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,108,255,0.25),transparent_60%)]" />
          <h2 className="relative mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Build the second brain{" "}
            <em className={`${accent} font-normal italic text-[#B8AEFF]`}>you deserve</em>
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-[15px] leading-7 text-white/55">
            Free forever for personal use. Import your notes in minutes —
            Synapse handles the graph.
          </p>
          <a
            href="#"
            className="relative mt-9 inline-block rounded-full bg-white px-9 py-4 text-sm font-semibold text-[#0A0E1F] shadow-xl transition-all hover:-translate-y-0.5"
          >
            Get started free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[#7C6CFF] to-[#4DE3FF] text-xs text-white">
                ✦
              </span>
              <span className="font-bold">{APP_NAME}</span>
            </div>
            <div className="flex gap-8 text-sm text-white/45">
              <a href="#" className="transition-colors hover:text-white">Product</a>
              <a href="#" className="transition-colors hover:text-white">Pricing</a>
              <a href="#" className="transition-colors hover:text-white">Docs</a>
              <a href="#" className="transition-colors hover:text-white">Privacy</a>
            </div>
            <p className="text-xs text-white/30">© 2026 {APP_NAME}, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
