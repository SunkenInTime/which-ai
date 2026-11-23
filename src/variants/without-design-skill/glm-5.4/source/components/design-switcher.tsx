"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { ITERATIONS, step } from "@/variants/without-design-skill/glm-5.4/source/lib/iterations";

export function DesignSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const index = Math.max(
    0,
    ITERATIONS.findIndex((iteration) => iteration.href === pathname),
  );
  const onIteration = ITERATIONS[index]?.href === pathname;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      router.push(step(index, event.key === "ArrowRight" ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, router]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative flex flex-col items-center gap-2">
        {open && (
          <div id="design-switcher-menu" className="ds-menu w-72 rounded-2xl p-1.5 text-white">
            <ul className="flex flex-col gap-0.5">
              {ITERATIONS.map((iteration, i) => {
                const active = iteration.href === pathname;
                return (
                  <li key={iteration.href}>
                    <Link
                      href={iteration.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                        active ? "bg-white/15" : "hover:bg-white/10"
                      }`}
                    >
                      <span className="w-3 font-mono text-xs text-white/50 tabular-nums">{i + 1}</span>
                      <span className="flex gap-0.5" aria-hidden="true">
                        {iteration.swatch.map((color) => (
                          <span
                            key={color}
                            className="size-2 rounded-full ring-1 ring-black/25"
                            style={{ background: color }}
                          />
                        ))}
                      </span>
                      <span className="flex-1 font-medium">{iteration.name}</span>
                      <span className="text-xs text-white/55">{iteration.note}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-1 border-t border-white/10 px-3 pb-1 pt-2 font-mono text-[11px] text-white/50">
              <kbd className="rounded border border-white/20 px-1 font-mono text-[11px]">←</kbd>{" "}
              <kbd className="rounded border border-white/20 px-1 font-mono text-[11px]">→</kbd> flip designs
            </p>
          </div>
        )}
        <div className="ds-pill flex items-center gap-0.5 rounded-full p-1 text-white">
          <Link
            href={step(index, -1)}
            aria-label="Previous design"
            className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/10"
          >
            <Icon name="chevron-left" className="size-4" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="design-switcher-menu"
            title="Switch design"
            onClick={() => setOpen((value) => !value)}
            className="flex h-8 items-center gap-2.5 rounded-full px-3 transition-colors hover:bg-white/10"
          >
            <span className="flex items-center gap-1" aria-hidden="true">
              {ITERATIONS.map((iteration, i) => (
                <span
                  key={iteration.href}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index && onIteration ? "w-4 bg-white" : "w-1.5 bg-white/35"
                  }`}
                />
              ))}
            </span>
            <span className="text-sm font-medium">
              {onIteration ? ITERATIONS[index].name : "Choose a design"}
            </span>
            <span className="font-mono text-xs text-white/50 tabular-nums">
              {onIteration ? `${index + 1}/${ITERATIONS.length}` : ""}
            </span>
          </button>
          <Link
            href={step(index, 1)}
            aria-label="Next design"
            className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white/10"
          >
            <Icon name="chevron-right" className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
