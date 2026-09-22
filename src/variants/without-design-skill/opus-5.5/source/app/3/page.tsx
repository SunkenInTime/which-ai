import type { Metadata } from "next";
import Link from "next/link";
import { Workspace } from "./workspace";

export const metadata: Metadata = {
  title: "Mneme — Notes that link themselves",
  description:
    "Capture anywhere. Mneme links related notes on its own, answers questions from your writing with citations, and keeps everything as plain Markdown on your device.",
};

const ACCENT_CSS = `
@keyframes mn-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@keyframes mn-pop { from { opacity: 0; transform: translateY(-6px) scale(.985) } to { opacity: 1; transform: none } }
@keyframes mn-blink { 0%, 45% { opacity: 1 } 50%, 95% { opacity: 0 } }
@keyframes mn-shimmer { 0% { opacity: .55 } 50% { opacity: 1 } 100% { opacity: .55 } }
.mn-in { animation: mn-in .32s cubic-bezier(.2,.8,.2,1) both }
.mn-pop { animation: mn-pop .2s cubic-bezier(.2,.8,.2,1) both }
.mn-shimmer { animation: mn-shimmer 1.1s ease-in-out infinite }
.mn-caret { display:inline-block; width:1.5px; height:1.1em; margin-left:2px; vertical-align:-2px; background:#E0461F; animation: mn-blink 1.1s steps(1) infinite }
@media (prefers-reduced-motion: reduce) {
  .mn-in, .mn-pop, .mn-shimmer, .mn-caret { animation: none }
}
`;

/* ---------- small primitives ---------- */

function Kbd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[6px] border border-[#DEDFE3] bg-white px-1.5 font-mono text-[11.5px] leading-none text-[#4A4F5A] shadow-[0_1px_0_#DEDFE3] ${className}`}
    >
      {children}
    </kbd>
  );
}

function Shortcut({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-[3px]">
      {keys.map((k) => (
        <Kbd key={k}>{k}</Kbd>
      ))}
    </span>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="6.5" fill="#0F1115" />
      <path
        d="M6.5 16.5V8.2c0-.5.6-.7.9-.3L12 13.5l4.6-5.6c.3-.4.9-.2.9.3v8.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17.3" r="1.5" fill="#F2542D" />
    </svg>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${className}`} fill="none" aria-hidden>
      <path d="M3.5 8.4l2.8 2.8 6.2-6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[12px] tracking-tight text-[#B83A15]">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-[#F2542D]" aria-hidden />
      {children}
    </p>
  );
}

/* ---------- nav ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E9EAED]/80 bg-[#F7F7F8]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-8 px-5 sm:px-8">
        <Link href="#" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2542D]">
          <Logo className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Mneme</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-[13.5px] text-[#555B67]">
            {[
              ["Features", "#features"],
              ["Ask", "#ask"],
              ["Pricing", "#pricing"],
              ["Changelog", "#"],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="transition-colors hover:text-[#0F1115]">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href="#" className="hidden px-3 py-1.5 text-[13.5px] text-[#555B67] hover:text-[#0F1115] sm:block">
            Log in
          </a>
          <a
            href="#download"
            className="inline-flex h-8 items-center rounded-[8px] bg-[#0F1115] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-[#2A2E37]"
          >
            Download
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] [background-image:linear-gradient(#E9EAED_1px,transparent_1px),linear-gradient(90deg,#E9EAED_1px,transparent_1px)] [background-size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_30%,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-[760px] text-center">
          <a
            href="#ask"
            className="inline-flex items-center gap-2 rounded-full border border-[#E3E4E8] bg-white py-1 pr-3 pl-1 text-[12.5px] text-[#3A3F4A] shadow-[0_1px_2px_rgba(16,18,24,.04)] transition-colors hover:border-[#D2D4D9]"
          >
            <span className="rounded-full bg-[#FFEDE6] px-2 py-0.5 font-medium text-[#B83A15]">New</span>
            Ask your notes — answers with citations
            <span aria-hidden className="text-[#9AA0AB]">→</span>
          </a>
          <h1 className="mt-7 text-[44px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-[#0F1115] sm:text-[68px] lg:text-[76px]">
            Notes that link
            <br className="hidden sm:block" /> <span className="text-[#E0461F]">themselves.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.55] text-pretty text-[#555B67] sm:text-[18px]">
            Write it down anywhere. Mneme connects it to everything you already know, and hands it back the moment
            it matters. Plain Markdown, on your device.
          </p>
          <div id="download" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#E0461F] px-5 text-[14.5px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,.25)_inset,0_1px_2px_rgba(224,70,31,.4),0_6px_16px_-4px_rgba(224,70,31,.45)] transition-colors hover:bg-[#C93D19] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0461F] sm:w-auto"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M11.2 8.5c0-1.6 1.3-2.3 1.4-2.4-.8-1.1-1.9-1.3-2.3-1.3-1-.1-1.9.6-2.4.6-.5 0-1.3-.6-2.1-.6-1.1 0-2.1.6-2.6 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.6 2 1.6s1.1-.5 2.1-.5 1.3.5 2.1.5c.9 0 1.4-.8 1.9-1.6.6-.9.9-1.8.9-1.8s-1.8-.7-1.8-2.6zM9.6 3.6c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.4-.7 1.1-.6 1.8.7.1 1.4-.3 1.8-.8z" />
              </svg>
              Download for macOS
            </a>
            <a
              href="#"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[#DADCE0] bg-white px-5 text-[14.5px] font-medium text-[#0F1115] transition-colors hover:border-[#C4C7CD] sm:w-auto"
            >
              Open in browser
            </a>
          </div>
          <p className="mt-4 text-[12.5px] text-[#6B717D]">
            Free forever for one device · Also on Windows, Linux, iOS and Android
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1120px] sm:mt-16">
          <div
            aria-hidden
            className="absolute -inset-x-10 -top-10 bottom-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(242,84,45,.10),transparent_70%)]"
          />
          <Workspace />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-[#6B717D]">
            <span className="flex items-center gap-2">
              Press <Shortcut keys={["⌘", "K"]} /> to ask this note a question
            </span>
            <span className="hidden h-3 w-px bg-[#D9DBE0] sm:block" aria-hidden />
            <span>
              Click <span className="font-medium text-[#0F1115]">Link</span> on a suggestion to connect it
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- features bento ---------- */

function Tile({
  className = "",
  eyebrow,
  title,
  body,
  shortcut,
  children,
  id,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  body: string;
  shortcut?: string[];
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={`group flex flex-col overflow-hidden rounded-[16px] border border-[#E6E7EA] bg-white shadow-[0_1px_2px_rgba(16,18,24,.03)] ${className}`}
    >
      <div className="relative flex-1 overflow-hidden border-b border-[#F0F1F3] bg-[#FAFAFB] p-5 sm:p-6">{children}</div>
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <div className="flex-1">
          <p className="font-mono text-[11.5px] text-[#8A909B]">{eyebrow}</p>
          <h3 className="mt-1.5 text-[17px] font-semibold tracking-[-0.015em] text-[#0F1115]">{title}</h3>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-[#555B67]">{body}</p>
        </div>
        {shortcut && (
          <div className="pt-0.5">
            <Shortcut keys={shortcut} />
          </div>
        )}
      </div>
    </article>
  );
}

function CaptureFragment() {
  const sources = ["Menubar", "iPhone", "Email", "Web clipper", "Voice memo"];
  return (
    <div className="flex h-full flex-col">
      {/* menubar */}
      <div className="-mx-5 -mt-5 flex h-7 items-center gap-4 border-b border-[#ECEDF0] bg-white/80 px-5 text-[11.5px] text-[#3A3F4A] sm:-mx-6 sm:-mt-6 sm:px-6" aria-hidden>
        <span className="font-medium">Finder</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="ml-auto flex items-center gap-3.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[#0F1115]/[.08]">
            <Logo className="h-3.5 w-3.5" />
          </span>
          <span className="font-mono">Tue 9:41</span>
        </span>
      </div>
      <div className="mt-4 ml-auto w-full max-w-[400px] rounded-[12px] border border-[#DADCE0] bg-white p-3.5 shadow-[0_12px_32px_-12px_rgba(16,18,24,.25)]">
        <div className="flex items-center justify-between text-[11.5px] text-[#7A808B]">
          <span>Quick capture → Inbox</span>
          <span className="flex items-center gap-[3px]">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>N</Kbd>
          </span>
        </div>
        <p className="mt-2.5 text-[14px] leading-[1.55] text-[#1B1E25]">
          Call w/ Dana: launch moves to Oct 14. She wants the pricing page copy by Friday{" "}
          <span className="text-[#B83A15]">#launch</span>
          <span className="mn-caret" aria-hidden />
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-[#F0F1F3] pt-2.5 text-[11.5px] text-[#7A808B]">
          <span>Suggests: [[Launch plan — Oct]]</span>
          <span className="flex items-center gap-1">
            <Kbd>↵</Kbd> save
          </span>
        </div>
      </div>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Capture sources">
        {sources.map((s) => (
          <li key={s} className="rounded-full border border-[#E3E4E8] bg-white px-2.5 py-1 text-[11.5px] text-[#3A3F4A]">
            {s}
          </li>
        ))}
        <li className="rounded-full border border-dashed border-[#E3E4E8] px-2.5 py-1 font-mono text-[11px] text-[#6B717D]">
          inbox@you.mneme.app
        </li>
      </ul>
    </div>
  );
}

function AskFragment() {
  return (
    <div className="space-y-3">
      <div className="ml-auto w-fit max-w-[88%] rounded-[12px] rounded-br-[4px] bg-[#0F1115] px-3.5 py-2 text-[13px] text-white">
        When did we decide to drop weekly demos?
      </div>
      <div className="rounded-[12px] border border-[#E6E7EA] bg-white p-3.5 text-[13px] leading-[1.6] text-[#2A2E37]">
        March 12, 2025, after the team retro. Demos had become status updates
        <sup className="ml-0.5 rounded-[3px] bg-[#FFEDE6] px-[3px] font-mono text-[9.5px] text-[#B83A15]">1</sup>, so you
        moved to a written Friday digest instead
        <sup className="ml-0.5 rounded-[3px] bg-[#FFEDE6] px-[3px] font-mono text-[9.5px] text-[#B83A15]">2</sup>.
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Retro — Mar 12, 2025", "Friday digest template"].map((s, i) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#ECEDF0] bg-[#FAFAFB] px-2 py-1 text-[11.5px] text-[#3A3F4A]"
            >
              <span className="font-mono text-[10px] text-[#B83A15]">{i + 1}</span>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResurfaceFragment() {
  return (
    <div className="relative">
      <div className="absolute inset-x-4 -top-0 h-full translate-y-3 rounded-[12px] border border-[#E6E7EA] bg-white/60" aria-hidden />
      <div className="relative rounded-[12px] border border-[#E6E7EA] bg-white p-4 shadow-[0_8px_24px_-12px_rgba(16,18,24,.18)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#FFEDE6] px-2 py-0.5 text-[11px] font-medium text-[#B83A15]">
            1 year ago today
          </span>
          <span className="font-mono text-[11px] text-[#8A909B]">Sep 22, 2025</span>
        </div>
        <p className="mt-3 text-[14px] font-semibold text-[#0F1115]">Why onboarding needs a first win</p>
        <p className="mt-1 text-[13px] leading-[1.55] text-[#555B67]">
          “If someone doesn’t write one note on day one, they never come back. Make the first note trivially easy.”
        </p>
        <div className="mt-3 flex items-center gap-1.5 border-t border-[#F0F1F3] pt-2.5 text-[11.5px] text-[#6B717D]">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#E0461F]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M6.8 9.2a2.6 2.6 0 0 0 3.7 0l2-2a2.6 2.6 0 0 0-3.7-3.7l-.6.6M9.2 6.8a2.6 2.6 0 0 0-3.7 0l-2 2a2.6 2.6 0 0 0 3.7 3.7l.6-.6" strokeLinecap="round" />
          </svg>
          Relates to what you’re writing: <span className="font-medium text-[#1B1E25]">Onboarding — week 1</span>
        </div>
      </div>
    </div>
  );
}

function PrivateFragment() {
  const files = [
    ["daily/", "2026-09-22.md"],
    ["research/", "pricing-interviews.md"],
    ["reading/", "the-mom-test.md"],
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-[10px] border border-[#E6E7EA] bg-white p-3 font-mono text-[12px] leading-[1.9] text-[#3A3F4A]">
        <p className="text-[#8A909B]">~/Mneme</p>
        {files.map(([dir, f]) => (
          <p key={f} className="truncate pl-3">
            <span className="text-[#8A909B]">{dir}</span>
            {f}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 text-[11.5px]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1115] px-2.5 py-1 font-medium text-white">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M4 7.5h8v6H4zM5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" strokeLinejoin="round" />
          </svg>
          End-to-end encrypted
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E4E8] bg-white px-2.5 py-1 text-[#3A3F4A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9AA0AB]" aria-hidden />
          Offline · 3 changes queued
        </span>
      </div>
    </div>
  );
}

function GraphFragment() {
  const nodes: [number, number, number, boolean?][] = [
    [150, 80, 7, true],
    [70, 45, 4],
    [85, 125, 5],
    [230, 50, 5],
    [245, 120, 4],
    [175, 150, 4],
    [30, 95, 3],
    [120, 20, 3],
    [285, 85, 3],
    [205, 20, 3],
    [110, 165, 3],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [3, 9], [4, 8], [2, 10], [5, 4], [2, 6],
  ];
  return (
    <svg viewBox="0 0 310 180" className="h-full w-full" role="img" aria-label="Graph of linked notes around Pricing interviews">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={a === 0 ? "#F4A58E" : "#D9DBE0"}
          strokeWidth={a === 0 ? 1.4 : 1}
        />
      ))}
      {nodes.map(([x, y, r, hot], i) => (
        <g key={i}>
          {hot && <circle cx={x} cy={y} r={r + 7} fill="#F2542D" opacity=".12" />}
          <circle cx={x} cy={y} r={r} fill={hot ? "#E0461F" : "#fff"} stroke={hot ? "#E0461F" : "#A9AEB7"} strokeWidth="1.3" />
        </g>
      ))}
      <text x="150" y="104" textAnchor="middle" fontSize="10" fill="#3A3F4A" fontFamily="var(--font-geist-sans)">
        Pricing interviews
      </text>
    </svg>
  );
}

function SearchFragment() {
  return (
    <div className="rounded-[10px] border border-[#E6E7EA] bg-white">
      <div className="flex items-center gap-2 border-b border-[#F0F1F3] px-3 py-2.5 text-[13px]">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#8A909B]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.7 10.7L14 14" strokeLinecap="round" />
        </svg>
        <span className="text-[#0F1115]">
          annual bil<span className="mn-caret" aria-hidden />
        </span>
        <span className="ml-auto font-mono text-[11px] text-[#8A909B]">14 results · 9 ms</span>
      </div>
      <ul className="p-1.5 text-[12.5px]">
        {[
          ["Pricing interviews — synthesis", "…balked at annual billing before…"],
          ["Interview — Priya Raman", "…annual billing feels like a gym…"],
          ["Daily note — Sep 3", "…ask Tomás re annual billing…"],
        ].map(([t, s], i) => (
          <li key={t} className={`rounded-[6px] px-2 py-1.5 ${i === 0 ? "bg-[#F5F5F7]" : ""}`}>
            <p className="font-medium text-[#1B1E25]">{t}</p>
            <p className="truncate text-[#6B717D]">
              {s.split("annual bil").map((part, j, arr) => (
                <span key={j}>
                  {part}
                  {j < arr.length - 1 && <mark className="rounded-[2px] bg-[#FFE1D6] text-[#0F1115]">annual bil</mark>}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Eyebrow>01 — The whole loop</Eyebrow>
          <h2 className="mt-4 max-w-[520px] text-[34px] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-[#0F1115] sm:text-[44px]">
            Capture fast. Find it later. Skip the filing.
          </h2>
        </div>
        <p className="max-w-[460px] text-[16px] leading-[1.6] text-[#555B67] lg:justify-self-end">
          Most note apps are good at storing. Mneme is built for the part after: noticing that two ideas belong together,
          and putting the right one in front of you at the right time.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-6">
        <Tile
          className="md:col-span-4"
          eyebrow="Capture"
          title="From wherever the thought shows up"
          body="Menubar, phone, email forwarding, web clipper, voice memos. It all lands in one Inbox, already tagged and linked."
          shortcut={["⌘", "⇧", "N"]}
        >
          <CaptureFragment />
        </Tile>
        <Tile
          id="ask"
          className="scroll-mt-24 md:col-span-2"
          eyebrow="Ask"
          title="Ask your notes. Get sources."
          body="Plain-language questions, answered from your own writing. Every claim cites the note it came from."
          shortcut={["⌘", "K"]}
        >
          <AskFragment />
        </Tile>
        <Tile
          className="md:col-span-2"
          eyebrow="Resurface"
          title="Your past self, on time"
          body="A daily feed of what you wrote a year ago, and what relates to the note you have open right now."
        >
          <ResurfaceFragment />
        </Tile>
        <Tile
          className="md:col-span-2"
          eyebrow="Links itself"
          title="The graph builds itself"
          body="Mneme suggests links as you type and adds backlinks to every note. You accept or ignore. No folders to maintain."
          shortcut={["⌘", "G"]}
        >
          <div className="-m-2 h-[172px]">
            <GraphFragment />
          </div>
        </Tile>
        <Tile
          className="md:col-span-2"
          eyebrow="Local-first"
          title="Your files. Your device."
          body="Every note is a plain Markdown file you can open in any editor. Sync is end-to-end encrypted. Offline just works."
        >
          <PrivateFragment />
        </Tile>
        <Tile
          className="md:col-span-6 lg:col-span-6"
          eyebrow="Daily notes · Search · Graph"
          title="The fundamentals, fast"
          body="A fresh daily note every morning. Full-text search across years of writing before you finish typing. A graph view when you want the big picture."
          shortcut={["⌘", "⇧", "F"]}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SearchFragment />
            <DailyFragment />
          </div>
        </Tile>
      </div>
    </section>
  );
}

function DailyFragment() {
  const days = [
    ["Mon", "21", 3],
    ["Tue", "22", 5],
    ["Wed", "23", 0],
  ] as const;
  return (
    <div className="rounded-[10px] border border-[#E6E7EA] bg-white p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#0F1115]">Tuesday, September 22</p>
        <span className="flex items-center gap-[3px]">
          <Kbd>⌘</Kbd>
          <Kbd>D</Kbd>
        </span>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {days.map(([d, n, c]) => (
          <div
            key={n}
            className={`flex flex-1 flex-col items-center rounded-[7px] py-1.5 text-[11px] ${
              n === "22" ? "bg-[#0F1115] text-white" : "bg-[#F5F5F7] text-[#6B717D]"
            }`}
          >
            <span>{d}</span>
            <span className="text-[13px] font-semibold">{n}</span>
            <span className="mt-0.5 flex gap-0.5">
              {Array.from({ length: Math.min(c, 4) }).map((_, i) => (
                <span key={i} className={`h-1 w-1 rounded-full ${n === "22" ? "bg-[#FF8A66]" : "bg-[#B6BAC2]"}`} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-1 text-[12.5px] text-[#2A2E37]">
        <li>
          <span className="font-mono text-[11px] text-[#8A909B]">09:12</span>&nbsp; Standup: ship Ask citations to beta
        </li>
        <li>
          <span className="font-mono text-[11px] text-[#8A909B]">11:40</span>&nbsp; Lunch w/ Priya →{" "}
          <span className="text-[#B83A15]">[[Interview — Priya Raman]]</span>
        </li>
        <li>
          <span className="font-mono text-[11px] text-[#8A909B]">16:05</span>&nbsp; Synthesis draft done
        </li>
      </ul>
    </div>
  );
}

/* ---------- keyboard strip ---------- */

function KeyboardStrip() {
  const rows: [string[], string][] = [
    [["⌘", "K"], "Ask or jump anywhere"],
    [["⌘", "⇧", "N"], "Quick capture"],
    [["⌘", "L"], "Accept suggested link"],
    [["⌘", "D"], "Today’s note"],
    [["⌘", "G"], "Graph view"],
    [["⌘", "⇧", "F"], "Search everything"],
  ];
  return (
    <section aria-labelledby="kb-heading" className="mx-auto max-w-[1200px] px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="grid gap-10 rounded-[20px] border border-[#E6E7EA] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Eyebrow>02 — Keyboard first</Eyebrow>
          <h2 id="kb-heading" className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F1115] sm:text-[36px]">
            Never reach for the mouse.
          </h2>
          <p className="mt-4 max-w-[380px] text-[15.5px] leading-[1.6] text-[#555B67]">
            Every action has a shortcut, and every shortcut is one you’d guess. Opens in 180 ms, cold.
          </p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {rows.map(([k, label]) => (
            <li key={label} className="flex items-center justify-between gap-4 border-b border-[#F0F1F3] py-3.5 text-[14px] text-[#2A2E37]">
              {label}
              <Shortcut keys={k} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- social proof ---------- */

function Proof() {
  const quotes = [
    {
      q: "I asked Mneme what I’d promised my team in Q1 and got a four-line answer with three sources. That used to be an afternoon of scrolling.",
      name: "Adaeze Okafor",
      role: "Engineering manager, 7 years of notes",
    },
    {
      q: "The suggested links are the first auto-anything I haven’t turned off. It finds connections I’d forgotten I made.",
      name: "Jonas Lindqvist",
      role: "PhD candidate, cognitive science",
    },
    {
      q: "It’s a folder of Markdown files. If Mneme disappeared tomorrow I’d lose nothing. That’s why I trust it with everything.",
      name: "Mariana Costa",
      role: "Independent product designer",
    },
  ];
  return (
    <section aria-labelledby="proof-heading" className="mx-auto max-w-[1200px] px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>03 — In use</Eyebrow>
          <h2 id="proof-heading" className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F1115] sm:text-[36px]">
            People with a lot on their minds.
          </h2>
        </div>
        <dl className="flex gap-10">
          {[
            ["4.1M", "notes linked last month"],
            ["92%", "of suggested links accepted"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="text-[28px] font-semibold tracking-[-0.03em] text-[#0F1115] tabular-nums">{v}</dd>
              <dd className="text-[12.5px] text-[#6B717D]">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {quotes.map((t) => (
          <li key={t.name}>
            <figure className="flex h-full flex-col rounded-[16px] border border-[#E6E7EA] bg-white p-6">
              <blockquote className="flex-1 text-[15px] leading-[1.6] text-[#1B1E25]">“{t.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F2F4] text-[12px] font-semibold text-[#3A3F4A]"
                >
                  {t.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[13.5px] font-medium text-[#0F1115]">{t.name}</span>
                  <span className="block text-[12.5px] text-[#6B717D]">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- pricing ---------- */

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      unit: "forever",
      blurb: "Everything you need on one device.",
      cta: "Download",
      features: ["Unlimited notes", "Backlinks, graph view, daily notes", "Instant full-text search", "Quick capture & web clipper", "1 device"],
    },
    {
      name: "Pro",
      price: "$8",
      unit: "per month",
      blurb: "For the notes you’ll want in ten years.",
      cta: "Start 30-day trial",
      featured: true,
      features: [
        "Everything in Free",
        "End-to-end encrypted sync, all devices",
        "Ask your notes, with citations",
        "Daily resurfacing feed",
        "Email & voice capture",
      ],
    },
    {
      name: "Teams",
      price: "$14",
      unit: "per user / month",
      blurb: "Shared spaces for teams that write things down.",
      cta: "Talk to us",
      features: ["Everything in Pro", "Shared spaces with backlinks across people", "Ask across team notes", "Roles & permissions", "Priority support"],
    },
  ];
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow>04 — Pricing</Eyebrow>
        </div>
        <h2 id="pricing-heading" className="mt-4 text-[34px] leading-[1.08] font-semibold tracking-[-0.035em] text-[#0F1115] sm:text-[44px]">
          Free until you need a second device.
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.6] text-[#555B67]">
          No note limits on any plan. Cancel and your Markdown files stay exactly where they are.
        </p>
      </div>
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <li
            key={p.name}
            className={`relative flex flex-col rounded-[18px] p-7 ${
              p.featured
                ? "bg-[#0F1115] text-white shadow-[0_24px_48px_-20px_rgba(16,18,24,.45)]"
                : "border border-[#E6E7EA] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">{p.name}</h3>
              {p.featured && (
                <span className="rounded-full bg-[#F2542D] px-2.5 py-0.5 text-[11.5px] font-medium text-white">Most picked</span>
              )}
            </div>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="text-[44px] font-semibold tracking-[-0.04em] tabular-nums">{p.price}</span>
              <span className={`text-[13px] ${p.featured ? "text-white/65" : "text-[#6B717D]"}`}>{p.unit}</span>
            </p>
            <p className={`mt-1 text-[14px] ${p.featured ? "text-white/75" : "text-[#555B67]"}`}>{p.blurb}</p>
            <ul className={`mt-7 flex-1 space-y-2.5 border-t pt-6 text-[14px] ${p.featured ? "border-white/10 text-white/90" : "border-[#F0F1F3] text-[#2A2E37]"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className={`mt-[3px] ${p.featured ? "text-[#FF8A66]" : "text-[#E0461F]"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-8 inline-flex h-10 items-center justify-center rounded-[10px] text-[14px] font-medium transition-colors ${
                p.featured
                  ? "bg-[#E0461F] text-white hover:bg-[#C93D19]"
                  : "border border-[#DADCE0] bg-white text-[#0F1115] hover:border-[#C4C7CD]"
              }`}
            >
              {p.cta}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- CTA + footer ---------- */

function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto max-w-[1200px] px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="relative overflow-hidden rounded-[24px] border border-[#E6E7EA] bg-white px-6 py-16 text-center sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#E3E4E8_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]"
        />
        <div className="relative">
          <div className="flex items-center justify-center gap-2 text-[13px] text-[#6B717D]">
            Press <Shortcut keys={["⌘", "⇧", "N"]} /> anywhere
          </div>
          <h2 id="cta-heading" className="mt-6 text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-[#0F1115] sm:text-[60px]">
            Start with one note.
            <br />
            <span className="text-[#8A909B]">Mneme handles the rest.</span>
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#download"
              className="inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-[#E0461F] px-6 text-[14.5px] font-medium text-white transition-colors hover:bg-[#C93D19] sm:w-auto"
            >
              Download Mneme — free
            </a>
            <a href="#pricing" className="inline-flex h-11 items-center px-4 text-[14.5px] font-medium text-[#0F1115] hover:text-[#B83A15]">
              Compare plans →
            </a>
          </div>
          <p className="mt-6 text-[12.5px] text-[#6B717D]">macOS · Windows · Linux · iOS · Android · Web</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols: [string, string[]][] = [
    ["Product", ["Download", "Changelog", "Pricing", "Web clipper"]],
    ["Resources", ["Docs", "Shortcuts", "Markdown spec", "Import from Notion"]],
    ["Company", ["About", "Security", "Privacy", "Contact"]],
  ];
  return (
    <footer className="mx-auto max-w-[1200px] px-5 pt-24 pb-[120px] sm:px-8">
      <div className="grid gap-10 border-t border-[#E6E7EA] pt-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <span className="text-[15px] font-semibold">Mneme</span>
          </div>
          <p className="mt-3 max-w-[260px] text-[13px] leading-[1.6] text-[#6B717D]">
            Named for the muse of memory. Pronounced <span className="text-[#0F1115]">nee-mee</span>.
          </p>
        </div>
        {cols.map(([h, links]) => (
          <nav key={h} aria-label={h}>
            <h2 className="text-[12.5px] font-medium text-[#0F1115]">{h}</h2>
            <ul className="mt-3 space-y-2 text-[13px] text-[#6B717D]">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-[#0F1115]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-2 text-[12px] text-[#8A909B] sm:flex-row sm:justify-between">
        <p>© 2026 Mneme Labs. Your notes are yours.</p>
        <p className="font-mono">v4.2 · all systems normal</p>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F8] font-[family-name:var(--font-geist-sans)] text-[#0F1115] antialiased selection:bg-[#FFD9CC]">
      <style>{ACCENT_CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Features />
        <KeyboardStrip />
        <Proof />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
