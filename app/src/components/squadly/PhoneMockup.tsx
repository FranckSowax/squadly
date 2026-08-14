import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Coque de téléphone construite en code (jamais une image). */
export function PhoneMockup({
  children,
  className,
  title = "Squadly · AS Verrières",
  subtitle = "en ligne",
}: {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[320px] rounded-[42px] border-[10px] border-ink bg-ink shadow-pop",
        className,
      )}
    >
      <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
      <div className="overflow-hidden rounded-[32px] bg-sand">
        {/* Barre WhatsApp */}
        <div className="flex items-center gap-2.5 bg-[#075E54] px-4 pb-2.5 pt-7">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-lime/90 font-display text-[12px] font-extrabold text-pine">
            SQ
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-white">{title}</p>
            <p className="text-[10.5px] text-white/70">{subtitle}</p>
          </div>
        </div>
        <div className="bg-field-pattern relative min-h-[340px] space-y-2 bg-sand p-3">{children}</div>
      </div>
    </div>
  )
}
