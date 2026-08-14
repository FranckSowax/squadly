import { cn } from "@/lib/utils"

/** Sifflet de coach dont l'ouverture forme une bulle de dialogue. */
export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={cn("shrink-0", className)} aria-hidden>
      <path
        d="M6 15.5A6.5 6.5 0 0 1 12.5 9h13.2c1 0 1.9-.5 2.5-1.3l1.5-2.1c.7-1 2.3-.5 2.3.8V17c0 6.6-5.4 12-12 12h-2.6l-5.1 4.3c-.9.7-2.2 0-2.2-1.1V28A6.5 6.5 0 0 1 6 21.5v-6Z"
        fill="currentColor"
      />
      <circle cx="20" cy="18.5" r="4.6" fill="#A3E635" />
    </svg>
  )
}

export function Logo({
  className,
  tone = "dark",
  size = 32,
}: {
  className?: string
  tone?: "dark" | "light"
  size?: number
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} className={tone === "light" ? "text-lime" : "text-pitch"} />
      <span
        className={cn(
          "font-display text-[21px] font-extrabold tracking-tight",
          tone === "light" ? "text-paper" : "text-ink",
        )}
      >
        Squadly
      </span>
    </span>
  )
}
