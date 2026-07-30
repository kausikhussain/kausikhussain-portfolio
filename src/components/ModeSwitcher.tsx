"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Cpu, LucideIcon } from "lucide-react";
import { useIdentityMode, IdentityMode } from "./IdentityModeContext";
import { soundEffects } from "@/utils/soundEffects";

export default function ModeSwitcher() {
  const { mode, setMode } = useIdentityMode();

  const modes: { id: IdentityMode; label: string; icon: LucideIcon; color: string }[] = [
    { id: "ai", label: "AI Intelligence", icon: Brain, color: "text-cyan-400" },
    { id: "creative", label: "Creative Studio", icon: Sparkles, color: "text-purple-400" },
    { id: "engineering", label: "Engineering", icon: Cpu, color: "text-emerald-400" }
  ];

  const handleModeChange = (id: IdentityMode) => {
    soundEffects.playModeSwitch();
    setMode(id);
  };

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-950/80 border border-white/10 shadow-2xl backdrop-blur-xl">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => handleModeChange(m.id)}
            onMouseEnter={() => soundEffects.playHoverTick()}
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
              isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeModePill"
                className={`absolute inset-0 rounded-full border shadow-md ${
                  m.id === "ai"
                    ? "bg-cyan-950/80 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : m.id === "creative"
                    ? "bg-purple-950/80 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "bg-emerald-950/80 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                }`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className={`w-3.5 h-3.5 ${isActive ? m.color : "text-slate-400"}`} />
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.label.split(" ")[0]}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
