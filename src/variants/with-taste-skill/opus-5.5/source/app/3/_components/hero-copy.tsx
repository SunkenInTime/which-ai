export function HeroCopy() {
  return (
    <div className="lg:pointer-events-auto">
      <h1
        style={{ "--d": "0.05s" } as React.CSSProperties}
        className="v3-rise text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-balance sm:text-6xl"
      >
        Notes that find each other.
      </h1>
      <p
        style={{ "--d": "0.15s" } as React.CSSProperties}
        className="v3-rise mt-6 max-w-[38ch] text-lg leading-relaxed text-(--fg-muted)"
      >
        Kept links what you write, brings old notes back when they matter, and answers questions
        from your own notes.
      </p>
      <div
        style={{ "--d": "0.25s" } as React.CSSProperties}
        className="v3-rise mt-9 flex flex-wrap items-center gap-3"
      >
        <a
          href="#pricing"
          className="inline-flex h-11 items-center whitespace-nowrap rounded-lg bg-(--accent) px-5 text-[15px] font-medium text-(--accent-ink) transition-transform duration-200 hover:-translate-y-px active:translate-y-px"
        >
          Start free
        </a>
        <a
          href="#keyboard"
          className="inline-flex h-11 items-center whitespace-nowrap rounded-lg border border-(--line-strong) px-5 text-[15px] font-medium text-(--fg) transition-colors duration-200 hover:bg-(--bg-sunken) active:translate-y-px"
        >
          See how it works
        </a>
      </div>
    </div>
  );
}
