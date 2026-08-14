import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ProgressProps = {
  value: number
  className?: string
  barClassName?: string
  /** Animation de remplissage à l'entrée. */
  animate?: boolean
  delay?: number
}

export function Progress({ value, className, barClassName, animate = true, delay = 0 }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-mist", className)}>
      <motion.div
        className={cn("h-full rounded-full bg-pitch", barClassName)}
        initial={animate ? { width: 0 } : false}
        whileInView={{ width: `${clamped}%` }}
        viewport={{ once: true, amount: 0.4 }}
        animate={animate ? undefined : { width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}

export type RsvpSegments = { present: number; maybe: number; absent: number; none: number }

/** Barre multi-segments Présent / Peut-être / Absent / Sans réponse. */
export function RsvpBar({ counts, className }: { counts: RsvpSegments; className?: string }) {
  const total = counts.present + counts.maybe + counts.absent + counts.none || 1
  const segments = [
    { value: counts.present, color: "bg-pitch" },
    { value: counts.maybe, color: "bg-sun" },
    { value: counts.absent, color: "bg-coral" },
    { value: counts.none, color: "bg-ink/10" },
  ]
  return (
    <div className={cn("flex h-2 w-full overflow-hidden rounded-full bg-ink/8", className)}>
      {segments.map((s, i) => (
        <motion.div
          key={i}
          className={s.color}
          initial={{ width: 0 }}
          animate={{ width: `${(s.value / total) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
        />
      ))}
    </div>
  )
}
