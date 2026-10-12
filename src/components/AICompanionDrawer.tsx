"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  ExternalLink,
  Award,
  ArrowRight,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import aiSemanticEngine, { SemanticResponse } from "@/utils/aiSemanticEngine";
import audioSystem from "@/utils/audioSystem";
import { GithubIcon } from "./SocialIcons";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  response?: SemanticResponse;
  timestamp: string;
}

interface AICompanionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICompanionDrawer({ isOpen, onClose }: AICompanionDrawerProps) {
  const { meta } = useTheme();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am Kausik's portfolio companion, grounded in his verified projects, academic achievements (SIH '25 National Finalist, 8.75 CGPA), and engineering architectures. How can I assist you today?",
      timestamp: "Just now",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = (userText: string) => {
    const q = userText.trim();
    if (!q) return;

    audioSystem.playClick(1100);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const res = aiSemanticEngine.query(q);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: res.interviewAnswer || res.matchedTopic.summary,
        response: res,
        timestamp: "Now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 400);
  };

  const handleClear = () => {
    audioSystem.playClick(800);
    setMessages([
      {
        id: "reset",
        sender: "assistant",
        text: "Conversation cleared. Feel free to ask about Kausik's technical projects, academic milestones, or real-time architectures.",
        timestamp: "Just now",
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      audioSystem.playTone(880, "sine", 0.08);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 35 }}
            className="relative w-full max-w-lg h-full border-l border-main shadow-theme-lg flex flex-col z-10"
            style={{ backgroundColor: "var(--c-surface)" }}
          >
            {/* Drawer Header */}
            <div
              className="p-5 border-b border-faint flex items-center justify-between"
              style={{ backgroundColor: "var(--c-surface-raised)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--c-surface)",
                    borderColor: `${meta.accentColor}40`,
                    color: meta.accentColor,
                  }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-heading flex items-center gap-2">
                    <span>Portfolio AI Companion</span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${meta.accentColor}15`,
                        borderColor: `${meta.accentColor}35`,
                        color: meta.accentColor,
                      }}
                    >
                      {meta.label}
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-dim">
                    Grounded in verified project architectures & achievements
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClear}
                  className="p-2 rounded-lg text-dim hover:text-heading hover:bg-page transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-dim hover:text-heading hover:bg-page transition-colors cursor-pointer"
                  title="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Persona Suggested Quick Prompts */}
            <div
              className="p-3 border-b border-faint overflow-x-auto flex items-center gap-2"
              style={{ backgroundColor: "var(--c-bg)" }}
            >
              <span className="text-[10px] font-mono text-dim uppercase whitespace-nowrap pl-1">
                Suggested:
              </span>
              {meta.starterQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-lg border border-faint text-[11px] font-mono text-sub hover:text-heading whitespace-nowrap transition-colors cursor-pointer hover:border-[var(--c-text-2)] bg-surface"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m) => {
                const isAssistant = m.sender === "assistant";
                const topic = m.response?.matchedTopic;
                const cs = m.response?.deepCaseStudy;

                return (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <div
                        className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-1"
                        style={{
                          backgroundColor: "var(--c-surface-raised)",
                          borderColor: `${meta.accentColor}30`,
                          color: meta.accentColor,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                        isAssistant
                          ? "border border-faint bg-raised text-heading"
                          : "text-white"
                      }`}
                      style={{
                        backgroundColor: isAssistant ? undefined : meta.accentColor,
                        color: isAssistant ? undefined : "#050813",
                      }}
                    >
                      {isAssistant && (
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-faint">
                          <span className="text-[10px] font-mono text-dim uppercase tracking-wider">
                            Verified Response
                          </span>
                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-dim hover:text-heading px-1.5 py-0.5 rounded border border-faint hover:border-main bg-page transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      <p className="font-sans leading-relaxed">{m.text}</p>

                      {/* Topic Highlights if matched */}
                      {topic && (
                        <div className="mt-3 pt-3 border-t border-faint space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-dim uppercase">
                              Source: {topic.title}
                            </span>
                            {topic.id.includes("jansehat") && (
                              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-1 font-mono">
                                <Award className="w-3 h-3" /> SIH '25
                              </span>
                            )}
                          </div>

                          {topic.details && topic.details.length > 0 && (
                            <ul className="space-y-1 text-[11px] text-sub">
                              {topic.details.slice(0, 3).map((d, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span style={{ color: meta.accentColor }}>•</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Related follow-up chips */}
                          {topic.relatedQuestions && topic.relatedQuestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {topic.relatedQuestions.slice(0, 3).map((rq) => (
                                <button
                                  key={rq}
                                  onClick={() => handleSend(rq)}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded border border-faint text-dim hover:text-heading cursor-pointer bg-surface"
                                >
                                  &gt; {rq}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div
                        className="w-7 h-7 rounded-lg border border-faint flex items-center justify-center shrink-0 mt-1"
                        style={{ backgroundColor: "var(--c-surface-raised)" }}
                      >
                        <User className="w-3.5 h-3.5 text-heading" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: meta.accentColor }}>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing grounded response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-faint bg-raised">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Kausik AI (e.g. 'SIH 2025', 'Tech stack')..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-main text-heading text-xs font-mono focus:outline-none bg-surface transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl font-bold cursor-pointer disabled:opacity-40 transition-opacity"
                  style={{
                    backgroundColor: meta.accentColor,
                    color: "#050813",
                  }}
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
