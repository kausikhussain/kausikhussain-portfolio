"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastSystem";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import HowIBuildSection from "@/components/HowIBuildSection";
import TechnicalPracticeSection from "@/components/TechnicalPracticeSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
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
    <ThemeProvider>
      <ToastProvider>
        <main className="relative min-h-screen bg-page text-heading transition-colors duration-400">
          {/* Navigation Bar */}
          <Navbar />

          {/* Core Structured Sections */}
          <div className="relative z-10">
            <HeroSection />
            <SelectedWorkSection />
            <HowIBuildSection />
            <TechnicalPracticeSection />
            <AboutSection />
            <ContactSection />
          </div>

          {/* Editorial Footer */}
          <Footer />
        </main>
      </ToastProvider>
    </ThemeProvider>
  );
}
