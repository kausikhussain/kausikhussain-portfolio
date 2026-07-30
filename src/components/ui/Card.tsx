"use client";

import React, { useState } from "react";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`glass-card rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group transform-gpu ${className}`}
      {...props}
    >
      {/* Top Border Holographic Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Subtle Corner Mode Glow Accent */}
      {hoverGlow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/25 transition-all pointer-events-none" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
