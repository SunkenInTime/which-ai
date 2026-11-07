import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";
import { Reveal } from "@/variants/with-taste-skill/swe-2-flash/source/components/Reveal";
import {
  ArrowRight,
  Check,
  Minus,
} from "@phosphor-icons/react/dist/ssr";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const INK = "#111111";
const PAPER = "#ffffff";
const LINE = "#e2e2e2";
const ACCENT = "#ff4d00";
const ACCENT_DEEP = "#c2410c";

function Wordmark() {
  return (
    <Link
      href="/with-taste-skill/swe-2-flash/4"
      className="text-[17px] font-extrabold uppercase tracking-tight"
      style={{ color: INK }}
    >
      Palimpsest<span style={{ color: ACCENT }}>.</span>
    </Link>
  );
}

const specs = [
  {
    id: "01",
    title: "Bidirectional links",
    body: "Every note knows what references it. Links stay alive as the corpus grows.",
  },
  {
    id: "02",
    title: "Knowledge graph",
    body: "A force-directed map of your thinking, rendered locally on your device.",
  },
  {
    id: "03",
    title: "Semantic search",
    body: "Query in plain language. Results rank by conceptual proximity, not keywords.",
  },
  {
    id: "04",
    title: "Offline core",
    body: "A full local database with encrypted sync. Zero connectivity required.",
  },
];

const matrix = [
  { feature: "Automatic backlinks", pal: true, notion: false, apple: false },
  { feature: "Local-first storage", pal: true, notion: false, apple: true },
  { feature: "Graph visualization", pal: true, notion: true, apple: false },
  { feature: "Plain-text export", pal: true, notion: true, apple: false },
  { feature: "Free tier, no limits", pal: true, notion: false, apple: true },
  { feature: "Voice memo capture", pal: true, notion: true, apple: false },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <Check size={16} weight="bold" style={{ color: INK }} />
  ) : (
    <Minus size={16} style={{ color: "#c4c4c4" }} />
  );
}

export default function IterationFour() {
  return (
    <div
      className={`${archivo.variable} flex-1 font-sans`}
      style={{
        backgroundColor: PAPER,
        color: INK,
        fontFamily: "var(--font-archivo), system-ui, sans-serif",
      }}
    >
      <header
        className="border-b"
        style={{ borderColor: LINE, backgroundColor: PAPER }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Wordmark />
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f] md:flex">
            <a href="#specs" className="transition-colors hover:text-[#111111]">
              Specs
            </a>
            <a href="#matrix" className="transition-colors hover:text-[#111111]">
              Matrix
            </a>
            <a href="#pricing" className="transition-colors hover:text-[#111111]">
              Pricing
            </a>
          </nav>
          <a
            href="#pricing"
            className="bg-[#111111] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-80"
          >
            Get started
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal>
              <h1
                className="text-[15vw] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-[#111111] sm:text-7xl lg:text-[88px]"
              >
                Your mind,
                <br />
                <span style={{ color: ACCENT }}>indexed.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[15px] leading-relaxed text-[#6f6f6f]">
                Palimpsest is a note-taking system that links every idea you
                capture into a searchable second brain. No folders. No tags.
                Just connections.
              </p>
              <div className="mt-7 flex items-center gap-5">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 bg-[#111111] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-transform active:scale-[0.98]"
                >
                  Get started
                  <ArrowRight size={15} weight="bold" />
                </a>
                <a
                  href="#matrix"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f] underline underline-offset-4 transition-colors hover:text-[#111111]"
                >
                  Compare systems
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="specs"
          className="border-y"
          style={{ borderColor: LINE }}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  Specifications
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f]">
                  Four subsystems, one binary
                </span>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-px border border-[#e2e2e2] bg-[#e2e2e2] sm:grid-cols-2 lg:grid-cols-4">
              {specs.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.06} className="h-full">
                  <div className="flex h-full flex-col bg-white p-7">
                    <span className="font-mono text-[11px]" style={{ color: ACCENT_DEEP }}>
                      {s.id}
                    </span>
                    <h3 className="mt-4 text-[19px] font-bold leading-tight tracking-tight text-[#111111]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#6f6f6f]">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b" style={{ borderColor: LINE }}>
          <div className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
            <Reveal>
              <div className="relative aspect-[21/8] overflow-hidden bg-[#e8e8e8]">
                <Image
                  src="https://picsum.photos/seed/palimpsest-grid-notes/1600/620"
                  alt="Overhead view of an organized desk with notebooks and index cards"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f]">
                Fig. 1 - Input side of the system
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <Reveal className="min-w-0">
              <h2 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl">
                Built different
                <br />
                on purpose.
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#6f6f6f]">
                Most note apps give you a container and ask you to file things
                inside it. Palimpsest treats every note as a node in a graph
                and does the filing for you.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="min-w-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-[#111111]">
                      <th className="py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-[#6f6f6f]">
                        Capability
                      </th>
                      <th className="px-6 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#111111]">
                        Palimpsest
                      </th>
                      <th className="px-6 py-3 text-center font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-[#6f6f6f]">
                        Notion
                      </th>
                      <th className="px-6 py-3 text-center font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-[#6f6f6f]">
                        Apple Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row) => (
                      <tr key={row.feature} className="border-b border-[#e2e2e2]">
                        <td className="py-4 pr-6 text-[14px] font-medium text-[#111111]">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={row.pal} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={row.notion} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Cell value={row.apple} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-[#6f6f6f]">
                Comparison based on publicly documented features as of October
                2026. Competitor names are trademarks of their owners.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t" style={{ borderColor: LINE }}>
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <Reveal>
              <blockquote className="max-w-4xl">
                <p className="text-3xl font-bold leading-[1.1] tracking-tight text-[#111111] md:text-[44px]">
                  “It is the first notes app that feels like it is working for
                  me instead of the other way around.”
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span
                    className="grid size-10 place-items-center rounded-full bg-[#111111] font-mono text-[12px] font-bold text-white"
                  >
                    AK
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-[#111111]">
                      Amara Kowalski
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f]">
                      Research scientist, daily user since March
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section id="pricing" className="border-t-2 border-[#111111]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_auto] md:items-end md:py-32">
            <Reveal>
              <h2 className="text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
                Start
                <br />
                indexing<span style={{ color: ACCENT }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[14px] leading-relaxed text-[#6f6f6f]">
                Free tier covers unlimited notes, links, and search. Pro adds
                graph analytics and publishing for $6 per month.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 bg-[#ff4d00] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#111111] transition-transform active:scale-[0.98]"
              >
                Get started
                <ArrowRight size={15} weight="bold" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer
        className="border-t"
        style={{ borderColor: LINE, backgroundColor: "#fafafa" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs font-mono text-[11px] leading-relaxed text-[#6f6f6f]">
              PALIMPSEST SYSTEMS. EST. 2026.
            </p>
          </div>
          {[
            { h: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { h: "Resources", links: ["Documentation", "Import guide", "API", "Status"] },
            { h: "Company", links: ["About", "Privacy", "Terms", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6f]">
                {col.h}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] font-medium text-[#111111] transition-opacity hover:opacity-60"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t" style={{ borderColor: LINE }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f6f6f] md:flex-row md:justify-between">
            <span>© 2026 Palimpsest Systems AG</span>
            <span>Set in Archivo and Geist Mono</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
