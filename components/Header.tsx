"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

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
      <button
        className="menu-button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.985 }}
            transition={reduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 460, damping: 42, mass: 0.75 }}
          >
            {nav.map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <a href="tel:+77010010001">+7 701 001 00 01</a>
            <button className="button button-dark" onClick={() => { setMenuOpen(false); onBook(); }}>Записаться</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
