"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, Shield, Code } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { GithubIcon } from "./SocialIcons";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030308]/85 backdrop-blur-xl cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/20 p-6 sm:p-10 z-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            title="Close Modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-8 pr-10">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-semibold mb-3 inline-block">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">{project.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{project.desc}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 font-semibold text-xs hover:border-white/30 transition-all flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-8 pt-6 border-t border-white/10">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Architectural Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Case Study Grid */}
          <div className="space-y-6">
            {/* Problem */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
              <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> The Problem
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.casestudy.problem}</p>
            </div>

            {/* Approach */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
              <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-purple-400" /> Engineering Approach
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.casestudy.approach}</p>
            </div>

            {/* Challenges */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-cyan-400" /> Technical Challenges Overcome
              </h4>
              <ul className="space-y-2">
                {project.casestudy.challenges.map((c, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 font-mono mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome & Takeaway */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Verified Outcome
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.casestudy.outcome}</p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20">
                <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-300" /> Architectural Takeaway
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.casestudy.lessons}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
