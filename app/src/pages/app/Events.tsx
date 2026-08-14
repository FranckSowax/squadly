import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Dumbbell,
  MapPin,
  Medal,
  Plus,
  Send,
  Trophy,
} from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { RsvpBar } from "@/components/ui/progress"
import { Segmented } from "@/components/ui/segmented"
import { Input, Label, Select, Textarea } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar } from "@/components/squadly/Avatar"
import { EmptyState } from "@/components/squadly/EmptyState"
import { PhoneMockup } from "@/components/squadly/PhoneMockup"
import { WhatsAppBubble } from "@/components/squadly/WhatsAppBubble"
import { RsvpChip, type RsvpStatus } from "@/components/squadly/RsvpChip"
import { DateBlock } from "./Dashboard"
import { trpc } from "@/lib/trpc"
import { ago, countdown, longDay, timeLabel } from "@/lib/format"
import { cn, shortName } from "@/lib/utils"

type Tab = "upcoming" | "past" | "drafts"

const TYPE_META = {
  match: { label: "Match", Icon: Trophy, accent: "bg-pitch" },
  entrainement: { label: "Entraînement", Icon: Dumbbell, accent: "bg-sun" },
  tournoi: { label: "Tournoi", Icon: Medal, accent: "bg-lime" },
  autre: { label: "Événement", Icon: Calendar, accent: "bg-ink/20" },
} as const

export default function Events() {
  const [params, setParams] = useSearchParams()
  const [tab, setTab] = useState<Tab>("upcoming")
  const [openId, setOpenId] = useState<number | null>(null)
  const wizardOpen = params.get("new") === "1"

  const events = trpc.squadly.events.list.useQuery()

  const grouped = useMemo(() => {
    const now = Date.now()
    const all = events.data ?? []
    return {
      upcoming: all.filter((e) => e.event.status !== "draft" && new Date(e.event.startsAt).getTime() > now),
      past: all.filter((e) => e.event.status !== "draft" && new Date(e.event.startsAt).getTime() <= now),
      drafts: all.filter((e) => e.event.status === "draft"),
    }
  }, [events.data])

  if (openId) return <EventDetail id={openId} onBack={() => setOpenId(null)} />

  return (
    <AppShell
      title="Convocations"
      subtitle="Créez, envoyez, suivez les réponses en direct."
      actions={
        <Button onClick={() => setParams({ new: "1" })}>
          <Plus size={17} /> Nouvelle convocation
        </Button>
      }
    >
      <Segmented
        value={tab}
        onChange={setTab}
        className="mb-5"
        items={[
          { value: "upcoming", label: "À venir", count: grouped.upcoming.length },
          { value: "past", label: "Passés", count: grouped.past.length },
          { value: "drafts", label: "Brouillons", count: grouped.drafts.length },
        ]}
      />

      {events.isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton className="h-32" />
          <CardSkeleton className="h-32" />
        </div>
      )}

      {events.data && grouped[tab].length === 0 && (
        <EmptyState
          image="/empty-events.svg"
          title="Rien de prévu pour l'instant"
          description="Créez une convocation — vos joueurs la reçoivent dans WhatsApp en quelques secondes."
          action={
            <Button onClick={() => setParams({ new: "1" })}>
              <Plus size={17} /> Créer une convocation
            </Button>
          }
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {grouped[tab].map((e, i) => {
          const meta = TYPE_META[e.event.type]
          const past = new Date(e.event.startsAt).getTime() <= Date.now()
          return (
            <motion.button
              key={e.event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.4) }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setOpenId(e.event.id)}
              className="group text-left"
            >
              <Card className="flex h-full items-center gap-4 p-4 transition-shadow group-hover:shadow-lift">
                <div className="relative">
                  <span className={cn("absolute inset-x-2 top-0 h-1 rounded-full", meta.accent)} />
                  <DateBlock date={e.event.startsAt} />
                </div>

                <div className="min-w-0 flex-1">
                  <Badge variant="neutral" className="mb-1.5">
                    <meta.Icon size={12} /> {meta.label}
                  </Badge>
                  <p className="truncate font-display text-[17px] font-bold tracking-tight text-ink">
                    {e.event.title}
                  </p>
                  <p className="mt-0.5 truncate text-[12.5px] text-ink-soft">
                    {timeLabel(e.event.startsAt)}
                    {e.event.location ? ` · ${e.event.location}` : ""}
                  </p>
                  <Badge variant="default" className="mt-2">
                    {e.team?.name}
                  </Badge>
                </div>

                <div className="w-28 shrink-0 text-right">
                  {e.counts ? (
                    <>
                      <p className="tnum font-display text-[18px] font-bold text-ink">
                        {e.counts.present}/{e.counts.total}
                      </p>
                      <RsvpBar counts={e.counts} className="mt-1.5" />
                      {!past && e.counts.none > 0 && (
                        <Badge variant="sun" className="mt-2">
                          {e.counts.none} sans réponse
                        </Badge>
                      )}
                      {past && (
                        <Badge variant="neutral" className="mt-2">
                          Terminé
                        </Badge>
                      )}
                    </>
                  ) : (
                    <Badge variant="dashed">Non envoyée</Badge>
                  )}
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-1"
                />
              </Card>
            </motion.button>
          )
        })}
      </div>

      <Wizard open={wizardOpen} onClose={() => setParams({})} onCreated={(id) => setOpenId(id)} />
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */
/* B. Détail                                                                   */
/* -------------------------------------------------------------------------- */

function EventDetail({ id, onBack }: { id: number; onBack: () => void }) {
  const utils = trpc.useUtils()
  const detail = trpc.squadly.events.byId.useQuery({ id })
  const [celebrated, setCelebrated] = useState(false)

  const remind = trpc.squadly.events.remind.useMutation({
    onSuccess: (r) => {
      void utils.invalidate()
      toast.success(`Relance envoyée à ${r.reminded} joueur${r.reminded > 1 ? "s" : ""}`)
    },
  })
  const send = trpc.squadly.events.send.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#A3E635", "#16A34A", "#FFC53D"] })
      toast.success("Convocation envoyée sur WhatsApp")
    },
  })

  const board = detail.data?.board
  const total = board ? board.present.length + board.maybe.length + board.absent.length + board.none.length : 0

  useEffect(() => {
    if (board && total > 0 && board.none.length === 0 && !celebrated) {
      setCelebrated(true)
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#A3E635", "#16A34A"] })
    }
  }, [board, total, celebrated])

  if (detail.isLoading || !detail.data)
    return (
      <AppShell title="Convocation">
        <CardSkeleton className="h-64" />
      </AppShell>
    )

  const { event, team } = detail.data
  const meta = TYPE_META[event.type]

  const columns: Array<{ key: RsvpStatus; items: NonNullable<typeof board>["present"] }> = [
    { key: "present", items: board!.present },
    { key: "maybe", items: board!.maybe },
    { key: "absent", items: board!.absent },
    { key: "none", items: board!.none },
  ]

  return (
    <AppShell
      title={event.title}
      subtitle={`${longDay(event.startsAt)} · ${timeLabel(event.startsAt)}`}
      wide
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft size={16} /> Convocations
          </Button>
          {event.status === "draft" ? (
            <Button onClick={() => send.mutate({ id })} disabled={send.isPending}>
              <Send size={16} /> Envoyer la convocation
            </Button>
          ) : (
            <Button
              variant="sun"
              onClick={() => remind.mutate({ id })}
              disabled={remind.isPending || board!.none.length === 0}
            >
              <BellRing size={16} /> Relancer les sans-réponse
            </Button>
          )}
        </div>
      }
    >
      <div className="bg-pitch-field grid gap-6 rounded-panel  p-7 text-paper shadow-lift md:grid-cols-[1.2fr_1fr] md:p-9">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="glass">
              <meta.Icon size={13} className="text-lime" /> {meta.label}
            </Badge>
            <Badge variant="glass">{team?.name}</Badge>
            {event.status === "draft" && <Badge variant="glass">Brouillon</Badge>}
          </div>
          <h2 className="mt-4 font-display text-[26px] font-bold leading-tight tracking-tight md:text-[30px]">
            {event.title}
          </h2>
          <div className="mt-4 space-y-1.5 text-[14.5px] text-paper/80">
            <p className="flex items-center gap-2">
              <Calendar size={15} className="text-lime" /> {longDay(event.startsAt)}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={15} className="text-lime" /> {timeLabel(event.startsAt)}
            </p>
            {event.location && (
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-lime" /> {event.location}
              </p>
            )}
          </div>
          {event.notes && (
            <p className="mt-4 rounded-[16px] bg-white/10 p-4 text-[14px] leading-relaxed text-paper/85">
              {event.notes}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center gap-3">
          {countdown(event.startsAt) && (
            <>
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-paper/50">
                Coup d'envoi dans
              </p>
              <p className="tnum font-display text-[40px] font-extrabold leading-none text-lime">
                {countdown(event.startsAt)}
              </p>
            </>
          )}
          {event.sentAt && (
            <p className="text-[13px] text-paper/60">
              Convocation envoyée {ago(event.sentAt)} · {event.remindersSent} relance
              {event.remindersSent > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {board && board.none.length === 0 && total > 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 17 }}
          className="mt-5 flex items-center gap-4 rounded-card bg-lime/15 p-5"
        >
          <img src="/celebration.png" alt="" className="h-16 w-auto rounded-[12px]" />
          <div>
            <p className="font-display text-[19px] font-bold tracking-tight text-ink">
              100 % de réponses. Belle équipe !
            </p>
            <p className="text-[13.5px] text-ink-soft">
              Tout le monde a répondu — plus rien à relancer.
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {columns.map((col, ci) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <RsvpChip status={col.key} />
              <span className="tnum font-display text-[18px] font-bold text-ink">
                {col.items.length}
                <span className="ml-1 text-[12px] font-semibold text-ink-faint">
                  {total ? Math.round((col.items.length / total) * 100) : 0} %
                </span>
              </span>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {col.items.map((row) => (
                  <motion.div
                    key={row.m.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="flex items-center gap-3 rounded-[16px] border border-line bg-white p-3"
                  >
                    <Avatar
                      firstName={row.m.firstName}
                      lastName={row.m.lastName}
                      color={row.m.avatarColor}
                      size={34}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-bold text-ink">
                        {shortName(row.m.firstName, row.m.lastName)}
                      </p>
                      <p className="truncate text-[11.5px] text-ink-faint">
                        {row.r.status === "none"
                          ? event.sentAt
                            ? `convoqué ${ago(event.sentAt)}`
                            : "en attente"
                          : row.r.respondedAt
                            ? `répondu ${ago(row.r.respondedAt)}${row.r.respondedBy.includes("parent") ? ` · ${row.r.respondedBy}` : ""}`
                            : row.r.respondedBy}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {col.items.length === 0 && (
                <p className="rounded-[16px] border border-dashed border-line py-6 text-center text-[13px] text-ink-faint">
                  Personne ici
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */
/* C. Wizard                                                                   */
/* -------------------------------------------------------------------------- */

function Wizard({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: (id: number) => void
}) {
  const utils = trpc.useUtils()
  const teams = trpc.squadly.teams.list.useQuery()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const defaultDate = useMemo(() => {
    const d = new Date(Date.now() + 3 * 86400_000)
    d.setHours(14, 30, 0, 0)
    return d.toISOString().slice(0, 16)
  }, [])

  const [form, setForm] = useState({
    type: "match" as "match" | "entrainement" | "tournoi" | "autre",
    title: "",
    teamId: 0,
    startsAt: defaultDate,
    location: "",
    opponent: "",
    notes: "",
    reminderJ7: false,
    reminderJ1: true,
  })

  useEffect(() => {
    if (teams.data?.[0] && !form.teamId) {
      setForm((f) => ({ ...f, teamId: teams.data[0].team.id }))
    }
  }, [teams.data, form.teamId])

  useEffect(() => {
    if (!open) {
      setStep(0)
      setDone(false)
    }
  }, [open])

  const team = teams.data?.find((t) => t.team.id === form.teamId)
  const recipients = team?.players ?? 0

  const create = trpc.squadly.events.create.useMutation({
    onSuccess: (res) => {
      void utils.invalidate()
      setDone(true)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#A3E635", "#16A34A", "#FFC53D"] })
      toast.success(`Convocation envoyée à ${recipients} joueurs`)
      window.setTimeout(() => {
        onClose()
        onCreated(res.id)
      }, 1800)
    },
  })

  const preview = [
    `Convocation — ${form.title || "Votre événement"}`,
    `${longDay(new Date(form.startsAt))} · ${timeLabel(new Date(form.startsAt))}`,
    form.location,
    form.notes,
    "Réponds en un tap :",
  ]
    .filter(Boolean)
    .join("\n")

  const canNext = step === 0 ? form.title.trim().length >= 3 && form.teamId > 0 : true

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[880px]">
        {done ? (
          <div className="py-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 17 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime/25"
            >
              <Check size={40} className="text-pitch" strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 font-display text-[24px] font-bold tracking-tight text-ink">
              Convocation envoyée à {recipients} joueurs !
            </h3>
            <p className="mt-2 text-[15px] text-ink-soft">
              Les réponses arrivent déjà — on vous prévient.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Nouvelle convocation</DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2">
              {["L'événement", "Les destinataires", "Le message"].map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold transition-colors",
                      i <= step ? "bg-pitch text-white" : "bg-mist text-ink-faint",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-[13px] font-semibold sm:block",
                      i === step ? "text-ink" : "text-ink-faint",
                    )}
                  >
                    {label}
                  </span>
                  {i < 2 && (
                    <span
                      className={cn("h-0.5 flex-1 rounded-full", i < step ? "bg-pitch" : "bg-line")}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <Label>Type</Label>
                      <Segmented
                        value={form.type}
                        onChange={(type) => setForm({ ...form, type })}
                        items={[
                          { value: "match", label: "Match" },
                          { value: "entrainement", label: "Entraînement" },
                          { value: "tournoi", label: "Tournoi" },
                          { value: "autre", label: "Autre" },
                        ]}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Titre</Label>
                      <Input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Match U13 A vs FC Montreuil"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>Équipe</Label>
                        <Select
                          value={form.teamId}
                          onChange={(e) => setForm({ ...form, teamId: Number(e.target.value) })}
                        >
                          {teams.data?.map((t) => (
                            <option key={t.team.id} value={t.team.id}>
                              {t.team.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Date et heure</Label>
                        <Input
                          type="datetime-local"
                          value={form.startsAt}
                          onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Lieu</Label>
                      <Input
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="Stade Jean-Bouin, Verrières"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Note aux joueurs</Label>
                      <Textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="RDV 13 h 45. Apportez les gilets verts."
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-[16px] border border-line p-4">
                      <div>
                        <p className="text-[15px] font-bold text-ink">
                          Toute l'équipe {team?.team.name} ({recipients})
                        </p>
                        <p className="text-[13px] text-ink-soft">
                          Chaque joueur opt-in reçoit la convocation sur WhatsApp.
                        </p>
                      </div>
                      <Switch checked disabled />
                    </div>
                    <p className="rounded-[14px] bg-mist p-4 text-[13.5px] text-pitch-dark">
                      {recipients} joueurs recevront un WhatsApp. Les membres sans opt-in ne seront
                      pas contactés — invitez-les depuis la page Équipes.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-[16px] border border-line p-4">
                        <div>
                          <p className="text-[14.5px] font-bold text-ink">Relance auto J-7</p>
                          <p className="text-[12.5px] text-ink-faint">Badge Premium</p>
                        </div>
                        <Switch
                          checked={form.reminderJ7}
                          onCheckedChange={(v) => setForm({ ...form, reminderJ7: v })}
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-[16px] border border-line p-4">
                        <div>
                          <p className="text-[14.5px] font-bold text-ink">Relance auto J-1</p>
                          <p className="text-[12.5px] text-ink-faint">
                            Aux sans-réponse, la veille à 18 h
                          </p>
                        </div>
                        <Switch
                          checked={form.reminderJ1}
                          onCheckedChange={(v) => setForm({ ...form, reminderJ1: v })}
                        />
                      </div>
                      <Button
                        variant="whatsapp"
                        size="lg"
                        className="w-full"
                        disabled={create.isPending}
                        onClick={() =>
                          create.mutate({
                            teamId: form.teamId,
                            title: form.title.trim(),
                            type: form.type,
                            startsAt: new Date(form.startsAt),
                            location: form.location,
                            opponent: form.opponent,
                            notes: form.notes,
                            sendNow: true,
                          })
                        }
                      >
                        <Send size={18} /> Envoyer sur WhatsApp — {recipients} joueurs
                      </Button>
                      <p className="text-center text-[12.5px] text-ink-faint">
                        {form.reminderJ1 ? "Relance auto J-1 activée · " : ""}Mode démo — envoi
                        simulé.
                      </p>
                    </div>

                    <div className="mx-auto">
                      <PhoneMockup subtitle="aperçu en direct">
                        <WhatsAppBubble
                          direction="out"
                          kind="convocation"
                          content={preview}
                          buttons={["Présent", "Absent", "Peut-être"]}
                          status="sent"
                          createdAt={new Date()}
                          compact
                        />
                      </PhoneMockup>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => (step === 0 ? onClose() : setStep(step - 1))}
                disabled={create.isPending}
              >
                <ArrowLeft size={16} /> {step === 0 ? "Annuler" : "Retour"}
              </Button>
              {step < 2 && (
                <Button onClick={() => setStep(step + 1)} disabled={!canNext}>
                  Continuer <ArrowRight size={16} />
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
