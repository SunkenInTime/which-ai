"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useRef } from "react";
import { cn } from "../_lib/cn";

/**
 * Snap-scrolling horizontal rail with arrow controls. It lines up with the
 * page container on the left (max-w-7xl, 1.25rem then 2rem padding) and
 * bleeds off the right edge of the screen.
 */
export function Rail({
  children,
  label,
  buttonClassName,
  className,
  step = 380,
}: {
  children: React.ReactNode;
  label: string;
  buttonClassName?: string;
  className?: string;
  step?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * step, behavior: "smooth" });

  return (
    <div
      className={cn(
        "[--gutter:max(1.25rem,calc((100vw-80rem)/2+2rem))] md:[--gutter:max(2rem,calc((100vw-80rem)/2+2rem))]",
        className,
      )}
    >
      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className="flex snap-x snap-mandatory scroll-px-(--gutter) gap-5 overflow-x-auto px-(--gutter) pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="mt-6 flex gap-2 px-(--gutter)">
        {(
          [
            { dir: -1, name: "Scroll back", Icon: ArrowLeft },
            { dir: 1, name: "Scroll forward", Icon: ArrowRight },
          ] as const
        ).map(({ dir, name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`${name}: ${label}`}
            onClick={() => move(dir)}
            className={cn(
              "grid size-11 place-items-center transition-[background-color,transform,border-color] duration-200 active:scale-95",
              buttonClassName,
            )}
          >
            <Icon size={18} weight="bold" />
          </button>
        ))}
      </div>
    </div>
  );
}
