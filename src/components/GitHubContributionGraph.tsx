"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Flame, Activity } from "lucide-react";

export default function GitHubContributionGraph() {
  const [activeYear, setActiveYear] = useState<"this" | "last">("this");

  // Simulated contribution grid matrix (52 weeks x 7 days)
  const weeks = 28;
  const daysPerWeek = 7;

  // Generate deterministic contribution levels (0 to 4)
  const getLevel = (w: number, d: number) => {
    const val = (w * 3 + d * 7 + 13) % 19;
    if (val > 15) return 4;
    if (val > 11) return 3;
    if (val > 7) return 2;
    if (val > 4) return 1;
    return 0;
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-[#10b981] border-[#34d399] shadow-[0_0_8px_rgba(16,185,129,0.6)]";
      case 3:
        return "bg-[#059669] border-[#10b981]";
      case 2:
        return "bg-[#047857] border-[#059669]";
      case 1:
        return "bg-[#064e3b] border-[#047857]";
      default:
        return "bg-[#090b14] border-white/5";
    }
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> CONTRIBUTION ACTIVITY
          </h4>
          <div className="flex items-center gap-4 mt-2 font-mono text-xs text-white">
            <span className="font-extrabold text-sm text-gradient-purple">210 contributions</span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Flame className="w-3.5 h-3.5 fill-emerald-400" /> 14 day streak
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">42 active days</span>
          </div>
        </div>

        {/* Year Toggle */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono self-start sm:self-auto">
          <button
            onClick={() => setActiveYear("this")}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeYear === "this" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            This year
          </button>
          <button
            onClick={() => setActiveYear("last")}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeYear === "last" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Last year
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-[500px]">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1.5">
              {Array.from({ length: daysPerWeek }).map((_, d) => {
                const level = getLevel(w, d);
                return (
                  <motion.div
                    key={d}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (w * 7 + d) * 0.002 }}
                    className={`w-3 h-3 rounded-[3px] border ${getCellColor(level)} transition-all hover:scale-125 cursor-pointer`}
                    title={`Day ${w * 7 + d + 1}: ${level * 3 + 1} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end gap-2 text-[10px] font-mono text-slate-500">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#090b14] border border-white/5" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#064e3b]" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#047857]" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#059669]" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981]" />
        <span>More</span>
      </div>
    </div>
  );
}
