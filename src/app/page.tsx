"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastSystem";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import AILabSection from "@/components/AILabSection";
import HowIBuildSection from "@/components/HowIBuildSection";
import TechnicalPracticeSection from "@/components/TechnicalPracticeSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AICompanionDrawer from "@/components/AICompanionDrawer";
import { Bot, Sparkles } from "lucide-react";

function PortfolioContent() {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const { meta } = useTheme();

  useEffect(() => {
    // Disable browser automatic scroll restoration & reset to top immediately
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-page text-heading transition-colors duration-400">
      {/* Navigation Header */}
      <Navbar onOpenAICompanion={() => setAiDrawerOpen(true)} />

      {/* Core Structured Sections */}
      <div className="relative z-10">
        <HeroSection onOpenAICompanion={() => setAiDrawerOpen(true)} />
        <SelectedWorkSection />
        <AILabSection />
        <HowIBuildSection />
        <TechnicalPracticeSection />
        <AboutSection />
        <ContactSection />
      </div>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating AI Companion Trigger Pill */}
      <aside aria-label="AI Assistant" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-theme-lg backdrop-blur-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: "var(--c-surface)",
            borderColor: `${meta.accentColor}60`,
            boxShadow: `0 8px 30px ${meta.accentColor}25`,
          }}
          aria-label="Open Kausik AI Companion"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: "var(--c-surface-raised)",
              borderColor: `${meta.accentColor}50`,
              color: meta.accentColor,
            }}
          >
            <Bot className="w-4 h-4" />
          </div>

          <div className="flex flex-col text-left leading-tight pr-1">
            <span className="text-xs font-mono font-bold text-heading flex items-center gap-1.5">
              <span>Ask Kausik AI</span>
              <Sparkles className="w-3 h-3" style={{ color: meta.accentColor }} />
            </span>
            <span
              className="text-[10px] font-mono tracking-wider uppercase font-semibold"
              style={{ color: meta.accentColor }}
            >
              {meta.label} Companion
            </span>
          </div>
        </button>
      </aside>

      {/* Slide-over Grounded AI Companion */}
      <AICompanionDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PortfolioContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
