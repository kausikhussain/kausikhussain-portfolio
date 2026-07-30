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
    md: "px-6 py-3 text-sm rounded-xl gap-2",
    lg: "px-8 py-3.5 text-base rounded-xl gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-white text-black font-semibold shadow-md hover:bg-slate-200 border border-white/80 transition-all",
    secondary:
      "bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium backdrop-blur-md transition-all",
    outline:
      "bg-transparent border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all",
    ghost:
      "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 transition-all",
    glow:
      "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono transition-all",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer ${
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
