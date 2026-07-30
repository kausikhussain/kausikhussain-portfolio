"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Cpu } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [assembledLetters, setAssembledLetters] = useState(1);
  const [titleIndex, setTitleIndex] = useState(0);

  const fullName = "KAUSIK";
  const titles = [
    "Artificial Intelligence",
    "Full Stack Development",
    "Creative Engineering",
    "Building Intelligent Digital Products"
  ];

  useEffect(() => {
    const duration = 3900;
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Letter assembly step interval: K -> KA -> KAU -> KAUS -> KAUSI -> KAUSIK
    const letterTimer = setInterval(() => {
      setAssembledLetters((prev) => {
        if (prev < fullName.length) return prev + 1;
        return prev;
      });
    }, 320);

    // Subtitle morphing interval
    const titleTimer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearInterval(timer);
      clearInterval(letterTimer);
      clearInterval(titleTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#030308] flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-none"
    >
      {/* Radial Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse" />

      {/* Converging Light Fragments & Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0.2
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.9, 0.2]
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
          />
        ))}
      </div>

      {/* Center Container: Name Reveal & Title Morphing */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>SYSTEM INITIALIZATION</span>
        </motion.div>

        {/* Unforgettable Progressive Name Assembly */}
        <div className="relative mb-6 min-h-[80px] flex items-center justify-center">
          <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-[0.2em] uppercase flex items-center justify-center gap-2">
            {fullName.slice(0, assembledLetters).split("").map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.3, filter: "blur(16px)", y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-block relative text-gradient-purple"
              >
                {char}
                {/* Metallic Light Sweep */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none mix-blend-overlay"
                />
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle Morphing Stream */}
        <div className="h-8 flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="text-xs sm:text-base text-cyan-300 font-mono font-bold tracking-wider text-center"
            >
              ↓ {titles[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>SK KAUSIK HUSSAIN</span>
            </span>
            <span className="font-bold text-white font-mono">{Math.min(Math.round(progress), 100)}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
