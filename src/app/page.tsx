"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ParticleCanvas from "@/components/ParticleCanvas";
import { ToastProvider } from "@/components/ToastSystem";
import { IdentityModeProvider } from "@/components/IdentityModeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechnicalToolkit from "@/components/TechnicalToolkit";
import ProjectsSection from "@/components/ProjectsSection";
import AILabSection from "@/components/AILabSection";
import GitHubFeed from "@/components/GitHubFeed";
import ExperienceSection from "@/components/ExperienceSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable browser automatic scroll restoration & reset to top immediately
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <IdentityModeProvider>
      <ToastProvider>
        <main className="relative min-h-screen bg-[#030308] text-white selection:bg-indigo-500/30 selection:text-white transition-colors duration-700">
          {/* Cinematic Loading Entrance */}
          {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

          {/* Dynamic Mode-Adapted Custom Cursor */}
          <CustomCursor />

          {/* Mode-Adapted Shaders & Visual Field */}
          <ParticleCanvas />

          {/* Navigation Header */}
          <Navbar />

          {/* Main Sections */}
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <TechnicalToolkit />
            <ProjectsSection />
            <AILabSection />
            <GitHubFeed />
            <ExperienceSection />
            <BlogsSection />
            <ContactSection />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </ToastProvider>
    </IdentityModeProvider>
  );
}
