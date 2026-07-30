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
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Top Border Subtle Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
