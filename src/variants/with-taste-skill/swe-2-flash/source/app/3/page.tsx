import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { Reveal } from "@/variants/with-taste-skill/swe-2-flash/source/components/Reveal";
import {
  ArrowRight,
  BookOpen,
  CloudArrowUp,
  Graph,
  Lightning,
  LinkSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const INK = "#1d1a14";
const PAPER = "#fdf6e9";
const LIME = "#b8f03c";
const ORANGE = "#ff5a1f";

function Wordmark() {
  return (
    <Link
      href="/with-taste-skill/swe-2-flash/3"
      className="inline-flex -rotate-2 items-center gap-2 rounded-2xl border-2 border-[#1d1a14] bg-white px-3.5 py-1.5 shadow-[3px_3px_0_#1d1a14]"
    >
      <span
        className="grid size-6 place-items-center rounded-lg text-sm font-bold text-[#1d1a14]"
        style={{ backgroundColor: LIME }}
      >
        P
      </span>
      <span className="text-[15px] font-bold tracking-tight text-[#1d1a14]">
        Palimpsest
      </span>
    </Link>
  );
}

function StickerNote({
  title,
  body,
  rotate,
  accent,
  className = "",
}: {
  title: string;
  body: string;
  rotate: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border-2 border-[#1d1a14] p-4 shadow-[4px_4px_0_#1d1a14] ${className}`}
      style={{
        backgroundColor: accent ? LIME : "#ffffff",
        transform: `rotate(${rotate})`,
      }}
    >
      <div className="absolute -top-2.5 left-6 h-4 w-14 -rotate-6 rounded-sm bg-[#1d1a14]/10" />
      <p className="text-[13px] font-bold text-[#1d1a14]">{title}</p>
      <p className="mt-1 text-[12px] leading-snug text-[#1d1a14]/70">{body}</p>
    </div>
  );
}

const tiles = [
  {
    icon: LinkSimple,
    title: "Links on autopilot",
    body: "Type [[ and the app hands you every note you've written on it. Connections build themselves.",
    bg: "#1d1a14",
    fg: "#fdf6e9",
    iconColor: LIME,
  },
  {
    icon: Graph,
    title: "Your brain, mapped",
    body: "Watch clusters form as you write. See the gaps where your knowledge is thin.",
    bg: "#ffffff",
    fg: "#1d1a14",
    iconColor: ORANGE,
  },
  {
    icon: MagnifyingGlass,
    title: "Find anything, instantly",
    body: "One search box covers notes, highlights, and voice memos. Results rank by connection.",
    bg: LIME,
    fg: "#1d1a14",
    iconColor: "#1d1a14",
  },
  {
    icon: CloudArrowUp,
    title: "Offline-proof",
    body: "Everything syncs to your device. Write anywhere, even with zero bars.",
    bg: "#ffffff",
    fg: "#1d1a14",
    iconColor: "#1d1a14",
  },
  {
    icon: BookOpen,
    title: "Import everything",
    body: "Bring notes from Apple Notes, Notion, Obsidian, and plain text files in minutes.",
    bg: ORANGE,
    fg: "#1d1a14",
    iconColor: "#1d1a14",
  },
];

const steps = [
  {
    n: "1",
    title: "Dump your thoughts",
    body: "No structure required. Write messy, fragmentary notes exactly as they arrive.",
  },
  {
    n: "2",
    title: "Let it connect",
    body: "Palimpsest links related ideas in the background while you sleep or work.",
  },
  {
    n: "3",
    title: "Watch it resurface",
    body: "Old notes return at the right moment, so what you wrote keeps paying off.",
  },
];

export default function IterationThree() {
  return (
    <div
      className={`${spaceGrotesk.variable} flex-1 font-sans`}
      style={{
        backgroundColor: PAPER,
        color: INK,
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      }}
    >
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#1d1a14]/70 md:flex">
          <a href="#features" className="transition-colors hover:text-[#1d1a14]">
            Features
          </a>
          <a href="#how" className="transition-colors hover:text-[#1d1a14]">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-[#1d1a14]">
            Pricing
          </a>
        </nav>
        <a
          href="#pricing"
          className="rounded-full border-2 border-[#1d1a14] bg-[#1d1a14] px-5 py-2 text-[14px] font-bold text-[#fdf6e9] shadow-[3px_3px_0_rgba(29,26,20,0.25)] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Start free
        </a>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-10 md:grid-cols-[1.15fr_1fr] md:pt-16">
          <Reveal>
            <p className="inline-block -rotate-1 rounded-full border-2 border-[#1d1a14] bg-[#ffffff] px-4 py-1 text-[13px] font-bold shadow-[3px_3px_0_#1d1a14]">
              The note app that links itself
            </p>
            <h1 className="mt-6 text-[12vw] font-bold leading-[0.95] tracking-tight text-[#1d1a14] sm:text-6xl md:text-[64px]">
              Second brain,{" "}
              <span
                className="relative inline-block px-2"
                style={{ backgroundColor: LIME }}
              >
                minus the mess.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-[17px] font-medium leading-relaxed text-[#1d1a14]/70">
              Palimpsest turns scattered notes into a second brain that
              resurfaces ideas exactly when you need them.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1d1a14] bg-[#1d1a14] px-7 py-3.5 text-[15px] font-bold text-[#fdf6e9] shadow-[4px_4px_0_#1d1a14] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Start free
                <ArrowRight size={18} weight="bold" />
              </a>
              <a
                href="#how"
                className="rounded-full border-2 border-dashed border-[#1d1a14]/50 px-7 py-3.5 text-[15px] font-bold text-[#1d1a14] transition-colors hover:border-[#1d1a14]"
              >
                See how it works
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} y={32} className="relative">
            <div className="relative mx-auto max-w-md">
              <StickerNote
                title="Essay ideas"
                body="Attention is trainable. Cite: deep work ch. 4"
                rotate="-4deg"
                className="relative z-10"
              />
              <StickerNote
                title="Books to read"
                body="The Design of Everyday Things, already linked to 3 notes"
                rotate="3deg"
                accent
                className="relative z-20 -mt-8 ml-10"
              />
              <StickerNote
                title="Grocery + ideas"
                body="Reminder: ask about the Lisbon offsite"
                rotate="-2deg"
                className="relative z-30 -mt-8 mr-8 ml-auto w-4/5"
              />
              <div className="relative z-0 -mt-4 ml-16 w-3/5 rotate-2">
                <div className="rounded-2xl border-2 border-[#1d1a14] bg-white p-2 pb-3 shadow-[4px_4px_0_#1d1a14]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e8e0cf]">
                    <Image
                      src="https://picsum.photos/seed/palisade-sticky-notes/800/600"
                      alt="Colorful sticky notes pinned to a wall"
                      fill
                      priority
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold text-[#1d1a14]/75">
                    the wall where ideas live
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="overflow-hidden border-y-2 border-[#1d1a14] bg-[#1d1a14] py-4">
          <div
            className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
            style={{ animation: "gallery-with-taste-skill-swe-2-flash-source-app-globals-marquee 36s linear infinite" }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
                {[
                  "LINKS",
                  "GRAPH",
                  "SEARCH",
                  "OFFLINE",
                  "VOICE NOTES",
                  "PUBLISH",
                ].map((word) => (
                  <span
                    key={word}
                    className="flex items-center gap-8 text-[15px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: PAPER }}
                  >
                    {word}
                    <Lightning size={16} style={{ color: LIME }} weight="fill" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pt-4">
          <Reveal>
            <div className="relative aspect-[21/8] overflow-hidden rounded-3xl border-2 border-[#1d1a14] bg-[#e8e0cf] shadow-[6px_6px_0_#1d1a14]">
              <Image
                src="https://picsum.photos/seed/palisade-desk-flatlay/1600/620"
                alt="A bright desk seen from above with notebooks, pens, and a laptop"
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </div>
            <p className="mt-3 text-center text-[13px] font-bold text-[#1d1a14]/70">
              the desk where the brain gets fed
            </p>
          </Reveal>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight text-[#1d1a14] sm:text-5xl">
              Everything a second brain needs. Nothing it doesn’t.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05} className={i === 4 ? "lg:col-span-2" : ""}>
                <div
                  className="flex h-full flex-col rounded-3xl border-2 border-[#1d1a14] p-6 shadow-[5px_5px_0_#1d1a14]"
                  style={{ backgroundColor: t.bg, color: t.fg }}
                >
                  <div
                    className="grid size-11 place-items-center rounded-2xl border-2 border-[#1d1a14]"
                    style={{
                      backgroundColor:
                        t.bg === "#1d1a14" || t.bg === ORANGE ? "#ffffff" : "#1d1a14",
                    }}
                  >
                    <t.icon size={20} style={{ color: t.iconColor }} weight="bold" />
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[14px] font-medium leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="how" className="border-t-2 border-[#1d1a14] bg-[#ffffff]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight text-[#1d1a14] sm:text-5xl">
                Three steps. Zero filing cabinets.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="relative">
                    <span
                      className="text-[88px] font-bold leading-none tracking-tighter"
                      style={{ color: i === 1 ? LIME : "#1d1a14", WebkitTextStroke: i === 1 ? "2px #1d1a14" : "none" }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-2 text-[20px] font-bold text-[#1d1a14]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-[14px] font-medium leading-relaxed text-[#1d1a14]/65">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="relative mx-auto max-w-3xl -rotate-1 rounded-3xl border-2 border-[#1d1a14] bg-[#ffffff] p-10 text-center shadow-[8px_8px_0_#1d1a14] md:p-14">
              <div className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 -rotate-2 rounded-sm bg-[#1d1a14]/10" />
              <p className="text-[26px] font-bold leading-snug tracking-tight text-[#1d1a14] md:text-[34px]">
                “I dumped three years of notes into it on a Sunday. By Friday it
                had already surfaced an idea I forgot I had.”
              </p>
              <p className="mt-6 text-[14px] font-bold text-[#1d1a14]/80">
                Jules Ferreira, writer
              </p>
            </div>
          </Reveal>
        </section>

        <section id="pricing" className="border-t-2 border-[#1d1a14]">
          <div className="mx-auto max-w-6xl px-6 py-24 text-center">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-5xl font-bold leading-[0.98] tracking-tight text-[#1d1a14] sm:text-6xl">
                Give your brain a notebook.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[16px] font-medium text-[#1d1a14]/65">
                Free forever for personal use. Pro is $6 a month when you’re
                ready.
              </p>
              <a
                href="#"
                className="mt-9 inline-flex items-center gap-2 rounded-full border-2 border-[#1d1a14] bg-[#1d1a14] px-9 py-4 text-[16px] font-bold text-[#fdf6e9] shadow-[5px_5px_0_#ff5a1f] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Start free
                <ArrowRight size={18} weight="bold" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#1d1a14] bg-[#1d1a14] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <span className="text-[15px] font-bold text-[#fdf6e9]">
            Palimpsest
          </span>
          <div className="flex gap-7 text-[13px] font-bold text-[#fdf6e9]/60">
            <a href="#" className="transition-colors hover:text-[#fdf6e9]">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#fdf6e9]">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-[#fdf6e9]">
              Contact
            </a>
          </div>
          <p className="text-[13px] font-bold" style={{ color: LIME }}>
            written messy, linked forever
          </p>
        </div>
      </footer>
    </div>
  );
}
