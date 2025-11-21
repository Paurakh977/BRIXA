import * as React from "react"
import { cn } from "@repo/utils" 

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-brand-100 bg-white text-brand-950 shadow-[0_2px_20px_-5px_rgba(74,55,40,0.05)]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }