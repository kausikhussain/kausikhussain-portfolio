"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Terminal as TerminalIcon, Sparkles, Send, CornerDownLeft } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useIdentityMode, IdentityMode } from "./IdentityModeContext";
import audioSystem from "@/utils/audioSystem";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

interface LogEntry {
  command: string;
  output: string;
}

export default function AILabSection() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [cmdInput, setCmdInput] = useState("");
  const { setMode } = useIdentityMode();

  const [history, setHistory] = useState<LogEntry[]>([
    {
      command: "jansehat",
      output: `[SIH 2025 AI TELEMEDICINE PIPELINE: ACTIVE]\n-> Smart India Hackathon 2025 Finalist Project.\n\nJanSehat dynamic bitrate adaptation throttles WebRTC video resolution during packet loss on 2G/3G networks, falling back to audio + real-time AI symptom extraction. Patient records are cached offline via IndexedDB and synced automatically upon reconnection.`
    }
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = cmdInput.trim().toLowerCase();
    if (!rawCmd) return;

    audioSystem.playClick(1100);

    if (rawCmd === "clear") {
      setHistory([]);
      setCmdInput("");
      return;
    }

    let output = "";

    if (rawCmd === "help") {
      output = `AVAILABLE COMMANDS:\n- jansehat      : Telemedicine AI Architecture (SIH '25 Finalist)\n- tripsync      : Sub-200ms Socket.IO Sync Engine\n- victus        : Health & Fitness Analytics System\n- sih           : Smart India Hackathon 2025 Details\n- skills        : Technical Stack Summary\n- contact       : Direct Contact Channels\n- mode ai       : Switch to AI Intelligence Identity\n- mode creative : Switch to Creative Studio Identity\n- mode eng      : Switch to Engineering Lab Identity\n- clear         : Clear terminal history`;
    } else if (rawCmd === "jansehat") {
      output = `[SIH 2025 TELEMEDICINE ARCHITECTURE]\n- Bitrate adaptation for low-bandwidth 2G/3G networks.\n- AI symptom extraction & multi-lingual transcription.\n- Offline IndexedDB caching with automatic WebSocket re-sync.`;
    } else if (rawCmd === "tripsync") {
      output = `[REAL-TIME WEBSOCKET MESH]\n- Sub-200ms room-isolated state reconciliation.\n- Optimistic UI local rendering under 10ms.\n- Built with Node.js, Socket.IO, Redis, and React.`;
    } else if (rawCmd === "victus") {
      output = `[VICTUS ANALYTICS ENGINE]\n- Caloric burn & macro distribution calculations.\n- Chart.js 30-day volume rendering.\n- MongoDB indexed query optimization.`;
    } else if (rawCmd === "sih" || rawCmd === "sih2025") {
      output = `[SMART INDIA HACKATHON 2025 FINALIST]\n- Selected as National Finalist in SIH 2025.\n- Developed JanSehat AI Telemedicine Platform.\n- Competed among thousands of engineering teams nationwide.`;
    } else if (rawCmd === "skills") {
      output = `[TECHNICAL MATRIX]\n- Languages : TypeScript, JavaScript, Python, C++, SQL, Java\n- Frontend  : React, Next.js 14, Tailwind CSS, Three.js, Framer Motion\n- Backend   : Node.js, Express, Socket.IO, WebRTC, PyTorch\n- Databases : MongoDB, PostgreSQL, Redis`;
    } else if (rawCmd === "contact") {
      output = `[DIRECT CONTACT]\n- Email    : kausikhussain.work@gmail.com\n- GitHub   : https://github.com/kausikhussain\n- LinkedIn : Sk Kausik Hussain\n- Location : Bhubaneswar, Odisha, India`;
    } else if (rawCmd.startsWith("mode ")) {
      const modeArg = rawCmd.replace("mode ", "").trim();
      if (modeArg === "ai") {
        setMode("ai");
        output = `[MODE SYSTEM] Switched to AI Intelligence Identity mode.`;
      } else if (modeArg === "creative") {
        setMode("creative");
        output = `[MODE SYSTEM] Switched to Creative Studio Identity mode.`;
      } else if (modeArg === "engineering" || modeArg === "eng") {
        setMode("engineering");
        output = `[MODE SYSTEM] Switched to Engineering Lab Identity mode.`;
      } else {
        output = `Unknown mode: ${modeArg}. Use 'mode ai', 'mode creative', or 'mode eng'.`;
      }
    } else {
      output = `Command not recognized: '${rawCmd}'. Type 'help' for a list of available system commands.`;
    }

    setHistory((prev) => [...prev, { command: cmdInput, output }]);
    setCmdInput("");
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
            onClick={() => {
              audioSystem.playClick(1000);
              setSelectedTopic(idx);
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="cursor-pointer h-full"
          >
            <Card
              className={`h-full border transition-all ${
                selectedTopic === idx ? "border-cyan-400/60 bg-cyan-950/20 shadow-lg scale-[1.01]" : ""
              }`}
              hoverGlow={true}
            >
              <div className="flex items-center justify-between mb-4">
                <Tag label={topic.tags[0]} variant="glow" size="sm" />
                <Sparkles className={`w-4 h-4 ${selectedTopic === idx ? "text-cyan-400" : "text-slate-600"}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{topic.title}</h3>
              <p className="text-xs font-mono text-cyan-400 mb-3">{topic.subtitle}</p>
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

      {/* Interactive CLI Terminal Container */}
      <Card className="p-6 sm:p-8 font-mono" hoverGlow={false}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">KAUSIK_CLI // INTERACTIVE TERMINAL</h3>
              <p className="text-[11px] text-slate-400">Type 'help', 'jansehat', 'tripsync', or 'sih' below</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span>kausik@portfolio:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5 font-mono text-xs">
                {item.output}
              </div>
            </div>
          ))}
        </div>

        {/* Command Form */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
          <span className="text-cyan-400 text-xs font-bold shrink-0">kausik@portfolio:~$</span>
          <input
            type="text"
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            placeholder="Type command ('help')..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>EXECUTE</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </Card>
    </Section>
  );
}
