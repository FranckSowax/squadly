import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import { Lock, Plus, Send, X } from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Segmented } from "@/components/ui/segmented"
import { Input, Label, Select } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EmptyState } from "@/components/squadly/EmptyState"
import { PhoneMockup } from "@/components/squadly/PhoneMockup"
import { WhatsAppBubble } from "@/components/squadly/WhatsAppBubble"
import { ChannelDot } from "@/components/squadly/ChannelHealth"
import { CountUpValue } from "@/hooks/useCountUp"
import { trpc } from "@/lib/trpc"
import { ago } from "@/lib/format"
import { cn } from "@/lib/utils"

export default function Polls() {
  const [params, setParams] = useSearchParams()
  const [tab, setTab] = useState<"open" | "closed">("open")
  const utils = trpc.useUtils()
  const polls = trpc.squadly.polls.list.useQuery()

  const close = trpc.squadly.polls.close.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success("Sondage clôturé")
    },
  })

  const list = (polls.data ?? []).filter((p) => p.poll.status === tab)

  return (
    <AppShell
      title="Sondages"
      subtitle="Covoiturage, dates, goûter… décidez ensemble, sans 47 messages."
      actions={
        <Button onClick={() => setParams({ new: "1" })}>
          <Plus size={17} /> Nouveau sondage
        </Button>
      }
    >
      <Segmented
        value={tab}
        onChange={setTab}
        className="mb-5"
        items={[
          { value: "open", label: "Ouverts", count: polls.data?.filter((p) => p.poll.status === "open").length },
          { value: "closed", label: "Clôturés", count: polls.data?.filter((p) => p.poll.status === "closed").length },
        ]}
      />

      {polls.isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton className="h-64" />
          <CardSkeleton className="h-64" />
        </div>
      )}

      {polls.data && list.length === 0 && (
        <EmptyState
          image="/empty-polls.svg"
          title="Aucun sondage pour l'instant"
          description="Posez votre première question — les réponses arrivent dans WhatsApp."
          action={
            <Button onClick={() => setParams({ new: "1" })}>
              <Plus size={17} /> Créer un sondage
            </Button>
          }
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p, i) => {
          const leader = [...p.options].sort((a, b) => b.votes - a.votes)[0]
          return (
            <motion.div
              key={p.poll.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full rounded-[24px] p-6 transition-shadow hover:shadow-lift">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {p.poll.status === "open" ? (
                    <Badge variant="pitch">
                      <ChannelDot connected /> Ouvert
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      <Lock size={12} /> Clôturé
                    </Badge>
                  )}
                  <Badge variant="default">{p.team?.name}</Badge>
                  <span className="text-[12px] text-ink-faint">{ago(p.poll.createdAt)}</span>
                  {p.poll.status === "open" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      onClick={() => close.mutate({ id: p.poll.id })}
                    >
                      Clôturer
                    </Button>
                  )}
                </div>

                <p className="font-display text-[19px] font-bold leading-snug tracking-tight text-ink">
                  {p.poll.question}
                </p>

                <div className="mt-5 space-y-3.5">
                  {p.options.map((o, oi) => {
                    const share = p.totalVotes ? (o.votes / p.totalVotes) * 100 : 0
                    const isLeader = leader && o.id === leader.id && o.votes > 0
                    return (
                      <div key={o.id}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                            {o.label}
                            {isLeader && <Badge variant="lime">En tête</Badge>}
                          </span>
                          <span className="tnum shrink-0 text-[13px] font-bold text-ink-soft">
                            {o.votes} · {Math.round(share)} %
                          </span>
                        </div>
                        <Progress
                          value={share}
                          delay={oi * 0.12}
                          barClassName={isLeader ? "bg-pitch" : "bg-pitch/50"}
                          className="h-2.5"
                        />
                      </div>
                    )
                  })}
                </div>

                <p className="tnum mt-5 text-[13px] text-ink-faint">
                  <CountUpValue value={p.totalVotes} /> votes
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <NewPollDialog open={params.get("new") === "1"} onClose={() => setParams({})} />
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */

function NewPollDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const utils = trpc.useUtils()
  const teams = trpc.squadly.teams.list.useQuery()
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [teamId, setTeamId] = useState(0)

  useEffect(() => {
    if (teams.data?.[0] && !teamId) setTeamId(teams.data[0].team.id)
  }, [teams.data, teamId])

  useEffect(() => {
    if (!open) {
      setQuestion("")
      setOptions(["", ""])
    }
  }, [open])

  const create = trpc.squadly.polls.create.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      confetti({ particleCount: 80, spread: 65, origin: { y: 0.7 }, colors: ["#A3E635", "#16A34A", "#FFC53D"] })
      toast.success("Sondage envoyé sur WhatsApp")
      onClose()
    },
  })

  const clean = options.map((o) => o.trim()).filter(Boolean)
  const valid = question.trim().length >= 5 && clean.length >= 2 && teamId > 0
  const members = teams.data?.find((t) => t.team.id === teamId)?.players ?? 0

  const preview = [
    `Sondage — ${question || "Votre question ?"}`,
    ...clean.map((o, i) => `${i + 1}. ${o}`),
    "Réponds avec le numéro de ton choix.",
  ].join("\n")

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[760px]">
        <DialogHeader>
          <DialogTitle>Nouveau sondage</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Question</Label>
              <Input
                value={question}
                maxLength={120}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex. Covoiturage pour le match de samedi ?"
              />
              <p className="text-right text-[11.5px] text-ink-faint">{question.length}/120</p>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <AnimatePresence initial={false}>
                {options.map((o, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-[13px] font-bold text-pitch-dark">
                      {i + 1}
                    </span>
                    <Input
                      value={o}
                      onChange={(e) => {
                        const next = [...options]
                        next[i] = e.target.value
                        setOptions(next)
                      }}
                      placeholder={`Option ${i + 1}`}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => setOptions(options.filter((_, x) => x !== i))}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-mist hover:text-coral"
                        aria-label="Supprimer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {options.length < 6 && (
                <Button variant="ghost" size="sm" onClick={() => setOptions([...options, ""])}>
                  <Plus size={15} /> Ajouter une option
                </Button>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Équipe</Label>
              <Select value={teamId} onChange={(e) => setTeamId(Number(e.target.value))}>
                {teams.data?.map((t) => (
                  <option key={t.team.id} value={t.team.id}>
                    {t.team.name}
                  </option>
                ))}
              </Select>
            </div>

            <Button
              variant="whatsapp"
              size="lg"
              className="w-full"
              disabled={!valid || create.isPending}
              onClick={() =>
                create.mutate({ teamId, question: question.trim(), options: clean, multipleChoice: false })
              }
            >
              <Send size={18} /> Envoyer le sondage — {members} membres
            </Button>
          </div>

          <div className={cn("mx-auto", "hidden md:block")}>
            <PhoneMockup subtitle="aperçu en direct">
              <WhatsAppBubble
                direction="out"
                kind="sondage"
                content={preview}
                buttons={clean}
                status="sent"
                createdAt={new Date()}
                compact
              />
            </PhoneMockup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
