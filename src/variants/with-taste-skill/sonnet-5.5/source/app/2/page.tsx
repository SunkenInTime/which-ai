import { ArrowRight, FolderSimple, Stack } from "@phosphor-icons/react/ssr";
import { Palette } from "./_components/palette";
import { Reveal } from "./_components/reveal";

const SHORTCUTS = [
  { keys: ["N"], what: "New note" },
  { keys: ["Cmd", "K"], what: "Command palette" },
  { keys: ["Cmd", "L"], what: "Link to a note" },
  { keys: ["Cmd", "Shift", "A"], what: "Ask your notes" },
  { keys: ["G", "R"], what: "Related notes" },
  { keys: ["Cmd", "Shift", "V"], what: "Paste as clip" },
  { keys: ["W"], what: "Weekly review" },
  { keys: ["Cmd", "E"], what: "Export folder" },
];

const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent-ink)";
const primary = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-(--c-accent) px-5 text-[15px] font-semibold text-(--c-on-accent) transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${focus}`;
const secondary = `inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[8px] border border-(--c-line) px-5 text-[15px] font-medium transition-colors hover:bg-(--c-surface-2) active:scale-[0.98] ${focus}`;
const h2 = "text-[32px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[44px]";

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-(--c-bg) text-(--c-fg)">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className={`mono flex items-center gap-2 rounded-[6px] text-[16px] font-bold ${focus}`}>
          <Stack size={20} weight="bold" className="text-(--c-accent-ink)" />
          cairn
        </a>
        <nav aria-label="Main" className="mono hidden items-center gap-8 text-[13px] text-(--c-fg-2) md:flex">
          <a href="#palette" className="hover:text-(--c-fg)">Palette</a>
          <a href="#files" className="hover:text-(--c-fg)">Files</a>
          <a href="#shortcuts" className="hover:text-(--c-fg)">Shortcuts</a>
          <a href="#pricing" className="hover:text-(--c-fg)">Pricing</a>
        </nav>
        <a href="#pricing" className={`${primary} h-9 px-4 text-[14px]`}>Start free</a>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-16">
          <div className="min-w-0 lg:col-span-7">
            <Reveal immediate>
              <p className="mono text-[13px] uppercase tracking-[0.16em] text-(--c-accent-ink)">Keyboard first</p>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <h1 className="mt-5 text-[44px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[76px]">
                Plain text notes, one keystroke away.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.12}>
              <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-(--c-fg-2)">
                Cairn keeps notes as markdown files you own, and links them to each other as you type.
              </p>
            </Reveal>
            <Reveal immediate delay={0.18} className="mt-9 flex flex-wrap gap-3">
              <a href="#pricing" className={primary}>
                Start free <ArrowRight size={16} weight="bold" />
              </a>
              <a href="#shortcuts" className={secondary}>See the shortcuts</a>
            </Reveal>
          </div>
          <Reveal immediate delay={0.1} className="min-w-0 lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/cairn-keyboard-dark-desk-lamp/900/1100"
              alt="A mechanical keyboard on a dark desk under a lamp"
              width={900}
              height={1100}
              fetchPriority="high"
              className="aspect-[9/10] w-full rounded-[8px] object-cover"
            />
          </Reveal>
        </section>

        {/* Command palette, centered narrow */}
        <section id="palette" className="border-y border-(--c-line) bg-(--c-surface)">
          <div className="mx-auto max-w-3xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28">
            <Reveal>
              <h2 className={h2}>Every action lives in one box.</h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-(--c-fg-2)">
                Open a note, link two ideas or start a review without leaving the keyboard. Try it.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <Palette />
            </Reveal>
          </div>
        </section>

        {/* Files */}
        <section id="files" className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="min-w-0 lg:col-span-5">
              <FolderSimple size={28} weight="regular" className="text-(--c-accent-ink)" />
              <h2 className={`${h2} mt-5`}>A folder of files. Nothing locked in.</h2>
              <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-(--c-fg-2)">
                Every note is a .md file on your disk. Open the folder in any editor and the links still work.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0 lg:col-span-7">
              <pre className="mono overflow-x-auto rounded-[8px] border border-(--c-line) bg-(--c-surface) p-6 text-[14px] leading-[1.8] text-(--c-fg-2)">
{`---
title: Interview with Marta
tags: [onboarding, research]
---

People forget most of what they read in week one.
Follow up with `}
                <span className="rounded-[4px] bg-(--c-surface-2) px-1 text-(--c-accent-ink)">[[Spaced repetition beats rereading]]</span>
{`
and draft the email in `}
                <span className="rounded-[4px] bg-(--c-surface-2) px-1 text-(--c-accent-ink)">[[Spring launch email]]</span>
{`.`}
              </pre>
            </Reveal>
          </div>
        </section>

        {/* Shortcuts, horizontal scroll-snap */}
        <section id="shortcuts" className="border-t border-(--c-line) py-20 md:py-28">
          <div className="mx-auto max-w-7xl scroll-mt-4 px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className={h2}>Shortcuts you will remember.</h2>
            </Reveal>
          </div>
          <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]" tabIndex={0} aria-label="Keyboard shortcuts">
            {SHORTCUTS.map((s) => (
              <li
                key={s.what}
                className="min-w-[220px] shrink-0 snap-start rounded-[8px] border border-(--c-line) bg-(--c-surface) p-5"
              >
                <span className="flex flex-wrap gap-1.5">
                  {s.keys.map((k) => (
                    <kbd key={k} className="keycap rounded-[4px] border border-(--c-line) bg-(--c-bg) px-2.5 py-1 text-[13px]">
                      {k}
                    </kbd>
                  ))}
                </span>
                <span className="mt-6 block text-[16px] font-medium">{s.what}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quote */}
        <section className="border-t border-(--c-line) bg-(--c-surface)">
          <Reveal className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
            <blockquote className="text-[26px] font-medium leading-[1.25] tracking-[-0.03em] sm:text-[34px]">
              “I have moved notes between five apps. These files are the first thing that never needed moving.”
            </blockquote>
            <p className="mt-6 text-[15px] text-(--c-fg-2)">Kenji Watanabe, infrastructure engineer</p>
          </Reveal>
        </section>

        {/* Pricing: one divided panel */}
        <section id="pricing" className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 className={h2}>Free for local notes. Pro adds sync.</h2>
          <div className="mt-12 grid overflow-hidden rounded-[8px] border border-(--c-line) md:grid-cols-2">
            <div className="p-7 md:p-9">
              <h3 className="text-[20px] font-semibold">Local</h3>
              <p className="mono mt-2 text-[14px] text-(--c-fg-2)">$0, no account needed</p>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-(--c-fg-2)">
                Unlimited notes, links, the command palette and export. Files stay on your machine.
              </p>
              <a href="#top" className={`${secondary} mt-8`}>Start free</a>
            </div>
            <div className="border-t border-(--c-line) bg-(--c-surface) p-7 md:border-l md:border-t-0 md:p-9">
              <h3 className="text-[20px] font-semibold">Pro</h3>
              <p className="mono mt-2 text-[14px] text-(--c-fg-2)">$8 a month</p>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-(--c-fg-2)">
                Everything in Local, plus encrypted sync, Ask your notes and the weekly review.
              </p>
              <a href="#top" className={`${primary} mt-8`}>Start free</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mono mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-[13px] text-(--c-fg-3) sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>cairn, notes as files</p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#top" className="hover:text-(--c-fg)">privacy</a>
          <a href="#top" className="hover:text-(--c-fg)">terms</a>
          <a href="#top" className="hover:text-(--c-fg)">contact</a>
        </nav>
      </footer>
    </div>
  );
}
