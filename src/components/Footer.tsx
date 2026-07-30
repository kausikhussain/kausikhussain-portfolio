"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Cpu, Clock, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030308] border-t border-white/10 pt-16 pb-12 relative text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>{PORTFOLIO_DATA.personal.name}</span>
          </div>
          <p className="text-slate-500 text-xs max-w-sm text-center md:text-left">
            Smart India Hackathon 2025 Finalist • AI & Full-Stack Architect • 3D Web Systems.
          </p>
        </div>

        {/* Center Live Clock */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 text-indigo-300 backdrop-blur-md">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Odisha, IN: {timeStr || "11:15 PM"} (IST)</span>
        </div>

        {/* Right Social & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO_DATA.personal.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400 transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400 transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <span className="text-slate-500">© {new Date().getFullYear()} {PORTFOLIO_DATA.personal.shortName}</span>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:text-white hover:border-indigo-400 transition-all shadow-lg cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
