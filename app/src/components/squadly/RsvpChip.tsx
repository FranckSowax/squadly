import { Check, Clock, HelpCircle, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type RsvpStatus = "present" | "absent" | "maybe" | "none"

const STYLES: Record<RsvpStatus, { label: string; className: string; Icon: typeof Check }> = {
  present: { label: "Présent", className: "bg-pitch/12 text-pitch-dark", Icon: Check },
  absent: { label: "Absent", className: "bg-coral/10 text-coral", Icon: X },
  maybe: { label: "Peut-être", className: "bg-sun/20 text-sun-dark", Icon: HelpCircle },
  none: {
    label: "Sans réponse",
    className: "border border-dashed border-ink/20 text-ink-faint",
    Icon: Clock,
  },
}

export function RsvpChip({
  status,
  className,
  showLabel = true,
}: {
  status: RsvpStatus
  className?: string
  showLabel?: boolean
}) {
  const { label, className: tone, Icon } = STYLES[status]
  return (
    <motion.span
      layout
      transition={{ duration: 0.3 }}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold leading-none",
        tone,
        className,
      )}
    >
      <Icon size={14} strokeWidth={2.6} />
      {showLabel && label}
    </motion.span>
  )
}

export const RSVP_LABEL: Record<RsvpStatus, string> = {
  present: "Présents",
  maybe: "Peut-être",
  absent: "Absents",
  none: "Sans réponse",
}
