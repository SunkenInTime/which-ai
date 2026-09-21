const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]";

export const primaryCta = `${base} h-12 bg-[var(--accent)] px-5 text-[var(--accent-fg)] hover:opacity-90`;

export const navCta = `${base} h-10 bg-[var(--accent)] px-4 text-[var(--accent-fg)] hover:opacity-90`;

export const secondaryCta = `${base} h-12 border border-[var(--fg)] px-5 text-[var(--fg)] hover:bg-[var(--soft)]`;
