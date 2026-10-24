"use client";

import { useState } from "react";
import { PRODUCT } from "../../_shared/facts";
import s from "./dialog.module.css";

export function CtaDialog() {
  const [name, setName] = useState("Things I read");
  const [mode, setMode] = useState<"empty" | "import">("empty");

  const subject = `Start free: ${name || "my first drawer"}`;
  const bodyText = [
    "Please start my free Engram account.",
    `Drawer name: ${name || "(unnamed)"}`,
    `Start from: ${mode === "empty" ? "an empty drawer" : "a folder of Markdown files"}`,
  ].join("\n");
  const href = `mailto:${PRODUCT.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  return (
    <div
      className={s.dialog}
      data-ui
      role="group"
      aria-labelledby="dlg-title"
    >
      <h3 id="dlg-title" className={s.title}>
        Name your first drawer
      </h3>
      <label className={s.label} htmlFor="dlg-name">
        A drawer holds cards on one subject. You can make more.
      </label>
      <input
        id="dlg-name"
        className={s.field}
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={40}
        spellCheck={false}
      />
      <div className={s.seg} role="radiogroup" aria-label="Start from">
        <button
          type="button"
          role="radio"
          aria-checked={mode === "empty"}
          onClick={() => setMode("empty")}
        >
          Empty drawer
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={mode === "import"}
          onClick={() => setMode("import")}
        >
          Import Markdown
        </button>
      </div>
      <a className={s.go} href={href}>
        {PRODUCT.primaryAction}
      </a>
      <p className={s.fine}>
        Engram makes a folder called “{name || "…"}” on your computer. Nothing
        leaves it until you turn sync on.
      </p>
    </div>
  );
}
