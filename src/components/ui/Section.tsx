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
      className={`relative py-20 lg:py-28 overflow-hidden border-b border-white/5 ${className}`}
    >
      {/* Background Ambient Grid */}
      {withGrid && (
        <div className="absolute inset-0 ambient-grid opacity-25 pointer-events-none" />
      )}

      {/* Radial Glow Spot */}
      {withGlow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
