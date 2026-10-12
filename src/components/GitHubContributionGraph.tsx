"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Activity } from "lucide-react";

export default function GitHubContributionGraph() {
  const [activeYear, setActiveYear] = useState<"this" | "last">("this");

  const weeks = 28;
  const daysPerWeek = 7;

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
        return "bg-emerald-500 border-emerald-400";
      case 3:
        return "bg-emerald-600/80 border-emerald-500/70";
      case 2:
        return "bg-emerald-700/60 border-emerald-600/50";
      case 1:
        return "bg-emerald-800/40 border-emerald-700/30";
      default:
        return "border-faint";
    }
  };

  return (
    <div className="card-base p-6 rounded-2xl">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-faint">
        <div>
          <h4 className="text-xs font-mono text-dim uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-link" /> CONTRIBUTION TELEMETRY
          </h4>
          <div className="flex items-center gap-3 mt-1.5 font-mono text-xs text-heading">
            <span className="font-bold">210 contributions</span>
            <span className="text-dim">•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-current" /> 14-day streak
            </span>
          </div>
        </div>

        {/* Year Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg border border-faint text-xs font-mono bg-raised self-start sm:self-auto">
          <button
            onClick={() => setActiveYear("this")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeYear === "this"
                ? "bg-page text-heading font-bold shadow-xs"
                : "text-dim hover:text-heading"
            }`}
          >
            2025
          </button>
          <button
            onClick={() => setActiveYear("last")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeYear === "last"
                ? "bg-page text-heading font-bold shadow-xs"
                : "text-dim hover:text-heading"
            }`}
          >
            2024
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-[480px]">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1.5">
              {Array.from({ length: daysPerWeek }).map((_, d) => {
                const level = getLevel(w, d);
                return (
                  <div
                    key={d}
                    className={`w-3 h-3 rounded-[2.5px] border ${getCellColor(level)} transition-transform hover:scale-125 cursor-pointer`}
                    style={{
                      backgroundColor: level === 0 ? "var(--c-surface-raised)" : undefined,
                    }}
                    title={`Day ${w * 7 + d + 1}: ${level * 3 + 1} commits`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-faint flex items-center justify-end gap-2 text-[10px] font-mono text-dim">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-[2px] border border-faint bg-raised" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800/40" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/60" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600/80" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
        <span>More</span>
      </div>
    </div>
  );
}
