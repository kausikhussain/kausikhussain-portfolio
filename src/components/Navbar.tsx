"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const ids = ["contact", "about", "work"];
      let found = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= window.scrollY + 320) {
          found = id;
          break;
        }
      }
      setActive(window.scrollY < 200 ? "" : found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="section-container py-3 sm:py-4">
        <nav
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-500 border ${
            scrolled
              ? "backdrop-blur-xl border-main shadow-theme-sm"
              : "border-transparent"
          }`}
          style={{
            backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-display font-bold tracking-tight text-heading truncate">
              Kausik Hussain
            </span>
            <span className="text-[10px] font-mono tracking-wide text-dim hidden sm:block">
              engineer · explorer · builder
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-heading"
                      : "text-dim hover:text-heading"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-px"
                      style={{ backgroundColor: "var(--c-text)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-sub hover:text-heading transition-colors cursor-pointer"
              style={{ backgroundColor: "var(--c-border-subtle)" }}
              aria-label={
                theme === "studio"
                  ? "Switch to dark theme"
                  : "Switch to light theme"
              }
            >
              {theme === "studio" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-heading cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 rounded-2xl border border-main p-2 backdrop-blur-xl"
              style={{ backgroundColor: "var(--nav-bg)" }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-heading rounded-xl hover:bg-raised transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
