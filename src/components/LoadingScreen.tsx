"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<1 | 2 | 3>(1); // 1: Gathering Light, 2: Name Assembly, 3: Cinematic Zoom Entrance
  const [assembledCount, setAssembledCount] = useState(1);
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  const fullName = "KAUSIK";
  const titles = [
    "AI & Machine Learning Architect",
    "Smart India Hackathon 2025 Finalist",
    "3D WebGL & Interactive Systems Engineer"
  ];

  useEffect(() => {
    // Stage 1 -> Stage 2 (Gathering light -> Name Assembly)
    const stage2Timer = setTimeout(() => {
      setStage(2);
    }, 1000);

    // Assembly letter timer
    const letterInterval = setInterval(() => {
      setAssembledCount((prev) => {
        if (prev < fullName.length) return prev + 1;
        return prev;
      });
    }, 250);

    // Title morphing timer
    const titleInterval = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % titles.length);
    }, 800);

    // Stage 2 -> Stage 3 (Zoom entrance)
    const stage3Timer = setTimeout(() => {
      setStage(3);
    }, 3400);

    // Complete transition
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(stage2Timer);
      clearInterval(letterInterval);
      clearInterval(titleInterval);
      clearTimeout(stage3Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={stage === 3 ? { opacity: 0, scale: 1.15 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-none"
    >
      {/* Holographic Radial Ambient Field */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none animate-pulse" />

      {/* Gathering Light Fragments */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {Array.from({ length: 45 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0.1,
              scale: 0.5
            }}
            animate={
              stage === 1
                ? {
                    x: typeof window !== "undefined" ? window.innerWidth / 2 : 600,
                    y: typeof window !== "undefined" ? window.innerHeight / 2 : 400,
                    opacity: 0.9,
                    scale: 1.2
                  }
                : {
                    y: [0, -30, 0],
                    opacity: [0.3, 0.9, 0.3]
                  }
            }
            transition={{
              duration: stage === 1 ? 1.2 : 2.5 + Math.random() * 2,
              repeat: stage === 1 ? 0 : Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(0,217,255,1)]"
          />
        ))}
      </div>

      {/* Main Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs mb-6 shadow-[0_0_20px_rgba(0,217,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>SYSTEM EXPERIENCE LOADING</span>
        </div>

        {/* Light Fragment Name Formation */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-[0.2em] uppercase text-gradient-purple flex items-center justify-center gap-2 min-h-[90px] mb-4">
          {fullName.slice(0, assembledCount).split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.2, filter: "blur(20px)", y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-block relative"
            >
              {char}
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-cyan-400 shadow-[0_0_12px_rgba(0,217,255,1)]" />
            </motion.span>
          ))}
        </h1>

        <p className="text-xs text-slate-400 tracking-widest uppercase mb-8 font-mono">Sk Kausik Hussain</p>

        {/* Professional Title Transition */}
        <div className="h-8 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTitleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm text-cyan-300 font-mono font-bold tracking-wide text-center"
            >
              &gt; {titles[activeTitleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>INITIATING AWWWARDS-GRADE DIGITAL IDENTITY...</span>
        </div>
      </div>
    </motion.div>
  );
}
