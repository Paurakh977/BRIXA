import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@BRIXA/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-brand-900 text-brand-50 hover:bg-brand-800 shadow-lg shadow-brand-900/20",
        destructive: "bg-red-500 text-destructive-foreground hover:bg-red-500/90",
        outline: "border border-brand-200 bg-transparent hover:bg-brand-50 text-brand-900",
        secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200",
        ghost: "hover:bg-brand-50 hover:text-brand-900",
        link: "text-brand-900 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-brand-800 to-brand-600 text-white hover:shadow-xl hover:shadow-brand-900/20 border border-brand-700/50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }