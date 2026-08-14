import { motion } from "framer-motion"
import { avatarTint, cn, initials } from "@/lib/utils"

type AvatarProps = {
  firstName: string
  lastName?: string
  color?: string | null
  size?: number
  className?: string
}

export function Avatar({ firstName, lastName = "", color, size = 36, className }: AvatarProps) {
  const tint = avatarTint(color)
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-display font-bold",
        tint.bg,
        tint.fg,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      title={`${firstName} ${lastName}`.trim()}
    >
      {initials(firstName, lastName)}
    </span>
  )
}

/** Avatar carré d'équipe (radius 16). */
export function TeamAvatar({
  name,
  color,
  size = 48,
  className,
}: {
  name: string
  color?: string | null
  size?: number
  className?: string
}) {
  const tint = avatarTint(color === "pitch" ? "mist" : color)
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center font-display font-bold", tint.bg, tint.fg, className)}
      style={{ width: size, height: size, borderRadius: 16, fontSize: size * 0.3 }}
    >
      {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toUpperCase()}
    </span>
  )
}

type StackMember = { id: number; firstName: string; lastName: string; avatarColor?: string | null }

export function AvatarStack({
  members,
  max = 6,
  size = 32,
  className,
  ring = "ring-white",
}: {
  members: StackMember[]
  max?: number
  size?: number
  className?: string
  ring?: string
}) {
  const shown = members.slice(0, max)
  const extra = members.length - shown.length
  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((m, i) => (
        <motion.span
          key={m.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 17, delay: i * 0.04 }}
          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}
          className={cn("rounded-full ring-2", ring)}
        >
          <Avatar firstName={m.firstName} lastName={m.lastName} color={m.avatarColor} size={size} />
        </motion.span>
      ))}
      {extra > 0 && (
        <span
          className={cn("grid place-items-center rounded-full bg-ink/8 text-[12px] font-bold text-ink-soft ring-2", ring)}
          style={{ width: size, height: size, marginLeft: -8 }}
        >
          +{extra}
        </span>
      )}
    </div>
  )
}
