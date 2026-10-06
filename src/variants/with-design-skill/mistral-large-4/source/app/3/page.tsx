import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Mnemos — Ink",
};

const marginNotes = [
  "don't forget this one",
  "link to the essay idea?",
  "ask Sam about this",
];

export default function Ink() {
  return (
    <div
      className={`${lora.variable} ${caveat.variable} min-h-full bg-[#f5eeda] text-[#2b2a26]`}
      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(43,58,94,0.12) 31px 32px)",
        }}
      />

      <header className="relative mx-auto flex max-w-3xl items-end justify-between px-6 pt-14 pb-4">
        <span
          className="text-4xl font-bold text-[#2b3a5e]"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Mnemos
        </span>
        <nav
          className="flex gap-6 text-sm italic text-[#2b3a5e]"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          <Link href="#" className="text-xl hover:underline">capture</Link>
          <Link href="#" className="text-xl hover:underline">connect</Link>
          <Link href="#" className="text-xl hover:underline">recall</Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-3xl px-6 py-10">
        <div className="relative border-l-2 border-[#e08a8a] pl-8">
          <span
            className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-[#e08a8a]"
            aria-hidden
          />
          <p
            className="text-sm italic text-[#2b3a5e]"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            a notebook that never runs out of pages
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-[#2b3a5e] md:text-6xl">
            Write it down{" "}
            <span className="italic underline decoration-[#e08a8a] decoration-2 underline-offset-8">
              before it slips away
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Mnemos feels like the notebook you loved — ink on cream paper, a
            red margin line, room for little notes in the margin — except
            nothing is ever lost, and every page links to every other.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#"
              className="rounded-sm border-2 border-[#2b3a5e] bg-[#2b3a5e] px-6 py-3 text-sm font-medium tracking-wide text-[#f5eeda] shadow-[3px_3px_0_rgba(43,58,94,0.35)] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_rgba(43,58,94,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b3a5e]"
            >
              Start a notebook
            </Link>
            <Link
              href="#"
              className="rounded-sm border-2 border-[#2b3a5e] px-6 py-3 text-sm font-medium tracking-wide text-[#2b3a5e] transition-transform hover:-translate-y-0.5 hover:bg-[#2b3a5e] hover:text-[#f5eeda] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b3a5e]"
            >
              See how it works
            </Link>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ["Capture", "Scribble a thought in seconds. It lands on a page, dated and kept."],
            ["Connect", "Draw a line between two notes. Ink never forgets a thread."],
            ["Recall", "Flip back by day, by mood, or by a single word you remember."],
          ].map(([t, b]) => (
            <article
              key={t}
              className="relative rotate-[-1deg] border border-[#d8cfae] bg-[#fbf7e8] p-5 shadow-[4px_4px_0_rgba(43,58,94,0.12)] odd:rotate-[1deg]"
            >
              <h3
                className="text-2xl font-bold text-[#2b3a5e]"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{b}</p>
            </article>
          ))}
        </section>

        <aside className="relative mt-16">
          {marginNotes.map((n, i) => (
            <p
              key={n}
              className="absolute text-lg text-[#b04a4a]"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                right: `${-40 - i * 10}px`,
                top: `${i * 34}px`,
                transform: `rotate(${(i - 1) * 4}deg)`,
              }}
              aria-hidden
            >
              {n} ↩
            </p>
          ))}
          <blockquote className="border-l-2 border-[#e08a8a] pl-6 text-xl italic leading-relaxed text-[#2b3a5e]">
            “The palest ink is better than the best memory.”
          </blockquote>
          <p className="mt-2 pl-6 text-sm text-[#8a8272]">— Chinese proverb</p>
        </aside>
      </main>

      <footer className="relative mx-auto max-w-3xl px-6 pb-16 pt-10 text-center">
        <p
          className="text-xl text-[#2b3a5e]"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Mnemos — your thoughts, on paper that never runs out
        </p>
      </footer>
    </div>
  );
}
