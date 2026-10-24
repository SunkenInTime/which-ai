"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COUNT = 5;

// A small round button in the bottom-left corner: the current design's number. It opens into the row
// 1–5; the [ and ] keys (or the arrow keys) also move between the designs.
export function Switcher() {
  const path = usePathname();
  const router = useRouter();
  const current = Number((path ?? "/1").replace(/\D/g, "")) || 1;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "]" || e.key === "ArrowRight") router.push(`/${current < COUNT ? current + 1 : 1}`);
      if (e.key === "[" || e.key === "ArrowLeft") router.push(`/${current > 1 ? current - 1 : COUNT}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  return (
    <div className={`switcher${open ? " is-open" : ""}`} role="group" aria-label="Design iterations">
      <button type="button" className="switcher__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)} aria-label={`Design ${current} of ${COUNT}. Switch design`}>
        {current}
      </button>
      <div className="switcher__row">
        {Array.from({ length: COUNT }, (_, i) => i + 1).map((n) => (
          <Link key={n} href={`/${n}`} aria-current={n === current ? "page" : undefined} aria-label={`Design ${n}`} onClick={() => setOpen(false)}>
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}
