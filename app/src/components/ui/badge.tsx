import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold leading-none transition-colors [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-mist text-pitch-dark",
        pitch: "bg-pitch/12 text-pitch-dark",
        sun: "bg-sun/20 text-sun-dark",
        coral: "bg-coral/12 text-coral",
        lime: "bg-lime/30 text-pine",
        neutral: "bg-ink/6 text-ink-soft",
        outline: "border border-line bg-white text-ink-soft",
        dashed: "border border-dashed border-ink/25 text-ink-faint",
        glass: "border border-white/20 bg-white/12 text-white backdrop-blur",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
