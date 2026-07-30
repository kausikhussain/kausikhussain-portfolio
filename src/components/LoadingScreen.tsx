"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#050507] flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-none"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-[0.25em] uppercase mb-2">
            KAUSIK HUSSAIN
          </h1>
          <p className="text-xs text-slate-400 tracking-widest uppercase font-mono">
            PORTFOLIO & ARCHITECTURE '25
          </p>
        </motion.div>

        {/* Minimalist Line Progress */}
        <div className="w-32 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="w-full h-full bg-white"
          />
        </div>
      </div>
    </motion.div>
  );
}
