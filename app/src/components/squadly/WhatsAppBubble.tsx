import { motion } from "framer-motion"
import { RotateCw } from "lucide-react"
import { StatusTicks, type MessageStatus } from "./StatusTicks"
import { timeLabel } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const KIND_LABEL: Record<string, { label: string; variant: "pitch" | "sun" | "lime" | "neutral" }> = {
  convocation: { label: "Squadly · Convocation", variant: "pitch" },
  rappel: { label: "Relance auto", variant: "sun" },
  sondage: { label: "Sondage", variant: "lime" },
  annonce: { label: "Message du coach", variant: "neutral" },
}

export type BubbleProps = {
  direction: "in" | "out"
  content: string
  kind?: string
  status?: MessageStatus
  buttons?: string[]
  createdAt?: Date | string
  senderName?: string | null
  senderColor?: string | null
  onRetry?: () => void
  onClick?: () => void
  compact?: boolean
  index?: number
}

const SENDER_COLORS: Record<string, string> = {
  mist: "text-pitch-dark",
  lime: "text-[#5C8A00]",
  sun: "text-sun-dark",
  coral: "text-coral",
}

export function WhatsAppBubble({
  direction,
  content,
  kind = "annonce",
  status,
  buttons = [],
  createdAt,
  senderName,
  senderColor,
  onRetry,
  onClick,
  compact,
  index = 0,
}: BubbleProps) {
  const out = direction === "out"
  const meta = KIND_LABEL[kind] ?? KIND_LABEL.annonce
  const [firstLine, ...rest] = content.split("\n")

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26, delay: Math.min(index * 0.04, 0.4) }}
      className={cn("flex w-full", out ? "justify-end" : "justify-start")}
    >
      <div
        onClick={onClick}
        className={cn(
          "relative max-w-[86%] px-3.5 py-2.5 shadow-xs sm:max-w-[74%]",
          out
            ? "rounded-bubble rounded-tr-[6px] bg-wa-bubble-out"
            : "rounded-bubble rounded-tl-[6px] bg-white",
          onClick && "cursor-pointer transition-shadow hover:shadow-card",
          compact && "max-w-full",
        )}
      >
        {out && kind !== "annonce" && (
          <Badge variant={meta.variant} className="mb-1.5 px-2 py-0.5 text-[10.5px]">
            {meta.label}
          </Badge>
        )}
        {!out && senderName && (
          <p className={cn("mb-0.5 text-[12.5px] font-bold", SENDER_COLORS[senderColor ?? "mist"])}>
            {senderName}
          </p>
        )}

        <p className="whitespace-pre-line text-[14.5px] leading-[1.45] text-ink">
          {out && kind !== "annonce" ? (
            <>
              <span className="font-bold">{firstLine}</span>
              {rest.length > 0 && "\n" + rest.join("\n")}
            </>
          ) : (
            content
          )}
        </p>

        {buttons.length > 0 && (
          <div className="mt-2.5 space-y-1 border-t border-ink/8 pt-2">
            {buttons.map((b) => (
              <div
                key={b}
                className="rounded-[10px] border border-ink/10 bg-white/90 py-1.5 text-center text-[13.5px] font-semibold text-[#0A7CBB]"
              >
                {b}
              </div>
            ))}
          </div>
        )}

        <div className="mt-1 flex items-center justify-end gap-1.5">
          {createdAt && <span className="text-[11px] text-ink-faint">{timeLabel(createdAt)}</span>}
          {out && <StatusTicks status={status ?? null} />}
        </div>

        {status === "failed" && (
          <div className="mt-1.5 flex items-center justify-between gap-2 rounded-[10px] bg-coral/10 px-2.5 py-1.5">
            <span className="text-[12px] font-semibold text-coral">
              Échec d'envoi · numéro injoignable
            </span>
            {onRetry && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRetry()
                }}
                className="inline-flex items-center gap-1 text-[12px] font-bold text-coral underline-offset-2 hover:underline"
              >
                <RotateCw size={12} /> Réessayer
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
