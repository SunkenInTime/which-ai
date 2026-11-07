import { Anton, Space_Mono } from "next/font/google";
import { APP_NAME, features, steps, testimonials, tickerItems } from "../lib/content";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
});

const display = anton.className;
const mono = spaceMono.className;

const shadow = "shadow-[6px_6px_0_#0A0A0A]";
const shadowSm = "shadow-[4px_4px_0_#0A0A0A]";

function Ticker() {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-y-[3px] border-black bg-[#FFE600] py-3">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-6">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className={`${mono} flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-black`}
          >
            {item}
            <span>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className={`relative ${shadow} border-[3px] border-black bg-white`}>
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b-[3px] border-black bg-[#FFE600] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border-2 border-black bg-[#FF4D00]" />
        <span className="h-3 w-3 rounded-full border-2 border-black bg-white" />
        <span className="h-3 w-3 rounded-full border-2 border-black bg-[#0A0A0A]" />
        <span className={`${mono} ml-3 text-xs font-bold uppercase`}>
          app.synapse.so/graph
        </span>
      </div>
      <div className="grid grid-cols-[110px_1fr]">
        {/* sidebar */}
        <div className="border-r-[3px] border-black bg-[#F4F1E8] p-3">
          {["Inbox", "Today", "Ideas", "Reading", "Archive"].map((item, i) => (
            <p
              key={item}
              className={`${mono} mb-2 border-2 border-black px-2 py-1.5 text-[10px] font-bold uppercase ${
                i === 2 ? "bg-black text-[#FFE600]" : "bg-white"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
        {/* content */}
        <div className="p-4">
          <p className={`${display} text-lg uppercase leading-tight`}>
            On the topology of ideas
          </p>
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-full border-2 border-black/15 bg-[#F4F1E8]" />
            <div className="h-2.5 w-5/6 border-2 border-black/15 bg-[#F4F1E8]" />
            <div className="h-2.5 w-4/6 border-2 border-black/15 bg-[#F4F1E8]" />
          </div>
          <div className="mt-4 flex gap-2">
            {["#memory", "#links", "#graph"].map((t) => (
              <span
                key={t}
                className={`${mono} border-2 border-black bg-[#FF4D00] px-2 py-0.5 text-[10px] font-bold uppercase text-white`}
              >
                {t}
              </span>
            ))}
          </div>
          {/* backlink rows */}
          <div className="mt-4 border-t-[3px] border-black pt-3">
            <p className={`${mono} text-[10px] font-bold uppercase text-black/50`}>
              ← linked from 14 notes
            </p>
            {["The Memex, revisited", "Zettelkasten in practice", "Why folders fail"].map(
              (n) => (
                <p
                  key={n}
                  className={`${mono} mt-1.5 flex items-center gap-2 border-2 border-black bg-white px-2 py-1 text-[10px] font-bold uppercase`}
                >
                  <span className="text-[#FF4D00]">↩</span> {n}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
      {/* annotation */}
      <p
        className={`${mono} absolute -right-4 -top-5 rotate-6 border-2 border-black bg-[#FFE600] px-2 py-1 text-[10px] font-bold uppercase ${shadowSm}`}
      >
        it just works →
      </p>
    </div>
  );
}

export default function IterationThree() {
  return (
    <div className={`${mono} min-h-screen bg-[#FFFDF2] text-black antialiased`}>
      {/* Nav */}
      <header className="border-b-[3px] border-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className={`${display} text-2xl uppercase tracking-tight`}>
            Synapse<span className="text-[#FF4D00]">*</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase md:flex">
            {["Product", "Graph", "Pricing", "Journal"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:bg-[#FFE600] hover:px-1">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#"
            className={`border-[3px] border-black bg-[#FFE600] px-5 py-2 text-xs font-bold uppercase ${shadowSm} transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
          >
            Start free
          </a>
        </div>
      </header>

      <Ticker />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-block border-[3px] border-black bg-white px-3 py-1.5 text-xs font-bold uppercase">
              ★ The second brain, brutaled edition
            </p>
            <h1
              className={`${display} mt-8 text-[13vw] uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl`}
            >
              Stop losing
              <br />
              <span className="bg-[#FFE600] px-2">your ideas</span>
              <br />
              to folders<span className="text-[#FF4D00]">.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7">
              {APP_NAME} connects every note you take into one living graph.
              No folders. No friction. Just your thinking, organized by
              itself.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#"
                className={`border-[3px] border-black bg-black px-8 py-4 text-sm font-bold uppercase text-[#FFE600] ${shadow} transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                Get synapse
              </a>
              <a
                href="#features"
                className={`border-[3px] border-black bg-white px-8 py-4 text-sm font-bold uppercase ${shadowSm} transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                See features
              </a>
            </div>
            {/* stickers */}
            <div className="pointer-events-none relative mt-14 hidden h-24 md:block">
              <span className={`absolute left-0 top-0 ${mono} rotate-[-8deg] border-[3px] border-black bg-[#FF4D00] px-4 py-2 text-xs font-bold uppercase text-white ${shadowSm}`}>
                no folders
              </span>
              <span className={`absolute left-40 top-6 ${mono} rotate-[5deg] border-[3px] border-black bg-white px-4 py-2 text-xs font-bold uppercase ${shadowSm}`}>
                est. 2026
              </span>
              <span className={`absolute left-72 top-0 ${mono} rotate-[-3deg] border-[3px] border-black bg-black px-4 py-2 text-xs font-bold uppercase text-[#FFE600] ${shadowSm}`}>
                100% yours
              </span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <BrowserMock />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t-[3px] border-black bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${display} text-5xl uppercase leading-none sm:text-6xl`}>
              What it does
            </h2>
            <p className="max-w-xs text-sm leading-6">
              Four things. Done brutally well. Everything else is noise.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group border-[3px] border-black bg-[#FFFDF2] p-7 ${shadowSm} transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#0A0A0A]`}
              >
                <div className="flex items-start justify-between">
                  <span className={`${display} text-5xl text-[#FF4D00]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="border-2 border-black bg-[#FFE600] px-2 py-1 text-[10px] font-bold uppercase">
                    core
                  </span>
                </div>
                <h3 className={`${display} mt-4 text-2xl uppercase`}>{f.title}</h3>
                <p className="mt-3 text-sm leading-6">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t-[3px] border-black">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`${display} text-5xl uppercase leading-none sm:text-6xl`}>
            How it works
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className={`border-[3px] border-black bg-white p-6 ${shadowSm} h-full`}>
                  <p className={`${display} text-6xl text-black/10`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`${display} -mt-4 text-2xl uppercase`}>{s.title}</h3>
                  <p className="mt-3 text-sm leading-6">{s.body}</p>
                </div>
                {i < 2 && (
                  <span className={`${display} absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-4xl md:block`}>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Black statement */}
      <section className="border-t-[3px] border-black bg-black text-[#FFFDF2]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className={`${display} max-w-4xl text-4xl uppercase leading-[0.95] sm:text-6xl`}>
            Your notes aren&apos;t files.{" "}
            <span className="text-[#FFE600]">They&apos;re a brain.</span>
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="border-[3px] border-[#FFFDF2] bg-[#111] p-6"
              >
                <blockquote className="text-sm leading-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t-2 border-[#FFFDF2]/30 pt-3 text-xs font-bold uppercase text-[#FFE600]">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-[3px] border-black bg-[#FF4D00]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className={`${display} text-6xl uppercase leading-[0.92] text-white sm:text-8xl`}>
            Think louder<span className="text-black">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-bold uppercase">
            Free forever. No folders harmed.
          </p>
          <a
            href="#"
            className={`mt-10 inline-block border-[3px] border-black bg-[#FFE600] px-10 py-5 text-lg font-bold uppercase ${shadow} transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
          >
            Start free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-black bg-[#FFFDF2]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className={`${display} text-2xl uppercase`}>
                Synapse<span className="text-[#FF4D00]">*</span>
              </p>
              <p className="mt-3 max-w-[220px] text-xs leading-5">
                The second brain app for people who hate folders.
              </p>
            </div>
            {[
              ["Product", ["Features", "Graph", "Pricing"]],
              ["Company", ["About", "Journal", "Careers"]],
              ["Legal", ["Privacy", "Terms", "Security"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <p className="text-xs font-bold uppercase">{title}</p>
                <ul className="mt-3 space-y-2 text-xs">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:bg-[#FFE600]">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-black pt-6 text-[10px] font-bold uppercase">
            <p>© 2026 {APP_NAME} Inc.</p>
            <p>Made with too much coffee</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
