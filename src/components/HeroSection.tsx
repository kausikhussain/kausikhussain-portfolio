"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import SignatureVisual from "./SignatureVisual";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D visual — positioned behind on mobile, to the right on desktop */}
      <div className="absolute inset-0 lg:left-[45%] lg:right-0 lg:top-0 lg:bottom-0 pointer-events-none lg:pointer-events-auto opacity-[0.06] lg:opacity-100">
        <SignatureVisual isDark={isDark} />
      </div>

      <div className="section-container relative z-10 py-32 sm:py-40 lg:py-0 lg:min-h-screen lg:flex lg:items-center w-full">
        <div className="max-w-xl lg:max-w-[560px]">
          {/* Proof badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="inline-flex items-center gap-2 chip mb-8"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--c-blue)" }}
            />
            <span>SIH 2025 Finalist · B.Tech CSE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="font-display font-bold tracking-[-0.035em] leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
          >
            Code that thinks.
            <br />
            <span className="text-link">Interfaces that move.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="text-sub text-base sm:text-lg leading-relaxed mb-10 max-w-md"
          >
            I&apos;m Kausik — a full-stack engineer building AI-powered
            platforms, real-time collaborative systems, and interactive 3D web
            experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{
                backgroundColor: "var(--c-text)",
                color: "var(--c-bg)",
              }}
            >
              View Selected Work
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-main text-sub hover:text-heading hover:border-[var(--c-text-2)] transition-colors duration-200"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden lg:flex items-center gap-2 mt-20 text-dim text-xs font-mono"
          >
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
