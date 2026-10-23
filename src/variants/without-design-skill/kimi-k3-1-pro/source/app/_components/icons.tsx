import type { SVGProps } from "react";

type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "brain"
  | "check"
  | "chevron-right"
  | "clock"
  | "close"
  | "command"
  | "file"
  | "folder"
  | "grid"
  | "link"
  | "menu"
  | "plus"
  | "search"
  | "sparkle"
  | "star"
  | "tag"
  | "play"
  | "lock";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  "arrow-up-right": <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0-1 5.7A3.5 3.5 0 0 0 6.5 17H8a3 3 0 0 0 3 3V5.5a3 3 0 0 0-1.5-1Z"/><path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1 1 5.7 3.5 3.5 0 0 1-3.5 5.3H16a3 3 0 0 1-3 3"/><path d="M7 9a3 3 0 0 0 4 2M17 9a3 3 0 0 1-4 2M6.5 17a3 3 0 0 1 4.5-2M17.5 17a3 3 0 0 0-4.5-2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  "chevron-right": <path d="m9 18 6-6-6-6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  command: <><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3Z"/></>,
  file: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  link: <><path d="m10 13 4-4"/><path d="m7.5 15.5-1 1a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0" transform="translate(3 0)"/><path d="m16.5 8.5 1-1a3.5 3.5 0 0 0-5-5l-3 3a3.5 3.5 0 0 0 0 5" transform="translate(-1 3)"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  sparkle: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6Z"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>,
  tag: <><path d="M20 13 13 20a2 2 0 0 1-3 0l-7-7V3h10l7 7a2 2 0 0 1 0 3Z"/><circle cx="8" cy="8" r="1"/></>,
  play: <path d="m9 6 9 6-9 6Z"/>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
};

export function Icon({ name, size = 20, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-lockup">
      <span className="brand-symbol"><Icon name="brain" size={compact ? 20 : 23} /></span>
      <span className="brand-word">soma</span>
    </span>
  );
}
