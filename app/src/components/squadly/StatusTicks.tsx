import { AlertTriangle, Check, CheckCheck, Clock, RotateCw } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type MessageStatus = "pending" | "sent" | "delivered" | "read" | "failed" | "requeued" | null

/** Machine à états visualisée : horloge → ✓ → ✓✓ → ✓✓ bleu (+ échec / remis en file). */
export function StatusTicks({ status, className }: { status: MessageStatus; className?: string }) {
  if (!status) return null

  const common = "shrink-0"
  const node = (() => {
    switch (status) {
      case "pending":
        return <Clock size={14} className={cn(common, "text-ink-faint")} />
      case "sent":
        return <Check size={15} className={cn(common, "text-ink-faint")} />
      case "delivered":
        return <CheckCheck size={15} className={cn(common, "text-ink-faint")} />
      case "read":
        return <CheckCheck size={15} className={cn(common, "text-read")} />
      case "failed":
        return <AlertTriangle size={14} className={cn(common, "text-coral")} />
      case "requeued":
        return <RotateCw size={14} className={cn(common, "animate-spin text-sun-dark")} />
    }
  })()

  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={cn("inline-flex", className)}
      title={STATUS_LABEL[status]}
    >
      {node}
    </motion.span>
  )
}

export const STATUS_LABEL: Record<NonNullable<MessageStatus>, string> = {
  pending: "En file d'envoi",
  sent: "Envoyé",
  delivered: "Remis",
  read: "Lu",
  failed: "Échec d'envoi",
  requeued: "Remis en file",
}

export const STATUS_HINT: Record<NonNullable<MessageStatus>, string> = {
  pending: "mis en file d'envoi",
  sent: "transmis à WhatsApp",
  delivered: "reçu sur le téléphone",
  read: "ouvert par le destinataire",
  failed: "le numéro n'est pas joignable",
  requeued: "nouvelle tentative programmée",
}
