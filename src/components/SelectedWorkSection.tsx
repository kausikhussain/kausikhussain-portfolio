"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Award, Sparkles, Layers, ShieldCheck, Activity } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { GithubIcon } from "./SocialIcons";
import ProjectModal from "./ProjectModal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SelectedWorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "AI & Full-Stack", "Real-Time Systems", "Web Applications"];

  const flagshipProject = PORTFOLIO_DATA.projects.find((p) => p.id === "jansehat") || PORTFOLIO_DATA.projects[0];
  const otherProjects = PORTFOLIO_DATA.projects.filter((p) => p.id !== "jansehat");

  const filteredProjects = otherProjects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "AI & Full-Stack") return p.category.includes("AI") || p.tags.includes("AI / ML");
    if (filter === "Real-Time Systems") return p.tags.includes("Socket.IO") || p.category.includes("Real-Time") || p.tags.includes("Geolocation");
    if (filter === "Web Applications") return p.category.includes("Web") || p.category.includes("Full-Stack");
    return true;
  });

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 chip mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--c-blue)" }} />
              <span>01 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
              Engineered for impact.
            </h2>
            <p className="text-sub text-base sm:text-lg mt-3 max-w-xl">
              From low-bandwidth national telemedicine platforms to sub-200ms real-time event sync meshes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "text-heading font-semibold"
                    : "text-dim hover:text-heading"
                }`}
                style={{
                  backgroundColor: filter === cat ? "var(--c-tag-bg)" : "transparent",
                  border: `1px solid ${filter === cat ? "var(--c-border)" : "transparent"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ─── FLAGSHIP FEATURED PROJECT (JanSehat) ─── */}
        {filter === "All" || filter === "AI & Full-Stack" ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-12 rounded-3xl p-6 sm:p-10 card-base relative overflow-hidden"
          >
            {/* Top Badge & Metric */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    color: "#D97706",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  <Award className="w-3.5 h-3.5" />
                  SMART INDIA HACKATHON 2025 NATIONAL FINALIST
                </span>
                <span className="text-xs font-mono text-dim hidden sm:inline-block">
                  Flagship Engineering
                </span>
              </div>
              <span className="text-xs font-mono text-dim">{flagshipProject.period}</span>
            </div>

            {/* Asymmetric Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-heading mb-4 leading-tight">
                  {flagshipProject.title}
                </h3>
                <p className="text-sub text-base sm:text-lg leading-relaxed mb-6">
                  {flagshipProject.desc}
                </p>

                {/* Key Technical Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-faint bg-raised">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Activity className="w-4 h-4 text-link" />
                      <span className="text-xs font-mono font-semibold text-heading uppercase">Network Resilience</span>
                    </div>
                    <p className="text-xs text-sub leading-normal">
                      Automated WebRTC bitrate scaling with seamless fallback to audio/teletext under 2G/3G packet loss.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-faint bg-raised">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-link" />
                      <span className="text-xs font-mono font-semibold text-heading uppercase">Offline First</span>
                    </div>
                    <p className="text-xs text-sub leading-normal">
                      IndexedDB local record staging ensuring zero consultation drop-off in remote clinic environments.
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {flagshipProject.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(flagshipProject)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: "var(--c-text)",
                      color: "var(--c-bg)",
                    }}
                  >
                    Deep Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {flagshipProject.demo && (
                    <a
                      href={flagshipProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-main text-sub hover:text-heading transition-colors"
                    >
                      Live Deployment
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {flagshipProject.github && (
                    <a
                      href={flagshipProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-main text-sub hover:text-heading transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Key Problem / Architecture Snapshot */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-main bg-raised">
                <span className="text-xs font-mono uppercase tracking-wider text-dim block mb-3">
                  Architecture Snapshot
                </span>

                <div className="space-y-4 text-xs font-mono">
                  <div className="pb-3 border-b border-faint">
                    <span className="text-dim block mb-1">01 / PROBLEM</span>
                    <p className="text-sub font-sans text-sm">
                      Rural primary health centers lack high-bandwidth connectivity and specialized physicians, causing diagnostic delays.
                    </p>
                  </div>

                  <div className="pb-3 border-b border-faint">
                    <span className="text-dim block mb-1">02 / APPROACH</span>
                    <p className="text-sub font-sans text-sm">
                      Lightweight PWA with client-side NLP symptom parsing, multi-tier WebRTC resolution negotiation, and automated medical record triage.
                    </p>
                  </div>

                  <div>
                    <span className="text-dim block mb-1">03 / VERIFIED OUTCOME</span>
                    <p className="text-heading font-sans font-semibold text-sm">
                      Selected as National Finalist at Smart India Hackathon 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* ─── SECONDARY PROJECTS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: idx * 0.08 }}
              className="rounded-2xl p-6 sm:p-8 card-base flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="chip text-[11px]">{project.category}</span>
                  <span className="text-xs font-mono text-dim">{project.period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-heading mb-2">
                  {project.title}
                </h3>

                {project.metric && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-link mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{project.metric}</span>
                  </div>
                )}

                <p className="text-sub text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Tags & Action row */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-faint flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-link transition-colors cursor-pointer"
                  >
                    Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-faint text-sub hover:text-heading transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-faint text-sub hover:text-heading transition-colors"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
