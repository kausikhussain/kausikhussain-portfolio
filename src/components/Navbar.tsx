"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Terminal, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ModeSwitcher from "./ModeSwitcher";
import audioSystem from "@/utils/audioSystem";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Stack", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenAICompanion?: () => void;
}

export default function Navbar({ onOpenAICompanion }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const { meta } = useTheme();

  useEffect(() => {
    setIsMuted(audioSystem.getMuted());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const ids = ["contact", "about", "skills", "philosophy", "ai-lab", "work"];
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
      <div className="section-container py-2.5 sm:py-3.5">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl transition-all duration-300 border ${
            scrolled
              ? "backdrop-blur-xl border-main shadow-theme-sm"
              : "border-transparent"
          }`}
          style={{
            backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
          }}
        >
          {/* Brand Logo & Active Persona */}
          <a href="#" className="flex flex-col leading-tight min-w-0 mr-2 sm:mr-4">
            <span className="text-sm font-display font-bold tracking-tight text-heading truncate">
              Kausik Hussain
            </span>
            <span
              className="text-[10px] font-mono tracking-wider uppercase font-semibold transition-colors duration-300"
              style={{ color: meta.accentColor }}
            >
              {meta.label} · {meta.sublabel}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-mono transition-colors duration-200 ${
                    isActive ? "text-heading font-semibold" : "text-dim hover:text-heading"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ backgroundColor: meta.accentColor }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Controls: ModeSwitcher + Sound Toggle + AI Assistant button */}
          <div className="flex items-center gap-2">
            <ModeSwitcher />

            <button
              onClick={() => {
                const nextMuted = audioSystem.toggleMute();
                setIsMuted(nextMuted);
                if (!nextMuted) audioSystem.playSuccess();
              }}
              className="p-2 rounded-xl border border-faint text-dim hover:text-heading hover:bg-raised transition-colors cursor-pointer"
              title={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-dim hover:text-heading" />
              )}
            </button>

            {onOpenAICompanion && (
              <button
                onClick={onOpenAICompanion}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-faint text-xs font-mono text-link hover:text-heading hover:bg-raised transition-colors cursor-pointer"
                title="Open Portfolio AI Assistant"
                style={{ borderColor: `${meta.accentColor}30` }}
              >
                <Terminal className="w-3.5 h-3.5" style={{ color: meta.accentColor }} />
                <span>AI Chat</span>
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-heading cursor-pointer border border-faint bg-raised"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
              className="lg:hidden mt-2 rounded-2xl border border-main p-3 backdrop-blur-2xl shadow-theme-lg"
              style={{ backgroundColor: "var(--c-surface)" }}
            >
              <div className="grid grid-cols-2 gap-1 mb-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-xs font-mono font-medium text-heading rounded-lg hover:bg-raised transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {onOpenAICompanion && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenAICompanion();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: "var(--c-surface-raised)",
                    borderColor: meta.accentColor,
                    color: meta.accentColor,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch AI Companion</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
