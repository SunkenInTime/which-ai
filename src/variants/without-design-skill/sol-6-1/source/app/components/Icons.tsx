import type { CSSProperties } from "react";
export function Icon({
  name,
  size = 20,
  className = "",
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    diagonal: (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    note: (
      <>
        <path d="M14 3H5v18h14V8l-5-5Z" />
        <path d="M14 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    stack: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Z" />
        <path d="m2 12 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    connect: (
      <>
        <circle cx="5" cy="6" r="3" />
        <circle cx="19" cy="5" r="3" />
        <circle cx="12" cy="19" r="3" />
        <path d="m8 6 8-1M6 9l4.5 7M17.5 8l-4 8" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3S4 1 4 12a7 7 0 0 0 12 5c4-4 4-14 4-14Z" />
        <path d="M3 21 15 9M8 16v-5M12 12h5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    play: <path d="m9 5 10 7-10 7V5Z" />,
    folder: <path d="M3 6h7l2 3h9v11H3V6Z" />,
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v11H3V10Z" />
        <path d="M9 21v-8h6v8" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    book: (
      <>
        <path d="M12 5C8 2 3 4 3 4v15s5-2 9 1c4-3 9-1 9-1V4s-5-2-9 1Z" />
        <path d="M12 5v15" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    trash: (
      <>
        <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />
      </>
    ),
    moon: <path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z" />,
    pen: (
      <>
        <path d="m15 3 6 6L8 22H2v-6L15 3Z" />
        <path d="m12 6 6 6M2 16l6 6" />
      </>
    ),
    headphones: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <rect x="2" y="12" width="5" height="9" rx="2" />
        <rect x="17" y="12" width="5" height="9" rx="2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  );
}
export function MoriMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 20C6 23 3 16 7 10s13-1 13 10Zm0 0C17 6 24 3 30 7s1 13-10 13Zm0 0c14-3 17 4 13 10s-13 1-13-10Zm0 0c3 14-4 17-10 13s-1-13 10-13Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}
export function Starburst({
  className = "",
  text = "100% you",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div className={`starburst ${className}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path
          d="m60 2 8 17 16-10 1 20 20-3-7 18 20 5-14 14 15 13-20 6 5 19-20-1-3 20-16-11-10 18-8-18-17 10-1-20-20 3 7-19-19-5 14-14L1 51l20-6-5-19 20 1 3-20 16 11Z"
          fill="currentColor"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
}
