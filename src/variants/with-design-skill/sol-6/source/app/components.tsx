import Link from "next/link";

const versions = ["one", "two", "three", "four", "five"] as const;

export function Switcher({ current }: { current: (typeof versions)[number] }) {
  return (
    <nav className="switcher" aria-label="Switch landing page design">
      <span className="switcher-label">View</span>
      <div className="switcher-links">
        {versions.map((version, index) => (
          <Link
            href={`/${version}`}
            key={version}
            aria-label={`View design ${index + 1}`}
            aria-current={current === version ? "page" : undefined}
            className={current === version ? "switcher-link active" : "switcher-link"}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#top" aria-label="Commonplace, back to top">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>commonplace</span>
    </a>
  );
}

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      {diagonal ? <path d="M4 14 14 4M5 4h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M2.5 9h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
