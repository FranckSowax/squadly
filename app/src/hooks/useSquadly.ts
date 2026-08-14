import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { trpc } from "@/lib/trpc"

/**
 * Boucle temps réel simulée : déclenche un « tick » côté serveur toutes les
 * ~12 s (progression des messages, réponses entrantes, votes) puis rafraîchit
 * les données. Pausée quand l'onglet est inactif.
 */
export function useSimLoop(intervalMs = 12_000) {
  const queryClient = useQueryClient()
  const tick = trpc.squadly.sim.tick.useMutation({
    onSuccess: (res) => {
      if (res.paused) return
      if (res.messages || res.rsvps || res.votes) {
        void queryClient.invalidateQueries()
      }
    },
  })

  useEffect(() => {
    const run = () => {
      if (document.visibilityState !== "visible") return
      tick.mutate()
    }
    const id = window.setInterval(run, intervalMs)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs])
}

/** Contexte tenant + abonnement, partagé par tout l'app shell. */
export function useTenant() {
  return trpc.squadly.tenant.get.useQuery()
}

export function useSession() {
  return trpc.auth.me.useQuery(undefined, { retry: false })
}
