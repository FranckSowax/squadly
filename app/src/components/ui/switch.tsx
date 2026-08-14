import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-pitch data-[state=unchecked]:bg-ink/15",
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-6 w-6 rounded-full bg-white shadow-md ring-0 transition-transform duration-250 ease-out-expo data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </SwitchPrimitives.Root>
))
Switch.displayName = "Switch"

export { Switch }
