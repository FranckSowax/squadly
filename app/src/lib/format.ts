import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns"
import { fr } from "date-fns/locale"

export const d = (value: Date | string) => (value instanceof Date ? value : new Date(value))

/** « sam. 14 juin » */
export const dayLabel = (value: Date | string) => format(d(value), "EEE d MMM", { locale: fr })

/** « Samedi 14 juin » */
export const longDay = (value: Date | string) => {
  const s = format(d(value), "EEEE d MMMM", { locale: fr })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** « 14 h 30 » */
export const timeLabel = (value: Date | string) => format(d(value), "HH'h'mm", { locale: fr })

/** « il y a 3 min » */
export const ago = (value: Date | string) =>
  `il y a ${formatDistanceToNowStrict(d(value), { locale: fr })}`

/** Séparateur de jour dans le fil WhatsApp. */
export const chatDay = (value: Date | string) => {
  const date = d(value)
  if (isToday(date)) return "Aujourd'hui"
  if (isYesterday(date)) return "Hier"
  return format(date, "EEE d MMMM", { locale: fr })
}

/** « 2 j 4 h » — compte à rebours compact. */
export function countdown(target: Date | string) {
  const ms = d(target).getTime() - Date.now()
  if (ms <= 0) return null
  const totalMinutes = Math.floor(ms / 60000)
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60
  if (days > 0) return `${days} j ${hours} h`
  if (hours > 0) return `${hours} h ${minutes} min`
  return `${minutes} min`
}

/** « 1 h 12 » ou « 42 min » */
export function duration(minutes: number | null | undefined) {
  if (minutes == null) return "—"
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`
}

export const pct = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0)
