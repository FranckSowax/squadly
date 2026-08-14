import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function EmptyState({
  image,
  title,
  description,
  action,
  className,
}: {
  image?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col items-center rounded-panel border border-dashed border-line bg-white/60 px-6 py-12 text-center",
        className,
      )}
    >
      {image && <img src={image} alt="" className="mb-5 h-36 w-auto opacity-90" />}
      <h3 className="font-display text-[20px] font-bold tracking-tight text-ink">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">{description}</p>
      )}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </motion.div>
  )
}
