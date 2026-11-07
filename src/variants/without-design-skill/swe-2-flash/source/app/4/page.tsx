import { Newsreader, Caveat } from "next/font/google";
import { APP_NAME, features, steps, testimonials } from "../lib/content";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const display = newsreader.className;
const sans = newsreader.className;
const hand = caveat.className;

function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-[#EDE0C0]/90 shadow-sm ${className}`}
    />
  );
}

function StickyWall() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-lg sm:h-[460px]">
      {/* dashed connectors */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 460"
        preserveAspectRatio="none"
        fill="none"
      >
        <g
          stroke="#2E2418"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
        >
          <path d="M120 110 C 180 90, 220 140, 260 170" className="animate-[dash-flow_3s_linear_infinite]" />
          <path d="M290 300 C 250 320, 210 300, 170 330" className="animate-[dash-flow_3s_linear_infinite_0.8s]" />
          <path d="M140 360 C 190 370, 240 350, 280 300" className="animate-[dash-flow_3s_linear_infinite_1.4s]" />
        </g>
        <circle cx="120" cy="110" r="4" fill="#C24E2A" />
        <circle cx="260" cy="170" r="4" fill="#C24E2A" />
        <circle cx="170" cy="330" r="4" fill="#C24E2A" />
        <circle cx="280" cy="300" r="4" fill="#C24E2A" />
      </svg>

      {/* Note 1 — yellow */}
      <div className="absolute left-2 top-2 w-44 rotate-[-5deg] rounded-sm bg-[#F6E27A] p-4 pt-5 shadow-[0_10px_24px_-10px_rgba(46,36,24,0.4)] sm:left-6">
        <Tape />
        <p className={`${hand} text-xl leading-tight text-[#3A2E1C]`}>
          Idea: spaced repetition, but for ideas not flashcards
        </p>
        <p className={`${hand} mt-2 text-base text-[#3A2E1C]/60`}>→ resurfaces when you need it</p>
      </div>

      {/* Note 2 — pink */}
      <div className="absolute right-0 top-16 w-48 rotate-[4deg] rounded-sm bg-[#F2B8C6] p-4 pt-5 shadow-[0_10px_24px_-10px_rgba(46,36,24,0.4)] sm:right-4">
        <Tape className="rotate-[7deg]" />
        <p className={`${hand} text-xl leading-tight text-[#3A2E1C]`}>
          Zettelkasten method — but the links write themselves
        </p>
      </div>

      {/* Note 3 — blue */}
      <div className="absolute bottom-24 left-0 w-52 rotate-[3deg] rounded-sm bg-[#B8CCE4] p-4 pt-5 shadow-[0_10px_24px_-10px_rgba(46,36,24,0.4)] sm:left-10">
        <Tape className="rotate-[-8deg]" />
        <p className={`${hand} text-xl leading-tight text-[#2E3A4A]`}>
          graph view shows clusters & lonely notes
        </p>
        <div className="mt-3 flex gap-1.5">
          {["#memory", "#links"].map((t) => (
            <span key={t} className={`${hand} rounded-full border border-[#2E3A4A]/30 px-2 text-sm text-[#2E3A4A]`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Note 4 — green */}
      <div className="absolute bottom-2 right-2 w-44 rotate-[-4deg] rounded-sm bg-[#C4DDB5] p-4 pt-5 shadow-[0_10px_24px_-10px_rgba(46,36,24,0.4)] sm:right-12">
        <Tape className="rotate-[5deg]" />
        <p className={`${hand} text-xl leading-tight text-[#2E3A24]`}>
          offline sync = capture on a plane ✈
        </p>
      </div>

      {/* coffee ring */}
      <div className="absolute -bottom-3 -left-4 h-24 w-24 rounded-full border-[10px] border-[#8A5A33]/10" />

      {/* big annotation */}
      <p className={`${hand} absolute -right-2 top-0 rotate-6 text-2xl text-[#C24E2A] sm:right-8`}>
        it connects itself! ↓
      </p>
    </div>
  );
}

function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={`h-10 w-14 ${className}`} fill="none">
      <path
        d="M4 6 C 20 2, 36 8, 44 22 M44 22 l-8 -2 M44 22 l-3 9"
        stroke="#C24E2A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function IterationFour() {
  return (
    <div className={`${sans} min-h-screen bg-[#F3ECDC] text-[#2E2418] antialiased`}>
      {/* subtle paper texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(46,36,24,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Nav */}
      <header className="relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#" className={`${display} text-2xl italic font-semibold`}>
            Synapse<span className="text-[#C24E2A]">.</span>
          </a>
          <nav className="hidden items-center gap-8 text-[15px] text-[#2E2418]/70 md:flex">
            <a href="#features" className="transition-colors hover:text-[#C24E2A]">Product</a>
            <a href="#process" className="transition-colors hover:text-[#C24E2A]">Process</a>
            <a href="#notes" className="transition-colors hover:text-[#C24E2A]">Field notes</a>
          </nav>
          <a
            href="#"
            className="rounded-full border-2 border-[#2E2418] bg-[#2E2418] px-5 py-2 text-sm font-semibold text-[#F3ECDC] transition-transform hover:-translate-y-0.5"
          >
            Start free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className={`${hand} text-2xl text-[#C24E2A]`}>
              hey — your second brain is overdue ↓
            </p>
            <h1
              className={`${display} mt-4 text-[2.8rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]`}
            >
              Keep every thought.{<br />}
              <em className="text-[#C24E2A]">Connect</em> them all.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#2E2418]/65">
              {APP_NAME} is a notebook that links itself. Jot an idea, clip an
              article, record a voice memo — and watch it weave itself into
              everything you already know.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#"
                className="rounded-full bg-[#C24E2A] px-7 py-3.5 text-sm font-semibold text-[#F3ECDC] shadow-[0_8px_20px_-6px_rgba(194,78,42,0.5)] transition-transform hover:-translate-y-0.5"
              >
                Start your notebook
              </a>
              <a
                href="#process"
                className="text-sm font-semibold text-[#2E2418] underline decoration-[#C24E2A] decoration-2 underline-offset-4"
              >
                See how it works
              </a>
            </div>
            <p className={`${hand} mt-8 text-xl text-[#2E2418]/50`}>
              psst — it&apos;s free, and it works offline
            </p>
          </div>
          <StickyWall />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-6xl px-6 py-20">
        <p className={`${hand} text-2xl text-[#C24E2A]`}>field-tested features</p>
        <h2 className={`${display} mt-3 max-w-2xl text-4xl tracking-tight sm:text-5xl`}>
          A notebook that thinks ahead.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="relative rounded-sm border border-[#2E2418]/10 bg-[#FBF6E9] p-7 pt-8 shadow-[0_6px_18px_-8px_rgba(46,36,24,0.35)] transition-transform hover:-translate-y-1"
              style={{ rotate: `${i % 2 === 0 ? -0.6 : 0.6}deg` }}
            >
              <Tape className={i % 2 === 0 ? "" : "rotate-[6deg]"} />
              <h3 className={`${display} text-2xl`}>
                <span className="mr-2 text-[#C24E2A]">✳</span>
                {f.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#2E2418]/65">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative border-y border-[#2E2418]/10 bg-[#EDE3CC]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`${display} text-4xl tracking-tight sm:text-5xl`}>
            Capture → Connect → Recall
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <p className={`${hand} text-2xl text-[#C24E2A]`}>
                  step {i + 1} — no joke
                </p>
                <h3 className={`${display} mt-2 text-3xl`}>{s.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-7 text-[#2E2418]/65">
                  {s.body}
                </p>
                {i < 2 && (
                  <HandArrow className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials as margin notes */}
      <section id="notes" className="relative mx-auto max-w-6xl px-6 py-20">
        <p className={`${hand} text-2xl text-[#C24E2A]`}>from the margins</p>
        <h2 className={`${display} mt-3 text-4xl tracking-tight sm:text-5xl`}>
          What people scribble about it.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="relative rounded-sm border border-[#2E2418]/10 bg-[#FBF6E9] p-6 pt-7 shadow-[0_8px_20px_-10px_rgba(46,36,24,0.4)]"
              style={{ rotate: `${i === 1 ? 1 : -1}deg` }}
            >
              <Tape />
              <blockquote className={`${hand} text-[22px] leading-snug text-[#2E2418]`}>
                “{t.quote}”
              </blockquote>
              <figcaption className={`${hand} mt-4 text-lg text-[#2E2418]/55`}>
                — {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="relative rotate-[-0.5deg] rounded-sm border-2 border-[#2E2418] bg-[#2E2418] px-8 py-16 text-center text-[#F3ECDC] shadow-[0_20px_50px_-20px_rgba(46,36,24,0.6)] sm:px-16">
          <p className={`${hand} text-2xl text-[#E8A87C]`}>
            the notebook writes back
          </p>
          <h2 className={`${display} mx-auto mt-4 max-w-2xl text-4xl tracking-tight sm:text-5xl`}>
            Start keeping every thought.
          </h2>
          <a
            href="#"
            className="mt-9 inline-block rounded-full bg-[#C24E2A] px-9 py-4 text-sm font-semibold text-[#F3ECDC] transition-transform hover:-translate-y-0.5"
          >
            Get Synapse — free
          </a>
          <p className={`${hand} mt-5 text-lg text-[#F3ECDC]/50`}>
            no folders were harmed in the making of this app
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#2E2418]/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row">
          <p className={`${display} text-xl italic`}>
            Synapse<span className="text-[#C24E2A]">.</span>
          </p>
          <div className="flex gap-7 text-sm text-[#2E2418]/60">
            <a href="#" className="transition-colors hover:text-[#C24E2A]">Docs</a>
            <a href="#" className="transition-colors hover:text-[#C24E2A]">Privacy</a>
            <a href="#" className="transition-colors hover:text-[#C24E2A]">Contact</a>
          </div>
          <p className={`${hand} text-lg text-[#2E2418]/45`}>
            © 2026 — written with care
          </p>
        </div>
      </footer>
    </div>
  );
}
