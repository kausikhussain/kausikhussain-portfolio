"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Brain, Cpu, Code2, Sparkles, GitCommit, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import GitHubContributionGraph from "./GitHubContributionGraph";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

export default function AboutSection() {
  const [ghStats, setGhStats] = useState<GitHubStats>({ public_repos: 12, followers: 8, following: 10 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://api.github.com/users/kausikhussain");
        if (res.ok) {
          const data = await res.json();
          setGhStats({
            public_repos: data.public_repos || 12,
            followers: data.followers || 8,
            following: data.following || 10
          });
        }
      } catch {
        // Fallback default stats
      }
    }
    fetchStats();
  }, []);

  return (
    <Section id="about" withGrid={true}>
      {/* Section Header */}
      <Heading
        badge="01 / ABOUT"
        badgeIcon={<User className="w-3.5 h-3.5" />}
        title="Building at the intersection of"
        gradientText="AI, design & full-stack code"
        align="left"
      />

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Kausik's Story Bio & Profile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Bio Card */}
          <Card hoverGlow={true}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{PORTFOLIO_DATA.personal.name}</h3>
                  <p className="text-xs font-mono text-slate-400">SIH 2025 Finalist • CSE @ Silicon Institute</p>
                </div>
              </div>
              <Tag label="Open to Roles" variant="glow" size="sm" />
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-8">
              {PORTFOLIO_DATA.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Philosophy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <Cpu className="w-4 h-4 text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">AI Architecture</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Integrating ML models into production web apps.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <Code2 className="w-4 h-4 text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">Real-Time Sync</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Sub-200ms WebRTC & Socket.IO synchronization.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <Sparkles className="w-4 h-4 text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">Motion Design</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Smooth, purposeful Framer Motion & Three.js scenes.</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Dynamic Cards Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-6"
        >
          {/* 1. Currently Exploring Card */}
          <Card hoverGlow={true}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">CURRENTLY EXPLORING</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.currentlyExploring.map((topic, i) => (
                <Tag key={i} label={topic} variant="mono" size="sm" />
              ))}
            </div>
          </Card>

          {/* 2. Currently Building Card */}
          <Card hoverGlow={true}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">CURRENTLY BUILDING</h3>
              </div>
              <Tag label={PORTFOLIO_DATA.currentlyBuilding.statusLabel} variant="glow" size="sm" />
            </div>

            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
              {PORTFOLIO_DATA.currentlyBuilding.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {PORTFOLIO_DATA.currentlyBuilding.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.currentlyBuilding.tags.map((tag, i) => (
                <Tag key={i} label={tag} variant="default" size="sm" />
              ))}
            </div>
          </Card>

          {/* 3. GitHub Telemetry Stats Card */}
          <Card hoverGlow={true}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-slate-400" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">GITHUB TELEMETRY</h4>
              </div>
              <a
                href={PORTFOLIO_DATA.personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>@kausikhussain</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center py-2">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-xl font-extrabold text-white block">{ghStats.public_repos}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Repositories</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-xl font-extrabold text-slate-200 block">{ghStats.followers}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Followers</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-xl font-extrabold text-slate-200 block">{ghStats.following}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Following</span>
              </div>
            </div>
          </Card>

          {/* 4. Contribution Activity Graph */}
          <GitHubContributionGraph />

        </motion.div>
      </div>
    </Section>
  );
}
