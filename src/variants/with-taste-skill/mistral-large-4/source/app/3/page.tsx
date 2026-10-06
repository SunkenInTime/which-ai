import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "MNEMOS - NOTES. RAW. YOURS.",
  description:
    "A note-taking app with no decoration and no mercy. Plain text, fast keys, zero lock-in.",
};

const features = [
  { n: "01", t: "PLAIN TEXT", d: "Every note is a .md file. Read it anywhere, forever." },
  { n: "02", t: "KEYBOARD FIRST", d: "Capture in under 100ms. Your hands never leave the keys." },
  { n: "03", t: "NO CLOUD LOCK", d: "Sync is optional. Export is one command. Always." },
  { n: "04", t: "NO TRACKING", d: "No analytics. No ads. No dark patterns. Just notes." },
];

const ticker = [
  "CAPTURE", "CONNECT", "RECALL", "EXPORT", "OWN", "REPEAT",
];

export default function Page3() {
  return (
    <div className="min-h-[100dvh] bg-[#f2f0ea] text-black [font-family:var(--font-space-mono)]">
      {/* Top bar */}
      <div className="border-b-4 border-black bg-black px-4 py-2 text-xs uppercase tracking-widest text-[#f2f0ea]">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>MNEMOS.SYS v1.0</span>
          <span className="hidden md:inline">SECOND_BRAIN.EXE</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b-4 border-black bg-[#f2f0ea]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="./3" className="text-xl font-bold uppercase tracking-tighter">
            MNEMOS*
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-widest md:flex">
            <Link href="./3" className="hover:bg-black hover:text-[#f2f0ea] px-2 py-1">Features</Link>
            <Link href="./3" className="hover:bg-black hover:text-[#f2f0ea] px-2 py-1">Spec</Link>
            <Link href="./3" className="hover:bg-black hover:text-[#f2f0ea] px-2 py-1">Manifesto</Link>
          </nav>
          <Link
            href="./3"
            className="border-2 border-black bg-[#ff4d00] px-4 py-2 text-xs font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            RUN IT
          </Link>
        </div>
      </header>

      {/* Hero - brutalist, left aligned, huge type */}
      <section className="border-b-4 border-black px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em]">
            [ A NOTE-TAKING APP FOR PEOPLE WHO HATE NOTE-TAKING APPS ]
          </p>
          <h1 className="mt-6 [font-family:var(--font-archivo-black)] text-6xl leading-[0.9] tracking-tighter uppercase md:text-8xl lg:text-9xl">
            YOUR
            <br />
            SECOND
            <br />
            <span className="bg-black text-[#f2f0ea] px-2">BRAIN.</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:items-end">
            <p className="max-w-xl text-sm leading-relaxed uppercase tracking-wide">
              Capture. Connect. Recall. No folders. No friction. No
              subscription traps. Just a fast, plain-text second brain that
              belongs to you.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="./3"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#f2f0ea] shadow-[4px_4px_0_0_#ff4d00] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#ff4d00] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              >
                START FREE
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="./3"
                className="inline-flex items-center justify-center gap-2 border-2 border-black px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-[#f2f0ea]"
              >
                READ SPEC
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee - the one marquee on this page */}
      <div className="overflow-hidden border-b-4 border-black bg-[#ff4d00] py-3">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8 text-sm font-bold uppercase tracking-widest text-black">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((word, i) => (
            <span key={i} className="flex items-center gap-8">
              {word}
              <Asterisk size={14} weight="bold" />
            </span>
          ))}
        </div>
      </div>

      {/* Features - brutalist grid with hard borders */}
      <section className="border-b-4 border-black px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="[font-family:var(--font-archivo-black)] text-4xl uppercase tracking-tighter md:text-6xl">
            SPEC SHEET
          </h2>
          <div className="mt-10 grid grid-cols-1 border-4 border-black md:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.n}
                className="border-b-4 border-black p-8 last:border-b-0 md:border-b-0 md:border-r-4 md:odd:border-r-4 md:last:border-r-0 md:[&:nth-child(3)]:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-black px-2 py-1 text-xs font-bold text-[#f2f0ea]">
                    {f.n}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-stone-500">
                    OK
                  </span>
                </div>
                <h3 className="mt-6 [font-family:var(--font-archivo-black)] text-2xl uppercase tracking-tight">
                  {f.t}
                </h3>
                <p className="mt-3 text-xs leading-relaxed uppercase tracking-wide text-stone-600">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - raw numbers */}
      <section className="border-b-4 border-black px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-0 border-4 border-black md:grid-cols-3">
          {[
            { v: "<100MS", l: "CAPTURE TIME" },
            { v: "0", l: "TRACKERS" },
            { v: "100%", l: "EXPORTABLE" },
          ].map((s) => (
            <div
              key={s.l}
              className="border-b-4 border-black p-8 text-center last:border-b-0 md:border-b-0 md:border-r-4 md:last:border-r-0"
            >
              <div className="[font-family:var(--font-archivo-black)] text-4xl uppercase md:text-5xl">
                {s.v}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-stone-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="border-b-4 border-black px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <blockquote className="text-lg leading-relaxed uppercase tracking-wide md:text-2xl">
            &ldquo;IT&rsquo;S THE FIRST NOTES APP THAT DOESN&rsquo;T TRY TO BE
            CLEVER. IT JUST WORKS.&rdquo;
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-widest text-stone-500">
            -- R. VASQUEZ, BETA TESTER
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl border-4 border-black bg-[#ff4d00] p-10 shadow-[8px_8px_0_0_#000] md:p-16">
          <h2 className="[font-family:var(--font-archivo-black)] text-4xl uppercase leading-[0.95] tracking-tighter md:text-6xl">
            STOP THINKING.
            <br />
            START WRITING.
          </h2>
          <Link
            href="./3"
            className="mt-8 inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#f2f0ea] shadow-[4px_4px_0_0_#f2f0ea] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#f2f0ea] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            RUN MNEMOS
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black px-4 py-8 text-xs uppercase tracking-widest text-[#f2f0ea]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <span>MNEMOS. YOURS.</span>
          <div className="flex gap-6">
            <Link href="./3" className="hover:text-[#ff4d00]">GITHUB</Link>
            <Link href="./3" className="hover:text-[#ff4d00]">DISCORD</Link>
            <Link href="./3" className="hover:text-[#ff4d00]">RSS</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_18s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
