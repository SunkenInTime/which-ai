/* Three stacked stones: the waymark that gives the product its name.
   Drawn with currentColor so each iteration can restyle it. */
export function CairnMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="12" cy="18.4" rx="9" ry="3.4" fill="currentColor" />
      <ellipse cx="11.6" cy="11.9" rx="6.6" ry="3.1" fill="currentColor" opacity="0.82" />
      <ellipse cx="12.2" cy="6.6" rx="4.2" ry="2.5" fill="currentColor" opacity="0.66" />
      <circle cx="12" cy="2.6" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
