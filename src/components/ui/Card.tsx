"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  variant?: "default" | "elevated" | "glass" | "interactive";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverGlow = true,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "bg-[#0a0b14]/70 border border-white/10 backdrop-blur-xl",
    elevated: "bg-[#0f1120]/80 border border-white/15 backdrop-blur-2xl shadow-xl",
    glass: "glass-card",
    interactive: "bg-[#0a0b14]/70 border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 cursor-pointer",
  };

  return (
    <motion.div
      whileHover={hoverGlow ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Subtle top border highlight shine */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Subtle corner glow accent */}
      {hoverGlow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
