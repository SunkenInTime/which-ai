import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Board } from "./board";
import { CORK, Pin, Tape, tornBottom, type PinColor } from "./bits";
import { display, hand, typewriter } from "./fonts";

export const metadata: Metadata = {
  title: "Mneme — Your brain is for having ideas, not holding them",
  description:
    "Mneme catches every scrap you throw at it, pins the related bits together on its own, and hands them back right when they matter.",
};

const INK = "#231C15";
const PAPER = "#FBF4E4";
const DOTS: CSSProperties = {
  backgroundColor: PAPER,
  backgroundImage: "radial-gradient(rgba(35,28,21,.13) 1px, transparent 1.3px)",
  backgroundSize: "22px 22px",
};

const PLATFORMS = ["macOS", "Windows", "Linux", "iOS", "Android", "Web"];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="relative inline-flex items-center gap-2">
      <svg aria-hidden width="28" height="28" viewBox="0 0 28 28">
        <rect x="3" y="6" width="20" height="19" rx="2" fill={light ? PAPER : "#F5B83D"} transform="rotate(-6 13 15)" />
        <rect x="6" y="4" width="19" height="19" rx="2" fill={light ? "#F5B83D" : "#FFFFFF"} stroke={light ? "none" : INK} strokeWidth="1.6" transform="rotate(4 15 13)" />
        <circle cx="15.5" cy="6" r="4" fill="#E4472C" />
        <circle cx="14.3" cy="4.8" r="1.2" fill="#FFB3A3" />
      </svg>
      <span className={`text-[26px] font-extrabold tracking-[-0.04em] ${light ? "text-[#FBF4E4]" : "text-[#231C15]"}`}>
        mneme
      </span>
    </span>
  );
}

function Scribble({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-(family-name:--font-hand) leading-none ${className}`}>{children}</span>
  );
}

function Arrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 80 50" fill="none" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 8 C 26 2, 50 10, 66 36" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M56 34 L 67 38 L 69 26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrimaryButton({ children, href = "#pricing", tone = "tomato" }: { children: ReactNode; href?: string; tone?: "tomato" | "marigold" }) {
  const styles =
    tone === "tomato"
      ? "bg-[#CC3A21] text-white"
      : "bg-[#F5B83D] text-[#231C15]";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border-2 border-[#231C15] px-6 py-3 text-[17px] font-bold shadow-[4px_4px_0_#231C15] transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-[6px_6px_0_#231C15] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#2446C8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#231C15] ${styles}`}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Nav + hero                                                          */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="mx-auto flex max-w-[1240px] items-center justify-between px-5 pt-5 sm:px-8">
      <a href="#top" aria-label="Mneme home" className="rounded-md focus-visible:outline-3 focus-visible:outline-[#2446C8]">
        <Logo />
      </a>
      <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
        {[
          ["Features", "#features"],
          ["The app", "#app"],
          ["Pricing", "#pricing"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="hidden rounded-full px-3 py-1.5 text-[15px] font-semibold text-[#231C15] hover:bg-[#231C15]/[0.07] focus-visible:outline-3 focus-visible:outline-[#2446C8] md:inline-block"
          >
            {label}
          </a>
        ))}
        <a
          href="#pricing"
          className="ml-2 rounded-full border-2 border-[#231C15] bg-[#231C15] px-4 py-1.5 text-[15px] font-bold text-[#FBF4E4] hover:bg-[#3A3029] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2446C8]"
        >
          Download
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:pb-28"
    >
      <div className="max-w-[560px]">
        <p className="flex items-center gap-2">
          <Scribble className="-rotate-2 text-[26px] text-[#CC3A21]">say it &ldquo;nee-mee.&rdquo; like the muse.</Scribble>
        </p>
        <h1
          id="hero-title"
          className="mt-4 text-[clamp(44px,7.4vw,84px)] lg:text-[clamp(56px,5.6vw,84px)] font-extrabold leading-[0.9] tracking-[-0.045em] text-[#231C15]"
        >
          Your brain is for having ideas,{" "}
          <span className="relative inline-block">
            <span className="relative z-10">not holding</span>
            <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 z-0 h-[0.32em] w-full">
              <path d="M3 13 C 70 4, 150 18, 297 7" stroke="#F5B83D" strokeWidth="11" strokeLinecap="round" fill="none" />
            </svg>
          </span>{" "}
          them.
        </h1>
        <p className="mt-7 max-w-[470px] text-[19px] leading-[1.5] text-[#231C15]/85">
          Mneme catches every scrap you throw at it &mdash; voice memos, receipts,
          half a thought at 11:48&nbsp;pm &mdash; then quietly pins the related
          bits together and hands them back the moment they matter.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <PrimaryButton>
            Download free
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-y-0.5">
              <path d="M9 2v11M4 8.5 9 13.5l5-5M3 16h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PrimaryButton>
          <a href="#app" className="text-[17px] font-bold text-[#231C15] underline decoration-[#E4472C] decoration-[3px] underline-offset-[6px] hover:decoration-[#231C15] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#2446C8]">
            See it tidy up
          </a>
        </div>
        <p className="mt-8 text-[14px] font-medium text-[#231C15]/70">
          Unlimited notes, free forever on one device.
          <br className="sm:hidden" /> {PLATFORMS.join(" · ")}
        </p>
      </div>
      <div className="w-full lg:w-auto">
        <Board />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capture strip                                                       */
/* ------------------------------------------------------------------ */

function CaptureStrip() {
  const items = [
    ["⌥ Space", "from the menubar"],
    ["Share sheet", "on your phone"],
    ["in@mneme.app", "forward any email"],
    ["Web clipper", "keep the article, lose the ads"],
    ["Hold to talk", "voice memos, transcribed"],
  ];
  return (
    <section aria-label="Ways to capture" className="border-y-2 border-[#231C15] bg-[#231C15] text-[#FBF4E4]">
      <ul className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-x-10 gap-y-4 px-5 py-6 sm:px-8">
        {items.map(([k, v]) => (
          <li key={k} className="flex items-baseline gap-2.5">
            <span className="rounded-[4px] border border-[#FBF4E4]/40 px-2 py-0.5 font-(family-name:--font-type) text-[14px] text-[#F5B83D]">
              {k}
            </span>
            <span className="text-[15px] text-[#FBF4E4]/80">{v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

type Feature = {
  no: string;
  title: string;
  body: string;
  note: string;
  rotate: string;
  pin?: PinColor;
  tape?: boolean;
  paper: CSSProperties;
  dark?: boolean;
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    no: "no. 1",
    title: "Catches everything",
    body: "Menubar, phone, email, browser, your own voice. If you can think it near a device, it’s already in.",
    note: "yes, even the 2am ones",
    rotate: "-rotate-[1.6deg]",
    pin: "tomato",
    paper: { background: "#E9D3A6" },
    visual: (
      <div className="flex flex-wrap gap-1.5">
        {["⌥ Space", "Share", "in@", "Clip", "● Rec 0:12"].map((t, i) => (
          <span
            key={t}
            className={`rounded-[3px] border-[1.5px] border-[#231C15] px-2 py-0.5 font-(family-name:--font-type) text-[12px] ${i === 4 ? "bg-[#CC3A21] text-white" : "bg-[#FBF4E4]"}`}
          >
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    no: "no. 2",
    title: "Links itself",
    body: "Mneme reads along and suggests links to notes you forgot you had. One tap to accept. Backlinks on every note, no bookkeeping.",
    note: "string not included",
    rotate: "rotate-[1.2deg]",
    tape: true,
    paper: {
      background:
        "linear-gradient(#E4472C,#E4472C) 0 46px / 100% 1.5px no-repeat, repeating-linear-gradient(#FFFDF6 0 27px, #C9DAEE 27px 28px) 0 48px / 100% 100% no-repeat, #FFFDF6",
    },
    visual: (
      <svg aria-hidden viewBox="0 0 220 60" className="h-[60px] w-full max-w-[220px]">
        <path d="M22 38 Q 70 6 110 30 T 198 22" stroke="#D32F1A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M110 30 Q 130 58 160 50" stroke="#D32F1A" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="4 5" />
        {[
          [22, 38, "#2446C8"],
          [110, 30, "#E4472C"],
          [198, 22, "#F5B83D"],
          [160, 50, "#231C15"],
        ].map(([x, y, c]) => (
          <circle key={`${x}`} cx={x} cy={y} r="7" fill={c as string} stroke="#231C15" strokeWidth="1.5" />
        ))}
      </svg>
    ),
  },
  {
    no: "no. 3",
    title: "Answers back",
    body: "Ask a question in plain words. Get an answer written from your own notes, with footnotes that open the exact note it came from.",
    note: "citations to your own brain",
    rotate: "-rotate-[0.8deg]",
    pin: "marigold",
    dark: true,
    paper: { background: "#2446C8" },
    visual: (
      <div className="space-y-2 text-[13px] leading-snug">
        <p className="w-fit max-w-[92%] rounded-[10px] rounded-bl-[2px] bg-white/15 px-3 py-2">
          What did Sam say about Q3 pricing?
        </p>
        <p className="ml-auto w-fit max-w-[92%] rounded-[10px] rounded-br-[2px] bg-[#FBF4E4] px-3 py-2 text-[#231C15]">
          Hold at $8 until sync ships on Android{" "}
          <sup className="font-bold text-[#CC3A21]">1</sup>, then test $9 with new
          signups only <sup className="font-bold text-[#CC3A21]">2</sup>.
        </p>
      </div>
    ),
  },
  {
    no: "no. 4",
    title: "Brings things back",
    body: "Each morning, a short feed: what you wrote a year ago today, and the old notes that rhyme with whatever you’re writing now.",
    note: "like a friend with a great memory",
    rotate: "rotate-[2deg]",
    pin: "cobalt",
    paper: { background: "linear-gradient(165deg,#FFD867,#F5B83D)" },
    visual: (
      <div className="rounded-[3px] border-[1.5px] border-[#231C15] bg-[#FFF8E4] p-3 text-[13px] leading-snug">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#231C15]/70">
          1 year ago today &middot; Sep 22, 2025
        </p>
        <p className="mt-1 text-[#231C15]">
          &ldquo;Every time I hear that bakery jingle I&rsquo;m back in Gran&rsquo;s kitchen.&rdquo;
        </p>
      </div>
    ),
  },
  {
    no: "no. 5",
    title: "Stays yours",
    body: "Plain Markdown files on your own disk. End-to-end encrypted sync. Works on a plane, in a tunnel, and long after we’re gone.",
    note: "we can’t read it. nobody can.",
    rotate: "-rotate-[1.4deg]",
    tape: true,
    paper: {
      backgroundColor: "#FFFDF6",
      backgroundImage:
        "linear-gradient(rgba(36,70,200,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(36,70,200,.12) 1px, transparent 1px)",
      backgroundSize: "14px 14px",
    },
    visual: (
      <div className="rounded-[3px] bg-[#231C15] p-3 font-(family-name:--font-type) text-[12px] leading-[1.6] text-[#FBF4E4]">
        <p className="text-[#F5B83D]">~/Mneme $ ls</p>
        <p>2026-09-22.md</p>
        <p>why-songs-stick.md</p>
        <p>priya-spaced-rep.md &nbsp;<span className="text-[#FBF4E4]/70">🔒 e2e</span></p>
      </div>
    ),
  },
  {
    no: "no. 6",
    title: "Does the basics beautifully",
    body: "Daily notes waiting every morning. A graph view you’ll actually open. Search that finishes before you do.",
    note: "38 ms. we timed it.",
    rotate: "rotate-[0.9deg]",
    pin: "ink",
    paper: { background: "#FFFFFF" },
    visual: (
      <div className="flex items-center gap-2 rounded-full border-[1.5px] border-[#231C15] bg-[#FBF4E4] px-3 py-2 text-[13px]">
        <kbd className="rounded-[4px] border border-[#231C15]/40 bg-white px-1.5 font-(family-name:--font-type) text-[11px]">⌘K</kbd>
        <span className="text-[#231C15]">cortado</span>
        <span className="ml-auto text-[11px] text-[#231C15]/70">7 notes &middot; 38 ms</span>
      </div>
    ),
  },
];

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" style={DOTS} className="scroll-mt-6">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="features-title" className="text-[clamp(38px,5.4vw,64px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#231C15]">
            Six things Mneme does so your head doesn&rsquo;t have to.
          </h2>
          <p className="max-w-[440px] text-[18px] leading-[1.55] text-[#231C15]/80 lg:justify-self-end">
            Most note apps are a very nice drawer. You put things in, and that&rsquo;s
            the last you see of them. Mneme is the friend who says
            &ldquo;wait, didn&rsquo;t you say something about this in March?&rdquo;
          </p>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className={`group relative ${f.rotate} motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:rotate-0`}
              style={{ filter: "drop-shadow(0 1px 1px rgba(40,20,0,.18)) drop-shadow(0 14px 18px rgba(80,40,0,.18))" }}
            >
              <article
                className={`relative flex h-full flex-col rounded-[3px] px-6 pb-6 pt-8 ${f.dark ? "text-white" : "text-[#231C15]"}`}
                style={f.paper}
              >
                <Scribble className={`text-[24px] ${f.dark ? "text-[#F5B83D]" : "text-[#CC3A21]"}`}>{f.no}</Scribble>
                <h3 className="mt-1 text-[28px] font-extrabold leading-[1.02] tracking-[-0.03em]">{f.title}</h3>
                <p className={`mt-3 text-[16px] leading-[1.5] ${f.dark ? "text-white/90" : "text-[#231C15]/85"}`}>{f.body}</p>
                <div className="mt-6 flex-1 content-end">{f.visual}</div>
                <Scribble className={`mt-4 block -rotate-1 text-[22px] ${f.dark ? "text-white/85" : "text-[#231C15]/70"}`}>
                  &mdash; {f.note}
                </Scribble>
              </article>
              {f.pin ? (
                <Pin color={f.pin} className="left-1/2 top-2 -translate-x-1/2" />
              ) : null}
              {f.tape ? <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product mock                                                        */
/* ------------------------------------------------------------------ */

function WikiLink({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[3px] bg-[#2446C8]/[0.09] px-1 font-semibold text-[#2446C8]">
      {children}
    </span>
  );
}

function AppMock() {
  return (
    <div className="relative overflow-hidden rounded-[14px] border-2 border-[#231C15] bg-white text-[#231C15] shadow-[10px_10px_0_#231C15]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b-2 border-[#231C15] bg-[#FBF4E4] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border border-[#231C15] bg-[#E4472C]" />
        <span className="h-3 w-3 rounded-full border border-[#231C15] bg-[#F5B83D]" />
        <span className="h-3 w-3 rounded-full border border-[#231C15] bg-[#9BC47A]" />
        <span className="mx-auto hidden items-center gap-2 rounded-full border border-[#231C15]/25 bg-white px-3 py-1 text-[12px] text-[#231C15]/70 sm:flex">
          <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5" cy="5" r="3.6" stroke="currentColor" strokeWidth="1.4" /><path d="m8 8 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          Search 2,184 notes
          <kbd className="font-(family-name:--font-type) text-[11px]">⌘K</kbd>
        </span>
        <span className="ml-auto text-[12px] font-semibold text-[#231C15]/70 sm:ml-0">Synced &middot; e2e</span>
      </div>

      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)_320px]">
        {/* sidebar */}
        <aside aria-label="Sidebar" className="hidden border-r-2 border-[#231C15]/10 bg-[#FBF7EE] p-4 text-[13px] lg:block">
          <p className="rounded-md bg-[#231C15] px-2.5 py-1.5 font-semibold text-[#FBF4E4]">Today &middot; Tue, Sep 22</p>
          <ul className="mt-3 space-y-1">
            {[
              ["Inbox", "4"],
              ["Resurfaced", "3"],
              ["Graph", ""],
              ["Ask", ""],
            ].map(([t, n]) => (
              <li key={t} className="flex justify-between rounded-md px-2.5 py-1 hover:bg-[#231C15]/5">
                <span>{t}</span>
                <span className="text-[#231C15]/70">{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#231C15]/70">Pinned</p>
          <ul className="mt-1.5 space-y-1">
            {[
              ["Why do songs stick?", true],
              ["Reading: The Extended Mind", false],
              ["Podcast ideas, Q4", false],
              ["Kitchen reno: numbers", false],
            ].map(([t, active]) => (
              <li
                key={t as string}
                className={`truncate rounded-md px-2.5 py-1 ${active ? "bg-[#F5B83D]/40 font-semibold" : ""}`}
              >
                {t}
              </li>
            ))}
          </ul>
        </aside>

        {/* editor */}
        <div className="relative p-6 sm:p-9">
          <p className="text-[12px] text-[#231C15]/70">Ideas / Memory</p>
          <h3 className="mt-2 text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Why do songs stick when books don&rsquo;t?
          </h3>
          <p className="mt-2 text-[12px] text-[#231C15]/70">Edited 11:48 pm &middot; 412 words &middot; 6 links</p>
          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.65] text-[#231C15]/90">
            <p>
              Walking home I realised I can sing every word of <em>Dreams</em> but
              can&rsquo;t recall one argument from the last three books I read.{" "}
              <WikiLink>Voice memo &mdash; Sep 3</WikiLink>
            </p>
            <p>
              Theory: the chorus is a <strong>retrieval cue</strong>. It repeats, it
              has rhythm, and it&rsquo;s{" "}
              <span className="relative">
                <span className="underline decoration-[#E4472C] decoration-wavy decoration-[1.5px] underline-offset-4">
                  attached to a place
                </span>
              </span>
              . Books get none of that unless I build it. See{" "}
              <WikiLink>The Extended Mind &mdash; ch. 5</WikiLink>.
            </p>
            {/* inline suggestion */}
            <div className="relative ml-0 max-w-[400px] rounded-[10px] border-2 border-[#231C15] bg-[#FFF8E4] p-3.5 shadow-[4px_4px_0_#E4472C] sm:ml-10">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#CC3A21]">
                <svg aria-hidden width="12" height="12" viewBox="0 0 12 12"><path d="M5 7a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 7 1.5l-.7.7M7 5a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 5 10.5l.7-.7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
                Mneme found a link
              </p>
              <p className="mt-1.5 text-[14px] leading-snug">
                &ldquo;attached to a place&rdquo; sounds like{" "}
                <strong>Memory palaces, a skeptic&rsquo;s notes</strong>{" "}
                <span className="text-[#231C15]/70">(Mar 14, 2025)</span>
              </p>
              <div className="mt-3 flex gap-2 text-[13px] font-bold">
                <span className="rounded-full bg-[#231C15] px-3 py-1 text-[#FBF4E4]">Link it</span>
                <span className="rounded-full border border-[#231C15]/30 px-3 py-1">Not now</span>
              </div>
            </div>
            <p className="pt-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#231C15]/70">Try</p>
            <ul className="space-y-1.5">
              <li className="flex gap-2.5">
                <span aria-hidden className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border-2 border-[#231C15] bg-[#231C15] text-[10px] text-white">✓</span>
                <span className="text-[#231C15]/60 line-through">Ask Priya for that spaced-repetition paper</span>
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden className="mt-1.5 h-4 w-4 shrink-0 rounded-[4px] border-2 border-[#231C15]" />
                <span>Three-line summary after every chapter. Set it to a tune. (Half joking.)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* right rail */}
        <div className="border-t-2 border-[#231C15]/10 bg-[#FBF7EE] p-5 lg:border-l-2 lg:border-t-0">
          <div className="rounded-[10px] border-2 border-[#231C15] bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2446C8]">Ask your notes</p>
            <p className="mt-2 rounded-md bg-[#FBF4E4] px-3 py-2 text-[14px]">
              What have I read about why music helps memory?
            </p>
            <p className="mt-3 text-[14px] leading-[1.55]">
              You&rsquo;ve circled this three times. <em>The Extended Mind</em>{" "}
              argues rhythm and place offload recall{" "}
              <sup className="font-bold text-[#2446C8]">1</sup>. Your Sep&nbsp;3
              memo asks the same question out loud{" "}
              <sup className="font-bold text-[#2446C8]">2</sup>. And in March you
              doubted memory palaces, but admitted the rhyming ones worked{" "}
              <sup className="font-bold text-[#2446C8]">3</sup>.
            </p>
            <ol className="mt-3 space-y-1 border-t border-dashed border-[#231C15]/25 pt-3 text-[12px] text-[#231C15]/75">
              <li>1&ensp;Reading: The Extended Mind</li>
              <li>2&ensp;Voice memo &mdash; Sep 3, walking home</li>
              <li>3&ensp;Memory palaces, a skeptic&rsquo;s notes</li>
            </ol>
          </div>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#231C15]/70">Backlinks &middot; 4</p>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            {["Podcast ideas, Q4", "2026-09-03 (daily)", "Reading: The Extended Mind", "Priya 1:1 notes"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="text-[#E4472C]">&larr;</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 rotate-[-1deg] rounded-[3px] bg-[#F5B83D] p-3.5 shadow-[2px_3px_0_rgba(35,28,21,.25)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#231C15]/75">
              Resurfaced &middot; 1 year ago
            </p>
            <p className="mt-1 text-[13.5px] leading-snug">
              &ldquo;Every time I hear that bakery jingle I&rsquo;m back in Gran&rsquo;s kitchen.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Product() {
  return (
    <section id="app" aria-labelledby="app-title" className="scroll-mt-6 border-y-2 border-[#231C15]" style={CORK}>
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="relative mx-auto max-w-[760px] rotate-[-0.6deg] rounded-[3px] bg-[#FBF4E4] px-7 py-8 text-center shadow-[0_18px_30px_-12px_rgba(60,30,0,.5)] sm:px-12">
          <Pin color="cobalt" className="left-6 top-3" />
          <Pin color="marigold" className="right-6 top-3" />
          <Scribble className="text-[24px] text-[#CC3A21]">meanwhile, inside the app</Scribble>
          <h2 id="app-title" className="mt-2 text-[clamp(34px,4.8vw,56px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#231C15]">
            Same mess. Tidied.
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.55] text-[#231C15]/80">
            Every scrap from the board is now a real note: linked to its
            neighbours, searchable in a blink, and one question away from being
            useful.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <AppMock />
          <div aria-hidden className="pointer-events-none absolute -top-16 left-[46%] hidden items-end gap-1 text-[#FFF6E2] lg:flex" style={{ textShadow: "0 1px 2px rgba(60,30,0,.6)" }}>
            <Scribble className="text-[27px]">it spotted this one on its own</Scribble>
            <Arrow className="h-10 w-16 translate-y-6" />
          </div>
          <div aria-hidden className="pointer-events-none absolute -bottom-20 right-4 hidden items-start gap-1 text-[#FFF6E2] lg:flex" style={{ textShadow: "0 1px 2px rgba(60,30,0,.6)" }}>
            <Arrow className="h-10 w-16 -translate-y-3 -scale-y-100" flip />
            <Scribble className="mt-3 text-[27px]">footnotes to your own brain</Scribble>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const QUOTES = [
  {
    quote:
      "I used to keep forty tabs open and a Notes folder called ‘misc 3’. Now I have Mneme and slightly fewer tabs.",
    name: "Imani Okafor",
    role: "ER physician, Leeds",
    rotate: "-rotate-[2deg]",
    bg: "#FFFFFF",
  },
  {
    quote:
      "Ask found a quote I clipped in 2023 in about a second. My co-host thinks I have a photographic memory. I have a subscription.",
    name: "Tomás Reyes",
    role: "Host, Loose Threads podcast",
    rotate: "rotate-[1.5deg] lg:translate-y-8",
    bg: "#FFE7A8",
  },
  {
    quote:
      "The resurfacing feed is the only notification I’m glad to get. It hands me my own old ideas right when they’re finally useful.",
    name: "Hannah Lindqvist",
    role: "PhD candidate, history of science",
    rotate: "-rotate-[0.8deg]",
    bg: "#FFFDF6",
  },
];

function Testimonials() {
  return (
    <section aria-labelledby="quotes-title" style={DOTS}>
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <h2 id="quotes-title" className="max-w-[720px] text-[clamp(34px,4.8vw,56px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#231C15]">
          Notes from people who used to lose theirs.
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {QUOTES.map((q) => (
            <li key={q.name} className={`relative ${q.rotate}`}>
              <figure
                className="relative h-full rounded-[3px] px-6 pb-6 pt-9 shadow-[0_1px_1px_rgba(40,20,0,.18),0_16px_24px_-10px_rgba(80,40,0,.3)]"
                style={{ background: q.bg }}
              >
                <Tape className="-top-3 left-6 -rotate-6" />
                <svg aria-hidden width="34" height="26" viewBox="0 0 34 26" className="text-[#E4472C]">
                  <path d="M0 26V15C0 6 5 1 13 0l1 4c-4 1-7 4-7 9h6v13H0Zm20 0V15c0-9 5-14 13-15l1 4c-4 1-7 4-7 9h6v13H20Z" fill="currentColor" />
                </svg>
                <blockquote className="mt-4 text-[19px] font-medium leading-[1.45] tracking-[-0.01em] text-[#231C15]">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-dashed border-[#231C15]/30 pt-4">
                  <span className="block text-[16px] font-bold text-[#231C15]">{q.name}</span>
                  <span className="block text-[14px] text-[#231C15]/70">{q.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

const TAG_SHAPE = "polygon(22% 0, 78% 0, 100% 9%, 100% 100%, 0 100%, 0 9%)";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    aside: "no, really. forever.",
    color: "#FFFDF6",
    ink: INK,
    rotate: "-rotate-[3deg]",
    items: [
      "Unlimited notes",
      "1 device",
      "Auto-links, backlinks, graph view",
      "Daily notes & instant search",
      "Plain Markdown, yours to keep",
    ],
    cta: "Download free",
  },
  {
    name: "Pro",
    price: "$8",
    per: "per month",
    aside: "less than two cortados",
    color: "#F5B83D",
    ink: INK,
    rotate: "rotate-[1deg] md:-translate-y-4",
    featured: true,
    items: [
      "Everything in Free",
      "E2E-encrypted sync on every device",
      "Ask your notes, with citations",
      "Daily resurfacing feed",
      "Voice memo transcription",
    ],
    cta: "Start Pro",
  },
  {
    name: "Teams",
    price: "$14",
    per: "per person / month",
    aside: "for brains that work together",
    color: "#2446C8",
    ink: "#FFFFFF",
    rotate: "rotate-[3deg]",
    items: [
      "Everything in Pro",
      "Shared spaces for the team",
      "Ask across a shared space",
      "One bill, simple admin",
    ],
    cta: "Start a team",
  },
];

function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-6 border-t-2 border-[#231C15] bg-[#EBDDBF]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="text-center">
          <Scribble className="text-[26px] text-[#CC3A21]">price tags, as promised</Scribble>
          <h2 id="pricing-title" className="mt-2 text-[clamp(38px,5.4vw,64px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#231C15]">
            Pick a tag. Any tag.
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[18px] leading-[1.55] text-[#231C15]/80">
            Start free with unlimited notes. Upgrade when you want your second
            brain in more than one place.
          </p>
        </div>

        {/* string the tags hang from */}
        <div className="relative mt-16">
          <svg aria-hidden className="absolute -top-6 left-0 hidden h-16 w-full md:block" viewBox="0 0 1000 60" preserveAspectRatio="none">
            <path d="M0 8 Q 500 70 1000 8" stroke="#8A5A2E" strokeWidth="2.5" fill="none" />
          </svg>
          <ul className="relative grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
            {PLANS.map((p) => {
              const dark = p.ink === "#FFFFFF";
              return (
                <li key={p.name} className={`relative mx-auto w-full max-w-[340px] origin-top pt-10 motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:rotate-0 ${p.rotate}`}>
                  <div style={{ filter: "drop-shadow(0 1px 1px rgba(40,20,0,.25)) drop-shadow(0 16px 18px rgba(80,40,0,.25))" }}>
                    <article
                      className="relative px-7 pb-8 pt-16"
                      style={{ clipPath: TAG_SHAPE, background: p.color, color: p.ink }}
                    >
                      {/* eyelet */}
                      <span aria-hidden className="absolute left-1/2 top-6 h-6 w-6 -translate-x-1/2 rounded-full border-[5px] border-[#C9B38A] bg-[#EBDDBF] shadow-[inset_0_2px_3px_rgba(0,0,0,.3)]" />
                      {p.featured ? (
                        <span className="absolute right-5 top-14 rotate-[10deg] rounded-full border-2 border-[#CC3A21] px-2.5 py-1 font-(family-name:--font-hand) text-[20px] leading-none text-[#B8321B]">
                          most loved
                        </span>
                      ) : null}
                      <h3 className="text-[22px] font-extrabold uppercase tracking-[0.08em]">{p.name}</h3>
                      <p className="mt-3 flex items-baseline gap-2">
                        <span className="text-[68px] font-extrabold leading-none tracking-[-0.05em]">{p.price}</span>
                        <span className={`text-[15px] font-semibold ${dark ? "text-white/80" : "text-[#231C15]/75"}`}>{p.per}</span>
                      </p>
                      <Scribble className={`mt-1 block text-[22px] ${dark ? "text-[#F5B83D]" : "text-[#B8321B]"}`}>{p.aside}</Scribble>
                      <div className={`my-6 border-t-2 border-dashed ${dark ? "border-white/40" : "border-[#231C15]/30"}`} />
                      <ul className="space-y-2.5 text-[15.5px]">
                        {p.items.map((it) => (
                          <li key={it} className="flex gap-2.5">
                            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="mt-0.5 shrink-0" fill="none">
                              <path d="M3 9.5 7 13 15 4.5" stroke={dark ? "#F5B83D" : "#CC3A21"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {it}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#top"
                        className={`mt-8 flex w-full justify-center rounded-full border-2 px-5 py-3 text-[16px] font-bold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#231C15] ${
                          dark
                            ? "border-white bg-white text-[#2446C8] hover:bg-[#FBF4E4]"
                            : p.featured
                              ? "border-[#231C15] bg-[#231C15] text-[#FBF4E4] hover:bg-[#3A3029]"
                              : "border-[#231C15] text-[#231C15] hover:bg-[#231C15] hover:text-[#FBF4E4]"
                        }`}
                      >
                        {p.cta}
                      </a>
                    </article>
                  </div>
                  {/* twine loop through the eyelet */}
                  <svg aria-hidden className="absolute left-1/2 top-0 z-10 h-20 w-10 -translate-x-1/2" viewBox="0 0 40 80" fill="none">
                    <path d="M20 0 C 7 30, 11 68, 20 76 C 29 68, 33 30, 20 0" stroke="#8A5A2E" strokeWidth="2.2" />
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-14 text-center text-[15px] text-[#231C15]/75">
          Every plan: all six platforms, offline mode, and a one-click export of plain Markdown.
          No lock-in, no hostage notes.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA + footer                                                  */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="border-y-2 border-[#231C15] bg-[#CC3A21]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="relative mx-auto max-w-[820px]" style={{ filter: "drop-shadow(0 22px 26px rgba(70,10,0,.35))" }}>
          <div
            className="relative rotate-[-1deg] bg-[#FBF4E4] px-7 pb-16 pt-14 text-center sm:px-14"
            style={{ clipPath: tornBottom(28, 9) }}
          >
            <h2 id="cta-title" className="text-[clamp(40px,6.4vw,76px)] font-extrabold leading-[0.92] tracking-[-0.045em] text-[#231C15]">
              Clear your desk.
              <br />
              Keep every thought.
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] text-[18px] leading-[1.55] text-[#231C15]/80">
              Free to start, unlimited notes, and your files stay plain Markdown on
              your own machine. The receipts can finally go in the bin.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <PrimaryButton>Download Mneme, free</PrimaryButton>
              <p className="text-[14px] font-medium text-[#231C15]/70">{PLATFORMS.join(" · ")}</p>
            </div>
          </div>
          <Tape className="-top-3 left-8 -rotate-12" />
          <Tape className="-top-3 right-8 rotate-6" />
          <div aria-hidden className="absolute -top-20 right-2 hidden items-end gap-1 text-[#FBF4E4] sm:flex">
            <Scribble className="text-[26px]">go on, before you forget</Scribble>
            <Arrow className="h-10 w-14 translate-y-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Product", ["Download", "Pricing", "Web clipper", "Changelog"]],
    ["Company", ["Manifesto", "Careers", "Press kit"]],
    ["Trust", ["Privacy", "Security", "Encryption whitepaper"]],
  ] as const;
  return (
    <footer className="bg-[#231C15] text-[#FBF4E4]">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-[120px] pt-16 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-[300px] text-[15px] leading-[1.55] text-[#FBF4E4]/75">
            Named for Mneme, the Greek muse of memory. Pronounced &ldquo;nee-mee.&rdquo;
            Built by people who lose their keys.
          </p>
        </div>
        {cols.map(([h, links]) => (
          <nav key={h} aria-label={h}>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#F5B83D]">{h}</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-[#FBF4E4]/85 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-[#F5B83D]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <p className="border-t border-[#FBF4E4]/15 pt-6 text-[13px] text-[#FBF4E4]/70 md:col-span-4">
          &copy; 2026 Mneme Labs. Your notes are yours. We just help you find them.
        </p>
      </div>
    </footer>
  );
}

export default function PinboardPage() {
  return (
    <div
      id="top"
      className={`${display.className} ${display.variable} ${hand.variable} ${typewriter.variable} min-h-screen w-full flex-1 overflow-x-clip text-[#231C15] antialiased selection:bg-[#F5B83D]`}
      style={DOTS}
    >
      <Nav />
      <main>
        <Hero />
        <CaptureStrip />
        <Features />
        <Product />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
