"use client";

import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

const stream = [
  "idea: morning pages, before coffee",
  "link: morning pages -> daily ritual",
  "capture: the best ideas arrive while walking",
  "link: walking -> idea: commute notes",
  "recall: what did I think about focus last tuesday?",
  "node: focus -> deep work -> flow state",
  "sync: 128 notes, 342 links, 0 lost",
];

const stats = [
  ["notes indexed", "12,408"],
  ["links formed", "3,917"],
  ["recall time", "0.4s"],
  ["uptime", "99.99%"],
];

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setLines((prev) => [...prev, stream[i % stream.length]]);
      i += 1;
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`${plexMono.variable} min-h-full bg-[#050807] font-mono text-[#7ef0b2]`}
      style={{ fontFamily: "var(--font-plex-mono), monospace" }}
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,160,110,0.12),transparent_60%)]" />

      <header className="relative mx-auto flex max-w-5xl items-center justify-between border-b border-[#123b2c] px-6 py-4 text-xs">
        <span className="text-[#3fae7f]">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#7ef0b2]" />
          mnemos://second-brain — online
        </span>
        <nav className="flex gap-6 uppercase tracking-widest text-[#3fae7f]">
          <Link href="#" className="hover:text-[#7ef0b2]">capture</Link>
          <Link href="#" className="hover:text-[#7ef0b2]">connect</Link>
          <Link href="#" className="hover:text-[#7ef0b2]">recall</Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#3fae7f]">
          $ mnemos init --brain 2
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#d9ffe9] md:text-6xl">
          A second brain,
          <br />
          running in your terminal.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#5fbf95]">
          Capture thoughts the moment they fire. Link them into a graph that
          grows while you sleep. Recall anything by asking in plain language.
          No folders. No friction. Just memory, extended.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          <Link
            href="#"
            className="border border-[#7ef0b2] bg-[#7ef0b2] px-5 py-3 font-semibold uppercase tracking-widest text-[#050807] hover:bg-transparent hover:text-[#7ef0b2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ef0b2]"
          >
            get started
          </Link>
          <Link
            href="#"
            className="border border-[#123b2c] px-5 py-3 uppercase tracking-widest text-[#5fbf95] hover:border-[#7ef0b2] hover:text-[#7ef0b2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ef0b2]"
          >
            read the docs
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(([k, v]) => (
            <div key={k} className="border border-[#123b2c] bg-[#0a1410] p-4">
              <p className="text-[10px] uppercase tracking-widest text-[#3fae7f]">
                {k}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#d9ffe9]">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-[#123b2c] bg-[#0a1410] p-4 text-xs leading-loose">
          <p className="text-[#3fae7f]">$ mnemos stream --live</p>
          <div aria-live="polite">
            {lines.map((l, i) => (
              <p key={i} className="text-[#7ef0b2]">
                <span className="text-[#2c6e50]">›</span> {l}
              </p>
            ))}
            <p className="animate-pulse text-[#7ef0b2]">▌</p>
          </div>
        </div>
      </main>

      <footer className="relative mx-auto max-w-5xl border-t border-[#123b2c] px-6 py-6 text-[10px] uppercase tracking-widest text-[#2c6e50]">
        mnemos v2.4.1 — all thoughts reserved
      </footer>
    </div>
  );
}
