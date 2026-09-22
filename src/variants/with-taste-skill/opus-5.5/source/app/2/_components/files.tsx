export function Files() {
  return (
    <section
      id="files"
      aria-labelledby="files-title"
      className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-28 md:px-8 lg:pb-40"
    >
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="reveal lg:col-span-4">
          <h2
            id="files-title"
            className="font-serif-v2 text-4xl leading-[1.1] text-balance md:text-5xl"
          >
            Your notes are yours.
          </h2>
          <p className="font-serif-v2 mt-5 max-w-[34ch] text-xl leading-[1.6] text-(--ink-soft)">
            Every note is a plain Markdown file in a folder you choose. Sync is
            end-to-end encrypted, so only your devices can read it.
          </p>
        </div>

        <figure className="reveal min-w-0 lg:col-span-7 lg:col-start-6 lg:mt-20">
          <figcaption className="font-ui lining mb-3 truncate text-[0.8125rem] text-(--ink-soft)">
            ~/Kept/Reading/On keeping a commonplace book.md
          </figcaption>
          <pre
            tabIndex={0}
            aria-label="The same note, as a Markdown file on disk"
            className="overflow-x-auto bg-(--paper-deep) p-6 font-mono text-[0.8125rem] leading-[1.75] md:p-8 md:text-[0.875rem]"
          >
            <code>
              <span className="md-mark">---</span>
              {"\n"}
              <span className="md-meta">created:</span> 2026-05-14
              {"\n"}
              <span className="md-meta">tags:</span> [reading, method]
              {"\n"}
              <span className="md-mark">---</span>
              {"\n\n"}
              <span className="md-head">
                <span className="md-mark"># </span>On keeping a commonplace book
              </span>
              {"\n\n"}
              Locke kept his notebook by subject, with an index{"\n"}
              at the back. See{" "}
              <span className="md-link">
                <span className="md-mark">[[</span>Locke on indexing
                <span className="md-mark">]]</span>
              </span>
              .{"\n\n"}
              <span className="md-quote">
                <span className="md-mark">&gt; </span>Gather from many books,
                then blend them{"\n"}
                <span className="md-mark">&gt; </span>into one taste of your
                own. (Seneca, Letter 84)
              </span>
              {"\n\n"}
              <span className="md-tag">#commonplace</span>{" "}
              <span className="md-tag">#retrieval</span>
            </code>
          </pre>
        </figure>
      </div>
    </section>
  );
}
