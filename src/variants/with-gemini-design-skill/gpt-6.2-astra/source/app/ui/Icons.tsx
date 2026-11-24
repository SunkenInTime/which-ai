import type { ReactNode } from "react";

const shapes: Record<string, ReactNode> = {
  arrow: <><path d="M4 12h15m-6-6 6 6-6 6"/></>,
  diagonal: <><path d="M6 18 18 6M6 6h12v12"/></>,
  chevron: <path d="m8 10 4 4 4-4"/>,
  next: <path d="m9 6 6 6-6 6"/>,
  layers: <><path d="m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  book: <><path d="M3 4c4-1 7 0 9 2 3-2 6-3 9-2v14c-3-1-6 0-9 2-3-2-6-3-9-2zM12 6v14"/></>,
  notebook: <><rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 3v18m3-13h5m-5 3h4"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.4M3 12h.4M3 18h.4"/></>,
  star: <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.4l6.2-.9z"/>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  plus: <path d="M5 12h14m-7-7v14"/>,
  minus: <path d="M5 12h14"/>,
  x: <path d="m6 6 12 12M18 6 6 18"/>,
  folder: <path d="M3 7V5a1.5 1.5 0 0 1 1.5-1.5h5L12 7h8a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 20 20H4.5A1.5 1.5 0 0 1 3 18.5z"/>,
  pen: <><path d="m4 16 12-12a2.7 2.7 0 0 1 4 4L8 20l-5 1zM14 6l4 4"/></>,
  note: <><path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8m-8 4h6"/></>,
  link: <><path d="m9 15 6-6M8 12l-2 2a3.5 3.5 0 1 0 5 5l3-3m2-4 2-2a3.5 3.5 0 0 0-5-5l-3 3"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  menu: <path d="M3 7h18M3 12h18M3 17h18"/>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5z"/></>,
  network: <><circle cx="5" cy="12" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="m7 11 9-5M7 13l9 5"/></>,
  bulb: <><path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0q-1 1-1 2H9q0-1-1-2z"/></>,
  photo: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="m4 18 5-5 3 2 4-6 5 6"/></>,
};
export function Icon({ name, size=18, className="" }: { name: keyof typeof shapes; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]}</svg>;
}
export function Logo() {
  return <span className="wordmark"><svg viewBox="0 0 38 38" width="35" height="35" fill="none" aria-hidden="true"><path d="m3 9 11-5 19 6-11 5z" fill="currentColor"/><path d="m3 13 19 6 11-5v5l-11 5-19-6zM3 22l19 6 11-5v5l-11 5-19-6z" fill="currentColor"/></svg>Folio</span>;
}
