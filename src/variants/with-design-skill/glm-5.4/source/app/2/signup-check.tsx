"use client";

import { useState } from "react";
import Signup from "../_shared/signup";
import styles from "./pad.module.css";

export default function SignUpCheck() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.signUp}>
      <label className={styles.signLabel}>
        <input
          className={styles.signInput}
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span className={styles.box} aria-hidden="true">
          {checked && (
            <svg viewBox="0 0 24 24" className={styles.tick}>
              <path
                d="M4 12.5 9.5 18 20 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span>Sign up, it&apos;s free</span>
      </label>
      <div className={styles.signReveal} data-open={checked || undefined}>
        <div className={styles.signRevealInner}>
          <Signup
            label="Send it"
            prompt="Where should we send your first page?"
            done="Done. Your first page is on its way."
          />
        </div>
      </div>
    </div>
  );
}
