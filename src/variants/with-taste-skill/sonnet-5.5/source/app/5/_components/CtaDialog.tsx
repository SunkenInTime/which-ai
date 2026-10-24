"use client";

import { useState } from "react";
import styles from "../sections.module.css";
import { PRODUCT } from "../../_shared/facts";

export default function CtaDialog() {
  const [name, setName] = useState("Notes");
  const [mode, setMode] = useState<"empty" | "import">("empty");

  const subject = `Start Engram: folder "${name.trim() || "Notes"}"`;
  const body = `Please set me up with a new Engram folder called "${name.trim() || "Notes"}".\n${
    mode === "import" ? "I would like to import an existing folder of notes." : "I would like to start empty."
  }`;
  const href = `mailto:${PRODUCT.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className={styles.dialog} data-ui role="group" aria-labelledby="dlg-h">
      <h3 id="dlg-h" className={styles.dlgTitle}>
        Choose a folder for your notes
      </h3>
      <label className={styles.dlgLabel} htmlFor="folder-name">
        Folder name
      </label>
      <input
        id="folder-name"
        className={styles.dlgInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      <p className={styles.dlgHelp}>
        A Markdown folder on this computer: ~/Engram/{name.trim() || "Notes"}
      </p>
      <div className={styles.dlgSeg} role="group" aria-label="Where to begin">
        <button type="button" aria-pressed={mode === "empty"} onClick={() => setMode("empty")}>
          Start empty
        </button>
        <button type="button" aria-pressed={mode === "import"} onClick={() => setMode("import")}>
          Import a folder
        </button>
      </div>
      <a className={styles.dlgBtn} href={href}>
        {PRODUCT.primaryAction}
      </a>
    </div>
  );
}
