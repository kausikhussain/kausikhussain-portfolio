"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Terminal as TerminalIcon, Sparkles, CornerDownLeft, Award, ExternalLink, Cpu, RefreshCw, ArrowRight, MessageSquare, Layers, ShieldCheck, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useIdentityMode } from "./IdentityModeContext";
import audioSystem from "@/utils/audioSystem";
import aiSemanticEngine, { SemanticResponse } from "@/utils/aiSemanticEngine";
import { PROJECT_CASE_STUDIES } from "@/data/projectCaseStudies";
import { GithubIcon } from "./SocialIcons";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Card from "./ui/Card";
import Tag from "./ui/Tag";

interface StreamLogEntry {
  id: string;
  query: string;
  response: SemanticResponse;
}

export default function AILabSection() {
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [cmdInput, setCmdInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(["jansehat", "iit bhubaneswar", "offline mode"]);
  const [isExecuting, setIsExecuting] = useState(false);
  const { setMode } = useIdentityMode();
  const outputEndRef = useRef<HTMLDivElement>(null);

  const initialResponse = aiSemanticEngine.query("jansehat");

  const [streamEntries, setStreamEntries] = useState<StreamLogEntry[]>([
    {
      id: "init",
      query: "jansehat",
      response: initialResponse
    }
  ]);

  const quickPrompts = [
    "jansehat",
    "how does offline mode work?",
    "iit bhubaneswar",
    "tripsync architecture",
    "biggest challenge in victus",
    "why hire kausik?",
    "which project uses webrtc?",
    "fitness journey",
    "family business"
  ];

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamEntries, isExecuting]);

  const handleQuerySubmit = (userInput: string) => {
    const query = userInput.trim();
    if (!query) return;

    audioSystem.playClick(1100);

    if (query.toLowerCase() === "clear") {
      setStreamEntries([]);
      setCmdInput("");
      return;
    }

    setCommandHistory((prev) => [...prev.filter((c) => c !== query), query]);
    setHistoryIndex(-1);
    setIsExecuting(true);

    setTimeout(() => {
      setIsExecuting(false);
      const res = aiSemanticEngine.query(query);

      const lower = query.toLowerCase();
      if (lower.includes("mode ai")) setMode("ai");
      else if (lower.includes("mode creative")) setMode("creative");
      else if (lower.includes("mode eng")) setMode("engineering");

      setStreamEntries((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          query: query,
          response: res
        }
      ]);
    }, 400);

    setCmdInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = quickPrompts.find((p) => p.startsWith(cmdInput.toLowerCase()));
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

  const activeCS = PROJECT_CASE_STUDIES[selectedTopicIdx] || PROJECT_CASE_STUDIES[0];

  return (
    <Section id="ai-lab" withGlow={true}>
      {/* Section Header */}
      <Heading
        badge="04 / INTELLIGENT AI WORKSPACE & COMMAND CONSOLE"
        badgeIcon={<Brain className="w-3.5 h-3.5" />}
        title="Natural Language"
        gradientText="Semantic AI Assistant"
        subtitle="Ask anything about Sk Kausik Hussain's SIH 2025 finalist journey, college CGPA, 10th/12th marks, projects, fitness, or career vision in natural language."
        align="center"
      />

      {/* Multi-Panel Workspace Console Container */}
      <Card className="p-0 overflow-hidden border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] font-mono" hoverGlow={false}>
        {/* Top Header Bar */}
        <div className="bg-[#080914] px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              KAUSIK_AI_ENGINE // DEEP KNOWLEDGE BASE v3.2
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Intelligence: Online
            </span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="hidden sm:inline-block">Location: Bhubaneswar, IN</span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="text-cyan-300">Open for Opportunities</span>
          </div>
        </div>

        {/* Workspace 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Left Sidebar: Quick Prompts */}
          <div className="lg:col-span-3 bg-black/40 border-r border-white/10 p-5 text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                SAMPLE QUESTIONS
              </span>
              <div className="flex flex-col gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuerySubmit(prompt)}
                    className="text-left px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">&gt; {prompt}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-slate-500 space-y-1">
              <p>Type any natural question (e.g. "What was the biggest challenge in TripSync?")</p>
            </div>
          </div>

          {/* Center Main Workspace: Deep Response Stream */}
          <div className="lg:col-span-6 p-6 text-xs flex flex-col justify-between bg-[#04040a]">
            {/* Stream Output List */}
            <div className="space-y-6 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin">
              {streamEntries.map((entry) => {
                const topic = entry.response.matchedTopic;
                const cs = entry.response.deepCaseStudy;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {/* User Prompt Line */}
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <span>user@kausik-ai:~$</span>
                      <span>{entry.query}</span>
                    </div>

                    {/* Rich Response Card */}
                    <Card className="p-5 bg-slate-950/80 border border-white/15" hoverGlow={false}>
                      {entry.response.conversationalNote && (
                        <p className="text-[11px] text-cyan-400 mb-2 italic">{entry.response.conversationalNote}</p>
                      )}

                      {entry.response.interviewAnswer && (
                        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 leading-relaxed font-mono text-xs mb-4">
                          <span className="font-bold text-white block mb-1">⚡ Recruiter Interview Response:</span>
                          {entry.response.interviewAnswer}
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <Tag label={topic.category.toUpperCase()} variant="accent" size="sm" />
                        {topic.id.includes("jansehat") && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                            <Award className="w-3.5 h-3.5 text-amber-400" /> SIH '25 FINALIST
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mb-2">{topic.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{topic.summary}</p>

                      {/* Deep Case Study Breakdown (If Matched) */}
                      {cs && (
                        <div className="space-y-3 mb-4 bg-black/40 p-4 rounded-xl border border-white/10 text-[11px] leading-relaxed text-slate-300">
                          <div>
                            <span className="text-cyan-400 font-bold block mb-1">REAL-WORLD PROBLEM & MOTIVATION:</span>
                            <p>{cs.problem} — {cs.motivation}</p>
                          </div>

                          {cs.architecture && (
                            <div>
                              <span className="text-purple-400 font-bold block mb-1">COMPLETE ARCHITECTURE STACK:</span>
                              <p className="font-mono text-[10px] text-slate-400">
                                Frontend: {cs.architecture.frontend.join(", ")} | Backend: {cs.architecture.backend.join(", ")} | DB: {cs.architecture.database.join(", ")}
                              </p>
                            </div>
                          )}

                          {cs.challengesAndSolutions && cs.challengesAndSolutions.length > 0 && (
                            <div>
                              <span className="text-amber-400 font-bold block mb-1">BIGGEST ENGINEERING CHALLENGE & SOLUTION:</span>
                              <p>[Challenge]: {cs.challengesAndSolutions[0].challenge}</p>
                              <p>[Solution]: {cs.challengesAndSolutions[0].solution}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Details Bullet List (Fallback for general topics) */}
                      {!cs && topic.details && topic.details.length > 0 && (
                        <div className="space-y-2 mb-4 bg-black/40 p-3.5 rounded-xl border border-white/10 text-[11px] leading-relaxed text-slate-300">
                          {topic.details.map((detail, dIdx) => (
                            <p key={dIdx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{detail}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Metrics Cards Grid */}
                      {topic.metrics && topic.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {topic.metrics.map((m) => (
                            <div key={m.label} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                              <span className="text-[10px] text-slate-400 block">{m.label}</span>
                              <span className="text-xs font-bold text-cyan-300">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      {(cs?.github || cs?.demo) && (
                        <div className="flex items-center gap-2 mb-4 pt-2">
                          {cs.github && (
                            <a href={cs.github} target="_blank" rel="noopener noreferrer">
                              <button className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer">
                                <GithubIcon className="w-3.5 h-3.5" /> GitHub Code
                              </button>
                            </a>
                          )}
                          {cs.demo && (
                            <a href={cs.demo} target="_blank" rel="noopener noreferrer">
                              <button className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer">
                                <span>Live Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Dynamic Related Question Chips */}
                      {topic.relatedQuestions && topic.relatedQuestions.length > 0 && (
                        <div className="pt-3 border-t border-white/10">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-cyan-400" /> RELATED QUESTIONS
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.relatedQuestions.map((q) => (
                              <button
                                key={q}
                                onClick={() => handleQuerySubmit(q)}
                                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-[11px] transition-all cursor-pointer"
                              >
                                &gt; {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}

              {isExecuting && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>[QUERYING PROJECT CASE STUDY KNOWLEDGE BASE...]</span>
                </div>
              )}

              <div ref={outputEndRef} />
            </div>

            {/* Input Prompt Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleQuerySubmit(cmdInput); }} className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="text-cyan-400 font-bold shrink-0">user@kausik-ai:~$</span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything (e.g. 'IIT Bhubaneswar', 'How does JanSehat offline mode work?')..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>ASK AI</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Sidebar: Deep Case Study Inspector */}
          <div className="lg:col-span-3 bg-black/40 border-l border-white/10 p-5 text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                CASE STUDY INSPECTOR
              </span>

              <Card className="p-4 bg-slate-950/80 border border-white/10 mb-4" hoverGlow={false}>
                <span className="text-[10px] text-cyan-400 uppercase block mb-1">PROJECT ARCHITECTURE</span>
                <h4 className="text-sm font-bold text-white mb-1">{activeCS.title}</h4>
                <p className="text-[11px] text-slate-400 mb-3">{activeCS.subtitle}</p>
                <div className="space-y-2 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Metric:</span>
                    <span className="text-cyan-300 font-bold">{activeCS.metric}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Key Problem:</span>
                    <span className="text-slate-300 line-clamp-3">{activeCS.problem}</span>
                  </div>
                </div>
              </Card>

              {/* Selector Tabs */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
                  SELECT CASE STUDY
                </span>
                {PROJECT_CASE_STUDIES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      audioSystem.playClick(1000);
                      setSelectedTopicIdx(idx);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      selectedTopicIdx === idx
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
