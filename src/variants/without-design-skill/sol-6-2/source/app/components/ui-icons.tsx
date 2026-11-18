import type { ReactNode } from "react";

const paths = {
  arrow: <><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></>,
  diagonal: <><path d="M6 18 18 6M9 6h9v9"/></>,
  down: <path d="M12 4v15m-6-6 6 6 6-6"/>,
  chevron: <path d="m6 9 6 6 6-6"/>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5m-18 4 9 5 9-5"/></>,
  write: <><path d="M12 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="m18 3 3 3-8 8-4 1 1-4 8-8Z"/></>,
  link: <><path d="m10 14 4-4m-5 6-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m0 8a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-1 1"/></>,
  search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/></>,
  graph: <><circle cx="5" cy="13" r="2"/><circle cx="16" cy="5" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 12 7-6m3 1 2 9M7 14l10 3"/></>,
  note: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4M9 12h6m-6 4h6"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
  inbox: <><path d="M3 14 6 5h12l3 9v5H3v-5Zm0 0h5l2 3h4l2-3h5"/></>,
} satisfies Record<string, ReactNode>;

export function Icon({ name, size = 20 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}
