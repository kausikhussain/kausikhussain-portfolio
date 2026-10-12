"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  GitCommit,
  ArrowUpRight,
  FileText,
  BadgeCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import GitHubContributionGraph from "./GitHubContributionGraph";

const ease = [0.16, 1, 0.3, 1] as const;

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

export default function AboutSection() {
  const [ghStats, setGhStats] = useState<GitHubStats>({
    public_repos: 12,
    followers: 8,
    following: 10,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://api.github.com/users/kausikhussain");
        if (res.ok) {
          const data = await res.json();
          setGhStats({
            public_repos: data.public_repos || 12,
            followers: data.followers || 8,
            following: data.following || 10,
          });
        }
      } catch {
        // Fallback default stats
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 chip mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--c-blue)" }}
            />
            <span>04 / BACKGROUND & TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
            Engineer. Explorer. Builder.
          </h2>
          <p className="text-sub text-base sm:text-lg mt-3">
            Computer Science and Engineering student at Silicon Institute of Technology, specializing in AI architectures, real-time sync meshes, and interactive 3D web systems.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Bio Card */}
            <div className="rounded-2xl p-6 sm:p-8 card-base">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-heading">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <p className="text-xs font-mono text-dim mt-0.5">
                    CSE Undergraduate · Odisha, India
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open to Opportunities
                </span>
              </div>

              <div className="space-y-4 text-sm text-sub leading-relaxed mb-8">
                <p>
                  I bridge the gap between algorithmic intelligence and high-performance interactive interfaces. My work revolves around building real-time systems that stay resilient under unstable network conditions, designing fluid WebGL experiences, and architecting full-stack web platforms.
                </p>
                <p>
                  As a <strong>Smart India Hackathon 2025 National Finalist</strong>, I engineered JanSehat—a telemedicine PWA with WebRTC video fallback and local symptom intelligence. I thrive in high-pressure hackathon sprints and disciplined engineering iterations alike.
                </p>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-faint">
                <div className="p-3.5 rounded-xl border border-faint bg-raised text-center">
                  <span className="text-xl font-display font-bold text-heading block">
                    8.75
                  </span>
                  <span className="text-[10px] font-mono text-dim uppercase">
                    B.Tech CGPA
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-faint bg-raised text-center">
                  <span className="text-xl font-display font-bold text-heading block">
                    SIH '25
                  </span>
                  <span className="text-[10px] font-mono text-dim uppercase">
                    National Finalist
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-faint bg-raised text-center">
                  <span className="text-xl font-display font-bold text-heading block">
                    &lt;200ms
                  </span>
                  <span className="text-[10px] font-mono text-dim uppercase">
                    Sync Latency
                  </span>
                </div>
              </div>

              {/* Resume Download CTA */}
              <div className="mt-6 pt-6 border-t border-faint flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-sub font-mono">
                  Looking for detailed work history?
                </span>
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-main text-heading hover:bg-raised transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Download Resume (PDF)
                </a>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="rounded-2xl p-6 sm:p-7 card-base">
              <h4 className="text-xs font-mono uppercase tracking-wider text-dim flex items-center gap-2 mb-4">
                <BadgeCheck className="w-4 h-4 text-link" />
                VERIFIED CERTIFICATIONS
              </h4>
              <div className="space-y-3">
                {PORTFOLIO_DATA.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center justify-between gap-4 p-3 rounded-xl border border-faint bg-raised text-xs"
                  >
                    <div>
                      <span className="font-semibold text-heading block">
                        {cert.name}
                      </span>
                      <span className="text-dim text-[11px] font-mono">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="font-mono text-dim text-[11px] shrink-0">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline & GitHub Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Education & Hackathons Timeline */}
            <div className="rounded-2xl p-6 sm:p-8 card-base">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-link" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-dim">
                  EDUCATION & MILESTONES
                </h4>
              </div>

              <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[var(--c-border)]">
                {/* College */}
                <div className="pl-6 relative">
                  <span className="absolute left-[5px] top-1.5 w-2 h-2 rounded-full bg-link -translate-x-1/2" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-sm font-display font-bold text-heading">
                      Silicon Institute of Technology
                    </h5>
                    <span className="text-xs font-mono text-dim">2023–2027</span>
                  </div>
                  <p className="text-xs text-sub mb-1">
                    B.Tech in Computer Science & Engineering ·{" "}
                    <span className="font-semibold text-heading">CGPA: 8.75</span>
                  </p>
                  <p className="text-xs text-dim">
                    Specializing in AI/ML, Full-Stack Architecture, and 3D Web Systems.
                  </p>
                </div>

                {/* SIH 2025 */}
                <div className="pl-6 relative">
                  <span
                    className="absolute left-[5px] top-1.5 w-2 h-2 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: "#D97706" }}
                  />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-sm font-display font-bold text-heading flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Smart India Hackathon 2025
                    </h5>
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      National Finalist
                    </span>
                  </div>
                  <p className="text-xs text-sub">
                    Selected for JanSehat telemedicine PWA built for low-bandwidth 2G/3G health delivery.
                  </p>
                </div>

                {/* IIT Hackathon */}
                <div className="pl-6 relative">
                  <span className="absolute left-[5px] top-1.5 w-2 h-2 rounded-full bg-link -translate-x-1/2" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-sm font-display font-bold text-heading">
                      IIT Bhubaneswar Hackathon 2025
                    </h5>
                    <span className="text-xs font-mono text-dim">2025</span>
                  </div>
                  <p className="text-xs text-sub">
                    Shipped EduNexus full-stack platform in 24 hours with modular quiz engine and course registration.
                  </p>
                </div>

                {/* Class XII */}
                <div className="pl-6 relative">
                  <span className="absolute left-[5px] top-1.5 w-1.5 h-1.5 rounded-full bg-dim -translate-x-1/2" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-xs font-semibold text-heading">
                      Apex Senior Secondary School (Class XII)
                    </h5>
                    <span className="text-xs font-mono text-dim">2023</span>
                  </div>
                  <p className="text-xs text-dim">
                    Physics, Chemistry & Mathematics Focus · Score: 67%
                  </p>
                </div>

                {/* Class X */}
                <div className="pl-6 relative">
                  <span className="absolute left-[5px] top-1.5 w-1.5 h-1.5 rounded-full bg-dim -translate-x-1/2" />
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h5 className="text-xs font-semibold text-heading">
                      Gurukul Public School (Class X)
                    </h5>
                    <span className="text-xs font-mono text-dim">2021</span>
                  </div>
                  <p className="text-xs text-dim">
                    Secondary Education Distinction · Score: 81%
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub Telemetry Card & Contribution Graph */}
            <div className="space-y-4">
              <div className="rounded-2xl p-5 card-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-dim" />
                  <span className="text-xs font-mono uppercase tracking-wider text-dim">
                    GITHUB REPOSITORIES
                  </span>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-link hover:underline flex items-center gap-1"
                >
                  <span>@kausikhussain</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Contribution Graph */}
              <GitHubContributionGraph />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
