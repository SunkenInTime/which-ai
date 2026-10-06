import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Newsreader } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Mnemos — Broadsheet",
};

const notes = [
  {
    title: "On the habit of morning pages",
    body: "Three pages, longhand, before coffee. Not for anyone to read — for the mind to stretch.",
    tag: "Ritual",
  },
  {
    title: "Ideas are shy",
    body: "They arrive while walking, while washing up. Capture first, judge later. The second brain keeps what the first would drop.",
    tag: "Capture",
  },
  {
    title: "Connections over folders",
    body: "A note is not a file. It is a node. Link it to the thought it came from and the thought it will become.",
    tag: "Connect",
  },
];

export default function Broadsheet() {
  return (
    <div
      className={`${fraunces.variable} ${newsreader.variable} min-h-full bg-[#f7f3ea] text-[#1c1917]`}
      style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
    >
      <header className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-baseline justify-between border-b-[3px] border-double border-[#1c1917] pb-3">
          <span
            className="text-3xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Mnemos
          </span>
          <span className="text-sm italic">The second brain gazette</span>
          <span className="font-mono text-xs uppercase tracking-widest">
            Est. today
          </span>
        </div>
        <nav className="flex justify-center gap-8 border-b border-[#1c1917] py-2 font-mono text-xs uppercase tracking-widest">
          <Link href="#" className="hover:underline">Capture</Link>
          <Link href="#" className="hover:underline">Connect</Link>
          <Link href="#" className="hover:underline">Recall</Link>
          <Link href="#" className="hover:underline">Pricing</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 border-b border-[#1c1917] pb-6 text-center lg:col-span-8 lg:text-left">
            <h1
              className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Your mind, in print.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed lg:mx-0">
              <span className="float-left mr-2 text-6xl font-black leading-[0.8]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                M
              </span>
              nemos is a note-taking app built like a good notebook: every idea
              captured, every thread followed, nothing filed away and forgotten.
              Write freely. Link liberally. Remember everything.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="#"
                className="bg-[#1c1917] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#f7f3ea] hover:bg-[#44403c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1917]"
              >
                Start writing
              </Link>
              <Link
                href="#"
                className="border border-[#1c1917] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#1c1917] hover:text-[#f7f3ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1917]"
              >
                Read the manifesto
              </Link>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:border-l lg:border-[#1c1917] lg:pl-8">
            <h2 className="font-mono text-xs uppercase tracking-widest">
              From the newsroom
            </h2>
            <ul className="mt-4 space-y-5">
              {notes.map((n) => (
                <li key={n.title} className="border-b border-[#d6cfc0] pb-4 last:border-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a8a29e]">
                    {n.tag}
                  </span>
                  <h3
                    className="mt-1 text-lg font-semibold leading-snug"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {n.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#57534e]">
                    {n.body}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="mt-12 grid grid-cols-1 gap-8 border-t-[3px] border-double border-[#1c1917] pt-8 md:grid-cols-3">
          {[
            ["Capture", "Thoughts arrive unannounced. One keystroke saves them before they vanish."],
            ["Connect", "Every note can link to any other. Your ideas form a web, not a pile."],
            ["Recall", "Search that understands. Find the note you half-remember by meaning, not keywords."],
          ].map(([t, b]) => (
            <article key={t} className="border-t border-[#1c1917] pt-3">
              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#57534e]">{b}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="mx-auto max-w-6xl border-t border-[#1c1917] px-6 py-6 text-center font-mono text-xs uppercase tracking-widest text-[#78716c]">
        Mnemos — set in Fraunces &amp; Newsreader — print your thoughts
      </footer>
    </div>
  );
}
