import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[.97] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-pitch text-white shadow-card hover:bg-pitch-dark hover:shadow-lift",
        whatsapp: "bg-wa text-white shadow-card hover:brightness-95 hover:shadow-lift",
        secondary: "bg-white text-ink border border-ink/15 hover:border-ink/30 hover:bg-mist/60",
        ghost: "text-ink-soft hover:bg-mist hover:text-pitch-dark",
        "ghost-light": "text-white/85 border border-white/25 hover:bg-white/10 hover:text-white",
        sun: "bg-sun text-pine shadow-card hover:brightness-95 hover:shadow-lift",
        "danger-soft": "bg-coral/10 text-coral hover:bg-coral/20",
        link: "text-pitch underline-offset-4 hover:underline",
      },
      size: {
        lg: "h-[52px] rounded-full px-7 text-base",
        md: "h-11 rounded-full px-5 text-sm",
        sm: "h-9 rounded-full px-4 text-[13px]",
        icon: "h-11 w-11 rounded-full",
        "icon-sm": "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
