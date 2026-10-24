/**
 * The one motif: a round cell body with a single reach, the shape of the
 * lettered neurons in Cajal's plates. A circle whose bottom-left quarter is
 * a square corner. In CSS the same shape is `border-radius: R R R 0`.
 */
export const CELL_PATH =
  "M0 12A12 12 0 0 1 12 0A12 12 0 0 1 24 12A12 12 0 0 1 12 24L0 24Z";

export function Cell({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={CELL_PATH} fill="currentColor" />
    </svg>
  );
}
