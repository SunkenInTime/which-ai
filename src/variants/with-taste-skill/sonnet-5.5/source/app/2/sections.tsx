import {
  ArrowBendUpLeft,
  ArrowRight,
  FolderOpen,
  LockKey,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { LogoRow } from "../_components/import-logos";
import { Mark } from "../_components/mark";
import { Photo } from "../_components/photo";
import { Reveal } from "../_components/reveal";
import { BRAND, CTA_PRIMARY, CTA_SECONDARY, FOOTER_LINKS } from "../_lib/pith";
import { GraphCanvas } from "./graph";
import { QuoteRail, Workflow } from "./leaves";

/*
  Shape rule for this iteration: controls 6px, panels 12px. Nothing else.
*/
const PRIMARY_BUTTON =
  "group inline-flex h-11 items-center gap-2 rounded-md bg-[color:var(--accent)] px-5 text-[15px] font-semibold text-[color:var(--on-accent)] transition-[transform,filter] duration-200 hover:brightness-110 active:translate-y-px whitespace-nowrap";
const SECONDARY_BUTTON =
  "inline-flex h-11 items-center rounded-md border border-[color:var(--line)] px-5 text-[15px] font-medium text-[color:var(--fg)] transition-[background-color,border-color,transform] duration-200 hover:border-[color:var(--fg-3)] hover:bg-[color:var(--bg-2)] active:translate-y-px whitespace-nowrap";

export function Nav() {
  return (
    <header className="sticky top-0 z-(--z-nav) border-b border-[color:var(--line)] bg-[color:var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
          <Mark shape="soft" />
          {BRAND}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-2)] md:flex">
          <a href="#features" className="transition-colors hover:text-[color:var(--fg)]">features</a>
          <a href="#files" className="transition-colors hover:text-[color:var(--fg)]">files</a>
          <a href="#workflow" className="transition-colors hover:text-[color:var(--fg)]">workflow</a>
        </nav>
        <a href="#cta" className={`${PRIMARY_BUTTON} h-9 px-4 text-sm`}>
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-[color:var(--line)] lg:flex lg:min-h-[calc(100dvh-3.5rem)] lg:items-center"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-14 md:px-8 lg:py-20">
        <div className="max-w-[38rem]">
          <h1 className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[3.6rem]">
            <span className="block animate-fade-up">Your notes,</span>
            <span className="block animate-fade-up [animation-delay:90ms]">
              wired together
              <span
                aria-hidden
                className="ml-2 inline-block h-[0.78em] w-[0.09em] translate-y-[0.05em] bg-[color:var(--accent)] animate-caret"
              />
            </span>
          </h1>
          <p className="mt-7 max-w-[44ch] text-lg leading-relaxed text-[color:var(--fg-2)] animate-fade-up [animation-delay:260ms]">
            Pith links everything you write. Ask a question and it answers from your own notes, with sources.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:380ms]">
            <a href="#cta" className={PRIMARY_BUTTON}>
              {CTA_PRIMARY}
              <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#features" className={SECONDARY_BUTTON}>
              {CTA_SECONDARY}
            </a>
          </div>
        </div>
      </div>

      <GraphCanvas className="relative -mt-2 h-[52dvh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[66%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]" />
    </section>
  );
}

export function ImportStrip() {
  return (
    <section aria-label="Imports from" className="border-b border-[color:var(--line)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-2)]">imports from</p>
        <LogoRow
          className="lg:justify-end"
          logoClassName="text-[color:var(--fg-3)] transition-colors duration-200 hover:text-[color:var(--fg)]"
        />
      </div>
    </section>
  );
}

const PANEL = "relative isolate overflow-hidden rounded-xl border border-[color:var(--line)]";

export function Bento() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-14 px-5 py-24 md:px-8 lg:py-32">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
          Everything you write, connected.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:grid-rows-[220px_220px_280px]">
        {/* Capture: photo */}
        <Reveal className={`${PANEL} min-h-[360px] text-zinc-50 lg:col-span-4 lg:row-span-2`}>
          <Photo
            id={315}
            alt="Looking straight up a tall building with a square of bright sky at the top"
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="grayscale"
          />
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
            <h3 className="text-3xl font-semibold tracking-[-0.03em]">Capture</h3>
            <p className="mt-3 max-w-[44ch] leading-relaxed text-zinc-200">
              One shortcut opens a note over any app. Clips, voice memos and forwarded email land in the same inbox.
            </p>
          </div>
        </Reveal>

        {/* Backlinks: real list, pattern background */}
        <Reveal delay={0.06} className={`${PANEL} bg-[color:var(--bg-2)] p-6 lg:col-span-2`}>
          <span
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px]"
          />
          <h3 className="text-xl font-semibold tracking-tight">Backlinks</h3>
          <p className="mt-1.5 text-sm text-[color:var(--fg-2)]">Linked from</p>
          <ul className="mt-4 space-y-2">
            {["Launch checklist", "Roadmap draft", "Interview with Marta"].map((title) => (
              <li
                key={title}
                className="flex items-center gap-2.5 rounded-md border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2 font-[family-name:var(--v-mono)] text-[13px]"
              >
                <ArrowBendUpLeft size={15} className="shrink-0 text-[color:var(--accent)]" />
                {title}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Ask: gradient */}
        <Reveal
          delay={0.12}
          className={`${PANEL} bg-linear-to-br from-[color:var(--accent)]/25 via-[color:var(--accent)]/5 to-transparent p-6 lg:col-span-2`}
        >
          <h3 className="text-xl font-semibold tracking-tight">Ask</h3>
          <p className="mt-2 text-[color:var(--fg-2)]">Plain English in, answers with sources out.</p>
          <p className="mt-4 rounded-md border border-[color:var(--line)] bg-[color:var(--bg)]/70 px-3 py-2.5 font-[family-name:var(--v-mono)] text-[13px] leading-relaxed">
            what did I decide about pricing?
          </p>
        </Reveal>

        {/* Resurface: photo */}
        <Reveal delay={0.06} className={`${PANEL} min-h-[280px] text-zinc-50 lg:col-span-3`}>
          <Photo
            id={220}
            alt="A quiet railway platform in evening fog with lamps glowing along the track"
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="grayscale-[60%]"
          />
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
          <div className="relative flex h-full flex-col justify-end p-7">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Resurface</h3>
            <p className="mt-2 max-w-[38ch] leading-relaxed text-zinc-200">
              Every morning a few old notes return, matched to what you are working on now.
            </p>
          </div>
        </Reveal>

        {/* Own: photo */}
        <Reveal delay={0.12} className={`${PANEL} min-h-[280px] text-zinc-50 lg:col-span-3`}>
          <Photo
            id={123}
            alt="Water droplets beaded across a dark grey surface"
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="grayscale"
          />
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/15" />
          <div className="relative flex h-full flex-col justify-end p-7">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">Yours</h3>
            <p className="mt-2 max-w-[38ch] leading-relaxed text-zinc-200">
              Plain Markdown in a folder you choose. No export step, because there is nothing to export.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const POINTS = [
  {
    Icon: FolderOpen,
    title: "Plain Markdown",
    body: "Every note is a .md file. Open the folder in any editor and it just works.",
  },
  {
    Icon: LockKey,
    title: "Encrypted sync",
    body: "Sync is end-to-end encrypted. We cannot read your notes, and neither can our servers.",
  },
  {
    Icon: SignOut,
    title: "Leave any time",
    body: "Stop paying and your folder keeps working. Nothing is locked behind an account.",
  },
] as const;

export function Files() {
  return (
    <section id="files" className="scroll-mt-14 border-y border-[color:var(--line)] bg-[color:var(--bg-2)]">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="lg:col-span-6">
          <div className="overflow-hidden rounded-xl border border-[color:var(--line)] bg-[color:var(--bg)]">
            <p className="border-b border-[color:var(--line)] px-5 py-3 font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-2)]">
              call-with-the-vendor.md
            </p>
            <pre className="overflow-x-auto p-5 font-[family-name:var(--v-mono)] text-[13.5px] leading-[1.75] text-[color:var(--fg)] md:p-6 md:text-[14px]">
              <code>
                <span className="text-[color:var(--fg-3)]">{"---\ntitle: Call with the vendor\ntags: [launch, vendors]\n---\n\n"}</span>
                {"Agreed to move launch to March.\nAndroid beta dropped to keep the date.\n\nSee also "}
                <span className="text-[color:var(--accent)]">[[Launch checklist]]</span>
                {" and\n"}
                <span className="text-[color:var(--accent)]">[[Kitchen renovation quotes]]</span>
                {" (same\nvendor comparison method)."}
              </code>
            </pre>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <h2 className="max-w-[14ch] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
              Just files. Yours to keep.
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-7">
            {POINTS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} as="li" delay={0.08 * (i + 1)} className="flex gap-4">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-md border border-[color:var(--line)] bg-[color:var(--bg)] text-[color:var(--accent)]">
                  <Icon size={20} weight="regular" />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 max-w-[44ch] leading-relaxed text-[color:var(--fg-2)]">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl scroll-mt-14 px-5 py-24 md:px-8 lg:py-36">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
          Three moves, no filing.
        </h2>
      </Reveal>
      <div className="mt-16 lg:ml-[8%]">
        <Workflow />
      </div>
    </section>
  );
}

export function Quotes() {
  return (
    <section className="overflow-hidden border-t border-[color:var(--line)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl font-semibold leading-[1.04] tracking-[-0.03em] md:text-5xl">
            People who write a lot keep it open.
          </h2>
        </Reveal>
      </div>
      <div className="mt-12">
        <QuoteRail />
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section id="cta" className="scroll-mt-14 border-t border-[color:var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:px-8 lg:grid-cols-12 lg:items-end lg:py-32">
        <Reveal className="lg:col-span-8">
          <h2 className="text-5xl font-semibold leading-[1] tracking-[-0.03em] md:text-7xl">
            Start connecting your notes.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:pb-2">
          <a href="#top" className={PRIMARY_BUTTON}>
            {CTA_PRIMARY}
            <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          {/* mock pricing */}
          <p className="mt-4 font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-2)]">Free on one device. Sync and Ask are $8 a month.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-14 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
            <Mark shape="soft" />
            {BRAND}
          </a>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[color:var(--fg-2)]">
            A second brain for everything you read, write and want to remember.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-3)]">{group.toLowerCase()}</p>
              <ul className="mt-4 space-y-3 text-[15px] text-[color:var(--fg-2)]">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="transition-colors hover:text-[color:var(--fg)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="font-[family-name:var(--v-mono)] text-[13px] text-[color:var(--fg-3)] lg:col-span-12">&copy; 2026 Pith Labs</p>
      </div>
    </footer>
  );
}
