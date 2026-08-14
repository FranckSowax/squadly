import { motion } from "framer-motion"
import { CountUpValue } from "@/hooks/useCountUp"

type Counts = { present: number; maybe: number; absent: number; none: number; total: number }

const COLORS = {
  present: "#16A34A",
  maybe: "#FFC53D",
  absent: "#FF6B57",
  none: "rgba(255,255,255,.22)",
}

/** Anneau de progression RSVP (segments dessinés en stroke-dasharray). */
export function RsvpRing({ counts, size = 168 }: { counts: Counts; size?: number }) {
  const stroke = 14
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const total = counts.total || 1

  const segments = (["present", "maybe", "absent", "none"] as const).reduce<
    Array<{ key: string; color: string; length: number; offset: number }>
  >((acc, key) => {
    const previous = acc.reduce((sum, s) => sum + s.length, 0)
    const length = (counts[key] / total) * circumference
    acc.push({ key, color: COLORS[key], length, offset: previous })
    return acc
  }, [])

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={stroke} />
        {segments.map((s, i) => (
          <motion.circle
            key={s.key}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeDasharray={`${s.length} ${circumference}`}
            initial={{ strokeDashoffset: -circumference }}
            animate={{ strokeDashoffset: -s.offset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.08 }}
          />
        ))}
      </svg>
      <div className="absolute text-center">
        <p className="tnum font-display text-[30px] font-extrabold leading-none text-white">
          <CountUpValue value={counts.present} />
          <span className="text-white/60">/{counts.total}</span>
        </p>
        <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white/60">
          confirmés
        </p>
      </div>
    </div>
  )
}
