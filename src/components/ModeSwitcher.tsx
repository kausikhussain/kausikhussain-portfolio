"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Cpu, LucideIcon } from "lucide-react";
import { useTheme, ProfessionTheme, THEME_CONFIG } from "./ThemeProvider";
import audioSystem from "@/utils/audioSystem";

export default function ModeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { id: ProfessionTheme; label: string; icon: LucideIcon }[] = [
    { id: "ai", label: "AI / ML", icon: Brain },
    { id: "creative", label: "3D WEB", icon: Sparkles },
    { id: "engineering", label: "FULL-STACK", icon: Cpu },
  ];

  const handleSelect = (id: ProfessionTheme) => {
    if (theme === id) return;
    setTheme(id);
  };

  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-xl border border-main shadow-theme-sm backdrop-blur-xl"
      style={{ backgroundColor: "var(--c-surface)" }}
      role="tablist"
      aria-label="Professional dimension switcher"
    >
      {themes.map((item) => {
        const Icon = item.icon;
        const isActive = theme === item.id;
        const meta = THEME_CONFIG[item.id];

        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSelect(item.id)}
            onMouseEnter={() => audioSystem.playHover()}
            className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer z-10 ${
              isActive ? "text-heading font-semibold" : "text-dim hover:text-sub"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-persona-pill"
                className="absolute inset-0 rounded-lg border shadow-xs"
                style={{
                  backgroundColor: "var(--c-surface-raised)",
                  borderColor: meta.accentColor,
                  boxShadow: `0 0 16px ${meta.accentColor}25`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon
                className="w-3.5 h-3.5 transition-colors"
                style={{ color: isActive ? meta.accentColor : "currentColor" }}
              />
              <span className="tracking-tight">{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
