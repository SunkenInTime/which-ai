/**
 * Real SVG Monogram & Geometric Marks for Logo Walls (Section 4.8 of design-taste-frontend skill)
 * Rule compliance:
 * - Logo wall lives UNDER the hero, never inside it.
 * - Uses inline SVG marks with brand name as aria-label for screen readers.
 * - LOGO-ONLY rule: no industry or category labels printed below each logo.
 */

export function TrustedLogos({
  className = "text-zinc-500 dark:text-zinc-400",
}: {
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6 items-center justify-items-center ${className}`}
    >
      {/* 1. Vercel SVG mark */}
      <div aria-label="Vercel" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="18" viewBox="0 0 76 65" fill="currentColor" aria-hidden="true">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Vercel</span>
      </div>

      {/* 2. Linear-style geometric mark */}
      <div aria-label="Linear" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Linear</span>
      </div>

      {/* 3. Raycast SVG mark */}
      <div aria-label="Raycast" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5.6 18.4L4 20l-2-2 1.6-1.6L5.6 18.4zM12 2L6.5 7.5l2.1 2.1L12 6.2l8.8 8.8-2.4 2.4-6.4-6.4-4.2 4.2 6.4 6.4L16.5 24 22 18.5 12 2z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Raycast</span>
      </div>

      {/* 4. Anthropic-inspired monogram mark */}
      <div aria-label="Anthropic" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="22" height="18" viewBox="0 0 28 20" fill="currentColor" aria-hidden="true">
          <path d="M16.2 2h3.3L26 18h-3.4l-4.8-12.2L13 18H9.6L16.2 2zM8.5 2h3.4L18.4 18H15l-1.4-3.6H6.8L5.4 18H2L8.5 2zm-.5 9.6h4.4L10.2 5.8 8 11.6z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Anthropic</span>
      </div>

      {/* 5. Readwise geometric mark */}
      <div aria-label="Readwise" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16v3H4V4zm0 6.5h12v3H4v-3zM4 17h8v3H4v-3zm14-3.5l4 3.5-4 3.5v-7z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Readwise</span>
      </div>

      {/* 6. Zed geometric mark */}
      <div aria-label="Zed Industries" role="img" className="flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 4h18v3.2L9.2 17H21v3H3v-3.2L14.8 7H3V4z" />
        </svg>
        <span className="font-sans text-sm font-semibold tracking-tight">Zed</span>
      </div>
    </div>
  );
}
