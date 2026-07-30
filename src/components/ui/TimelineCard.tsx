"use client";

import React from "react";
import Card from "./Card";
import Tag from "./Tag";

export interface TimelineCardProps {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  badge?: string;
  bullets?: string[];
  tags?: string[];
  highlight?: string;
  icon?: React.ReactNode;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  subtitle,
  location,
  period,
  badge,
  bullets,
  tags,
  highlight,
  icon,
}) => {
  return (
    <Card className="relative pl-8 sm:pl-10" hoverGlow={true}>
      {/* Connector line dot */}
      <div className="absolute left-3 sm:left-4 top-8 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] border-2 border-[#030308]" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          {period}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 font-mono mb-4">
        <span className="text-slate-200 font-semibold">{subtitle}</span>
        {location && <span>• {location}</span>}
        {badge && (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            {badge}
          </span>
        )}
      </div>

      {highlight && (
        <p className="text-indigo-300 text-sm italic mb-4 bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/10">
          ✨ {highlight}
        </p>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
          {tags.map((t) => (
            <Tag key={t} label={t} variant="default" size="sm" />
          ))}
        </div>
      )}
    </Card>
  );
};

export default TimelineCard;
