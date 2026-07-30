"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Terminal as TerminalIcon, Sparkles, CornerDownLeft, Award, ExternalLink, Cpu, ShieldCheck, Zap, Layers, RefreshCw, Check, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useIdentityMode, IdentityMode } from "./IdentityModeContext";
import audioSystem from "@/utils/audioSystem";
import { GithubIcon } from "./SocialIcons";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

interface LogEntry {
  id: string;
  command: string;
  type: "text" | "project" | "sih" | "skills" | "hire" | "easteregg";
  content: string;
  projectData?: typeof PORTFOLIO_DATA.projects[0];
}

export default function AILabSection() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [cmdInput, setCmdInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(["jansehat", "sih", "skills"]);
  const [isExecuting, setIsExecuting] = useState(false);
  const { setMode } = useIdentityMode();
  const outputEndRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    "projects",
    "jansehat",
    "tripsync",
    "victus",
    "sih",
    "skills",
    "experience",
    "contact",
    "whoami",
    "sudo hire kausik",
    "clear"
  ];

  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    {
      id: "init",
      command: "jansehat",
      type: "project",
      content: "SIH 2025 National Finalist Telemedicine AI Platform",
      projectData: PORTFOLIO_DATA.projects[0]
    }
  ]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logEntries, isExecuting]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    audioSystem.playClick(1100);

    if (cmd === "clear") {
      setLogEntries([]);
      setCmdInput("");
      return;
    }

    // Add to command history
    setCommandHistory((prev) => [...prev.filter((c) => c !== cmd), cmd]);
    setHistoryIndex(-1);
    setIsExecuting(true);

    setTimeout(() => {
      setIsExecuting(false);

      if (cmd === "jansehat") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "project",
            content: "SIH 2025 National Finalist Telemedicine AI Platform",
            projectData: PORTFOLIO_DATA.projects[0]
          }
        ]);
      } else if (cmd === "tripsync") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "project",
            content: "Sub-200ms Real-Time Collaborative Itinerary Engine",
            projectData: PORTFOLIO_DATA.projects[1]
          }
        ]);
      } else if (cmd === "victus") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "project",
            content: "Full-Stack Workout & Nutrition Analytics Platform",
            projectData: PORTFOLIO_DATA.projects[2]
          }
        ]);
      } else if (cmd === "sih" || cmd === "sih2025") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "sih",
            content: "Smart India Hackathon 2025 National Finalist Honor"
          }
        ]);
      } else if (cmd === "skills" || cmd === "toolkit") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "skills",
            content: "Full Technical Matrix Summary"
          }
        ]);
      } else if (cmd.includes("hire") || cmd === "sudo hire kausik") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "hire",
            content: "[PERMISSION GRANTED] Initiating recruitment handshake with Sk Kausik Hussain..."
          }
        ]);
      } else if (cmd === "whoami") {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "easteregg",
            content: "You are an honored visitor exploring Sk Kausik Hussain's AI Command Center. Welcome!"
          }
        ]);
      } else {
        setLogEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            command: cmd,
            type: "text",
            content: `Command executed: '${cmd}'. Ask me about 'jansehat', 'tripsync', 'sih', 'skills', or 'sudo hire kausik'.`
          }
        ]);
      }
    }, 600);

    setCmdInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = availableCommands.find((c) => c.startsWith(cmdInput.toLowerCase()));
      if (match) setCmdInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setCmdInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setCmdInput("");
        } else {
          setHistoryIndex(nextIdx);
          setCmdInput(commandHistory[nextIdx]);
        }
      }
    }
  };

  const activeProjectData = PORTFOLIO_DATA.projects[selectedTopic] || PORTFOLIO_DATA.projects[0];

  return (
    <Section id="ai-lab" withGlow={true}>
      {/* Section Header */}
      <Heading
        badge="04 / INTELLIGENT AI WORKSPACE & COMMAND CONSOLE"
        badgeIcon={<Brain className="w-3.5 h-3.5" />}
        title="AI Portfolio"
        gradientText="OS & Command Center"
        subtitle="Explore SIH 2025 AI telemedicine pipelines, real-time WebSocket meshes, and system telemetry live in browser."
        align="center"
      />

      {/* Multi-Panel Workspace Console Container */}
      <Card className="p-0 overflow-hidden border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]" hoverGlow={false}>
        {/* Workspace Top Status Header Bar */}
        <div className="bg-[#080914] px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              PORTFOLIO OS // v3.2
            </span>
          </div>

          {/* Live Status Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Engine: Online
            </span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="hidden sm:inline-block">Location: Bhubaneswar, IN</span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="text-cyan-300">Availability: Open to Roles</span>
          </div>
        </div>

        {/* Workspace 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Sidebar: Command Suggestions & Quick Actions */}
          <div className="lg:col-span-3 bg-black/40 border-r border-white/10 p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                SUGGESTED COMMANDS
              </span>
              <div className="flex flex-col gap-2">
                {availableCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="text-left px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>&gt; {cmd}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-slate-500 space-y-1">
              <p>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">Tab</kbd> to autocomplete</p>
              <p>Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">↓</kbd> for history</p>
            </div>
          </div>

          {/* Center Main Workspace: Streaming Output */}
          <div className="lg:col-span-6 p-6 font-mono text-xs flex flex-col justify-between bg-[#04040a]">
            {/* Command Output Stream */}
            <div className="space-y-6 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
              {logEntries.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Command Input Prompt */}
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <span>kausik@ai-os:~$</span>
                    <span>{log.command}</span>
                  </div>

                  {/* Rendered Component Output */}
                  {log.type === "project" && log.projectData && (
                    <Card className="p-5 bg-slate-950/80 border border-white/15" hoverGlow={false}>
                      <div className="flex items-center justify-between mb-3">
                        <Tag label={log.projectData.category} variant="accent" size="sm" />
                        <span className="text-[11px] font-mono text-cyan-300">⚡ {log.projectData.metric}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{log.projectData.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{log.projectData.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {log.projectData.tags.map((t) => (
                          <Tag key={t} label={t} variant="mono" size="sm" />
                        ))}
                      </div>
                      {log.projectData.demo && (
                        <a href={log.projectData.demo} target="_blank" rel="noopener noreferrer">
                          <button className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 cursor-pointer">
                            <span>Launch Product Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </a>
                      )}
                    </Card>
                  )}

                  {log.type === "sih" && (
                    <Card className="p-5 bg-slate-950/80 border border-amber-500/30" hoverGlow={false}>
                      <div className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                        <Award className="w-4 h-4 text-amber-400" /> SMART INDIA HACKATHON 2025 NATIONAL FINALIST
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        Selected among thousands of nationwide engineering teams for developing JanSehat—an offline-first AI telemedicine platform optimized for low-bandwidth 2G/3G networks.
                      </p>
                      <div className="text-[11px] font-mono text-amber-400 font-bold">
                        🏆 National Honor • Ministry of Education India
                      </div>
                    </Card>
                  )}

                  {log.type === "skills" && (
                    <Card className="p-5 bg-slate-950/80 border border-indigo-500/30" hoverGlow={false}>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Stack Overview</h4>
                      <div className="flex flex-wrap gap-2">
                        {["TypeScript", "React", "Next.js 16", "Three.js", "WebRTC", "Socket.IO", "Node.js", "Python", "PyTorch", "MongoDB"].map((s) => (
                          <Tag key={s} label={s} variant="glow" size="sm" />
                        ))}
                      </div>
                    </Card>
                  )}

                  {log.type === "hire" && (
                    <Card className="p-5 bg-emerald-950/40 border border-emerald-500/40" hoverGlow={false}>
                      <div className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                        <Check className="w-4 h-4 text-emerald-400" /> RECRUITMENT HANDSHAKE INITIATED
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Sk Kausik Hussain is open to AI Engineering, Full-Stack Architecture, and Frontend roles worldwide.
                      </p>
                      <a href="#contact">
                        <button className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-2 cursor-pointer">
                          <span>Initiate Contact Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </a>
                    </Card>
                  )}

                  {(log.type === "text" || log.type === "easteregg") && (
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-slate-300 leading-relaxed font-mono">
                      {log.content}
                    </div>
                  )}
                </motion.div>
              ))}

              {isExecuting && (
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>[INITIALIZING AI VECTOR PIPELINE...]</span>
                </div>
              )}

              <div ref={outputEndRef} />
            </div>

            {/* Input Prompt Form */}
            <form onSubmit={(e) => { e.preventDefault(); executeCommand(cmdInput); }} className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="text-cyan-400 font-bold shrink-0">kausik@ai-os:~$</span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'jansehat', 'sih', 'skills', 'sudo hire kausik'..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXECUTE</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Sidebar: Real-Time Telemetry Inspector */}
          <div className="lg:col-span-3 bg-black/40 border-l border-white/10 p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                TELEMETRY INSPECTOR
              </span>

              <Card className="p-4 bg-slate-950/80 border border-white/10 mb-4" hoverGlow={false}>
                <span className="text-[10px] text-cyan-400 uppercase block mb-1">SELECTED PRODUCT</span>
                <h4 className="text-sm font-bold text-white mb-2">{activeProjectData.title}</h4>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div>
                    <span className="text-slate-500 block">Category:</span>
                    <span className="text-slate-200 font-bold">{activeProjectData.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Latency Target:</span>
                    <span className="text-cyan-300 font-bold">{activeProjectData.metric}</span>
                  </div>
                </div>
              </Card>

              {/* Selector Tabs */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
                  INSPECT PRODUCT
                </span>
                {PORTFOLIO_DATA.projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      audioSystem.playClick(1000);
                      setSelectedTopic(idx);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      selectedTopic === idx
                        ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-bold"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-slate-500 text-center">
              <span>Bhubaneswar, IN • UTC+5:30</span>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
