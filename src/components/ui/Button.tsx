"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-xl gap-1.5",
    md: "px-6 py-3 text-sm rounded-2xl gap-2",
    lg: "px-8 py-4 text-base rounded-2xl gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] border border-indigo-400/30",
    secondary:
      "bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold backdrop-blur-md hover:border-indigo-500/50",
    outline:
      "bg-transparent border border-white/20 text-slate-200 hover:text-white hover:border-white/50 backdrop-blur-sm",
    ghost:
      "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    glow:
      "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-mono",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};

export default Button;
