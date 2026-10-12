"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Terminal as TerminalIcon,
  Sparkles,
  CornerDownLeft,
  Award,
  ExternalLink,
  Cpu,
  RefreshCw,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import audioSystem from "@/utils/audioSystem";
import aiSemanticEngine, { SemanticResponse } from "@/utils/aiSemanticEngine";
import { PROJECT_CASE_STUDIES } from "@/data/projectCaseStudies";
import { GithubIcon } from "./SocialIcons";

interface StreamLogEntry {
  id: string;
  query: string;
  response: SemanticResponse;
}

export default function AILabSection() {
  const { meta } = useTheme();
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [cmdInput, setCmdInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "jansehat",
    "offline mode",
    "why hire kausik?",
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const initialResponse = aiSemanticEngine.query("jansehat");

  const [streamEntries, setStreamEntries] = useState<StreamLogEntry[]>([
    {
      id: "init",
      query: "jansehat",
      response: initialResponse,
    },
  ]);

  // Dynamic suggested prompts from the active theme!
  const quickPrompts = meta.starterQuestions;

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

      setStreamEntries((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          query: query,
          response: res,
        },
      ]);
    }, 350);

    setCmdInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = quickPrompts.find((p) => p.toLowerCase().startsWith(cmdInput.toLowerCase()));
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
    <section id="ai-lab" className="py-24 sm:py-32 border-t border-main">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 chip mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: meta.accentColor }}
            />
            <span>02 / INTELLIGENT AI WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-heading">
            Grounded Semantic AI Companion.
          </h2>
          <p className="text-sub text-base sm:text-lg mt-3">
            Ask anything about Kausik's SIH 2025 finalist journey, college CGPA, project architectures, or career capabilities in natural language.
          </p>
        </div>

        {/* Multi-Panel Workspace Console */}
        <div className="rounded-3xl border border-main overflow-hidden card-base font-mono shadow-theme-lg">
          {/* Header Bar */}
          <div
            className="px-6 py-3.5 border-b border-faint flex flex-wrap items-center justify-between gap-4 text-xs"
            style={{ backgroundColor: "var(--c-surface-raised)" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 font-bold text-heading uppercase tracking-wider">
                <TerminalIcon className="w-4 h-4" style={{ color: meta.accentColor }} />
                <span>KAUSIK_AI_ENGINE // v3.2 KNOWLEDGE RETRIEVAL</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-dim">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Grounded Engine: Online
              </span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block">Bhubaneswar, IN</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="font-semibold" style={{ color: meta.accentColor }}>
                {meta.label} Dimension Active
              </span>
            </div>
          </div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Sidebar: Theme Suggested Prompts */}
            <div className="lg:col-span-3 border-r border-faint p-5 text-xs flex flex-col justify-between bg-page">
              <div>
                <span className="text-[10px] text-dim uppercase tracking-widest block mb-3 font-semibold">
                  SUGGESTED QUESTIONS
                </span>
                <div className="flex flex-col gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuerySubmit(prompt)}
                      className="text-left px-3 py-2.5 rounded-xl border border-faint text-sub hover:text-heading transition-all flex items-center justify-between group cursor-pointer bg-raised"
                    >
                      <span className="truncate">&gt; {prompt}</span>
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1"
                        style={{ color: meta.accentColor }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-faint text-[11px] text-dim">
                <p>Type any natural query (e.g. "What was the biggest challenge in TripSync?")</p>
              </div>
            </div>

            {/* Center Main Workspace: Query Stream */}
            <div className="lg:col-span-6 p-6 text-xs flex flex-col justify-between bg-surface">
              {/* Stream Output */}
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
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
                      {/* User Prompt */}
                      <div className="flex items-center gap-2 font-bold" style={{ color: meta.accentColor }}>
                        <span>visitor@portfolio:~$</span>
                        <span>{entry.query}</span>
                      </div>

                      {/* Response Card */}
                      <div className="p-5 rounded-2xl border border-main bg-raised">
                        {entry.response.conversationalNote && (
                          <p className="text-[11px] mb-2 italic" style={{ color: meta.accentColor }}>
                            {entry.response.conversationalNote}
                          </p>
                        )}

                        {entry.response.interviewAnswer && (
                          <div
                            className="p-3.5 rounded-xl border leading-relaxed text-xs mb-4"
                            style={{
                              backgroundColor: "var(--c-surface)",
                              borderColor: `${meta.accentColor}35`,
                            }}
                          >
                            <span className="font-bold text-heading block mb-1">
                              ⚡ Verified Interview Response:
                            </span>
                            <span className="text-sub font-sans">{entry.response.interviewAnswer}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span className="chip text-[11px] uppercase">{topic.category}</span>
                          {topic.id.includes("jansehat") && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                              <Award className="w-3.5 h-3.5" /> SIH '25 FINALIST
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-heading mb-1.5">{topic.title}</h4>
                        <p className="text-xs text-sub leading-relaxed mb-4">{topic.summary}</p>

                        {/* Deep Case Study Breakdown (If matched) */}
                        {cs && (
                          <div className="space-y-2.5 mb-4 p-4 rounded-xl border border-faint bg-surface text-[11px] leading-relaxed">
                            <div>
                              <span className="font-bold text-heading block mb-0.5">PROBLEM & MOTIVATION:</span>
                              <p className="text-sub">{cs.problem}</p>
                            </div>

                            {cs.challengesAndSolutions && cs.challengesAndSolutions.length > 0 && (
                              <div className="pt-2 border-t border-faint">
                                <span className="font-bold text-heading block mb-0.5">TECHNICAL OBSTACLE & SOLUTION:</span>
                                <p className="text-sub">[Obstacle]: {cs.challengesAndSolutions[0].challenge}</p>
                                <p className="text-sub mt-1">[Engineering Solution]: {cs.challengesAndSolutions[0].solution}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Details Bullet List */}
                        {!cs && topic.details && topic.details.length > 0 && (
                          <div className="space-y-1.5 mb-4 p-3.5 rounded-xl border border-faint bg-surface text-[11px] leading-relaxed">
                            {topic.details.map((detail, dIdx) => (
                              <p key={dIdx} className="flex items-start gap-2 text-sub">
                                <span style={{ color: meta.accentColor }}>•</span>
                                <span>{detail}</span>
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Metrics Pills */}
                        {topic.metrics && topic.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {topic.metrics.map((m) => (
                              <div key={m.label} className="p-2.5 rounded-xl border border-faint bg-surface text-center">
                                <span className="text-[10px] text-dim block">{m.label}</span>
                                <span className="text-xs font-bold text-heading">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action Links */}
                        {(cs?.github || cs?.demo) && (
                          <div className="flex items-center gap-2 mb-3 pt-2 border-t border-faint">
                            {cs.github && (
                              <a
                                href={cs.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg border border-faint text-sub hover:text-heading text-[11px] font-semibold flex items-center gap-1.5"
                              >
                                <GithubIcon className="w-3.5 h-3.5" /> GitHub
                              </a>
                            )}
                            {cs.demo && (
                              <a
                                href={cs.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5"
                                style={{
                                  backgroundColor: meta.accentColor,
                                  color: "#050813",
                                }}
                              >
                                <span>Live Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}

                        {/* Related Question Chips */}
                        {topic.relatedQuestions && topic.relatedQuestions.length > 0 && (
                          <div className="pt-3 border-t border-faint">
                            <span className="text-[10px] text-dim uppercase tracking-wider block mb-2 flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" style={{ color: meta.accentColor }} />
                              RELATED INQUIRIES
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {topic.relatedQuestions.map((q) => (
                                <button
                                  key={q}
                                  onClick={() => handleQuerySubmit(q)}
                                  className="px-2.5 py-1 rounded-lg border border-faint text-dim hover:text-heading text-[11px] transition-colors cursor-pointer bg-surface"
                                >
                                  &gt; {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {isExecuting && (
                  <div className="flex items-center gap-2 text-xs font-mono" style={{ color: meta.accentColor }}>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>[QUERYING KNOWLEDGE BASE...]</span>
                  </div>
                )}

                <div ref={outputEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleQuerySubmit(cmdInput);
                }}
                className="mt-6 pt-4 border-t border-faint flex items-center gap-2"
              >
                <span className="font-bold shrink-0" style={{ color: meta.accentColor }}>
                  visitor@portfolio:~$
                </span>
                <input
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything (e.g. 'SIH 2025', 'How does offline mode work?')..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-main text-heading text-xs font-mono focus:outline-none bg-raised transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  style={{
                    backgroundColor: meta.accentColor,
                    color: "#050813",
                  }}
                >
                  <span>ASK AI</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Right Sidebar: Case Study Inspector */}
            <div className="lg:col-span-3 border-l border-faint p-5 text-xs flex flex-col justify-between bg-page">
              <div>
                <span className="text-[10px] text-dim uppercase tracking-widest block mb-3 font-semibold">
                  CASE STUDY INSPECTOR
                </span>

                <div className="p-4 rounded-2xl border border-faint bg-raised mb-4">
                  <span className="text-[10px] uppercase block mb-1 font-semibold" style={{ color: meta.accentColor }}>
                    ARCHITECTURE
                  </span>
                  <h4 className="text-sm font-bold text-heading mb-1">{activeCS.title}</h4>
                  <p className="text-[11px] text-dim mb-3">{activeCS.subtitle}</p>
                  <div className="space-y-2 text-[11px] text-sub">
                    <div>
                      <span className="text-dim block text-[10px]">VERIFIED METRIC:</span>
                      <span className="font-bold" style={{ color: meta.accentColor }}>
                        {activeCS.metric}
                      </span>
                    </div>
                    <div>
                      <span className="text-dim block text-[10px]">PROBLEM SOLVED:</span>
                      <span className="line-clamp-3">{activeCS.problem}</span>
                    </div>
                  </div>
                </div>

                {/* Case Study Selection Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-dim uppercase tracking-widest block mb-2 font-semibold">
                    EXPLORE PROJECTS
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
                          ? "border-main font-bold shadow-xs"
                          : "border-transparent text-dim hover:text-heading"
                      }`}
                      style={{
                        backgroundColor: selectedTopicIdx === idx ? "var(--c-surface-raised)" : "transparent",
                        borderColor: selectedTopicIdx === idx ? meta.accentColor : undefined,
                        color: selectedTopicIdx === idx ? meta.accentColor : undefined,
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-faint text-[11px] text-dim text-center">
                <span>Bhubaneswar, IN • UTC+5:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
