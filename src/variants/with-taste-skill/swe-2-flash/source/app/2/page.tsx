import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";
import { Reveal } from "@/variants/with-taste-skill/swe-2-flash/source/components/Reveal";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const INK = "#191a1d";
const ACCENT = "#d9481c";

function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[#d9dbd7] ${className}`} />;
}

function Wordmark() {
  return (
    <Link
      href="/with-taste-skill/swe-2-flash/2"
      className="text-xl italic tracking-tight"
      style={{
        color: INK,
        fontFamily: "var(--font-newsreader), Georgia, serif",
      }}
    >
      Palimpsest
    </Link>
  );
}

const contents = [
  {
    n: "01",
    title: "Links that write themselves",
    body: "Type two brackets and Palimpsest offers every note you have ever written on the subject. Connections accumulate as you work, not after.",
  },
  {
    n: "02",
    title: "A graph of what you know",
    body: "Your notes become a living map. Dense clusters are mastered; sparse regions show exactly where to read next.",
  },
  {
    n: "03",
    title: "Search across everything",
    body: "Notes, highlights, scanned pages, and voice memos sit in one index. Results rank by how woven they are into your thinking.",
  },
  {
    n: "04",
    title: "Offline, always",
    body: "The whole notebook syncs to your device. Write on a plane, a train, or a beach with no signal at all.",
  },
];

export default function IterationTwo() {
  return (
    <div
      className={`${newsreader.variable} flex-1 bg-[#f1f2ef] font-sans text-[#191a1d]`}
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <Rule />
        <div className="flex items-center justify-between py-4">
          <Wordmark />
          <nav className="hidden items-center gap-8 text-[13px] tracking-wide text-[#4c4f54] md:flex">
            <a href="#contents" className="transition-colors hover:text-[#191a1d]">
              Contents
            </a>
            <a href="#field-notes" className="transition-colors hover:text-[#191a1d]">
              Field notes
            </a>
            <a href="#subscribe" className="transition-colors hover:text-[#191a1d]">
              Subscribe
            </a>
          </nav>
          <a
            href="#subscribe"
            className="border border-[#191a1d] px-4 py-1.5 text-[13px] font-medium tracking-wide transition-colors hover:bg-[#191a1d] hover:text-[#f1f2ef]"
          >
            Start your notebook
          </a>
        </div>
        <Rule />
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pt-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5c5f63]">
              Issue one, the second-brain notebook
            </p>
            <h1
              className="mt-6 max-w-3xl text-[13vw] font-normal leading-[0.98] tracking-tight text-[#191a1d] sm:text-7xl md:text-[86px]"
              style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
            >
              Every idea deserves{" "}
              <em className="italic" style={{ color: ACCENT }}>
                a second life.
              </em>
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-[#4c4f54]">
              Palimpsest is a notebook that links itself. Write plainly; the
              connections between your ideas assemble on their own.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="#subscribe"
                className="bg-[#191a1d] px-6 py-3 text-[14px] font-medium tracking-wide text-[#f1f2ef] transition-opacity hover:opacity-85"
              >
                Start your notebook
              </a>
              <a
                href="#contents"
                className="text-[14px] font-medium tracking-wide text-[#191a1d] underline decoration-[#d9dbd7] underline-offset-4 transition-colors hover:decoration-[#191a1d]"
              >
                Read the contents
              </a>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden bg-[#e4e6e1]">
              <Image
                src="https://picsum.photos/seed/palimpsest-desk-notes/1600/800"
                alt="A desk with an open notebook, pen, and stacked papers"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <p className="mt-3 text-[12px] tracking-wide text-[#5c5f63]">
              Where most first drafts end up.
            </p>
          </Reveal>
        </section>

        <section id="contents" className="border-t border-[#d9dbd7]">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.6fr] md:py-28">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5c5f63]">
                Contents
              </p>
              <h2
                className="mt-4 text-4xl font-normal leading-tight tracking-tight text-[#191a1d]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                Four things the notebook does while you sleep.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#4c4f54]">
                No folders, no tags to maintain, no weekly review ritual. The
                structure is the byproduct of writing.
              </p>
            </Reveal>
            <div>
              {contents.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.06}>
                  <div
                    className={`grid grid-cols-[56px_1fr] gap-6 py-7 ${i > 0 ? "border-t border-[#d9dbd7]" : ""}`}
                  >
                    <span
                      className="text-sm tabular-nums"
                      style={{ color: ACCENT }}
                    >
                      {c.n}
                    </span>
                    <div>
                      <h3
                        className="text-[22px] font-normal leading-snug text-[#191a1d]"
                        style={{
                          fontFamily: "var(--font-newsreader), Georgia, serif",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-[#4c4f54]">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#d9dbd7] bg-[#e9ebe6]">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
            <Reveal>
              <p
                className="text-[30px] font-normal italic leading-snug tracking-tight text-[#191a1d] md:text-[44px]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                “I stopped filing things away. Now when I need an old idea, it
                is already sitting next to the new one.”
              </p>
              <p className="mt-8 text-[13px] tracking-wide text-[#4c4f54]">
                Hannah Osei, historian
              </p>
            </Reveal>
          </div>
        </section>

        <section id="field-notes" className="border-t border-[#d9dbd7]">
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e4e6e1]">
                <Image
                  src="https://picsum.photos/seed/palimpsest-margin-notes/900/1125"
                  alt="Close-up of handwritten margin notes in a book"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <p className="mt-3 text-[12px] tracking-wide text-[#5c5f63]">
                Marginalia, but searchable.
              </p>
            </Reveal>
            <Reveal className="order-1 md:order-2" delay={0.1}>
              <h2
                className="text-4xl font-normal leading-tight tracking-tight text-[#191a1d]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                Written in the margins of your day.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#4c4f54]">
                Palimpsest is built for the way thinking actually happens:
                fragments, half-formed links, questions left open. Nothing is
                required to be finished before it starts connecting.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Markdown you can actually enjoy writing",
                  "End-to-end encrypted sync across devices",
                  "Exports to plain files, always",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-[15px] text-[#191a1d]"
                  >
                    <span className="text-[13px]" style={{ color: ACCENT }}>
                      §
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="subscribe" className="border-t border-[#d9dbd7]">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
              <Reveal>
                <h2
                  className="text-4xl font-normal leading-tight tracking-tight text-[#191a1d]"
                  style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                  }}
                >
                  Two bindings, one price.
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#4c4f54]">
                  Start free. Upgrade when the notebook outgrows you.
                </p>
              </Reveal>
              <div>
                {[
                  {
                    name: "The Notebook",
                    price: "$0",
                    period: "forever",
                    features: [
                      "Unlimited notes and links",
                      "Offline sync, 1 device",
                      "Full-text search",
                    ],
                    cta: "Begin writing",
                  },
                  {
                    name: "The Library",
                    price: "$6",
                    period: "per month",
                    features: [
                      "Everything in The Notebook",
                      "Graph analytics and resurfacing",
                      "Publish pages and sync 5 devices",
                    ],
                    cta: "Go deeper",
                    featured: true,
                  },
                ].map((plan, i) => (
                  <Reveal key={plan.name} delay={i * 0.08}>
                    <div
                      className={`grid grid-cols-[1fr_auto] items-baseline gap-6 py-8 ${i > 0 ? "border-t border-[#d9dbd7]" : ""}`}
                    >
                      <div>
                        <h3
                          className="text-[26px] font-normal text-[#191a1d]"
                          style={{
                            fontFamily: "var(--font-newsreader), Georgia, serif",
                          }}
                        >
                          {plan.name}
                        </h3>
                        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#4c4f54]">
                          {plan.features.join(" · ")}
                        </p>
                        <a
                          href="#"
                          className={`mt-4 inline-block text-[13px] font-medium tracking-wide underline underline-offset-4 ${
                            plan.featured ? "" : "text-[#4c4f54] hover:text-[#191a1d]"
                          }`}
                          style={plan.featured ? { color: ACCENT } : undefined}
                        >
                          {plan.cta}
                        </a>
                      </div>
                      <p
                        className="text-right text-[34px] font-normal leading-none tracking-tight text-[#191a1d]"
                        style={{
                          fontFamily: "var(--font-newsreader), Georgia, serif",
                        }}
                      >
                        {plan.price}
                        <span className="mt-1 block text-[12px] font-normal tracking-wide text-[#5c5f63]">
                          {plan.period}
                        </span>
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9dbd7]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[#5c5f63]">
              Set in Newsreader. Printed on screens everywhere.
            </p>
          </div>
          <div className="flex gap-8 text-[13px] tracking-wide text-[#4c4f54]">
            <a href="#" className="transition-colors hover:text-[#191a1d]">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#191a1d]">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-[#191a1d]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
