
"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// --- Button Component ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 tracking-wide";
  
  const variants = {
    // Deep Brown Primary
    primary: "bg-brand-800 text-white hover:bg-brand-700 shadow-lg shadow-brand-900/10",
    // Warm Gray Secondary
    secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200",
    // Elegant Outline
    outline: "border border-brand-200 text-brand-800 bg-transparent hover:bg-brand-50 hover:border-brand-300",
    ghost: "hover:bg-brand-50 text-brand-700",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs uppercase tracking-widest",
    md: "h-12 px-8 text-sm",
    lg: "h-14 px-10 text-sm uppercase tracking-widest",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};