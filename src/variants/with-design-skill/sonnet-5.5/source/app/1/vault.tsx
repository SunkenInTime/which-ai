"use client";

import { useEffect, useState } from "react";
import s from "./page.module.css";

const files = [
  { id: "top", name: "Welcome" },
  { id: "write", name: "Capture" },
  { id: "links", name: "Links" },
  { id: "ask", name: "Ask" },
  { id: "back", name: "Resurface" },
  { id: "files", name: "Files" },
  { id: "try", name: "Pricing" },
];

/** File tree that doubles as page navigation; the open file follows your scroll. */
export function Vault() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = files
      .map((f) => document.getElementById(f.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className={s.vault}>
      <div className={s.vaultFolder}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
          <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.6l1.4 1.5h5A1.5 1.5 0 0 1 14 6v5.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5z" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        Engram
      </div>
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            <a
              href={`#${f.id}`}
              className={s.file}
              aria-current={active === f.id ? "true" : undefined}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                <path d="M4 2.5h5l3 3v8H4z M9 2.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              {f.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
