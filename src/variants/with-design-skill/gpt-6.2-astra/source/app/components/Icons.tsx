import type { CSSProperties } from "react";

const paths = {
  arrow: (
    <>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </>
  ),
  upRight: (
    <>
      <path d="M5 19 19 5M6 5h13v13" />
    </>
  ),
  down: <path d="m6 9 6 6 6-6" />,
  up: <path d="m6 15 6-6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  cross: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m4 12 5 5L20 6" />,
  layers: (
    <>
      <path d="m3 8 9-5 9 5-9 5zM3 12l9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  book: (
    <>
      <rect x="5" y="3" width="15" height="18" rx="2" />
      <path d="M9 3v18M12 8h5" />
    </>
  ),
  note: (
    <>
      <path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  link: (
    <>
      <path
        d="m9 15 6-6m-6 4-2 2a3 3 0 0 1-4-4l4-4a3 3 0 0 1 4 0m2 4 2-2a3 3 0 1 1 4 4l-4 4a3 3 0 0 1-4 0"
        transform="rotate(-90 12 12)"
      />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />,
  pen: (
    <>
      <path d="m4 16 12-12a2 2 0 0 1 4 4L8 20l-5 1zM14 6l4 4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2 6-6 2 2-6z" />
    </>
  ),
  folder: <path d="M3 6h7l2 3h9v11H3z" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  map: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="17" cy="4" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="m7 11 8-6M7 13l9 5" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  style,
  className = "",
}: {
  name: keyof typeof paths;
  size?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}

export function Mark() {
  return (
    <svg
      width="34"
      height="35"
      viewBox="0 0 38 39"
      fill="none"
      aria-hidden="true"
      className="brand-mark"
    >
      <path
        d="m2 23 17-8 17 8-17 9z"
        fill="var(--mark-paper, #fff)"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="m2 17 17-8 17 8-17 9z"
        fill="var(--mark-paper, #fff)"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="m2 11 17-8 17 8-17 9z"
        fill="var(--mark-top, #ffd12e)"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
