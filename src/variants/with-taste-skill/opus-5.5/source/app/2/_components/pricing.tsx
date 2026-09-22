import { StartFree } from "./start-free";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-t border-(--rule)"
    >
      <div className="mx-auto max-w-5xl px-5 py-28 md:px-8 lg:py-40">
        <h2
          id="pricing-title"
          className="reveal font-serif-v2 text-center text-4xl leading-[1.1] md:text-5xl"
        >
          Pricing
        </h2>

        <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center px-6 pb-14 text-center md:border-r md:border-(--rule) md:px-12 md:pb-0">
            <h3 className="font-serif-v2 pb-1 text-3xl italic">Free</h3>
            <p className="font-serif-v2 lining mt-4 text-6xl leading-none">
              $0
            </p>
            <p className="font-ui mt-3 text-[0.9375rem] text-(--ink-soft)">
              for as long as you like
            </p>
            <p className="font-serif-v2 mt-8 max-w-[28ch] text-[1.1875rem] leading-[1.6]">
              Unlimited notes on one device, plus the web. Links, backlinks,
              daily notes and the Related panel.
            </p>
            <div className="mt-10">
              <StartFree />
            </div>
          </div>

          <div className="flex flex-col items-center border-t border-(--rule) px-6 pt-14 text-center md:border-t-0 md:px-12 md:pt-0">
            <h3 className="font-serif-v2 pb-1 text-3xl italic">Pro</h3>
            <p className="font-serif-v2 lining mt-4 text-6xl leading-none">
              $8
            </p>
            <p className="font-ui mt-3 text-[0.9375rem] text-(--ink-soft)">
              a month, billed yearly
            </p>
            <p className="font-serif-v2 mt-8 max-w-[28ch] text-[1.1875rem] leading-[1.6]">
              Encrypted sync across all your devices, Ask your notes, and
              version history for every page.
            </p>
            <p className="font-ui mt-10 flex h-11 items-center text-[0.9375rem] text-(--ink-soft)">
              Upgrade from inside the app, any time.
            </p>
          </div>
        </div>

        <p className="reveal font-serif-v2 mx-auto mt-20 max-w-[44ch] text-center text-[1.0625rem] leading-[1.7] text-(--ink-soft) italic">
          Kept runs on Mac, Windows, Linux, iPhone, Android and the web. There
          is no team plan; a commonplace book is kept by one person.
        </p>
      </div>
    </section>
  );
}
