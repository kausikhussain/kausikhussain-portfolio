"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, Activity, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setIstTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#030308] border-t border-white/10 py-16 text-slate-400 font-mono text-xs overflow-hidden">
      {/* Background Ambient Grid */}
      <div className="absolute inset-0 ambient-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Telemetry */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase font-mono">
            <span>SK KAUSIK HUSSAIN</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Bhubaneswar, India (20.2961° N)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {istTime ? `${istTime} IST (UTC+5:30)` : "23:55 IST"}
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              60 FPS RENDER ENGINE
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.personal.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 text-center sm:text-left">
        <span>© {new Date().getFullYear()} Sk Kausik Hussain. All rights reserved.</span>
        <span className="mt-2 sm:mt-0 font-mono text-slate-400">Handcrafted with Next.js 16, Three.js & Tailwind v4</span>
      </div>
    </footer>
  );
}
