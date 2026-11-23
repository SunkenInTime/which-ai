import type { ReactNode } from "react";

export function LogoMark({ className = "", children }: { className?: string; children?: ReactNode }) {
  return (
    <span className={`grid size-7 shrink-0 place-items-center ${className}`}>
      {children ?? (
        <svg
          viewBox="0 0 16 16"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="3" cy="3.5" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="13" cy="4" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="12" cy="13" r="1.3" fill="currentColor" stroke="none" />
          <path d="M4 4.6 6.5 6.8M12 5.2 9.8 7M11.2 12.2 9.4 9.8" />
        </svg>
      )}
    </span>
  );
}
