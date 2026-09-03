"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderProps = {
  onBook: () => void;
  light?: boolean;
};

const nav = [
  ["Услуги", "/#services"],
  ["Врачи", "/#doctors"],
  ["Цены", "/#implantation"],
  ["Филиалы", "/#branches"],
  ["О клинике", "/#about"],
];

export function Header({ onBook, light = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${light ? "header-light" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Liberty Stom — главная">
        LIBERTY STOM
      </Link>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <a href="tel:+77010010001">+7 701 001 00 01</a>
        <button className="button button-small button-dark" onClick={onBook}>Записаться</button>
      </div>
      <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Открыть меню">
        {menuOpen ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {nav.map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <a href="tel:+77010010001">+7 701 001 00 01</a>
            <button className="button button-dark" onClick={() => { setMenuOpen(false); onBook(); }}>Записаться</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
