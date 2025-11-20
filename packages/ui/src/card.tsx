"use client";

import * as React from "react";
import { motion } from "framer-motion";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-brand-100 p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
);