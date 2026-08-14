import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import { Check, CreditCard, Infinity as InfinityIcon, Lock, ShieldCheck } from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Segmented } from "@/components/ui/segmented"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CountUpValue } from "@/hooks/useCountUp"
import { trpc } from "@/lib/trpc"
import { PLANS, type PlanId } from "@contracts/plans"
import { cn } from "@/lib/utils"

const FAQ = [
  {
    q: "Je peux annuler quand je veux ?",
    a: "Oui, en 2 clics depuis cette page. Votre plan reste actif jusqu'à la fin du mois, puis vous repassez en Découverte sans perdre vos données.",
  },
  {
    q: "Que se passe-t-il si je dépasse mon quota de messages ?",
    a: "Rien de brutal : on vous prévient à 80 %, et les relances automatiques continuent. Au-delà du plafond, les messages passent en file lente jusqu'au mois suivant — ou vous passez au plan supérieur.",
  },
  {
    q: "Le numéro WhatsApp dédié, c'est quoi ?",
    a: "Un numéro au nom de votre club (plan Club) : les joueurs voient « AS Verrières Football » au lieu d'un numéro inconnu. Confiance + réponses en hausse.",
  },
  {
    q: "Vous proposez des tarifs pour les clubs bénévoles ?",
    a: "Oui : −30 % pour les associations loi 1901. Écrivez-nous, on adore les bénévoles.",
  },
]

export default function Billing() {
  const utils = trpc.useUtils()
  const tenant = trpc.squadly.tenant.get.useQuery()
  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly")
  const [checkout, setCheckout] = useState<PlanId | null>(null)

  const change = trpc.squadly.tenant.changePlan.useMutation({
    onSuccess: (res) => {
      void utils.invalidate()
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: ["#A3E635", "#16A34A", "#FFC53D"] })
      toast.success(`Bienvenue au niveau supérieur — plan ${res.plan}`)
      setCheckout(null)
    },
  })

  const sub = tenant.data?.subscription
  const quota = sub ? Math.min(100, Math.round((sub.messagesUsed / sub.messagesQuota) * 100)) : 0
  const currentPlan = PLANS.find((p) => p.id === sub?.plan)

  if (tenant.isLoading)
    return (
      <AppShell title="Abonnement">
        <CardSkeleton className="h-48" />
      </AppShell>
    )

  return (
    <AppShell title="Abonnement" subtitle="Simple, sans engagement, résiliable en 2 clics.">
      {/* 1. Plan actuel */}
      {sub && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-pitch-field rounded-[24px]  p-7 text-paper shadow-lift"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge variant="glass" className="bg-sun/90 text-pine">
                Plan {currentPlan?.name}
              </Badge>
              <p className="mt-3 font-display text-[24px] font-bold tracking-tight">
                {tenant.data?.tenant.name}
              </p>
              <p className="mt-1 text-[14px] text-paper/70">
                {currentPlan?.monthlyPrice} €/mois ·{" "}
                {sub.currentPeriodEnd
                  ? `prochain prélèvement le ${new Date(sub.currentPeriodEnd).toLocaleDateString("fr-FR")}`
                  : "sans engagement"}
              </p>
            </div>
            <Button variant="ghost-light" size="sm">
              Gérer le paiement
            </Button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div>
              <div className="mb-2 flex justify-between text-[13.5px]">
                <span className="text-paper/70">Messages WhatsApp</span>
                <span className="tnum font-bold">
                  <CountUpValue value={sub.messagesUsed} /> / {sub.messagesQuota}
                </span>
              </div>
              <Progress
                value={quota}
                className="h-2.5 bg-white/20"
                barClassName={quota > 80 ? "bg-sun" : "bg-lime"}
              />
              {quota > 80 && (
                <p className="mt-2 text-[12.5px] text-sun">
                  Vous approchez du plafond — passez à Club pour multiplier votre quota.
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 flex justify-between text-[13.5px]">
                <span className="text-paper/70">Équipes</span>
                <span className="inline-flex items-center gap-1 font-bold">
                  3 / <InfinityIcon size={15} />
                </span>
              </div>
              <Progress value={30} className="h-2.5 bg-white/20" barClassName="bg-lime" />
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Toggle */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Segmented
          value={interval}
          onChange={setInterval}
          items={[
            { value: "monthly", label: "Mensuel" },
            { value: "yearly", label: "Annuel" },
          ]}
        />
        <Badge variant="lime">−20 % à l'année</Badge>
      </div>

      {/* 3. Plans */}
      <div className="mt-8 grid items-center gap-5 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const featured = plan.id === "premium"
          const isCurrent = plan.id === sub?.plan
          const price = interval === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={cn(
                "relative rounded-panel p-7",
                featured
                  ? "bg-gradient-pitch text-paper shadow-glow-lime md:scale-[1.03]"
                  : "border border-line bg-white text-ink shadow-card",
              )}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sun px-3 py-1 text-[12px] font-bold text-pine">
                  Le plus choisi
                </span>
              )}
              <p className="text-[15px] font-bold">{plan.name}</p>
              <p className={cn("mt-1 text-[13.5px]", featured ? "text-paper/70" : "text-ink-soft")}>
                {plan.tagline}
              </p>
              <p className="tnum mt-5 font-display text-[46px] font-extrabold leading-none">
                {price} €
                <span
                  className={cn(
                    "text-[15px] font-semibold",
                    featured ? "text-paper/60" : "text-ink-faint",
                  )}
                >
                  {price === 0 ? " pour toujours" : "/mois"}
                </span>
              </p>
              {interval === "yearly" && plan.monthlyPrice > 0 && (
                <p
                  className={cn(
                    "mt-1 text-[13px] line-through",
                    featured ? "text-paper/50" : "text-ink-faint",
                  )}
                >
                  {plan.monthlyPrice} €/mois
                </p>
              )}

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px]">
                    <Check
                      size={16}
                      strokeWidth={3}
                      className={cn("mt-0.5 shrink-0", featured ? "text-lime" : "text-pitch")}
                    />
                    <span className={featured ? "text-paper/85" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={isCurrent ? "secondary" : featured ? "sun" : "secondary"}
                size="lg"
                className="mt-7 w-full"
                disabled={isCurrent}
                onClick={() => setCheckout(plan.id)}
              >
                {isCurrent ? (
                  <>
                    <Check size={17} /> Plan actuel
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>

      {/* 4. Comparatif */}
      <Card className="mt-8 overflow-x-auto rounded-[24px]">
        <table className="w-full min-w-[560px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-line">
              <th className="p-5 text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                Comparatif
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.id}
                  className={cn(
                    "p-5 text-center font-display text-[15px] font-bold text-ink",
                    p.id === "premium" && "border-t-2 border-pitch bg-mist/60",
                  )}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {[
              { label: "Nombre d'équipes", values: ["1", "∞", "∞"] },
              { label: "Messages / mois", values: ["100", "2 000", "10 000"] },
              { label: "Relances automatiques", values: ["—", "✓", "✓"] },
              { label: "Sondages", values: ["Simples", "✓", "✓"] },
              { label: "Statistiques", values: ["Basiques", "Complètes", "Complètes + club"] },
              { label: "Rôles délégués", values: ["—", "—", "✓"] },
              { label: "Numéro WhatsApp", values: ["Partagé", "Partagé", "Dédié club"] },
              { label: "Support", values: ["Communauté", "Email", "Prioritaire humain"] },
            ].map((row, i) => (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <td className="p-4 pl-5 font-semibold text-ink-soft">{row.label}</td>
                {row.values.map((v, vi) => (
                  <td
                    key={vi}
                    className={cn(
                      "p-4 text-center text-ink",
                      vi === 1 && "bg-mist/60 font-semibold",
                    )}
                  >
                    {v}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 6. FAQ */}
      <Card className="mt-6 rounded-[24px] px-6 py-2">
        <Accordion type="single" collapsible>
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="last:border-b-0">
              <AccordionTrigger className="text-[16px]">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={15} /> Paiement sécurisé
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock size={15} /> Données hébergées en Europe
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CreditCard size={15} /> Résiliable en 2 clics
        </span>
      </p>

      {/* 5. Checkout simulé */}
      <Dialog open={!!checkout} onOpenChange={(v) => !v && setCheckout(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Passer au plan {PLANS.find((p) => p.id === checkout)?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="rounded-[16px] bg-mist p-4">
            <p className="text-[14px] font-bold text-pitch-dark">14 jours d'essai gratuit</p>
            <p className="mt-1 text-[13px] text-ink-soft">
              Aucun prélèvement aujourd'hui. Vous pouvez annuler à tout moment.
            </p>
          </div>

          <div className="rounded-[16px] border border-line p-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              Moyen de paiement
            </p>
            <p className="mt-2 font-mono text-[15px] text-ink">4242 •••• •••• 4242</p>
            <p className="mt-1 text-[12.5px] text-ink-faint">
              Démo — aucun paiement réel n'est effectué.
            </p>
          </div>

          <Button
            size="lg"
            disabled={change.isPending}
            onClick={() => checkout && change.mutate({ plan: checkout, interval })}
          >
            Confirmer — 0 € aujourd'hui
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
