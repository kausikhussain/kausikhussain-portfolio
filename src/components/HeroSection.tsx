"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.headlines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex flex-col justify-center overflow-hidden bg-radial-glow border-b border-white/[0.05]">
      {/* Background Ambient Grid */}
      <div className="absolute inset-0 ambient-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & Essential CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PORTFOLIO_DATA.personal.availability}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Creating the <br />
            <span className="text-gradient-purple">Future of Digital</span> <br />
            Experiences.
          </motion.h1>

          {/* Morphing Subtitle Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-10 flex items-center text-base sm:text-xl font-medium text-slate-300 mb-6 font-mono"
          >
            <span className="text-indigo-400 mr-2">&gt;</span>
            <span className="border-r-2 border-indigo-400 animate-pulse pr-1">
              {PORTFOLIO_DATA.personal.headlines[headlineIndex]}
            </span>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Smart India Hackathon 2025 Finalist & Full-Stack Architect building real-time WebRTC/Socket.IO platforms, AI telemedicine systems, and 3D web experiences.
          </motion.p>

          {/* Action CTAs — Clean & Uncluttered */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group shadow-md"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Get In Touch</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Pristine 3D Sculpture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <Hero3DCanvas />
        </motion.div>
      </div>
    </section>
  );
}
