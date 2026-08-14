import { motion } from "framer-motion"
import { TrendingDown, TrendingUp } from "lucide-react"
import { CountUpValue } from "@/hooks/useCountUp"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: number
  suffix?: string
  delta?: { value: string; positive: boolean } | null
  hint?: string
  spark?: number[]
  index?: number
  className?: string
}

export function StatCard({
  label,
  value,
  suffix = "",
  delta,
  hint,
  spark,
  index = 0,
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className={cn(
        "rounded-card border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="tnum font-display text-[34px] font-extrabold leading-none tracking-tight text-ink md:text-[40px]">
          <CountUpValue value={value} />
          {suffix && <span className="text-[22px] md:text-[26px]">{suffix}</span>}
        </p>
        {delta && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 17, delay: 0.4 + index * 0.08 }}
            className={cn(
              "mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold",
              delta.positive ? "bg-pitch/12 text-pitch-dark" : "bg-coral/12 text-coral",
            )}
          >
            {delta.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta.value}
          </motion.span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[12.5px] text-ink-faint">{hint}</p>}
      {spark && spark.length > 1 && <Sparkline points={spark} delay={0.4 + index * 0.08} />}
    </motion.div>
  )
}

export function Sparkline({
  points,
  delay = 0,
  className,
}: {
  points: number[]
  delay?: number
  className?: string
}) {
  const w = 120
  const h = 34
  const min = Math.min(...points)
  const max = Math.max(...points)
  const span = max - min || 1
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / span) * (h - 4) - 2
    return [x, y] as const
  })
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("mt-3 h-9 w-full", className)} preserveAspectRatio="none">
      <path d={area} fill="#EDF6EF" />
      <motion.path
        d={line}
        fill="none"
        stroke="#16A34A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      />
    </svg>
  )
}
