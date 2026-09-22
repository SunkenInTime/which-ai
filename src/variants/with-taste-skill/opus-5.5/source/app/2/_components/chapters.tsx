import Image from "next/image";

export function Chapters() {
  return (
    <section
      aria-label="Capture and recall"
      className="mx-auto max-w-7xl px-5 pb-28 md:px-8 lg:pb-40"
    >
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <figure className="reveal lg:col-span-5 lg:self-start">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-(--paper-deep)">
            <Image
              src="https://picsum.photos/seed/library-reading-table/900/1200"
              alt="Reading glasses resting on a laptop at a wooden desk"
              fill
              quality={75}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <div id="capture" className="reveal scroll-mt-12">
            <h2 className="font-serif-v2 text-4xl leading-[1.1] md:text-[2.75rem]">
              Capture without stopping to file.
            </h2>
            <p className="font-serif-v2 mt-5 max-w-[36ch] text-xl leading-[1.6] text-(--ink-soft)">
              A shortcut from any app, the web clipper, your phone&rsquo;s
              share sheet, or a voice memo that arrives as text. Highlights
              from what you read land in your daily note.
            </p>
          </div>

          <div
            id="recall"
            className="reveal mt-20 scroll-mt-12 border-t border-(--rule) pt-12 lg:mt-28"
          >
            <h2 className="font-serif-v2 text-4xl leading-[1.1] md:text-[2.75rem]">
              Old notes come back on their own.
            </h2>
            <p className="font-serif-v2 mt-5 max-w-[36ch] text-xl leading-[1.6] text-(--ink-soft)">
              As you write, the Related panel brings up older notes on the same
              idea. The graph shows how it all connects.
            </p>

            <figure className="mt-10 border-l-2 border-(--accent) pl-6">
              <p className="font-ui text-[0.9375rem] text-(--ink-soft)">
                You ask: what did I decide about folders?
              </p>
              <blockquote className="font-serif-v2 mt-3 text-[1.25rem] leading-[1.55]">
                You stopped using them in 2023 and moved to links, because
                entries were easier to find through an index than a hierarchy.
                <sup className="note-ref lining">1</sup>
                <sup className="note-ref lining">2</sup>
              </blockquote>
              <figcaption className="font-ui mt-4 text-[0.875rem] leading-relaxed text-(--ink-soft)">
                <span className="lining text-(--accent-text)">1</span> Why I
                stopped using folders{" "}
                <span className="ml-3 lining text-(--accent-text)">2</span> On
                keeping a commonplace book
              </figcaption>
            </figure>
            <p className="font-ui mt-5 text-[0.9375rem] text-(--ink-soft)">
              Ask your notes answers from your own writing, and cites every
              note it used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
