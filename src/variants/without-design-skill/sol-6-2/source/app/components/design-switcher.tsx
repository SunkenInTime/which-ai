"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { designs, type Design } from "./designs";
import { Icon } from "./ui-icons";

export function DesignSwitcher({ current }: { current: Design }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointer(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="design-switcher" ref={root}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="design-options"
        className="design-trigger"
        ref={trigger}
        onClick={() => setOpen(!open)}
      >
        <Icon name="layers" size={16} />
        <span>Design {current} <span className="design-total">/ 5</span></span>
        <span className="design-chevron"><Icon name="chevron" size={13} /></span>
      </button>
      <nav className="design-options" id="design-options" aria-label="Landing page designs" hidden={!open}>
        <p>Switch design</p>
        {Object.entries(designs).map(([number, design]) => (
          <Link
            key={number}
            href={`/${number}`}
            aria-current={number === current ? "page" : undefined}
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            <span className="design-swatch" style={{ backgroundColor: `color-mix(in srgb, ${design.color} 32%, white)` }}>{number}</span>
            <span>{design.title}</span>
            {number === current && <Icon name="check" size={15} />}
          </Link>
        ))}
      </nav>
    </div>
  );
}
