"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type IdentityMode = "ai" | "creative" | "engineering";

interface IdentityModeContextType {
  mode: IdentityMode;
  setMode: (mode: IdentityMode) => void;
  accentColor: string;
  gradientClass: string;
}

const IdentityModeContext = createContext<IdentityModeContextType | undefined>(undefined);

export function IdentityModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<IdentityMode>("ai");

  useEffect(() => {
    document.documentElement.setAttribute("data-identity-mode", mode);
  }, [mode]);

  const getAccentColor = () => {
    switch (mode) {
      case "ai":
        return "#06b6d4"; // Cyan
      case "creative":
        return "#a855f7"; // Purple
      case "engineering":
        return "#10b981"; // Emerald
    }
  };

  const getGradientClass = () => {
    switch (mode) {
      case "ai":
        return "from-cyan-500 via-blue-600 to-indigo-600";
      case "creative":
        return "from-purple-500 via-pink-600 to-orange-500";
      case "engineering":
        return "from-emerald-500 via-teal-600 to-cyan-600";
    }
  };

  return (
    <IdentityModeContext.Provider
      value={{
        mode,
        setMode,
        accentColor: getAccentColor(),
        gradientClass: getGradientClass()
      }}
    >
      {children}
    </IdentityModeContext.Provider>
  );
}

export function useIdentityMode() {
  const context = useContext(IdentityModeContext);
  if (!context) {
    throw new Error("useIdentityMode must be used within an IdentityModeProvider");
  }
  return context;
}
