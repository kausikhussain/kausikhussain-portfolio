"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Menu, X, Brain, Palette, Wrench } from "lucide-react";
import { useIdentityMode, IdentityMode } from "./IdentityModeContext";
import ModeButton from "./ui/ModeButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, setMode } = useIdentityMode();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "AI Lab", href: "#ai-lab" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const modes: { id: IdentityMode; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "ai", label: "AI", icon: <Brain className="w-3.5 h-3.5" />, color: "bg-cyan-600 border-cyan-400" },
    { id: "creative", label: "Creative", icon: <Palette className="w-3.5 h-3.5" />, color: "bg-purple-600 border-purple-400" },
    { id: "engineering", label: "Engineering", icon: <Wrench className="w-3.5 h-3.5" />, color: "bg-emerald-600 border-emerald-400" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/15"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand Name Typography Mark (No Generic Monogram Logo) */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-widest text-white uppercase group-hover:text-cyan-300 transition-colors font-mono">
                KAUSIK HUSSAIN
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                SIH '25 FINALIST • ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Identity Mode Switcher & Action CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
              {modes.map((m) => (
                <ModeButton
                  key={m.id}
                  mode={m.id}
                  currentMode={mode}
                  label={m.label}
                  icon={m.icon}
                  activeColor={m.color}
                  onClick={(newMode) => setMode(newMode)}
                />
              ))}
            </div>

            <a
              href="#contact"
              className="ml-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs backdrop-blur-md transition-all flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-300" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sm:hidden mt-2 mx-4 p-6 glass-panel rounded-2xl border border-white/15 space-y-4"
        >
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase">Select Mode</span>
            <div className="flex items-center gap-1">
              {modes.map((m) => (
                <ModeButton
                  key={m.id}
                  mode={m.id}
                  currentMode={mode}
                  label={m.label}
                  icon={m.icon}
                  activeColor={m.color}
                  onClick={(newMode) => setMode(newMode)}
                />
              ))}
            </div>
          </div>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-3 rounded-xl bg-indigo-600 text-white font-mono text-xs font-bold"
          >
            Initiate Contact
          </a>
        </motion.div>
      )}
    </header>
  );
}
