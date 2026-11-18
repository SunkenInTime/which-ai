export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 42 42"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M21 2v5M11.1 5l2.5 4.3M4.3 12.2l4.4 2.2M31 5l-2.6 4.4M37.8 12.1l-4.3 2.3" />
      </g>
      <path fill="currentColor" d="M8.4 20.9a12.7 12.7 0 0 1 25.2 0H8.4Z" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M3 25c6.1-1.7 12-1.7 18 1 6-2.7 12-2.7 18-1M5.7 30.4c5.7-1.2 10.2-.6 15.3 1.8 5.1-2.4 9.7-3 15.3-1.8M10.3 36c4.1-.3 7.1.6 10.7 2.1 3.6-1.5 6.5-2.4 10.7-2.1" />
      </g>
    </svg>
  );
}

export default function Brand() {
  return (
    <span className="brand">
      <BrandMark />
      <span>Daymark</span>
    </span>
  );
}
