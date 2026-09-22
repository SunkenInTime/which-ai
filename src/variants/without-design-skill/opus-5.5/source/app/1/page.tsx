import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { display, mono, text } from "./fonts";

export const metadata: Metadata = {
  title: "Mneme — a notebook with a memory of its own",
  description:
    "Mneme is a commonplace book that links your notes, answers from them with citations, and hands old thoughts back when they matter again.",
};

/* ------------------------------------------------------------------ */
/* Shared typographic tokens                                           */
/* ------------------------------------------------------------------ */

const label =
  "font-[family-name:var(--font-label)] text-[11px] uppercase tracking-[0.16em]";
const serif = "font-[family-name:var(--font-display)] font-normal";
const shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10";
/** gutter · measure · margin */
const grid =
  "grid grid-cols-1 gap-y-8 lg:grid-cols-[150px_minmax(0,1fr)_230px] lg:gap-x-14";

const dropCap =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-[0.12em] first-letter:font-[family-name:var(--font-display)] first-letter:text-[4.6em] first-letter:leading-[0.72] first-letter:text-[#8A2B22]";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Rule({ double = false }: { double?: boolean }) {
  return double ? (
    <div aria-hidden className="border-t border-b border-[#1F1B17] pt-[3px]" />
  ) : (
    <hr className="border-0 border-t border-[#CDBFA8]" />
  );
}

function SectionMark({ n, title }: { n: number; title: string }) {
  return (
    <div className="lg:pt-3">
      <p className={`${label} text-[#8A2B22]`}>
        <span className={`${serif} mr-1 text-[22px] normal-case tracking-normal`}>
          §{n}
        </span>
      </p>
      <p className={`${label} mt-1 text-[#5E554B]`}>{title}</p>
    </div>
  );
}

function Marginal({
  mark,
  children,
  className = "",
}: {
  mark: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`relative border-l border-[#8A2B22]/40 pl-4 text-[14px] leading-[1.5] text-[#5E554B] italic lg:border-l-0 lg:pl-0 ${className}`}
    >
      <span
        className={`${label} mr-1.5 not-italic text-[#8A2B22]`}
        aria-hidden
      >
        {mark}
      </span>
      {children}
    </aside>
  );
}

function Fn({ n }: { n: number }) {
  return (
    <sup className="ml-[1px] font-[family-name:var(--font-label)] text-[0.62em] font-medium text-[#8A2B22]">
      {n}
    </sup>
  );
}

function WikiLink({ children }: { children: ReactNode }) {
  return (
    <span className="text-[#8A2B22] underline decoration-[#8A2B22]/35 decoration-1 underline-offset-[3px]">
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <Link
      href="#subscribe"
      className="group inline-flex items-center gap-3 rounded-full bg-[#1F1B17] px-6 py-3.5 text-[15px] text-[#F3EDE2] transition-colors hover:bg-[#8A2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A2B22]"
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Masthead                                                            */
/* ------------------------------------------------------------------ */

function Masthead() {
  const links = [
    ["Contents", "#contents"],
    ["Specimen", "#specimen"],
    ["Ask", "#ask"],
    ["Subscriptions", "#subscribe"],
  ];
  return (
    <header className={`${shell} pt-6`}>
      <div
        className={`${label} flex items-center justify-between pb-3 text-[#5E554B]`}
      >
        <span>Vol. IV — Autumn 2026</span>
        <span className="hidden sm:inline">A commonplace book, kept for you</span>
        <span className="hidden md:inline">macOS · Windows · Linux · iOS · Android · Web</span>
        <span className="md:hidden">Est. 2023</span>
      </div>
      <Rule double />
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5"
      >
        <Link
          href="#"
          className={`${serif} text-[34px] leading-none tracking-[-0.01em] italic`}
        >
          Mneme
        </Link>
        <ul className="order-3 flex w-full gap-6 text-[15px] sm:order-none sm:w-auto sm:gap-8">
          {links.map(([name, href]) => (
            <li key={name}>
              <a
                href={href}
                className="underline-offset-[5px] hover:text-[#8A2B22] hover:underline"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#subscribe"
          className={`${label} rounded-full border border-[#1F1B17] px-4 py-2 transition-colors hover:bg-[#1F1B17] hover:text-[#F3EDE2]`}
        >
          Begin free
        </a>
      </nav>
      <Rule />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className={`${shell} pt-14 pb-20 sm:pt-20 lg:pb-28`}>
      <div className={grid}>
        <div className="hidden lg:block">
          <p className={`${label} pt-4 text-[#5E554B]`}>An introduction</p>
        </div>

        <div className="lg:col-span-2">
          <h1
            className={`${serif} text-[clamp(3.1rem,8.4vw,7.4rem)] leading-[0.92] tracking-[-0.025em] text-balance`}
          >
            A notebook with a{" "}
            <em className="text-[#8A2B22]">memory</em> of its own.
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-12">
            <p
              className={`text-[19px] leading-[1.6] text-pretty sm:text-[20px] ${dropCap}`}
            >
              For five centuries, careful readers kept commonplace books —
              quotations, half-thoughts, and things overheard, copied out by
              hand so they would not be lost. Most of them were lost anyway,
              in the plainest way: written down, and never found again.
              Mneme is the commonplace book that goes looking for you. It
              links what you write to what you&rsquo;ve already written,
              answers questions from your own pages, and quietly returns an
              old thought on the morning you need it.
            </p>

            <div className="flex flex-col gap-8 md:pt-2">
              <Marginal mark="n.">
                <span className={`${serif} text-[20px] not-italic text-[#1F1B17]`}>
                  Mnē·mē
                </span>{" "}
                /ˈniː.miː/ — in Greek myth, the muse of memory; eldest of the
                three original muses, before there were nine.
              </Marginal>
              <Marginal mark="¹">
                Plain Markdown files, on your own disk. Open them in any
                editor — now, or in 2046.
              </Marginal>

              <div className="flex flex-col items-start gap-4">
                <PrimaryButton>Begin your commonplace book</PrimaryButton>
                <p className="text-[14px] text-[#5E554B]">
                  Free for one device, for as long as you keep writing.{" "}
                  <a
                    href="#specimen"
                    className="text-[#1F1B17] underline decoration-[#CDBFA8] underline-offset-4 hover:decoration-[#8A2B22]"
                  >
                    Read a specimen page ↓
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §1 Specimen — product mock                                          */
/* ------------------------------------------------------------------ */

const backlinks = [
  {
    n: 1,
    title: "Commonplace books, a short history",
    date: "3 Mar 2025",
    snippet:
      "Locke indexed his by first letter and first vowel. Re-read the whole thing on Sundays.",
  },
  {
    n: 2,
    title: "Seneca — Letters 1–10",
    date: "11 Jan 2026",
    snippet:
      "“Everywhere means nowhere.” Be a guest of a few authors, not a tourist of many.",
  },
  {
    n: 3,
    title: "October experiments",
    date: "2 Sep 2026",
    snippet: "Cold showers (no). Phone in the hall (yes). Reading twice (?)",
  },
];

function Specimen() {
  return (
    <section
      id="specimen"
      aria-labelledby="specimen-title"
      className="border-y border-[#CDBFA8] bg-[#EAE2D3]"
    >
      <div className={`${shell} py-20 lg:py-28`}>
        <div className={grid}>
          <SectionMark n={1} title="Specimen" />
          <div>
            <h2
              id="specimen-title"
              className={`${serif} max-w-[16ch] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em] text-balance`}
            >
              Every page is read <em>alongside</em> every other.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-[#3D362F]">
              Write the way you already do. As you go, Mneme reads the rest of
              your notebook and sets the relevant pages in the margin — the
              ones that cite this note, and the ones it suspects should.
            </p>
          </div>
        </div>

        {/* The mock */}
        <figure className="mt-14 lg:mt-16">
          <div className="overflow-hidden rounded-[6px] border border-[#CDBFA8] bg-[#FBF8F2] shadow-[0_1px_0_#fff_inset,0_40px_80px_-40px_rgba(60,40,20,0.35),0_12px_24px_-12px_rgba(60,40,20,0.15)]">
            {/* window chrome */}
            <div className="flex items-center gap-4 border-b border-[#E3D9C7] px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#D8CDBA]" />
                <span className="size-2.5 rounded-full bg-[#D8CDBA]" />
                <span className="size-2.5 rounded-full bg-[#D8CDBA]" />
              </div>
              <p
                className={`${label} truncate text-[10px] text-[#7A6F63]`}
              >
                Reading <span aria-hidden>/</span> Notes toward a slower
                reading practice
              </p>
              <p
                className={`${label} ml-auto hidden text-[10px] text-[#7A6F63] sm:block`}
              >
                ⌘K Search · ⌘J Ask
              </p>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
              {/* manuscript */}
              <article className="px-6 py-10 sm:px-12 lg:px-20 lg:py-16">
                <p className={`${label} text-[10px] text-[#7A6F63]`}>
                  Tuesday, 15 September 2026 · 7:42 am
                </p>
                <h3
                  className={`${serif} mt-3 text-[clamp(2rem,4vw,2.9rem)] leading-[1.02] tracking-[-0.01em]`}
                >
                  Notes toward a slower reading practice
                </h3>
                <div className="mt-8 max-w-[58ch] space-y-5 text-[17px] leading-[1.7] text-[#2A241F]">
                  <p className={dropCap}>
                    Finished Montaigne&rsquo;s essay on idleness on the train.
                    The untended mind, he says, &ldquo;gives birth to so many
                    chimeras and fantastic monsters&rdquo; — which is a fair
                    description of my notebooks before I started keeping a{" "}
                    <WikiLink>commonplace book</WikiLink>
                    <Fn n={1} /> properly.
                  </p>
                  <p>
                    The trick, I think, is not reading more but returning more.{" "}
                    <WikiLink>Seneca</WikiLink> says the same in the second
                    letter: be a guest of a few authors, not a tourist of
                    many.
                    <Fn n={2} />
                  </p>
                  <p>
                    So: one essay a week, read twice. The second pass only in
                    the margins, pencil not pen. Try it through October and
                    see what survives
                    <Fn n={3} />
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-[1.1em] w-[1.5px] translate-y-[3px] animate-pulse bg-[#8A2B22]"
                    />
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E3D9C7] pt-4">
                  {["#reading", "#habits", "#montaigne"].map((t) => (
                    <span
                      key={t}
                      className={`${label} text-[10px] text-[#8A2B22]`}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    className={`${label} ml-auto text-[10px] text-[#7A6F63]`}
                  >
                    ~/Mneme/Reading/slower-reading.md · saved locally
                  </span>
                </div>
              </article>

              {/* margin */}
              <aside
                aria-label="Backlinks for this note"
                className="border-t border-[#E3D9C7] bg-[#F6F1E8] px-6 py-10 sm:px-12 lg:border-t-0 lg:border-l lg:px-7 lg:py-16"
              >
                <p className={`${label} text-[10px] text-[#7A6F63]`}>
                  In the margin · 3 linked
                </p>
                <ol className="mt-5 space-y-6">
                  {backlinks.map((b) => (
                    <li key={b.n} className="flex gap-3">
                      <span className="pt-[3px] font-[family-name:var(--font-label)] text-[11px] font-medium text-[#8A2B22]">
                        {b.n}
                      </span>
                      <div>
                        <p className={`${serif} text-[19px] leading-[1.15]`}>
                          {b.title}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-[1.45] text-[#5E554B] italic">
                          {b.snippet}
                        </p>
                        <p
                          className={`${label} mt-1.5 text-[9.5px] text-[#7A6F63]`}
                        >
                          {b.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 rounded-[4px] border border-dashed border-[#8A2B22]/50 p-4">
                  <p className={`${label} text-[10px] text-[#8A2B22]`}>
                    Mneme suggests
                  </p>
                  <p className={`${serif} mt-2 text-[19px] leading-[1.15]`}>
                    Ebbinghaus &amp; the forgetting curve
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.45] text-[#5E554B] italic">
                    From June 2024. Shares four ideas with this page, including
                    &ldquo;spaced re-reading.&rdquo;
                  </p>
                  <div className="mt-3 flex gap-4 text-[13px]">
                    <span className="font-medium text-[#8A2B22]">
                      Link it ↵
                    </span>
                    <span className="text-[#7A6F63]">Not now</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <figcaption
            className={`${label} mt-4 text-center text-[10px] text-[#5E554B]`}
          >
            Fig. 1 — A daily page in Mneme, with its backlinks set in the margin.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §2 Contents — features                                              */
/* ------------------------------------------------------------------ */

const habits = [
  {
    num: "i",
    title: "Capture anywhere",
    body: "From the menubar, your phone, a forwarded email, the web clipper, or a voice memo on a walk. Everything arrives in the same book, dated and in its place.",
    note: "Voice memos are transcribed on-device.",
  },
  {
    num: "ii",
    title: "It links itself",
    body: "Mneme notices when two pages are talking about the same thing and offers to join them. Every note carries its backlinks, so no thought is an orphan for long.",
    note: "You approve every suggested link. Nothing is rewritten.",
  },
  {
    num: "iii",
    title: "Ask your notes",
    body: "Put a question to your own writing in plain language. The answer comes back with footnotes to the exact pages it was drawn from — nothing invented, nothing from elsewhere.",
    note: "See §3.",
  },
  {
    num: "iv",
    title: "Resurfacing",
    body: "Each morning, a short column of the past: what you wrote a year ago today, and the older pages that bear on whatever you’re writing now.",
    note: "Five items a day, at most. Memory, not a feed.",
  },
  {
    num: "v",
    title: "Local-first, and private",
    body: "Your notes are plain Markdown files on your own device. Sync is end-to-end encrypted; Mneme works entirely offline and never trains on your pages.",
    note: "We can’t read your notebook. We checked.",
  },
  {
    num: "vi",
    title: "The ordinary instruments",
    body: "Daily notes that open to today. A graph view of how your ideas hold hands. Full-text search that returns before you’ve lifted your finger.",
    note: "Search across 40,000 notes in under 30ms.",
  },
];

function Contents() {
  return (
    <section
      id="contents"
      aria-labelledby="contents-title"
      className={`${shell} py-20 lg:py-28`}
    >
      <div className={grid}>
        <SectionMark n={2} title="Contents" />
        <div>
          <h2
            id="contents-title"
            className={`${serif} max-w-[18ch] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em] text-balance`}
          >
            Six habits of a <em>good</em> memory.
          </h2>
        </div>
        <div className="hidden lg:block" />
      </div>

      <ol className="mt-14">
        {habits.map((h) => (
          <li key={h.num} className="border-t border-[#CDBFA8] last:border-b">
            <div className={`${grid} py-8 lg:py-10`}>
              <p
                className={`${serif} text-[26px] leading-none text-[#8A2B22] italic lg:pt-1`}
                aria-hidden
              >
                {h.num}.
              </p>
              <div className="grid gap-3 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10">
                <h3
                  className={`${serif} text-[30px] leading-[1.05] tracking-[-0.01em]`}
                >
                  {h.title}
                </h3>
                <p className="text-[17px] leading-[1.65] text-[#3D362F]">
                  {h.body}
                </p>
              </div>
              <Marginal mark="†" className="lg:pt-1">
                {h.note}
              </Marginal>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §3 Ask — footnoted answer                                           */
/* ------------------------------------------------------------------ */

const sources = [
  {
    n: 1,
    title: "Seneca — Letters 1–10",
    date: "11 January 2026",
  },
  {
    n: 2,
    title: "Commonplace books, a short history",
    date: "3 March 2025",
  },
  {
    n: 3,
    title: "Notes toward a slower reading practice",
    date: "15 September 2026",
  },
];

function Ask() {
  return (
    <section
      id="ask"
      aria-labelledby="ask-title"
      className="bg-[#1F1B17] text-[#EFE7DA]"
    >
      <div className={`${shell} py-20 lg:py-28`}>
        <div className={grid}>
          <div className="lg:pt-3">
            <p className={`${serif} text-[22px] text-[#D98C7F]`}>§3</p>
            <p className={`${label} mt-1 text-[#A99D8D]`}>Ask</p>
          </div>

          <div>
            <h2
              id="ask-title"
              className={`${serif} max-w-[17ch] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em] text-balance`}
            >
              Ask your notes. They answer <em>with citations.</em>
            </h2>

            <div className="mt-14 border-t border-[#4A423A] pt-10">
              <p className={`${label} text-[#A99D8D]`}>You asked</p>
              <p
                className={`${serif} mt-3 text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.15] italic`}
              >
                &ldquo;What have I actually learned about reading slowly?&rdquo;
              </p>

              <p className={`${label} mt-10 text-[#A99D8D]`}>
                Mneme, from 3 of your notes
              </p>
              <p className="mt-3 max-w-[60ch] text-[19px] leading-[1.7] text-[#EFE7DA]">
                You&rsquo;ve come back to it three times. In January you copied
                Seneca&rsquo;s line about being &ldquo;a guest of a few
                authors&rdquo;
                <sup className="ml-[1px] font-[family-name:var(--font-label)] text-[0.6em] text-[#D98C7F]">
                  1
                </sup>
                . A year earlier you&rsquo;d noted that Locke re-read his
                entire commonplace book every Sunday
                <sup className="ml-[1px] font-[family-name:var(--font-label)] text-[0.6em] text-[#D98C7F]">
                  2
                </sup>
                . Last week you resolved to read one essay twice a week through
                October
                <sup className="ml-[1px] font-[family-name:var(--font-label)] text-[0.6em] text-[#D98C7F]">
                  3
                </sup>{" "}
                — though you haven&rsquo;t yet written down how it&rsquo;s
                going.
              </p>

              <ol className="mt-10 max-w-[60ch] space-y-2 border-t border-[#4A423A] pt-5 text-[14px] leading-[1.5] text-[#C9BEAE]">
                {sources.map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <span className="w-3 shrink-0 font-[family-name:var(--font-label)] text-[11px] leading-[1.9] text-[#D98C7F]">
                      {s.n}
                    </span>
                    <span>
                      <em>{s.title}</em>, {s.date}.
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:pt-40">
            <aside className="border-l border-[#D98C7F]/50 pl-4 text-[14px] leading-[1.5] text-[#C9BEAE] italic lg:border-l-0 lg:pl-0">
              <span className={`${label} mr-1.5 not-italic text-[#D98C7F]`}>
                ‡
              </span>
              If your notes don&rsquo;t say, neither does Mneme. It will tell
              you it doesn&rsquo;t know rather than borrow an answer from the
              internet.
            </aside>
            <aside className="border-l border-[#D98C7F]/50 pl-4 text-[14px] leading-[1.5] text-[#C9BEAE] italic lg:border-l-0 lg:pl-0">
              <span className={`${label} mr-1.5 not-italic text-[#D98C7F]`}>
                §
              </span>
              Every footnote opens the source page, scrolled to the sentence.
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §4 Resurfacing + local files                                        */
/* ------------------------------------------------------------------ */

function Resurfacing() {
  return (
    <section
      aria-labelledby="resurface-title"
      className={`${shell} py-20 lg:py-28`}
    >
      <div className={grid}>
        <SectionMark n={4} title="This morning" />
        <div>
          <h2
            id="resurface-title"
            className={`${serif} max-w-[18ch] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em] text-balance`}
          >
            Old thoughts, returned <em>on time.</em>
          </h2>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-[#3D362F]">
            Forgetting is not the enemy; it&rsquo;s what makes remembering
            feel like a gift. Each morning Mneme sets aside a few pages you
            wrote and moved on from — chosen by date, and by what&rsquo;s on
            your desk today.
          </p>
        </div>
        <div className="hidden lg:block" />
      </div>

      <div className="mt-14 grid gap-px overflow-hidden border border-[#CDBFA8] bg-[#CDBFA8] md:grid-cols-3">
        <article className="bg-[#F3EDE2] p-7 sm:p-8">
          <p className={`${label} text-[10px] text-[#8A2B22]`}>
            One year ago today
          </p>
          <p className={`${label} mt-1 text-[10px] text-[#7A6F63]`}>
            22 September 2025
          </p>
          <p className={`${serif} mt-5 text-[24px] leading-[1.2]`}>
            &ldquo;Walked home the long way, past the canal. Decided to stop
            saying yes to Thursday meetings.&rdquo;
          </p>
          <p className="mt-4 text-[14px] text-[#5E554B] italic">
            — from <span className="not-italic">Daily, 22 Sep 2025</span>
          </p>
        </article>

        <article className="bg-[#F3EDE2] p-7 sm:p-8">
          <p className={`${label} text-[10px] text-[#8A2B22]`}>
            Bears on what you&rsquo;re writing
          </p>
          <p className={`${label} mt-1 text-[10px] text-[#7A6F63]`}>
            12 August 2023
          </p>
          <p className={`${serif} mt-5 text-[24px] leading-[1.2]`}>
            &ldquo;Calvino: a classic is a book that has never finished saying
            what it has to say.&rdquo;
          </p>
          <p className="mt-4 text-[14px] text-[#5E554B] italic">
            — related to{" "}
            <span className="not-italic text-[#8A2B22]">
              Notes toward a slower reading practice
            </span>
          </p>
        </article>

        <article className="bg-[#EAE2D3] p-7 sm:p-8">
          <p className={`${label} text-[10px] text-[#5E554B]`}>
            Where your notes live
          </p>
          <pre
            aria-label="Your Mneme folder: plain Markdown files"
            className="mt-5 overflow-x-auto font-[family-name:var(--font-label)] text-[12.5px] leading-[1.85] text-[#2A241F]"
          >
            {`~/Mneme/
├─ Daily/
│  ├─ 2025-09-22.md
│  └─ 2026-09-22.md
├─ Reading/
│  ├─ seneca-letters.md
│  └─ slower-reading.md
└─ Voice/
   └─ walk-canal.m4a.md`}
          </pre>
          <p className="mt-5 text-[15px] leading-[1.55] text-[#3D362F]">
            Plain files, in a folder you own. If Mneme vanished tomorrow,
            your notebook wouldn&rsquo;t.
          </p>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5 Letters — testimonials                                           */
/* ------------------------------------------------------------------ */

const letters = [
  {
    quote:
      "I have kept notebooks for twenty years and could never find anything in them. In my first week, Mneme handed me a note from 2019 that finished a chapter I’d been stuck on since spring.",
    name: "Inês Carvalho",
    role: "Historian, Coimbra",
  },
  {
    quote:
      "The margin knows things I’d forgotten I knew. It is slightly uncanny and entirely useful.",
    name: "Tomás Reyes",
    role: "Product designer",
  },
  {
    quote:
      "Plain Markdown in a folder I control is why I switched. Asking my notes — and getting footnotes back — is why I stayed.",
    name: "Priya Natarajan",
    role: "Staff engineer",
  },
];

function Letters() {
  return (
    <section
      aria-labelledby="letters-title"
      className="border-t border-[#CDBFA8]"
    >
      <div className={`${shell} py-20 lg:py-28`}>
        <div className={grid}>
          <SectionMark n={5} title="Correspondence" />
          <h2
            id="letters-title"
            className={`${serif} text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em]`}
          >
            Letters to the <em>editor.</em>
          </h2>
          <div className="hidden lg:block" />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {letters.map((l, i) => (
            <figure
              key={l.name}
              className={`flex flex-col border-t border-[#1F1B17] pt-6 ${i === 0 ? "md:col-span-3 md:grid md:grid-cols-[150px_minmax(0,1fr)] md:gap-14 lg:grid-cols-[150px_minmax(0,1fr)_230px]" : ""}`}
            >
              {i === 0 && (
                <p
                  aria-hidden
                  className={`${serif} hidden text-[110px] leading-[0.7] text-[#8A2B22] md:block`}
                >
                  &ldquo;
                </p>
              )}
              <blockquote
                className={
                  i === 0
                    ? `${serif} text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-balance`
                    : "text-[19px] leading-[1.55] italic"
                }
              >
                {i === 0 ? l.quote : <>&ldquo;{l.quote}&rdquo;</>}
              </blockquote>
              <figcaption
                className={`${i === 0 ? "mt-6 md:mt-0 md:self-end" : "mt-6"}`}
              >
                <p className="text-[15px] font-medium">{l.name}</p>
                <p className={`${label} mt-1 text-[10px] text-[#5E554B]`}>
                  {l.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §6 Subscriptions — pricing                                          */
/* ------------------------------------------------------------------ */

const plans = [
  {
    name: "Free",
    price: "$0",
    per: "for as long as you like",
    blurb: "A commonplace book for one desk.",
    items: [
      "Unlimited notes",
      "One device",
      "Automatic links & backlinks",
      "Daily notes, graph, full-text search",
    ],
    cta: "Begin free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$8",
    per: "per month",
    blurb: "The whole notebook, everywhere, remembering.",
    items: [
      "Everything in Free",
      "End-to-end encrypted sync, all devices",
      "Ask your notes, with citations",
      "Daily resurfacing",
    ],
    cta: "Start Pro",
    featured: true,
  },
  {
    name: "Teams",
    price: "$14",
    per: "per member, per month",
    blurb: "Shared shelves for people who think together.",
    items: [
      "Everything in Pro",
      "Shared spaces with their own backlinks",
      "Ask across a team’s notes",
      "Admin & billing in one place",
    ],
    cta: "Start a team",
    featured: false,
  },
];

function Subscriptions() {
  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-title"
      className="border-t border-[#CDBFA8] bg-[#EAE2D3]"
    >
      <div className={`${shell} py-20 lg:py-28`}>
        <div className={grid}>
          <SectionMark n={6} title="Subscriptions" />
          <div>
            <h2
              id="subscribe-title"
              className={`${serif} text-[clamp(2.3rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em]`}
            >
              Rates of <em>subscription.</em>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.6] text-[#3D362F]">
              Free is not a trial. Keep it forever; pay only when you want the
              notebook to follow you between devices and begin to answer
              back.
            </p>
          </div>
          <div className="hidden lg:block" />
        </div>

        <div className="mt-14 grid border-y border-[#1F1B17] md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`relative flex flex-col px-0 py-10 md:px-8 lg:px-10 ${i > 0 ? "border-t border-[#CDBFA8] md:border-t-0 md:border-l" : ""} ${p.featured ? "md:bg-[#F3EDE2]" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className={`${serif} text-[32px] leading-none italic`}>
                  {p.name}
                </h3>
                {p.featured && (
                  <span className={`${label} text-[10px] text-[#8A2B22]`}>
                    Most readers
                  </span>
                )}
              </div>
              <p className="mt-3 text-[15px] text-[#5E554B] italic">
                {p.blurb}
              </p>
              <p className="mt-8 flex items-baseline gap-3">
                <span
                  className={`${serif} text-[64px] leading-none tracking-[-0.02em]`}
                >
                  {p.price}
                </span>
                <span className={`${label} text-[10px] text-[#5E554B]`}>
                  {p.per}
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-[16px] leading-[1.45]">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span aria-hidden className="text-[#8A2B22]">
                      ¶
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#begin"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] transition-colors ${
                  p.featured
                    ? "bg-[#1F1B17] text-[#F3EDE2] hover:bg-[#8A2B22]"
                    : "border border-[#1F1B17] hover:bg-[#1F1B17] hover:text-[#F3EDE2]"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <p className={`${label} mt-5 text-[10px] text-[#5E554B]`}>
          Prices in USD. Your notes stay yours on every plan, as plain
          Markdown files.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA + Colophon                                                */
/* ------------------------------------------------------------------ */

function Begin() {
  const platforms = ["macOS", "Windows", "Linux", "iOS", "Android", "Web"];
  return (
    <section
      id="begin"
      aria-labelledby="begin-title"
      className={`${shell} py-24 text-center lg:py-36`}
    >
      <p className={`${serif} text-[28px] text-[#8A2B22]`} aria-hidden>
        ❦
      </p>
      <h2
        id="begin-title"
        className={`${serif} mx-auto mt-6 max-w-[14ch] text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-balance`}
      >
        Write it down. <em className="text-[#8A2B22]">Mneme</em> will
        remember.
      </h2>
      <p className="mx-auto mt-8 max-w-[44ch] text-[18px] leading-[1.6] text-[#3D362F]">
        Your first page takes a minute. The rest of your notebook will take a
        lifetime, and that&rsquo;s rather the point.
      </p>
      <div className="mt-10 flex justify-center">
        <PrimaryButton>Download Mneme — free</PrimaryButton>
      </div>
      <ul
        aria-label="Available platforms"
        className={`${label} mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[#5E554B]`}
      >
        {platforms.map((p, i) => (
          <li key={p} className="flex items-center gap-5">
            {p}
            {i < platforms.length - 1 && (
              <span aria-hidden className="text-[#CDBFA8]">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Colophon() {
  const cols: [string, string[]][] = [
    ["Product", ["Download", "Web clipper", "Changelog", "Pricing"]],
    ["Commons", ["Field guide", "Import from elsewhere", "Community"]],
    ["House", ["About", "Privacy", "Security", "Write to us"]],
  ];
  return (
    <footer className="bg-[#1F1B17] text-[#C9BEAE]">
      <div className={`${shell} pt-16 pb-[120px]`}>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className={`${serif} text-[40px] leading-none text-[#EFE7DA] italic`}>
              Mneme
            </p>
            <p className="mt-4 max-w-[36ch] text-[14px] leading-[1.6] italic">
              Colophon — This page is set in Instrument Serif and Newsreader,
              with labels in IBM Plex Mono. Printed on no paper whatsoever.
            </p>
          </div>
          {cols.map(([head, items]) => (
            <nav key={head} aria-label={head}>
              <p className={`${label} text-[10px] text-[#A99D8D]`}>{head}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="text-[#EFE7DA] underline-offset-4 hover:text-[#D98C7F] hover:underline"
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div
          className={`${label} mt-16 flex flex-col gap-2 border-t border-[#4A423A] pt-6 text-[10px] text-[#A99D8D] sm:flex-row sm:justify-between`}
        >
          <span>© 2026 Mneme Press. Your notes remain yours.</span>
          <span>Fin.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div
      className={`${display.variable} ${text.variable} ${mono.variable} min-h-screen w-full flex-1 bg-[#F3EDE2] font-[family-name:var(--font-text)] text-[#1F1B17] antialiased selection:bg-[#8A2B22] selection:text-[#F3EDE2]`}
    >
      <Masthead />
      <main>
        <Hero />
        <Specimen />
        <Contents />
        <Ask />
        <Resurfacing />
        <Letters />
        <Subscriptions />
        <Begin />
      </main>
      <Colophon />
    </div>
  );
}
