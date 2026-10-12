"use client";

import React from "react";
import { motion } from "framer-motion";
import { WifiOff, Zap, Box, BrainCircuit, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    number: "01",
    title: "Low-Bandwidth Resilience",
    icon: WifiOff,
    badge: "Offline-First",
    summary:
      "Design for the weakest link in the network, not the gigabit fiber connection in a test environment.",
    description:
      "In critical platforms like JanSehat, connectivity is volatile. I build offline-first data architectures using IndexedDB synchronization, aggressive client-side caching, and multi-tier WebRTC fallbacks that degrade gracefully from video to low-bitrate audio and compressed text.",
    takeaway: "Zero data loss under 2G/3G packet loss scenarios.",
  },
  {
    number: "02",
    title: "Sub-200ms State Reconciliation",
    icon: Zap,
    badge: "Real-Time Mesh",
    summary:
      "Collaborative experiences feel broken when users wait for round-trip server acknowledgments.",
    description:
      "In TripSync and real-time systems, I pair optimistic UI mutations with Socket.IO room namespaces and atomic transaction rollback. State changes render locally in under 10ms while the synchronization layer broadcasts deltas across active WebSocket mesh peers.",
    takeaway: "Instant perceptual responsiveness with zero conflict drift.",
  },
  {
    number: "03",
    title: "High-FPS Computational Aesthetics",
    icon: Box,
    badge: "Spatial WebGL",
    summary:
      "Motion and 3D are not superficial decorations—they communicate spatial relationships and system states.",
    description:
      "Using Three.js, React Three Fiber, and custom GLSL vertex shaders, I engineer interactive mathematical models that run at 60 FPS. Every canvas includes pointer parallax dampening, automatic visibility pausing via IntersectionObserver, and strict prefers-reduced-motion fallbacks.",
    takeaway: "Hardware-accelerated fidelity without draining device battery.",
  },
  {
    number: "04",
    title: "Applied AI Pragmatism",
    icon: BrainCircuit,
    badge: "Purposeful ML",
    summary:
      "Avoid bloated wrapper applications. Integrate machine intelligence where it solves concrete bottlenecks.",
    description:
      "My work with AI focuses on domain-specific pipelines: parsing conversational patient symptoms into clinical triages, generating semantic document summarizations, and lightweight RAG search. Models are scoped, quantized, and paired with deterministic fallback rules.",
    takeaway: "Predictable, auditable intelligence tailored to user workflows.",
  },
];

export default function HowIBuildSection() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 chip mb-4">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--c-blue)" }} />
            <span>02 / ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
            How I think about systems.
          </h2>
          <p className="text-sub text-base sm:text-lg mt-3">
            Core principles forged through competitive hackathons, low-latency prototypes, and high-FPS web interfaces.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: idx * 0.08 }}
                className="rounded-2xl p-6 sm:p-8 card-base flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-mono font-bold text-dim tracking-widest">
                      {pillar.number}
                    </span>
                    <span className="chip text-[11px]">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-2.5 rounded-xl border border-faint text-link"
                      style={{ backgroundColor: "var(--c-surface-raised)" }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-heading">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-heading font-medium text-sm sm:text-base leading-snug mb-3">
                    {pillar.summary}
                  </p>

                  <p className="text-sub text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Takeaway */}
                <div className="pt-4 border-t border-faint flex items-center gap-2 text-xs font-mono text-link">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{pillar.takeaway}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
