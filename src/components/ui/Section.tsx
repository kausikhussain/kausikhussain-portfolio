"use client";

import React from "react";
import { motion } from "framer-motion";

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  withGrid?: boolean;
  withGlow?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = "",
  containerClassName = "",
  withGrid = true,
  withGlow = false,
}) => {
  return (
    <section
      id={id}
      className={`relative py-24 lg:py-32 overflow-hidden border-b border-white/[0.05] ${className}`}
    >
      {/* Background Ambient Grid */}
      {withGrid && (
        <div className="absolute inset-0 ambient-grid opacity-20 pointer-events-none" />
      )}

      {/* Subtle Ambient Radial Glow */}
      {withGlow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
