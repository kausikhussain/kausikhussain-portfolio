"use client";

import React from "react";

export interface TagProps {
  label: string;
  variant?: "default" | "glow" | "accent" | "outline" | "mono";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = "default",
  size = "sm",
  icon,
  active = false,
  onClick,
  className = "",
}) => {
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
    md: "px-3.5 py-1.5 text-sm rounded-xl gap-2",
  };

  const variantStyles = {
    default: "bg-white/5 border border-white/10 text-slate-300",
    glow: "bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]",
    accent: "bg-cyan-950/60 border border-cyan-500/30 text-cyan-300",
    outline: "bg-transparent border border-white/20 text-slate-400 hover:text-white",
    mono: "bg-slate-900 border border-slate-800 text-slate-300 font-mono",
  };

  const activeStyles = active
    ? "bg-indigo-600/30 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]"
    : "";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center font-medium transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-white/30" : ""
      } ${sizeStyles[size]} ${active ? activeStyles : variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};

export default Tag;
