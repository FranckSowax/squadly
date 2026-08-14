import { cn } from "@/lib/utils"
import { ago } from "@/lib/format"

export function ChannelDot({ connected, className }: { connected: boolean; className?: string }) {
  return (
    <span className={cn("relative flex h-2.5 w-2.5", className)}>
      {connected && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pitch opacity-60" />
      )}
      <span
        className={cn(
          "relative inline-flex h-2.5 w-2.5 rounded-full",
          connected ? "bg-pitch" : "bg-coral",
        )}
      />
    </span>
  )
}

export function ChannelHealth({
  connected,
  lastSeenAt,
  className,
  tone = "light",
}: {
  connected: boolean
  lastSeenAt?: Date | string | null
  className?: string
  tone?: "light" | "dark"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-semibold",
        tone === "dark"
          ? "border border-white/20 bg-white/10 text-white"
          : connected
            ? "bg-mist text-pitch-dark"
            : "bg-coral/10 text-coral",
        className,
      )}
    >
      <ChannelDot connected={connected} />
      {connected ? "WhatsApp connecté" : "WhatsApp déconnecté"}
      {lastSeenAt && connected && (
        <span className={cn("font-normal", tone === "dark" ? "text-white/60" : "text-ink-faint")}>
          · {ago(lastSeenAt)}
        </span>
      )}
    </span>
  )
}
