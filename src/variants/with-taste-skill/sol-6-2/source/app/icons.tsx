const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  diagonal: "M6 18 18 6M7 6h11v11",
  down: "m6 9 6 6 6-6",
  check: "m5 12 4 4L19 6",
  note: "M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6",
  book: "M12 6v15m0-15C8 3 4 4 2 5v14c3-1 7-1 10 2 3-3 7-3 10-2V5c-2-1-6-2-10 1Z",
  inbox: "M3 14 6 5h12l3 9v5H3zm0 0h5l2 2h4l2-2h5",
  search: "M20 20l-4-4m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  link: "m9 15 6-6m-8 8-1 1a3 3 0 0 1-4-4l5-5a3 3 0 0 1 4 0m2 6a3 3 0 0 0 4 0l5-5a3 3 0 0 0-4-4l-1 1",
  graph: "m6 6 6 6m6-6-6 6m0 0v7M3 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm-7 15a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z",
  plus: "M5 12h14m-7-7v14",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "m5 5 14 14m0-14L5 19",
  layers: "m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5m-18 4 9 5 9-5",
  more: "M5 12h.01m6.99 0h.01m6.99 0h.01",
  tag: "M3 4h8l9 9-7 7-9-9zM7 8h.01",
  clock: "M12 7v5l3 2m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  focus: "M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 11C4 11 1 7 1 1c7 0 11 4 11 10Zm1 1C13 4 17 1 23 1c0 7-4 11-10 11Zm-1 1c8 0 11 4 11 10-7 0-11-4-11-10Zm-1-1c0 8-4 11-10 11 0-7 4-11 10-11Z" />
    </svg>
  );
}
