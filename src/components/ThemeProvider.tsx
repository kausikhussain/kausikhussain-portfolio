"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "studio" | "afterhours";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("afterhours");

  useEffect(() => {
    const stored = localStorage.getItem("kh-theme") as Theme | null;
    if (stored === "studio" || stored === "afterhours") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.setAttribute("data-theme", "afterhours");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "studio" ? "afterhours" : "studio";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("kh-theme", next);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "afterhours" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
