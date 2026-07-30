"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Brain, Layers, ShieldCheck } from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center overflow-hidden bg-radial-glow border-b border-white/10">
      {/* Full-Bleed Interactive 3D Studio Canvas Backdrop */}
      <Hero3DCanvas />

      {/* Ambient Grid Overlay */}
      <div className="absolute inset-0 ambient-grid opacity-20 pointer-events-none" />

      {/* Content Container (Layered Foreground) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Keynote Typography & Essential CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start pointer-events-auto">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PORTFOLIO_DATA.personal.availability}</span>
          </motion.div>

          {/* Main Keynote Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Creating the <br />
            <span className="text-gradient-purple">Future of Digital</span> <br />
            Experiences.
          </motion.h1>

          {/* Morphing Headline Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-12 flex items-center text-lg sm:text-2xl font-semibold text-cyan-300 mb-6 font-mono"
          >
            <span className="text-indigo-400 mr-2">&gt;</span>
            <span className="border-r-2 border-cyan-400 animate-pulse pr-1">
              {PORTFOLIO_DATA.personal.headlines[headlineIndex]}
            </span>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          >
            Smart India Hackathon 2025 Finalist & Full-Stack Architect building real-time WebRTC/Socket.IO platforms, AI telemedicine systems, and 3D web experiences.
          </motion.p>

          {/* Action CTAs — Clean & High Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] hover:scale-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm backdrop-blur-md hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-cyan-300" />
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Tech Badges Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
          >
            <span className="flex items-center gap-2 text-indigo-300">
              <Brain className="w-4 h-4 text-indigo-400" /> AI / ML PyTorch
            </span>
            <span className="flex items-center gap-2 text-purple-300">
              <Layers className="w-4 h-4 text-purple-400" /> Three.js & Next.js 16
            </span>
            <span className="flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Socket.IO & WebRTC
            </span>
          </motion.div>
        </div>

        {/* Right Column: Spanned by full-bleed background 3D canvas */}
        <div className="lg:col-span-5 pointer-events-none" />
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono pointer-events-none"
      >
        <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
        <div className="w-5 h-9 rounded-full border border-slate-700 flex justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-indigo-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
