"use client";

import React from "react";
import { motion } from "framer-motion";

export interface HeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  gradientText?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  badge,
  badgeIcon,
  title,
  gradientText,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignClasses[align]} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-400 text-xs font-mono mb-4"
        >
          {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl"
      >
        {title}{" "}
        {gradientText && (
          <span className="text-gradient-purple">{gradientText}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default Heading;
