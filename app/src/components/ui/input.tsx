import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-[14px] border border-line bg-white px-4 text-[15px] text-ink transition-colors placeholder:text-ink-faint focus-visible:border-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = "Input"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[88px] w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-ink transition-colors placeholder:text-ink-faint focus-visible:border-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/20",
      className,
    )}
    {...props}
  />
))
Textarea.displayName = "Textarea"

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink-soft", className)}
      {...props}
    />
  )
}

/** Select natif stylé — suffisant pour les quelques choix de l'app. */
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full appearance-none rounded-[14px] border border-line bg-white bg-[length:16px] bg-[right_14px_center] bg-no-repeat px-4 pr-10 text-[15px] text-ink focus-visible:border-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/20",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2351645A' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    />
  ),
)
Select.displayName = "Select"

export { Input, Textarea, Label, Select }
