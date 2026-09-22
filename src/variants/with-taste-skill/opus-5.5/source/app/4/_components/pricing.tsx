import { Check } from "@phosphor-icons/react/ssr";
import { MagneticCta } from "./magnetic-cta";

const FREE = ["Unlimited notes", "One device, plus the web app", "Links, backlinks and the graph", "Daily notes and highlights"];
const PRO = ["Sync across all your devices", "Ask your notes, with citations", "Version history", "Everything in Free"];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-[1400px] px-5 py-32 md:px-10 md:py-44">
      <h2
        id="pricing-title"
        className="v4-display max-w-[15ch] text-5xl font-[700] leading-[1] tracking-[-0.04em] md:text-7xl"
      >
        Free until you want it <span className="text-(--v4-accent-ink)">everywhere.</span>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-12 md:items-start">
        <article className="rounded-[28px] bg-(--v4-surface) p-8 md:col-span-5 md:mt-24 md:p-10">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="v4-display mt-4 text-7xl font-[750] tracking-[-0.05em]">$0</p>
          <p className="mt-2 text-(--v4-muted)">For as long as you like.</p>
          <ul className="mt-8 grid gap-3">
            {FREE.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-(--v4-accent-ink)" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MagneticCta href="#">Start free</MagneticCta>
          </div>
        </article>

        <article className="v4-dots relative overflow-hidden rounded-[28px] bg-(--v4-ink) p-8 text-(--v4-on-ink) md:col-span-7 md:p-12">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="v4-display text-8xl font-[750] tracking-[-0.05em] md:text-9xl">$8</span>
            <span className="text-lg text-[#c3c3cb]">a month, billed yearly</span>
          </p>
          <p className="mt-2 max-w-[40ch] text-[#c3c3cb]">
            For when your notes need to follow you from laptop to phone and back.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {PRO.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-[#8193ff]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MagneticCta href="#">Start free</MagneticCta>
          </div>
          <p className="mt-4 text-sm text-[#c3c3cb]">Upgrade to Pro from inside the app whenever you are ready.</p>
        </article>
      </div>
    </section>
  );
}
