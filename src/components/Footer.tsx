"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, ArrowUp } from "lucide-react";
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
        hour12: false,
      };
      setIstTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-main py-16 bg-page text-sub font-sans">
      <div className="section-container">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Identity & Telemetry */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-bold text-base text-heading tracking-tight">
                Sk Kausik Hussain
              </span>
              <span className="chip text-[10px] py-0.5">
                B.Tech CSE · SIH '25
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-dim">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-link" />
                Odisha, India (20.2961° N)
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-link" />
                {istTime ? `${istTime} IST (UTC+5:30)` : "IST (UTC+5:30)"}
              </span>
            </div>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-faint text-sub hover:text-heading transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-faint text-sub hover:text-heading transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-faint text-sub hover:text-heading transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="pt-8 border-t border-faint flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dim">
          <span>
            © {new Date().getFullYear()} Sk Kausik Hussain. Crafted with precision.
          </span>
          <span className="font-mono text-[11px]">
            Next.js 16 · React 19 · Three.js · Tailwind v4
          </span>
        </div>
      </div>
    </footer>
  );
}
