"use client";

import React from "react";

export interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  glow = false,
}) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${
        glow ? "shadow-[0_0_30px_rgba(99,102,241,0.15)] border-indigo-500/20" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
