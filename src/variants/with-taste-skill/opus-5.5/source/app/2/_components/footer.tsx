import { Signup } from "./signup";

export function Footer() {
  return (
    <footer className="border-t border-(--rule)">
      <div
        id="start"
        className="mx-auto grid max-w-7xl scroll-mt-8 grid-cols-1 gap-y-12 px-5 pt-28 md:px-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-36"
      >
        <h2 className="reveal font-serif-v2 pb-1 text-4xl leading-[1.1] md:text-[3.5rem] lg:col-span-6">
          Begin your own <em>commonplace book</em>.
        </h2>
        <div className="reveal lg:col-span-6 lg:pt-3">
          <Signup />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-24 pb-28 md:px-8 md:pb-32">
        <div className="flex flex-col gap-6 border-t border-(--rule) pt-8 md:flex-row md:items-baseline md:gap-12">
          <p className="font-serif-v2 text-2xl leading-none">Kept</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
            <a href="#how" className="ink-link">How it works</a>
            <a href="#index" className="ink-link">Index</a>
            <a href="#files" className="ink-link">Your files</a>
            <a href="#pricing" className="ink-link">Pricing</a>
          </nav>
          <p className="font-ui lining text-[0.875rem] text-(--ink-soft) md:ml-auto md:mr-[22rem]">
            &copy; 2026 Kept
          </p>
        </div>
      </div>
    </footer>
  );
}
