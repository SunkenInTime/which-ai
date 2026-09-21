import { layer } from "@/variants/with-taste-skill/grok-4.7/source/lib/layers";
import { navCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

export function Header({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <header
      className={`${layer.nav} fixed inset-x-0 top-0 border-b border-[var(--line)] bg-[var(--bg)]`}
    >
      <a
        href="#content"
        className={`${layer.switcher} sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-[var(--surface)] focus:px-3 focus:py-2 focus:text-sm`}
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" className="text-base font-medium tracking-tight">
          Halden
        </a>
        <nav aria-label="Page" className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#start" className={navCta}>
          Start writing
        </a>
      </div>
    </header>
  );
}
