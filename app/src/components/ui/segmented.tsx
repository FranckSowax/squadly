import { motion } from "framer-motion"
import { useId } from "react"
import { cn } from "@/lib/utils"

export type SegmentedItem<T extends string> = {
  value: T
  label: string
  count?: number | null
}

type Props<T extends string> = {
  items: SegmentedItem<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  size?: "md" | "sm"
}

/** SegmentedTabs — pilule mist + indicateur blanc qui glisse (layoutId). */
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  className,
  size = "md",
}: Props<T>) {
  const id = useId()
  return (
    <div
      className={cn(
        "inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-mist p-1",
        className,
      )}
      role="tablist"
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full font-semibold transition-colors",
              size === "md" ? "px-4 py-2 text-[14px]" : "px-3 py-1.5 text-[13px]",
              active ? "text-pitch-dark" : "text-ink-soft hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`segmented-${id}`}
                className="absolute inset-0 rounded-full bg-white shadow-xs"
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {item.label}
              {item.count != null && (
                <span className={cn("tnum text-[12px]", active ? "text-pitch" : "text-ink-faint")}>
                  {item.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
