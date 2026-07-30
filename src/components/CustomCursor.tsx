"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIdentityMode } from "./IdentityModeContext";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const { mode } = useIdentityMode();

  useEffect(() => {
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        const target = e.target as HTMLElement;
        if (
          target &&
          (target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("button") ||
            target.closest("a") ||
            target.classList.contains("interactive"))
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getCursorStyles = () => {
    switch (mode) {
      case "ai":
        return {
          dotColor: "bg-cyan-400",
          ringBorder: "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.6)]",
          glowColor: "rgba(6, 182, 212, 0.2)"
        };
      case "creative":
        return {
          dotColor: "bg-purple-400",
          ringBorder: "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.6)]",
          glowColor: "rgba(168, 85, 247, 0.2)"
        };
      case "engineering":
        return {
          dotColor: "bg-emerald-400",
          ringBorder: "border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.6)]",
          glowColor: "rgba(16, 185, 129, 0.2)"
        };
    }
  };

  const currentStyle = getCursorStyles();

  return (
    <>
      {/* Small Trailing Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 ${currentStyle.dotColor} shadow-lg hidden sm:block`}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Mode Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-50 backdrop-blur-[1px] transition-all duration-300 ${currentStyle.ringBorder} hidden sm:block`}
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 18),
          y: mousePosition.y - (isHovered ? 28 : 18),
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      />
    </>
  );
}
