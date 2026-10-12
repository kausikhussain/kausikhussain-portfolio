"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import audioSystem from "@/utils/audioSystem";

export type ProfessionTheme = "ai" | "creative" | "engineering";

interface ThemeMeta {
  id: ProfessionTheme;
  label: string;
  sublabel: string;
  accentColor: string;
  secondaryAccent: string;
  gradientClass: string;
  heroHeadline: string;
  heroHeadlineSub: string;
  heroSubtitle: string;
  proofBadge: string;
  starterQuestions: string[];
}

export const THEME_CONFIG: Record<ProfessionTheme, ThemeMeta> = {
  ai: {
    id: "ai",
    label: "AI / ML",
    sublabel: "RESEARCH LAB",
    accentColor: "#06B6D4",
    secondaryAccent: "#3B82F6",
    gradientClass: "from-cyan-400 via-blue-500 to-indigo-500",
    heroHeadline: "Exploring intelligence.",
    heroHeadlineSub: "Engineering what comes next.",
    heroSubtitle:
      "B.Tech CSE student & Smart India Hackathon 2025 National Finalist architecting low-bandwidth telemedicine ML models, neural pipelines, and intelligent web systems.",
    proofBadge: "SIH '25 National Finalist · AI/ML Systems",
    starterQuestions: [
      "Explain JanSehat's low-bandwidth AI triage",
      "What ML frameworks does Kausik use?",
      "Tell me about SIH 2025 National Finalist achievement",
      "Why hire Kausik for an AI engineering role?",
    ],
  },
  creative: {
    id: "creative",
    label: "3D WEB",
    sublabel: "CREATIVE STUDIO",
    accentColor: "#A855F7",
    secondaryAccent: "#EC4899",
    gradientClass: "from-purple-400 via-pink-500 to-amber-500",
    heroHeadline: "Designing spatial dimensions.",
    heroHeadlineSub: "Code with aesthetic gravity.",
    heroSubtitle:
      "Creative technologist crafting 60 FPS GPU-accelerated WebGL environments, custom GLSL shaders, reactive particle meshes, and fluid micro-interactions with Three.js.",
    proofBadge: "Three.js & WebGL · 60 FPS GPU Engine",
    starterQuestions: [
      "How does Kausik optimize Three.js at 60 FPS?",
      "Show interactive 3D WebGL experiments",
      "What is the architecture behind the 3D canvas?",
      "Explain Kausik's creative design philosophy",
    ],
  },
  engineering: {
    id: "engineering",
    label: "FULL-STACK",
    sublabel: "COMMAND CENTER",
    accentColor: "#10B981",
    secondaryAccent: "#14B8A6",
    gradientClass: "from-emerald-400 via-teal-500 to-cyan-500",
    heroHeadline: "Architecting resilient systems.",
    heroHeadlineSub: "Built for real-world scale.",
    heroSubtitle:
      "Full-stack software architect engineering sub-200ms real-time Socket.IO synchronization meshes, WebRTC peer data channels, and scalable distributed APIs.",
    proofBadge: "Sub-200ms Sync · Real-Time WebRTC Meshes",
    starterQuestions: [
      "How does TripSync achieve sub-200ms sync?",
      "Explain the backend architecture across projects",
      "How does the Uber Clone dispatch lifecycle work?",
      "Show Kausik's full-stack and database stack",
    ],
  },
};

interface ThemeContextType {
  theme: ProfessionTheme;
  mode: ProfessionTheme; // Alias for backward compatibility
  setTheme: (t: ProfessionTheme) => void;
  setMode: (m: ProfessionTheme) => void; // Alias
  meta: ThemeMeta;
  accentColor: string;
  gradientClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ProfessionTheme>("ai");

  useEffect(() => {
    const stored = (localStorage.getItem("kh-persona") || localStorage.getItem("kh-theme")) as ProfessionTheme | null;
    if (stored === "ai" || stored === "creative" || stored === "engineering") {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
      document.documentElement.setAttribute("data-identity-mode", stored);
    } else {
      document.documentElement.setAttribute("data-theme", "ai");
      document.documentElement.setAttribute("data-identity-mode", "ai");
    }
  }, []);

  const setTheme = useCallback((next: ProfessionTheme) => {
    audioSystem.playModeSwitch();
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.setAttribute("data-identity-mode", next);
    localStorage.setItem("kh-persona", next);
    localStorage.setItem("kh-theme", next);
  }, []);

  const meta = THEME_CONFIG[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode: theme,
        setTheme,
        setMode: setTheme,
        meta,
        accentColor: meta.accentColor,
        gradientClass: meta.gradientClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Seamless alias for components using useIdentityMode
export const useIdentityMode = useTheme;
