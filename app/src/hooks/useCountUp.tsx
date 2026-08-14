import { useEffect, useRef, useState } from "react"

/** Compteur animé (1.2 s ease-out) — respecte prefers-reduced-motion. */
export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const frame = useRef<number>(0)
  const from = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    const origin = from.current
    const delta = target - origin

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(origin + delta * eased)
      if (p < 1) frame.current = requestAnimationFrame(tick)
      else from.current = target
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return value
}

export function CountUpValue({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const v = useCountUp(value)
  return <>{v.toFixed(decimals)}</>
}
