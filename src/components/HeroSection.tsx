"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Terminal, Award, Activity, Sparkles, Layers } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Hero3DCanvas from "./Hero3DCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroSectionProps {
  onOpenAICompanion?: () => void;
}

export default function HeroSection({ onOpenAICompanion }: HeroSectionProps) {
  const { meta } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Dynamic 3D Scene — Pauses when scrolled, parallax pointer enabled */}
      <Hero3DCanvas />

      {/* Ambient background grid */}
      <div className="absolute inset-0 ambient-grid opacity-35 pointer-events-none z-0" />

      {/* Content Container */}
      <div className="section-container relative z-10 py-24 sm:py-32 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center w-full">
        <div className="max-w-xl lg:max-w-[620px]">
          {/* Dynamic Proof Badge */}
          <motion.div
            key={meta.proofBadge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 chip mb-6"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: meta.accentColor }}
            />
            <span className="font-semibold">{meta.proofBadge}</span>
          </motion.div>

          {/* Persona Headline */}
          <motion.h1
            key={meta.heroHeadline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-display font-bold tracking-[-0.03em] leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)" }}
          >
            {meta.heroHeadline}
            <br />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(to right, ${meta.accentColor}, ${meta.secondaryAccent})`,
              }}
            >
              {meta.heroHeadlineSub}
            </span>
          </motion.h1>

          {/* Persona Subtitle */}
          <motion.p
            key={meta.heroSubtitle}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="text-sub text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            {meta.heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3.5 mb-12"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:gap-3 cursor-pointer shadow-theme-sm"
              style={{
                backgroundColor: meta.accentColor,
                color: "#050813",
              }}
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onOpenAICompanion ? (
              <button
                onClick={onOpenAICompanion}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-main text-heading hover:bg-raised transition-colors duration-200 cursor-pointer"
                style={{ borderColor: `${meta.accentColor}35` }}
              >
                <Terminal className="w-4 h-4" style={{ color: meta.accentColor }} />
                <span>Ask AI Companion</span>
              </button>
            ) : (
              <a
                href="#ai-lab"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-main text-heading hover:bg-raised transition-colors duration-200"
              >
                <Terminal className="w-4 h-4" style={{ color: meta.accentColor }} />
                <span>AI Workspace</span>
              </a>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-dim hover:text-heading transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Live Telemetry Stats Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-faint">
            <div className="p-3 rounded-xl border border-faint bg-raised">
              <span className="text-[10px] font-mono text-dim uppercase block">HONOR</span>
              <span className="text-xs sm:text-sm font-bold text-heading flex items-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                SIH '25 Finalist
              </span>
            </div>

            <div className="p-3 rounded-xl border border-faint bg-raised">
              <span className="text-[10px] font-mono text-dim uppercase block">ACADEMIC</span>
              <span className="text-xs sm:text-sm font-bold text-heading flex items-center gap-1 mt-0.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                8.75 CGPA CSE
              </span>
            </div>

            <div className="p-3 rounded-xl border border-faint bg-raised">
              <span className="text-[10px] font-mono text-dim uppercase block">PERFORMANCE</span>
              <span className="text-xs sm:text-sm font-bold text-heading flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-link shrink-0" />
                &lt;200ms / 60 FPS
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex items-center gap-2 text-dim text-xs font-mono mt-12">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" style={{ color: meta.accentColor }} />
          <span>Scroll to explore dimensions</span>
        </div>
      </div>
    </section>
  );
}
