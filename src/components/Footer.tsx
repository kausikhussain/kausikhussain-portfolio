"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Sparkles, Cpu, Clock } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030308] border-t border-white/10 pt-16 pb-12 relative text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>{PORTFOLIO_DATA.personal.name}</span>
          </div>
          <p className="text-slate-500 text-xs max-w-sm text-center md:text-left">
            Crafting intelligent AI systems, real-time architectures, and 3D web experiences.
          </p>
        </div>

        {/* Center Live Clock */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 text-indigo-300">
          <Clock className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Odisha, IN: {timeStr || "01:30 AM"} (IST)</span>
        </div>

        {/* Right Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-slate-500">© {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}</span>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:text-white hover:border-indigo-400 transition-all shadow-lg"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
