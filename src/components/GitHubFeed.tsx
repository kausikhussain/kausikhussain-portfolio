"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Star, ExternalLink, RefreshCw, Terminal, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    ref_type?: string;
    action?: string;
  };
}

export default function GitHubFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = "kausikhussain";

  const fetchActivity = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://api.github.com/users/${username}/events?per_page=6`);
      if (!res.ok) throw new Error("API rate limited");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const timeAgo = (dateStr: string) => {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getEventText = (e: GitHubEvent) => {
    const repoName = e.repo.name.split("/")[1] || e.repo.name;
    if (e.type === "PushEvent") {
      const msg = e.payload.commits?.[0]?.message || "Pushed code update";
      return { action: `Pushed to ${repoName}`, details: msg };
    }
    if (e.type === "CreateEvent") {
      return { action: `Created ${e.payload.ref_type || "repo"} in ${repoName}`, details: `New repository setup` };
    }
    if (e.type === "WatchEvent") {
      return { action: `Starred repository ${repoName}`, details: "Added to favorites" };
    }
    return { action: `Updated ${repoName}`, details: e.type.replace("Event", "") };
  };

  return (
    <section className="py-20 relative bg-[#030308] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Live GitHub Activity Feed</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">Real-time commit telemetry from @{username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchActivity}
                disabled={loading}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-50"
                title="Refresh GitHub Feed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>

              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-indigo-400 transition-all flex items-center gap-1.5"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Events List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-slate-900/60 rounded-2xl border border-white/5" />
              ))}
            </div>
          ) : error || events.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-white/5 text-center text-xs font-mono text-slate-400">
              <span>View live open-source commits directly on </span>
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
                github.com/{username}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((event) => {
                const { action, details } = getEventText(event);
                return (
                  <motion.a
                    key={event.id}
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-indigo-500/30 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <GitCommit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {action}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {timeAgo(event.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{details}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
