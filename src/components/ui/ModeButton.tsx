"use client";

import React from "react";
import { motion } from "framer-motion";
import { IdentityMode } from "@/components/IdentityModeContext";

export interface ModeButtonProps {
  mode: IdentityMode;
  currentMode: IdentityMode;
  label: string;
  icon: React.ReactNode;
  activeColor: string;
  onClick: (mode: IdentityMode) => void;
}

export const ModeButton: React.FC<ModeButtonProps> = ({
  mode,
  currentMode,
  label,
  icon,
  activeColor,
  onClick,
}) => {
  const isActive = currentMode === mode;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(mode)}
      className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all duration-300 cursor-pointer ${
        isActive
          ? `${activeColor} text-white shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white/40`
          : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10"
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="font-semibold">{label}</span>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
    </motion.button>
  );
};

export default ModeButton;
