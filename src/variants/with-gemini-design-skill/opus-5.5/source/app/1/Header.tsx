"use client";

import { useEffect, useState } from "react";
import s from "./page.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={s.header} data-scrolled={scrolled || undefined}>
      <div className={s.headerInner}>
        <a href="#top" className={s.wordmark} aria-label="Kept home">
          Kept
        </a>
        <nav className={s.nav} aria-label="Main">
          <a href="#capture">Features</a>
          <a href="#ask">Ask</a>
          <a href="#pricing">Pricing</a>
          <a href="#login">Log in</a>
        </nav>
        <a href="#start" className={s.navButton}>
          Start free
        </a>
      </div>
    </header>
  );
}
