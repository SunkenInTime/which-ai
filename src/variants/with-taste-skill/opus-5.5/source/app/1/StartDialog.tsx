"use client";

import { useState } from "react";
import ui from "./ui.module.css";

/** The product's own first screen, already open: name the vault, choose where it lives, get the link. */
export default function StartDialog() {
  const [name, setName] = useState("Ana’s notes");
  const [where, setWhere] = useState<"device" | "sync">("device");
  const subject = "Engram download link";
  const body = `Please send me the Engram download link.\n\nVault name: ${name || "My notes"}\nWhere it lives: ${where === "device" ? "This device only (Free)" : "All my devices (Sync, $6 a month)"}\n`;
  const href = `mailto:hello@engram.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div data-ui className={ui.dialog} role="group" aria-labelledby="v1-dialog-title">
      <div className={ui.dialogHead} id="v1-dialog-title">
        Name your vault
      </div>
      <div className={ui.dialogSub}>A vault is one folder of notes. You can make more later.</div>
      <div className={ui.dialogBody}>
        <div>
          <label className={ui.fieldLabel} htmlFor="v1-vault">
            Vault name
          </label>
          <input id="v1-vault" className={ui.input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" spellCheck={false} />
        </div>
        <div>
          <div className={ui.fieldLabel} id="v1-where">
            Where it lives
          </div>
          <div className={ui.segmented} role="radiogroup" aria-labelledby="v1-where">
            <button type="button" role="radio" aria-checked={where === "device"} className={ui.segment} onClick={() => setWhere("device")}>
              This device
            </button>
            <button type="button" role="radio" aria-checked={where === "sync"} className={ui.segment} onClick={() => setWhere("sync")}>
              All my devices
            </button>
          </div>
          <div className={ui.hintLine} style={{ marginTop: 8 }}>
            {where === "device" ? "Free. A folder called “" + (name || "My notes") + "” on this computer." : "Sync, $6 a month. End-to-end encrypted, on every device."}
          </div>
        </div>
        <a className={ui.primary} href={href}>
          Get the download link
        </a>
      </div>
    </div>
  );
}
