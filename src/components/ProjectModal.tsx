"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Cpu, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { GithubIcon } from "./SocialIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "challenges" | "impact">("overview");

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
          className="fixed inset-0 backdrop-blur-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-10 z-10 border border-main shadow-theme-lg overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)" }}
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-sub hover:text-heading transition-colors cursor-pointer border border-faint"
            style={{ backgroundColor: "var(--c-surface-raised)" }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="chip text-xs">{project.category}</span>
              {isSIH && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    color: "#D97706",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  <Award className="w-3.5 h-3.5" /> SIH 2025 NATIONAL FINALIST
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-heading mb-2">
              {project.title}
            </h2>
            <p className="text-xs font-mono text-link">
              ⚡ {project.metric}
            </p>
          </div>

          {/* Tab Selection Row */}
          <div className="flex items-center gap-2 border-b border-faint pb-3 mb-6 overflow-x-auto">
            {(["overview", "architecture", "challenges", "impact"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "text-heading font-semibold"
                    : "text-dim hover:text-heading"
                }`}
                style={{
                  backgroundColor: activeTab === tab ? "var(--c-tag-bg)" : "transparent",
                  border: `1px solid ${activeTab === tab ? "var(--c-border)" : "transparent"}`,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[170px] text-sm text-sub leading-relaxed mb-8">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p>{project.desc}</p>
                {project.casestudy && (
                  <div className="p-4 rounded-xl border border-faint bg-raised">
                    <span className="font-semibold text-heading block mb-1">
                      Problem Context:
                    </span>
                    <p className="text-xs leading-relaxed text-sub">
                      {project.casestudy.problem}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-faint bg-raised">
                  <div className="flex items-center gap-2 text-link font-semibold mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>System Architecture & Approach</span>
                  </div>
                  <p className="text-xs leading-relaxed text-sub">
                    {project.casestudy?.approach || "Modular architecture designed for predictable data flow, minimal latency overhead, and client-side resilience."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg border border-faint bg-raised">
                    <span className="text-dim block mb-1">DATA FLOW</span>
                    <span className="text-heading">Unidirectional state & optimistic updates</span>
                  </div>
                  <div className="p-3 rounded-lg border border-faint bg-raised">
                    <span className="text-dim block mb-1">FAULT TOLERANCE</span>
                    <span className="text-heading">Local-first cached storage with graceful recovery</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "challenges" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-heading font-semibold mb-1">
                  <Zap className="w-4 h-4 text-link" />
                  <span>Key Technical Obstacles & Solutions</span>
                </div>
                {project.casestudy?.challenges?.length ? (
                  <ul className="space-y-2">
                    {project.casestudy.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-sub">
                        <ArrowRight className="w-3.5 h-3.5 text-link shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-sub">
                    Overcame concurrency constraints and asynchronous race conditions through deterministic state machines.
                  </p>
                )}
              </div>
            )}

            {activeTab === "impact" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-faint bg-raised">
                  <div className="flex items-center gap-2 text-heading font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4 text-link" />
                    <span>Outcome & Takeaway</span>
                  </div>
                  <p className="text-xs leading-relaxed text-sub mb-3">
                    {project.casestudy?.outcome || "Validated through extensive testing and live peer demonstrations."}
                  </p>
                  {project.casestudy?.lessons && (
                    <div className="pt-3 border-t border-faint text-xs">
                      <span className="text-dim font-mono block mb-1">ENGINEERING LESSON:</span>
                      <p className="text-sub italic">"{project.casestudy.lessons}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-faint">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="chip text-[11px]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-main text-sub hover:text-heading transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: "var(--c-text)",
                    color: "var(--c-bg)",
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Launch Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
