import Image from "next/image";
import { Z } from "../../lib/z";
import { StartFree } from "./start-free";

export function Hero() {
  return (
    <header className="mx-auto max-w-7xl px-5 md:px-8">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between md:h-20"
      >
        <a href="#top" className="font-serif-v2 text-[1.75rem] leading-none">
          Kept
        </a>
        <div className="flex items-center gap-8 text-[0.9375rem]">
          <a href="#index" className="ink-link hidden md:inline">
            Index
          </a>
          <a href="#pricing" className="ink-link hidden md:inline">
            Pricing
          </a>
          <StartFree />
        </div>
      </nav>

      <div
        id="top"
        className="grid grid-cols-1 gap-y-12 pt-12 pb-0 md:pt-16 lg:grid-cols-12 lg:gap-x-8 lg:pt-20 lg:pb-0"
      >
        <div className="lg:col-span-7 lg:pt-10">
          <h1 className="font-serif-v2 pb-1 text-[2.625rem] leading-[1.08] sm:text-5xl tracking-[-0.01em] md:text-6xl lg:text-[4.25rem]">
            Keep what you read.
            <br />
            <em className="text-(--accent-text)">Find it when it matters.</em>
          </h1>
          <p className="font-serif-v2 mt-7 max-w-[34ch] text-[1.375rem] leading-[1.45] text-(--ink-soft) md:text-2xl">
            Kept links each note to the ones before it, and brings old ideas
            back when they become useful again.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <StartFree size="lg" />
            <a href="#how" className="ink-link text-[0.9375rem] font-medium">
              See how it works
            </a>
          </div>
        </div>

        <figure
          className="relative lg:col-span-5 lg:col-start-8 lg:mt-24 lg:-mr-8 lg:-mb-28 xl:-mr-20"
          style={{ zIndex: Z.raised }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--paper-deep)">
            <Image
              src="https://picsum.photos/seed/handwritten-notes-desk/1000/1250"
              alt="A bundle of handwritten letters tied with string, beside a fountain pen"
              fill
              preload
              quality={75}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </header>
  );
}
