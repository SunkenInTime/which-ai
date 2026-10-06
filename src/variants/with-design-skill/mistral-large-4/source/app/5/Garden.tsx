"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Fraunces, Karla } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
});

const seeds = [
  { text: "idea: build a treehouse", x: 12, y: 18, s: 1 },
  { text: "note: call the plumber", x: 78, y: 12, s: 0.85 },
  { text: "thought: why do ideas arrive in the shower?", x: 62, y: 55, s: 1.1 },
  { text: "link: shower -> morning pages", x: 25, y: 70, s: 0.9 },
  { text: "idea: write a letter, by hand", x: 85, y: 78, s: 0.8 },
  { text: "note: buy coffee beans", x: 45, y: 35, s: 0.75 },
];

export default function Garden() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`${fraunces.variable} ${karla.variable} min-h-full bg-[#241b2e] text-[#f3ead9]`}
      style={{ fontFamily: "var(--font-karla), sans-serif" }}
    >
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathe, .seed { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="breathe absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#3d2b4f] opacity-70 blur-3xl"
          style={{ animation: "breathe 9s ease-in-out infinite" }}
        />
        <div
          className="breathe absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#5a3d2b] opacity-50 blur-3xl"
          style={{ animation: "breathe 11s ease-in-out infinite 1.5s" }}
        />
        <div
          className="breathe absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#2b4a3d] opacity-40 blur-3xl"
          style={{ animation: "breathe 13s ease-in-out infinite 3s" }}
        />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <span
          className="text-3xl font-semibold italic text-[#e8b96f]"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          Mnemos
        </span>
        <nav className="flex gap-7 text-sm text-[#cbbfa8]">
          <Link href="#" className="hover:text-[#e8b96f]">Plant</Link>
          <Link href="#" className="hover:text-[#e8b96f]">Grow</Link>
          <Link href="#" className="hover:text-[#e8b96f]">Remember</Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-16">
        <section className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#e8b96f]">
            A garden for your thoughts
          </p>
          <h1
            className="mt-5 text-5xl font-normal leading-[1.1] md:text-6xl"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Let your ideas grow wild.{" "}
            <span className="italic text-[#e8b96f]">Tend them gently.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#cbbfa8]">
            Mnemos is a second brain that behaves like a living thing. Plant a
            thought, water it with links, and watch understanding bloom. No
            folders to maintain — just a garden that grows the way you think.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#"
              className="rounded-full bg-[#e8b96f] px-7 py-3.5 font-bold text-[#241b2e] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b96f]"
            >
              Plant your first note
            </Link>
            <Link
              href="#"
              className="rounded-full border border-[#8a7a5f] px-7 py-3.5 font-medium text-[#e8d9b8] transition-colors hover:border-[#e8b96f] hover:text-[#e8b96f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b96f]"
            >
              Wander the garden
            </Link>
          </div>
        </section>

        <section className="relative mt-20 h-96 overflow-hidden rounded-[2.5rem] border border-[#4a3a5e] bg-[#2c2138]">
          <svg
            className="absolute inset-0 h-full w-full text-[#e8b96f] opacity-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M12 18 Q 40 30 45 35 T 62 55" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
            <path d="M78 12 Q 60 30 45 35" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
            <path d="M25 70 Q 35 55 45 35" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
            <path d="M85 78 Q 70 60 62 55" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" />
          </svg>
          {seeds.map((seed, i) => (
            <div
              key={seed.text}
              className="seed absolute max-w-40 rounded-2xl rounded-tl-sm border border-[#5e4a78] bg-[#382a4a] px-4 py-3 text-xs leading-snug text-[#e8d9b8] shadow-lg"
              style={{
                left: `${seed.x}%`,
                top: `${seed.y}%`,
                opacity: visible ? 1 : 0,
                transform: visible ? `scale(${seed.s})` : "scale(0.6)",
                transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s`,
              }}
            >
              {seed.text}
            </div>
          ))}
          <p className="absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.2em] text-[#8a7a5f]">
            live view — your mind, growing
          </p>
        </section>

        <section className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            ["Plant", "Drop a thought in. Any thought. It takes root instantly, no filing required."],
            ["Grow", "Link related notes and the connections strengthen. Your web of ideas deepens with use."],
            ["Remember", "Wander back anytime. The garden keeps everything, and helps you find your way."],
          ].map(([t, b], i) => (
            <article
              key={t}
              className="rounded-[2rem] border border-[#4a3a5e] bg-[#2c2138]/70 p-7"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ease ${0.5 + i * 0.15}s, transform 0.7s ease ${0.5 + i * 0.15}s`,
              }}
            >
              <h3
                className="text-2xl italic text-[#e8b96f]"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {t}
              </h3>
              <p className="mt-3 leading-relaxed text-[#cbbfa8]">{b}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="relative mx-auto max-w-6xl px-6 pb-14 pt-16">
        <p
          className="text-center text-xl italic text-[#8a7a5f]"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          “A mind is a garden, not a filing cabinet.”
        </p>
      </footer>
    </div>
  );
}
