"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled ? "true" : "false"}>
      <a href="#top" className={styles.brand} aria-label="Kept home">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <path
            d="M16 16 L6 7 M16 16 L27 9 M16 16 L9 27 M16 16 L25 25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="6" cy="7" r="2.4" fill="currentColor" />
          <circle cx="27" cy="9" r="2" fill="currentColor" />
          <circle cx="9" cy="27" r="2" fill="currentColor" />
          <circle cx="25" cy="25" r="2.4" fill="currentColor" />
          <circle cx="16" cy="16" r="4.2" fill="var(--accent)" />
        </svg>
        Kept
      </a>
      <nav className={styles.navLinks} aria-label="Main">
        <a href="#capture">Capture</a>
        <a href="#story">How it works</a>
        <a href="#privacy">Privacy</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <a href="#start" className={styles.signIn}>
        Sign in
      </a>
    </header>
  );
}
