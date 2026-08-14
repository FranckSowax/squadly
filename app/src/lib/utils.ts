import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Palette pastel déterministe utilisée pour les avatars à initiales. */
const AVATAR_TINTS: Record<string, { bg: string; fg: string }> = {
  mist: { bg: "bg-mist", fg: "text-pitch-dark" },
  lime: { bg: "bg-lime/25", fg: "text-pine" },
  sun: { bg: "bg-sun/25", fg: "text-sun-dark" },
  coral: { bg: "bg-coral/15", fg: "text-coral" },
}

export function avatarTint(color: string | null | undefined) {
  return AVATAR_TINTS[color ?? "mist"] ?? AVATAR_TINTS.mist
}

export function initials(first: string, last = "") {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
}

/** « Yanis B. » */
export function shortName(first: string, last = "") {
  return last ? `${first} ${last.charAt(0)}.` : first
}
