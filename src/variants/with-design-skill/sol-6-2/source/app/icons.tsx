import type { ReactNode } from "react";

const shapes = {
  mark: <><path d="M7.1 19.2 3.5 15.6a3.3 3.3 0 0 1 0-4.7l7.4-7.4a3.3 3.3 0 0 1 4.7 0l.9.9"/><path d="m16.9 4.8 3.6 3.6a3.3 3.3 0 0 1 0 4.7l-7.4 7.4a3.3 3.3 0 0 1-4.7 0l-.9-.9"/><path d="m7.2 14.7 7.5-7.5m-5.4 9.7 7.5-7.5"/></>,
  arrow: <><path d="M4 12h15m-6-6 6 6-6 6"/></>,
  down: <path d="M12 4v15m-6-6 6 6 6-6"/>,
  upRight: <path d="M7 17 17 7M7 7h10v10"/>,
  chevronUp: <path d="m6 15 6-6 6 6"/>,
  link: <><path d="m10 13 4-4m-6 7-1.4 1.4a3.6 3.6 0 0 1-5-5L6 8a3.6 3.6 0 0 1 5.1 0m1.8 8a3.6 3.6 0 0 0 5.1 0l4.4-4.4a3.6 3.6 0 0 0-5-5L16 8"/></>,
  bolt: <path d="m13.5 2-9 11h6l-1 9 10-12h-6l1-8Z"/>,
  search: <><circle cx="10.8" cy="10.8" r="6.2"/><path d="m16 16 4 4"/></>,
  notes: <><path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h4M8.5 12h6.5m-6.5 4h5"/></>,
  grid: <><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><rect x="14.5" y="14.5" width="6" height="6" rx="1"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  network: <><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="20" cy="8" r="2"/><circle cx="7" cy="20" r="2"/><path d="m6.5 6.5 3.4 3.4m4.8.9 3.5-1.8m-7.8 5.6-2.3 3.6"/></>,
  book: <><path d="M12 5v15m0-15C9 3 5 3 2.5 4v14c3-1 7-1 9.5 2 2.5-3 6.5-3 9.5-2V4C19 3 15 3 12 5Z"/></>,
} satisfies Record<string, ReactNode>;

export function Icon({ name, size = 20 }: { name: keyof typeof shapes; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
      {shapes[name]}
    </svg>
  );
}
