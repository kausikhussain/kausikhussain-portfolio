"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Cpu, Terminal } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [assembledLetterCount, setAssembledLetterCount] = useState(1);
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  const fullName = "KAUSIK";
  const titles = [
    "AI & Machine Learning Specialist",
    "Full Stack Architect • SIH '25 Finalist",
    "3D WebGL & Interactive Web Engineer",
    "Building Next-Gen Intelligent Experiences"
  ];

  const logMessages = [
    "[1/4] INITIALIZING QUANTUM CANVAS...",
    "[2/4] CONNECTING SIH '25 WEBSOCKET MESH...",
    "[3/4] MOUNTING THREE.JS SHADERS...",
    "[4/4] WELCOME TO KAUSIK'S PORTFOLIO"
  ];

  useEffect(() => {
    // 0% -> 100% Progress Timer
    const duration = 3800;
    const intervalTime = 35;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }

        // Stage Transitions
        if (next >= 20 && next < 55) setStage(2);
        else if (next >= 55 && next < 90) setStage(3);
        else if (next >= 90) setStage(4);

        return next;
      });
    }, intervalTime);

    // Sequential Letter Assembly Timer in Stage 2
    const letterTimer = setInterval(() => {
      setAssembledLetterCount((prev) => {
        if (prev < fullName.length) return prev + 1;
        return prev;
      });
    }, 280);

    // Title morphing timer in Stage 3
    const titleInterval = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % titles.length);
    }, 750);

    // Completion trigger
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4100);

    return () => {
      clearInterval(timer);
      clearInterval(letterTimer);
      clearInterval(titleInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const currentLogIndex = Math.min(Math.floor((progress / 100) * logMessages.length), logMessages.length - 1);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#030308] flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-none"
    >
      {/* Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse" />

      {/* Floating Glowing Telemetry Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0.2
            }}
            animate={{
              y: [0, -40, 0],
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

      {/* Center Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        
        {/* Stage 1: Icon Pulse */}
        {stage === 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="w-16 h-16 rounded-3xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-8 shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            <Brain className="w-8 h-8 animate-pulse text-cyan-400" />
          </motion.div>
        )}

        {/* Stage 2 & Beyond: Cinematic Letter Assembly */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>INITIALIZING SYSTEM TELEMETRY</span>
            </div>

            {/* Letter Assembly Reveal */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-widest uppercase text-gradient-purple flex items-center justify-center gap-1.5 min-h-[70px]">
              {fullName.slice(0, assembledLetterCount).split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.4, filter: "blur(12px)", y: 15 }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block relative"
                >
                  {char}
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                </motion.span>
              ))}
            </h1>
            <p className="text-xs text-slate-400 tracking-widest uppercase mt-3 font-mono">Sk Kausik Hussain</p>
          </motion.div>
        )}

        {/* Stage 3: Identity Title Morphing */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-8 flex items-center justify-center mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTitleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm text-cyan-300 font-mono font-bold tracking-wide text-center"
              >
                &gt; {titles[activeTitleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Live Step Log Banner */}
        <div className="text-[10px] text-indigo-400 font-mono mb-4 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{logMessages[currentLogIndex]}</span>
        </div>

        {/* Progress Bar & Telemetry Counter */}
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>CORE SYSTEM</span>
            </span>
            <span className="font-bold text-white">{Math.min(Math.round(progress), 100)}%</span>
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
