import Image from "next/image";
import {
  Browser,
  DeviceMobile,
  Keyboard,
  Microphone,
} from "@phosphor-icons/react/ssr";
import { AskDemo } from "./ask-demo";
import { ResurfaceDemo } from "./resurface-demo";

const CARD =
  "w-full max-w-[1320px] overflow-hidden rounded-[28px] md:h-[86dvh] md:max-h-[820px]";
const TITLE =
  "v4-display text-[18vw] font-[800] leading-[0.9] tracking-[-0.055em] md:text-[9rem] lg:text-[11rem]";

const CAPTURE = [
  { label: "A quick-capture shortcut, from any app", icon: Keyboard },
  { label: "A web clipper for articles and pages", icon: Browser },
  { label: "The share sheet on your phone", icon: DeviceMobile },
  { label: "Voice memos, transcribed for you", icon: Microphone },
];

function Capture() {
  return (
    <article className={`${CARD} grid bg-(--v4-accent) p-7 text-(--v4-on-accent) md:grid-cols-12 md:p-14`}>
      <div className="flex flex-col justify-between gap-8 md:col-span-7">
        <h3 className={TITLE}>Capture</h3>
        <p className="max-w-[26ch] text-2xl font-medium leading-snug md:text-3xl">
          Get it out of your head now. Sort it out later, or never.
        </p>
      </div>
      <ul className="mt-10 grid content-end gap-3 md:col-span-5 md:mt-0">
        {CAPTURE.map(({ label, icon: Glyph }) => (
          <li key={label} className="flex items-center gap-4 rounded-full bg-[#f4f4f1]/12 py-3 pl-3 pr-6 text-base md:text-lg">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-(--v4-on-accent) text-[#1c2fd6]">
              <Glyph size={22} weight="bold" aria-hidden />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Link() {
  return (
    <article className={`${CARD} grid bg-(--v4-surface) md:grid-cols-12`}>
      <div className="relative min-h-[34dvh] md:order-2 md:col-span-6 md:min-h-0">
        <Image
          src="https://picsum.photos/seed/kept-notes-table/1100/1300"
          alt="A typewriter on a wooden table, seen from above"
          fill
          quality={75}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-8 p-7 md:col-span-6 md:p-14">
        <h3 className={TITLE}>Link</h3>
        <div className="max-w-[34ch]">
          <p className="text-2xl font-medium leading-snug md:text-3xl">
            Type{" "}
            <code className="rounded-full bg-(--v4-accent) px-2.5 py-0.5 font-mono text-[0.85em] text-(--v4-on-accent)">
              [[
            </code>{" "}
            to link any note to another.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-(--v4-muted)">
            Every note lists its backlinks on its own, and the graph shows how your
            ideas connect. Links do the organising, so filing is optional.
          </p>
        </div>
      </div>
    </article>
  );
}

function Resurface() {
  return (
    <article className={`${CARD} v4-dots grid gap-8 bg-(--v4-bg) p-7 ring-1 ring-(--v4-line) md:grid-cols-12 md:p-14`}>
      <div className="flex flex-col justify-between gap-6 md:col-span-6">
        <h3 className={`${TITLE} md:text-[7.5rem] lg:text-[9rem]`}>Resurface</h3>
        <p className="max-w-[28ch] text-2xl font-medium leading-snug md:text-3xl">
          Start writing and older notes on the same idea come back on their own.
        </p>
      </div>
      <div className="md:col-span-6 md:self-end">
        <ResurfaceDemo />
      </div>
    </article>
  );
}

function Ask() {
  return (
    <article className={`${CARD} grid gap-8 bg-(--v4-ink) p-7 text-(--v4-on-ink) md:grid-cols-12 md:p-14`}>
      <div className="flex flex-col justify-between gap-6 md:col-span-5">
        <h3 className={TITLE}>Ask</h3>
        <p className="max-w-[26ch] text-2xl font-medium leading-snug md:text-3xl">
          Ask in plain words. The answer comes from your notes, with sources.
        </p>
      </div>
      <div className="md:col-span-7 md:self-end">
        <AskDemo />
      </div>
    </article>
  );
}

export const FEATURE_CARDS = [
  <Capture key="capture" />,
  <Link key="link" />,
  <Resurface key="resurface" />,
  <Ask key="ask" />,
];
