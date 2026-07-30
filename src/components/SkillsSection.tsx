"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Server, Cloud, Cpu, CheckCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return Brain;
      case 1:
        return Sparkles;
      case 2:
        return Server;
      case 3:
        return Cloud;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-28 relative bg-[#060713]">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE SKILL MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Technical <span className="text-gradient-purple">Competencies & Stack</span>
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-xl mt-4">
            Grouped by specialized engineering domains with verified hands-on proficiency scores.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => {
            const Icon = getCategoryIcon(idx);
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.4)] scale-105"
                    : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-300" : "text-slate-400"}`} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl"
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span>{PORTFOLIO_DATA.skillCategories[activeCategory].category}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {PORTFOLIO_DATA.skillCategories[activeCategory].description}
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-400 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 self-start md:self-auto">
              {PORTFOLIO_DATA.skillCategories[activeCategory].skills.length} Core Competencies
            </span>
          </div>

          {/* Skill Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.skillCategories[activeCategory].skills.map((skill) => (
              <div key={skill.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    {skill.highlight && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-400">{skill.level}%</span>
                </div>

                {/* Animated Level Meter */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
