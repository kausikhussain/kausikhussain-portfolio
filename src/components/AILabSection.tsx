"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Terminal as TerminalIcon, Sparkles, CornerDownLeft, Award, ExternalLink, Cpu, RefreshCw, ArrowRight, MessageSquare } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { useIdentityMode } from "./IdentityModeContext";
import audioSystem from "@/utils/audioSystem";
import aiSemanticEngine, { SemanticResponse } from "@/utils/aiSemanticEngine";
import { KnowledgeTopic } from "@/data/kausikKnowledgeBase";
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
  const [commandHistory, setCommandHistory] = useState<string[]>(["whoami", "sih 2025", "college"]);
  const [isExecuting, setIsExecuting] = useState(false);
  const { setMode } = useIdentityMode();
  const outputEndRef = useRef<HTMLDivElement>(null);

  const initialResponse = aiSemanticEngine.query("whoami");

  const [streamEntries, setStreamEntries] = useState<StreamLogEntry[]>([
    {
      id: "init",
      query: "whoami",
      response: initialResponse
    }
  ]);

  const quickPrompts = [
    "whoareyou",
    "sih 2025",
    "college",
    "12th and 10th",
    "jansehat",
    "tripsync",
    "iit bhubaneswar",
    "fitness",
    "family business",
    "contact"
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

      // Check mode switch command triggers
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
    }, 450);

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

  const activeTopic: KnowledgeTopic = PORTFOLIO_DATA.projects[selectedTopicIdx]
    ? {
        id: PORTFOLIO_DATA.projects[selectedTopicIdx].id,
        keys: [PORTFOLIO_DATA.projects[selectedTopicIdx].id],
        title: PORTFOLIO_DATA.projects[selectedTopicIdx].title,
        category: "project",
        summary: PORTFOLIO_DATA.projects[selectedTopicIdx].desc,
        details: [
          PORTFOLIO_DATA.projects[selectedTopicIdx].casestudy.problem,
          PORTFOLIO_DATA.projects[selectedTopicIdx].casestudy.approach,
          PORTFOLIO_DATA.projects[selectedTopicIdx].casestudy.outcome
        ],
        metrics: [{ label: "Metric", value: PORTFOLIO_DATA.projects[selectedTopicIdx].metric }],
        tags: PORTFOLIO_DATA.projects[selectedTopicIdx].tags,
        relatedQuestions: ["Tell me about SIH 2025", "Show all skills", "Contact Kausik"]
      }
    : streamEntries[streamEntries.length - 1]?.response.matchedTopic;

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
              KAUSIK_AI_ENGINE // v3.2 (SEMANTIC KNOWLEDGE BASE)
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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Left Sidebar: Quick Prompts */}
          <div className="lg:col-span-3 bg-black/40 border-r border-white/10 p-5 text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                SUGGESTED AI PROMPTS
              </span>
              <div className="flex flex-col gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuerySubmit(prompt)}
                    className="text-left px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>&gt; {prompt}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-slate-500 space-y-1">
              <p>Type in natural language (e.g. "What is your college CGPA?")</p>
            </div>
          </div>

          {/* Center Main Workspace: Semantic Response Stream */}
          <div className="lg:col-span-6 p-6 text-xs flex flex-col justify-between bg-[#04040a]">
            {/* Response Stream List */}
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {streamEntries.map((entry) => {
                const topic = entry.response.matchedTopic;
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

                      <div className="flex items-center justify-between mb-3">
                        <Tag label={topic.category.toUpperCase()} variant="accent" size="sm" />
                        {topic.id === "sih" && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                            <Award className="w-3.5 h-3.5 text-amber-400" /> SIH '25 FINALIST
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mb-2">{topic.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{topic.summary}</p>

                      {/* Details Bullet List */}
                      {topic.details && topic.details.length > 0 && (
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

                      {/* Tags & Action Links */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                        {topic.tags && (
                          <div className="flex flex-wrap gap-1.5">
                            {topic.tags.map((t) => (
                              <Tag key={t} label={t} variant="mono" size="sm" />
                            ))}
                          </div>
                        )}

                        {topic.links && (
                          <div className="flex items-center gap-2">
                            {topic.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Dynamic Related Question Suggestion Chips */}
                      {topic.relatedQuestions && topic.relatedQuestions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
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
                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>[SEARCHING KNOWLEDGE BASE...]</span>
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
                placeholder="Ask anything (e.g. 'IIT Bhubaneswar', '12th marks', 'JanSehat')..."
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

          {/* Right Sidebar: Telemetry Inspector */}
          <div className="lg:col-span-3 bg-black/40 border-l border-white/10 p-5 text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                KNOWLEDGE INSPECTOR
              </span>

              <Card className="p-4 bg-slate-950/80 border border-white/10 mb-4" hoverGlow={false}>
                <span className="text-[10px] text-cyan-400 uppercase block mb-1">INSPECTED ENTITY</span>
                <h4 className="text-sm font-bold text-white mb-2">{activeTopic.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-4">{activeTopic.summary}</p>
              </Card>

              {/* Selector Tabs */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
                  TOP PRODUCTS
                </span>
                {PORTFOLIO_DATA.projects.map((p, idx) => (
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
