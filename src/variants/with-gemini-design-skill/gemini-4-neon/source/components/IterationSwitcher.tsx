"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ITERATIONS = [
  { id: 1, href: "/1", title: "Gallery Light", subtitle: "Centered stage & live workbench" },
  { id: 2, href: "/2", title: "Nocturne Archive", subtitle: "Deep evergreen full-bleed takeover" },
  { id: 3, href: "/3", title: "Swiss Studio", subtitle: "Vermilion poster & grid rules" },
  { id: 4, href: "/4", title: "Cerulean Monograph", subtitle: "Layered sculptural editorial" },
  { id: 5, href: "/5", title: "Live Workspace", subtitle: "Direct-entry interactive app" },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMatch = ITERATIONS.find((item) => pathname === item.href);
  const currentId = currentMatch ? currentMatch.id : 1;
  const isDarkSurface = currentId === 2;

  const prevId = currentId === 1 ? 5 : currentId - 1;
  const nextId = currentId === 5 ? 1 : currentId + 1;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (!isEditing && event.altKey && event.key === "[") {
        event.preventDefault();
        router.push(`/${prevId}`);
      } else if (!isEditing && event.altKey && event.key === "]") {
        event.preventDefault();
        router.push(`/${nextId}`);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextId, prevId, router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {open && (
        <div
          role="menu"
          aria-label="Design iterations"
          className={`w-64 rounded-2xl p-1.5 shadow-2xl border ${
            isDarkSurface
              ? "bg-[#112520]/95 border-[#25453C] text-[#EEF3F0] backdrop-blur-md"
              : "bg-white/95 border-[#D8DCE3] text-[#111317] backdrop-blur-md"
          }`}
        >
          {ITERATIONS.map((item) => {
            const active = item.id === currentId;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                role="menuitem"
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors duration-150 ${
                  active
                    ? isDarkSurface
                      ? "bg-[#C8F558] text-[#0B1A16] font-semibold"
                      : "bg-[#111317] text-white font-semibold"
                    : isDarkSurface
                    ? "text-[#EEF3F0] hover:bg-[#1A352E]"
                    : "text-[#111317] hover:bg-[#F2F4F7]"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums ${
                    active
                      ? isDarkSurface
                        ? "bg-[#0B1A16]/15 text-[#0B1A16]"
                        : "bg-white/20 text-white"
                      : isDarkSurface
                      ? "bg-[#1B3A32] text-[#9BB0A7]"
                      : "bg-[#EEF0F3] text-[#525866]"
                  }`}
                >
                  {item.id}
                </span>
                <span className="flex flex-col leading-tight">
                  <span>{item.title}</span>
                  <span
                    className={`text-[13px] font-normal ${
                      active
                        ? isDarkSurface
                          ? "text-[#0B1A16]/75"
                          : "text-white/75"
                        : isDarkSurface
                        ? "text-[#9BB0A7]"
                        : "text-[#525866]"
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div
        className={`flex items-center rounded-full border shadow-lg backdrop-blur-md ${
          isDarkSurface
            ? "bg-[#112520]/90 border-[#284C42] text-[#EEF3F0]"
            : "bg-white/92 border-[#D4D8DF] text-[#111317]"
        }`}
      >
        <Link
          href={`/${prevId}`}
          aria-label={`Previous iteration (${prevId})`}
          className={`flex h-10 w-9 items-center justify-center rounded-l-full transition-colors duration-150 ${
            isDarkSurface ? "hover:bg-[#1B3A32]" : "hover:bg-[#F2F4F7]"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3.5L5.5 8L10 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex h-10 items-center gap-2 px-3 text-[14px] font-medium tabular-nums cursor-pointer transition-colors duration-150 ${
            isDarkSurface ? "hover:bg-[#1B3A32]" : "hover:bg-[#F2F4F7]"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="5"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="9"
              y="2"
              width="5"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="2"
              y="9"
              width="5"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="9"
              y="9"
              width="5"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <span>Design {currentId} / 5</span>
        </button>

        <Link
          href={`/${nextId}`}
          aria-label={`Next iteration (${nextId})`}
          className={`flex h-10 w-9 items-center justify-center rounded-r-full transition-colors duration-150 ${
            isDarkSurface ? "hover:bg-[#1B3A32]" : "hover:bg-[#F2F4F7]"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 3.5L10.5 8L6 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
