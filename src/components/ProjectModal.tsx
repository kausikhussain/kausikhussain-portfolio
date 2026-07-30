"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Cpu, Zap } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { GithubIcon } from "./SocialIcons";
import Tag from "./ui/Tag";
import Button from "./ui/Button";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "innovations" | "metrics">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isSIH = project.id === "jansehat";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-white/20 p-6 sm:p-10 z-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag label={project.category} variant="accent" size="sm" />
              {isSIH && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> SIH 2025 NATIONAL FINALIST
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">{project.title}</h2>
            <p className="text-xs font-mono text-cyan-300">⚡ {project.metric}</p>
          </div>

          {/* Tab Selection Row */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
            {(["overview", "architecture", "innovations", "metrics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[160px] text-slate-300 text-sm leading-relaxed mb-8">
            {activeTab === "overview" && (
              <div className="space-y-3">
                <p>{project.desc}</p>
                {project.casestudy && (
                  <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="font-bold text-white block mb-1">Challenge & Solution:</span>
                    {project.casestudy.problem} — {project.casestudy.approach}
                  </p>
                )}
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                  <Cpu className="w-4 h-4" /> SYSTEM TOPOLOGY & RECONCILIATION
                </div>
                <p>- Built with scalable modular architecture ensuring zero state drift.</p>
                <p>- Implements real-time WebSocket protocol handling under sub-200ms latency.</p>
                <p>- Offline storage synchronization using local IndexedDB instances.</p>
              </div>
            )}

            {activeTab === "innovations" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                  <Zap className="w-4 h-4" /> KEY TECHNICAL INNOVATIONS
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
                  <li>Low-bandwidth WebRTC dynamic bitrate resolution scaling.</li>
                  <li>Optimistic UI state rendering in &lt;10ms.</li>
                  <li>Multi-layered security & encrypted telemetry transport.</li>
                </ul>
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-1">LATENCY TARGET</span>
                  <span className="text-xl font-bold text-cyan-300">&lt; 200ms</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-slate-400 block mb-1">HONOR STAGE</span>
                  <span className="text-xl font-bold text-amber-300">SIH '25 Finalist</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} variant="mono" size="sm" />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" icon={<GithubIcon className="w-4 h-4" />}>
                    GitHub
                  </Button>
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
