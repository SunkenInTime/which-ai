"use client";

import { useEffect, useState } from "react";
import s from "./page.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      <div className={s.headerInner}>
        <a href="#top" className={s.brand} aria-label="Kept home">
          <svg className={s.brandMark} viewBox="0 0 32 32" aria-hidden="true">
            <rect x="3" y="6" width="20" height="22" rx="6" fill="#bfe3ff" />
            <rect x="9" y="3" width="20" height="22" rx="6" fill="#2563eb" />
            <circle cx="15" cy="11" r="2.2" fill="#fff" />
            <circle cx="23" cy="17" r="2.2" fill="#fff" />
            <path d="M15 11 L23 17" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Kept
        </a>
        <nav className={s.nav} aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#privacy">Privacy</a>
          <a href="#pricing">Pricing</a>
          <a href="#signin" className={s.navStrong}>Sign in</a>
        </nav>
      </div>
    </header>
  );
}
