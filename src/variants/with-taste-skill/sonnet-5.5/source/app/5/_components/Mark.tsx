/** The Engram mark: an E whose middle bar ends in a node, a note on its way to a link. */
export default function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M4 3h3v18H4z M7 3h13v3H7z M7 10.5h8v3H7z M7 18h13v3H7z" fill="currentColor" />
      <circle cx="19" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
