import {
  ArrowDown,
  ArrowRight,
  Check,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo, IMPORT_SOURCES } from "../_components/import-logos";
import { Mark } from "../_components/mark";
import { Photo } from "../_components/photo";
import { Reveal } from "../_components/reveal";
import {
  BRAND,
  CTA_PRIMARY,
  CTA_SECONDARY,
  FAQ,
  FOOTER_LINKS,
} from "../_lib/pith";
import { Marked, StackCards } from "./stack";

/*
  Shape rule for this iteration: radius 0, 2px ink borders, hard offset shadow
  on buttons only. Buttons move onto their shadow when pressed.
*/
const BUTTON =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap border-2 border-[color:var(--line)] px-6 text-sm font-bold uppercase tracking-[0.04em] shadow-[4px_4px_0_0_var(--line)] transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--line)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";
const BUTTON_ACCENT = `${BUTTON} bg-[color:var(--accent)] text-[color:var(--on-accent)]`;

export function Nav() {
  return (
    <header className="sticky top-0 z-(--z-nav) border-b-2 border-[color:var(--line)] bg-[color:var(--bg)]">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-xl">
          <Mark shape="square" />
          <span className="display text-xl">{BRAND}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-9 font-[family-name:var(--v-mono)] text-[13px] font-medium md:flex">
          <a href="#stack" className="underline-offset-4 hover:underline">Features</a>
          <a href="#pricing" className="underline-offset-4 hover:underline">Pricing</a>
          <a href="#faq" className="underline-offset-4 hover:underline">Questions</a>
        </nav>
        <a href="#download" className={`${BUTTON_ACCENT} h-10 px-4`}>
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-[color:var(--line)]">
      <div className="mx-auto grid max-w-[1500px] gap-x-8 gap-y-8 px-5 pb-10 pt-8 md:px-8 lg:grid-cols-12 lg:pb-12 lg:pt-12">
        <h1 className="display text-[clamp(3.6rem,11.4vw,11rem)] lg:col-span-8">
          <span className="block overflow-y-clip overflow-x-visible pb-[0.06em]">
            <span className="block animate-rise">Forget</span>
          </span>
          <span className="block overflow-y-clip overflow-x-visible pb-[0.06em]">
            <span className="block animate-rise [animation-delay:110ms]">
              <span className="inline-block bg-[color:var(--accent)] px-[0.12em] text-[color:var(--on-accent)]">Less.</span>
            </span>
          </span>
        </h1>

        <div className="relative min-h-[300px] border-2 border-[color:var(--line)] lg:col-span-4 lg:row-span-2 lg:min-h-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 animate-settle">
              <Photo
                id={63}
                alt="A white cup of coffee seen from above on a saturated red table"
                sizes="(min-width: 1024px) 30vw, 100vw"
                priority
              />
            </div>
            <span aria-hidden className="absolute inset-0 origin-top animate-wipe bg-[color:var(--bg)] [animation-delay:200ms]" />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7 lg:self-end">
          <p className="max-w-[40ch] text-xl font-medium leading-snug animate-fade-up [animation-delay:400ms] md:text-2xl">
            Pith is a notes app that links everything you write and brings it back when it matters.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5 animate-fade-up [animation-delay:520ms]">
            <a href="#download" className={BUTTON_ACCENT}>
              {CTA_PRIMARY}
              <ArrowRight size={18} weight="bold" />
            </a>
            <a
              href="#stack"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.04em]"
            >
              {CTA_SECONDARY}
              <ArrowDown size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The one marquee on this page: import sources, doubled for a seamless loop. */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16"
    >
      {IMPORT_SOURCES.map((icon) => (
        <li key={icon.slug}>
          <BrandLogo icon={icon} className="h-8" />
        </li>
      ))}
    </ul>
  );
  return (
    <section
      aria-label="Imports from"
      className="group overflow-hidden border-b-2 border-[color:var(--line)] bg-[color:var(--accent)] py-7 text-[color:var(--on-accent)]"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-[1500px] scroll-mt-16 px-5 pb-24 pt-20 md:px-8 lg:pb-32 lg:pt-28">
      <Reveal>
        <h2 className="display max-w-[14ch] pb-10 text-[clamp(2.75rem,7vw,6.5rem)]">
          Five verbs. That&apos;s the app.
        </h2>
      </Reveal>
      <StackCards />
    </section>
  );
}

export function Statement() {
  return (
    <section className="border-y-2 border-[color:var(--line)]">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-8 lg:py-40">
        <h2 className="display text-[clamp(2.75rem,8.4vw,8.5rem)]">
          <span className="block pb-[0.08em]">Folders hide notes.</span>
          <Marked>Links find them.</Marked>
        </h2>
      </div>
    </section>
  );
}

const FREE = [
  "Unlimited notes on one device",
  "Backlinks and full-text search",
  "Plain Markdown files",
  "Export any time",
] as const;
const PLUS = [
  "Encrypted sync across your devices",
  "Ask your notes",
  "Daily resurfacing",
  "Email support from the people who build it",
] as const;

function Plate({
  name,
  price,
  note,
  items,
  className,
}: {
  name: string;
  price: string;
  note: string;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col border-2 border-[color:var(--line)] p-7 md:p-10 ${className}`}>
      <p className="font-[family-name:var(--v-mono)] text-sm font-medium">{name}</p>
      <p className="display mt-6 text-[clamp(3.5rem,7vw,6.5rem)]">{price}</p>
      <p className="mt-2 text-base font-medium">{note}</p>
      <ul className="mt-10 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[17px] leading-snug">
            <Check size={20} weight="bold" className="mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1500px] scroll-mt-16 px-5 py-24 md:px-8 lg:py-32">
      <Reveal>
        <h2 className="display max-w-[12ch] pb-10 text-[clamp(2.75rem,7vw,6.5rem)]">
          Free until you sync.
        </h2>
      </Reveal>
      {/* mock pricing */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Plate name="Free" price="$0" note="Forever, on one device." items={FREE} className="h-full bg-[color:var(--bg)]" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Plate
            name="Plus"
            price="$8"
            note="A month, billed yearly."
            items={PLUS}
            className="h-full bg-[color:var(--accent)] text-[color:var(--on-accent)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-t-2 border-[color:var(--line)]">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <h2 className="display text-[clamp(2.5rem,4.6vw,4.5rem)] lg:col-span-5">Questions.</h2>
        <div className="lg:col-span-7">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className="faq group border-t-2 border-[color:var(--line)] last:border-b-2"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-xl font-bold leading-snug md:text-2xl">
                {item.q}
                <span className="grid size-10 shrink-0 place-items-center border-2 border-[color:var(--line)] transition-colors duration-200 group-hover:bg-[color:var(--accent)] group-hover:text-[color:var(--on-accent)]">
                  <Plus size={18} weight="bold" className="faq-plus transition-transform duration-300" />
                </span>
              </summary>
              <p className="max-w-[54ch] pb-7 text-lg leading-relaxed text-[color:var(--fg-2)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section id="download" className="scroll-mt-16 border-y-2 border-[color:var(--line)] bg-[color:var(--accent)] text-[color:var(--on-accent)]">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-5 py-20 md:px-8 lg:py-28">
        <Reveal>
          <h2 className="display max-w-[11ch] text-[clamp(3.5rem,10vw,9.5rem)]">
            Start with one note.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href="#top" className={`${BUTTON} bg-[color:var(--fg)] text-[color:var(--bg)]`}>
            {CTA_PRIMARY}
            <ArrowRight size={18} weight="bold" />
          </a>
          <p className="max-w-[34ch] text-base font-medium leading-snug">
            Free on one device. Sync and Ask are $8 a month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pt-14 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Mark shape="square" />
            <span className="display text-xl">{BRAND}</span>
          </a>
          <p className="mt-4 max-w-[32ch] text-base leading-relaxed text-[color:var(--fg-2)]">
            A second brain for everything you read, write and want to remember.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="font-[family-name:var(--v-mono)] text-sm font-medium">{group}</p>
              <ul className="mt-4 space-y-3 text-base text-[color:var(--fg-2)]">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="underline-offset-4 hover:text-[color:var(--fg)] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p aria-hidden className="display mt-10 select-none px-5 text-center text-[clamp(8rem,34vw,32rem)] leading-[0.74] md:px-8">
        Pith
      </p>
      <p className="sr-only">&copy; 2026 Pith Labs</p>
    </footer>
  );
}
