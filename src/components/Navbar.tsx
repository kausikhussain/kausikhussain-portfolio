"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import ModeSwitcher from "./ModeSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["about", "skills", "projects", "ai-lab", "experience", "contact"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "AI Lab", href: "#ai-lab", id: "ai-lab" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 transition-all duration-500 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto gap-4">
        {/* Brand Logo */}
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href="#"
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-panel shadow-2xl group hover:border-indigo-400/50 transition-all shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white font-mono tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
              SIH '25 FINALIST • AI & FULL-STACK
            </span>
          </div>
        </motion.a>

        {/* Center Identity Mode Switcher */}
        <div className="flex items-center">
          <ModeSwitcher />
        </div>

        {/* Desktop Nav Links with Active Indicator & Magnetic Hover */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full glass-panel shadow-2xl relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-mono text-xs font-semibold shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center gap-1.5"
          >
            <span>Initiate Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-2xl glass-panel text-slate-300 hover:text-white shrink-0 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 p-6 rounded-3xl bg-[#030308]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 pointer-events-auto max-w-7xl mx-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono text-slate-300 hover:text-white py-1.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                {activeSection === link.id && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono text-xs font-semibold text-center shadow-lg"
            >
              Initiate Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
