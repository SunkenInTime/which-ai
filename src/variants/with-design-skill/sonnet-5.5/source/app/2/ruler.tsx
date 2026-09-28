"use client";

import { useEffect, useState } from "react";
import s from "./page.module.css";

const marks = [
  { id: "surface", label: "Surface", light: false },
  { id: "today", label: "Today", light: false },
  { id: "month", label: "Last month", light: false },
  { id: "year", label: "Last year", light: true },
  { id: "bedrock", label: "Bedrock", light: true },
];

/** Depth ruler fixed to the left edge. It always shows how far down the page you are. */
export function Ruler() {
  const [active, setActive] = useState("surface");

  useEffect(() => {
    const els = marks
      .map((m) => document.getElementById(m.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = marks.find((m) => m.id === active) ?? marks[0];

  return (
    <nav
      aria-label="Depth"
      className={s.ruler}
      data-tone={current.light ? "light" : "dark"}
    >
      <ul>
        {marks.map((m) => (
          <li key={m.id}>
            <a
              href={`#${m.id}`}
              className={s.mark}
              aria-current={active === m.id ? "true" : undefined}
            >
              <i aria-hidden />
              {m.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
