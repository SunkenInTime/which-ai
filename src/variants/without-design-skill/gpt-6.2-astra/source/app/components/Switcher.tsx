"use client";

import Link from "next/link";
import { Check, ChevronUp, Layers2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { editions, type Edition } from "./editions";

export default function Switcher({ edition }: { edition: Edition }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current
      ?.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
      ?.focus();
    function outside(event: PointerEvent) {
      if (!panel.current?.contains(event.target as Node)) setOpen(false);
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div className="switcher" ref={panel}>
      {open && (
        <nav
          id="design-menu"
          className="switch-menu"
          aria-label="Choose a design"
        >
          <span className="switch-label">Choose a design</span>
          {editions.map((entry) => (
            <Link
              key={entry.id}
              href={`/${entry.id}`}
              aria-current={entry.id === edition ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <i style={{ backgroundColor: entry.color }} />
              <span className="switch-index">0{entry.id}</span>
              {entry.name}
              {entry.id === edition && (
                <Check size={15} className="switch-check" />
              )}
            </Link>
          ))}
        </nav>
      )}
      <button
        ref={trigger}
        className="switch-trigger"
        aria-expanded={open}
        aria-controls={open ? "design-menu" : undefined}
        aria-label={`Switch design, current design ${edition} of 5`}
        onClick={() => setOpen(!open)}
      >
        <Layers2 size={15} />
        <span>
          Design <b>0{edition}</b>
          <span className="switch-total"> / 05</span>
        </span>
        <ChevronUp size={14} className={open ? "rotated" : ""} />
      </button>
    </div>
  );
}
