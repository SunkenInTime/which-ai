"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITERATIONS = [
  { path: "/1", num: "1", title: "Tabbed Slip-Box" },
  { path: "/2", num: "2", title: "Printed Annual" },
  { path: "/3", num: "3", title: "Well-Kept Board" },
  { path: "/4", num: "4", title: "Loud & Flat" },
  { path: "/5", num: "5", title: "Chamfer Motif" },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const current =
    ITERATIONS.find((it) => pathname?.startsWith(it.path)) || ITERATIONS[0];

  return (
    <div
      data-ui="iteration-switcher"
      role="navigation"
      aria-label="Switch landing page iteration"
      style={{
        backgroundColor: "#141413",
        color: "#f4f2ec",
        borderBottom: "1px solid #2e2d2a",
        fontFamily: '"Albert Sans", system-ui, -apple-system, sans-serif',
        fontSize: "13px",
        lineHeight: 1.2,
        padding: "6px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span style={{ color: "#a8a49c", fontWeight: 500 }}>
          Edition ·{" "}
          <strong style={{ color: "#f4f2ec" }}>{current.title}</strong>
        </span>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          {ITERATIONS.map((it) => {
            const active = current.path === it.path;
            return (
              <Link
                key={it.path}
                href={it.path}
                title={`/${it.num} ${it.title}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px 9px",
                  backgroundColor: active ? "#f4f2ec" : "#22211e",
                  color: active ? "#141413" : "#d6d2c8",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                /{it.num}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
