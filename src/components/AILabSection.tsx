"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Terminal, Play, Sparkles, RefreshCw } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";
import Button from "./ui/Button";

export default function AILabSection() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [promptInput, setPromptInput] = useState("How does JanSehat optimize WebRTC video consultations on low-bandwidth 2G/3G networks?");
  const [simulating, setSimulating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const presets = [
    "How does JanSehat optimize WebRTC video consultations on low-bandwidth 2G/3G networks?",
    "Explain TripSync's sub-200ms Socket.IO multi-user state synchronization.",
    "What health analytics data structures power the Victus workout engine?"
  ];

  const handleSimulate = (promptText?: string) => {
    const text = promptText || promptInput;
    setSimulating(true);
    setAiOutput(null);

    setTimeout(() => {
      setSimulating(false);
      if (text.includes("JanSehat") || text.includes("WebRTC")) {
        setAiOutput(
          `[SIH 2025 AI ENGINE PIPELINE: ACTIVE]\n-> Query mapped to JanSehat Telemedicine Module.\n\nJanSehat dynamic bitrate adaptation throttles WebRTC video resolution during packet loss, falling back seamlessly to audio + real-time AI symptom extraction. Patient records are cached offline via IndexedDB and synced automatically once signal returns.`
        );
      } else if (text.includes("TripSync") || text.includes("Socket.IO")) {
        setAiOutput(
          `[REAL-TIME WEBSOCKET MESH: ACTIVE]\n-> Query mapped to TripSync Collaborative Architecture.\n\nSocket.IO channels manage room-isolated state rooms. When a user toggles an itinerary item, optimistic UI renders locally in <10ms while event payloads broadcast to room peers, achieving sub-200ms reconciliation.`
        );
      } else {
        setAiOutput(
          `[VICTUS ANALYTICS ENGINE: ACTIVE]\n-> Query processed by Kausik's Health & Fitness System.\n\nVictus calculates daily caloric burn, macro distribution, and workout volume using indexed MongoDB collections. Chart.js visualizes volume trends over 30-day windows.`
        );
      }
    }, 900);
  };

  return (
    <Section id="ai-lab" withGlow={true}>
      <Heading
        badge="04 / AI RESEARCH LAB"
        badgeIcon={<Brain className="w-3.5 h-3.5" />}
        title="Intelligent"
        gradientText="Systems & Research"
        subtitle="Exploring SIH 2025 AI medical diagnostics, real-time WebSocket meshes, and WebGL 3D graphics."
        align="center"
      />

      {/* Research Topics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {PORTFOLIO_DATA.aiResearch.map((topic, idx) => (
          <motion.div
            key={topic.id}
            onClick={() => setSelectedTopic(idx)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="cursor-pointer h-full"
          >
            <Card
              className={`h-full border transition-all ${
                selectedTopic === idx ? "border-indigo-400/60 bg-indigo-950/20 shadow-lg scale-[1.01]" : ""
              }`}
              hoverGlow={true}
            >
              <div className="flex items-center justify-between mb-4">
                <Tag label={topic.tags[0]} variant="glow" size="sm" />
                <Sparkles className={`w-4 h-4 ${selectedTopic === idx ? "text-cyan-400" : "text-slate-600"}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{topic.title}</h3>
              <p className="text-xs font-mono text-indigo-400 mb-3">{topic.subtitle}</p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{topic.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                {topic.metrics.map((m) => (
                  <div key={m.label} className="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05] text-center">
                    <span className="text-xs font-mono text-slate-400 block">{m.label}</span>
                    <span className="text-sm font-extrabold text-cyan-300 font-mono">{m.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interactive AI Prompt Simulator */}
      <Card className="p-6 sm:p-10" hoverGlow={false}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Interactive AI Vector Simulator</h3>
            <p className="text-xs text-slate-400 font-mono">Test Kausik's project AI inference live in browser</p>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setPromptInput(preset);
                handleSimulate(preset);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20 transition-all text-left cursor-pointer"
            >
              &gt; {preset}
            </button>
          ))}
        </div>

        {/* Input & Run */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask Kausik's AI Architecture Engine..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-500"
          />
          <Button
            onClick={() => handleSimulate()}
            disabled={simulating}
            variant="primary"
            size="md"
            icon={simulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
            className="font-mono text-xs"
          >
            {simulating ? "PROCESSING VECTOR..." : "RUN AI INFERENCE"}
          </Button>
        </div>

        {/* Output Display */}
        {aiOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-inner"
          >
            {aiOutput}
          </motion.div>
        )}
      </Card>
    </Section>
  );
}
