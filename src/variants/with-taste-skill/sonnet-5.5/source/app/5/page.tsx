import {
  ArrowRight,
  Check,
  Envelope,
  FilePdf,
  Image as ImageIcon,
  Microphone,
  Plus,
  Scissors,
  TextT,
} from "@phosphor-icons/react/ssr";
import { Pinboard } from "./_components/pinboard";
import { Reveal } from "./_components/reveal";

const CAPTURE = [
  { icon: Microphone, label: "Voice memos" },
  { icon: Scissors, label: "Web clips" },
  { icon: ImageIcon, label: "Photos" },
  { icon: FilePdf, label: "PDFs" },
  { icon: Envelope, label: "Emails" },
  { icon: TextT, label: "Plain text" },
];

const ROWS = [
  { word: "Dump", body: "Type it, clip it, snap it or say it. No folder, no title, no decisions.", tone: "bg-(--c-accent) text-(--c-on-accent)" },
  { word: "Link", body: "Cairn reads what you saved and ties related notes together on its own.", tone: "bg-(--c-surface) text-(--c-ink)" },
  { word: "Find", body: "Search, ask a question, or wait. Old notes come back when you write about the same thing.", tone: "bg-(--c-ink) text-(--c-bg)" },
];

const FAQ = [
  { q: "Do I have to make folders or tags?", a: "No. You can add tags if you like them, but links are made for you." },
  { q: "Where are my notes stored?", a: "Encrypted on your device and synced to our servers on Pro. You can export everything as markdown any time." },
  { q: "Can I import from another app?", a: "Yes. Notion, Evernote, Obsidian, Apple Notes and plain markdown folders all import with their titles and tags." },
  { q: "How does Ask your notes work?", a: "It searches your notes, writes an answer from what it finds and lists the notes it used. It never answers from outside your library." },
  { q: "What happens if I stop paying?", a: "Your notes stay yours. You drop back to the free plan and can still read, edit and export all of them." },
];

const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent)";
const btn = `inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap border-[3px] border-(--c-ink) px-6 text-[16px] font-bold shadow-[5px_5px_0_var(--c-ink)] transition-transform hover:-translate-y-px active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_var(--c-ink)] ${focus}`;
const btnAccent = `${btn} bg-(--c-accent) text-(--c-on-accent)`;
const btnPlain = `${btn} bg-(--c-surface) text-(--c-ink)`;

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-(--c-bg) text-(--c-ink)">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className={`text-[26px] font-bold tracking-[-0.06em] ${focus}`}>
          cairn
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] font-bold md:flex">
          <a href="#how" className="underline-offset-4 hover:underline">How it works</a>
          <a href="#faq" className="underline-offset-4 hover:underline">Questions</a>
          <a href="#pricing" className="underline-offset-4 hover:underline">Pricing</a>
        </nav>
        <a href="#pricing" className={`${btnAccent} h-10 px-4 text-[14px] shadow-[3px_3px_0_var(--c-ink)]`}>Start free</a>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28">
          <div className="lg:col-span-6">
            <Reveal immediate>
              <h1 className="text-[52px] font-bold leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[92px]">
                Dump everything. Cairn sorts it out.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.08}>
              <p className="mt-7 max-w-[42ch] text-[19px] leading-relaxed text-(--c-fg-2)">
                Notes, clips, photos and voice memos land in one pile, then link themselves together.
              </p>
            </Reveal>
            <Reveal immediate delay={0.16} className="mt-9 flex flex-wrap gap-4">
              <a href="#pricing" className={btnAccent}>
                Start free <ArrowRight size={18} weight="bold" />
              </a>
              <a href="#how" className={btnPlain}>How it works</a>
            </Reveal>
          </div>
          <Reveal immediate delay={0.12} className="lg:col-span-6">
            <Pinboard />
          </Reveal>
        </section>

        {/* The one marquee on the page */}
        <section aria-label="What you can save" className="overflow-hidden border-y-[3px] border-(--c-ink) bg-(--c-accent) py-5 text-(--c-on-accent)">
          <div className="marquee-track flex">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-12 pr-12">
                {CAPTURE.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 whitespace-nowrap text-[28px] font-bold tracking-[-0.04em]">
                    <Icon size={30} weight="bold" />
                    {label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* How it works: three stacked bars */}
        <section id="how" className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal>
            <h2 className="max-w-3xl text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Three verbs. That is the whole app.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5">
            {ROWS.map((r, i) => (
              <Reveal key={r.word} delay={i * 0.05}>
                <div
                  className={`grid gap-4 border-[3px] border-(--c-ink) p-6 shadow-[8px_8px_0_var(--c-ink)] md:grid-cols-12 md:items-center md:p-10 ${r.tone}`}
                  style={{ marginLeft: `min(${i * 4}%, 3rem)` }}
                >
                  <h3 className="text-[48px] font-bold leading-none tracking-[-0.06em] md:col-span-5 md:text-[80px]">{r.word}</h3>
                  <p className="max-w-[40ch] text-[18px] leading-relaxed md:col-span-7">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Quotes, two rotated notes */}
        <section className="border-y-[3px] border-(--c-ink) bg-(--c-surface-2)">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
            <Reveal>
              <blockquote className="-rotate-1 border-[3px] border-(--c-ink) bg-(--c-surface) p-8 shadow-[8px_8px_0_var(--c-ink)]">
                <p className="text-[24px] font-bold leading-[1.15] tracking-[-0.03em]">
                  “I drop sketches, screenshots and half sentences in. A week later they have neighbors.”
                </p>
                <footer className="mono mt-5 text-[13px]">Bram Vanderloo, illustrator</footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.08} className="md:mt-12">
              <blockquote className="rotate-1 border-[3px] border-(--c-ink) bg-(--c-accent) p-8 text-(--c-on-accent) shadow-[8px_8px_0_var(--c-ink)]">
                <p className="text-[24px] font-bold leading-[1.15] tracking-[-0.03em]">
                  “Ask your notes found a citation I had lost for two years.”
                </p>
                <footer className="mono mt-5 text-[13px]">Sung-min Oh, graduate student</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* FAQ accordion */}
        <section id="faq" className="mx-auto max-w-4xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28">
          <h2 className="text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl">Questions people ask.</h2>
          <div className="mt-10 grid gap-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-[3px] border-(--c-ink) bg-(--c-surface) shadow-[5px_5px_0_var(--c-ink)]">
                <summary className={`flex cursor-pointer items-center justify-between gap-6 p-5 text-[18px] font-bold ${focus}`}>
                  {f.q}
                  <Plus size={22} weight="bold" className="faq-icon shrink-0 transition-transform duration-200" />
                </summary>
                <p className="max-w-[60ch] px-5 pb-5 text-[16px] leading-relaxed text-(--c-fg-2)">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t-[3px] border-(--c-ink) bg-(--c-surface-2)">
          <div className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-3xl text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Free for a small pile. $8 for a big one.
            </h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-12">
              <div className="border-[3px] border-(--c-ink) bg-(--c-surface) p-8 shadow-[8px_8px_0_var(--c-ink)] lg:col-span-5">
                <h3 className="text-[28px] font-bold tracking-[-0.04em]">Free</h3>
                <ul className="mt-5 grid gap-3 text-[16px]">
                  {["Up to 200 notes", "Web clipper", "Automatic links"].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={18} weight="bold" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#top" className={`${btnPlain} mt-8`}>Start free</a>
              </div>
              <div className="border-[3px] border-(--c-ink) bg-(--c-accent) p-8 text-(--c-on-accent) shadow-[8px_8px_0_var(--c-ink)] lg:col-span-7">
                <h3 className="text-[28px] font-bold tracking-[-0.04em]">Pro, $8 a month</h3>
                <ul className="mt-5 grid gap-3 text-[16px] sm:grid-cols-2">
                  {["Unlimited notes", "Ask your notes", "Weekly review", "Sync on every device"].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={18} weight="bold" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#top" className={`${btn} mt-8 bg-(--c-surface) text-[#141414]`}>Start free</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mono mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Cairn. Dump first, sort later.</p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#top" className="underline-offset-4 hover:underline">Privacy</a>
          <a href="#top" className="underline-offset-4 hover:underline">Terms</a>
          <a href="#top" className="underline-offset-4 hover:underline">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
