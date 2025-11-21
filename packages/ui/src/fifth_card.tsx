

import * as React from "react";
import { cn } from "@BRIXA/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Added default padding and a min-height to ensure content has space
    className={cn(
      "rounded-xl border border-brand-100 bg-white text-brand-950 shadow-[0_2px_20px_-5px_rgba(74,55,40,0.05)] p-6 min-h-[150px]", // Added p-6 for default padding and min-h
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };