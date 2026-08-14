import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Calendar,
  CheckCheck,
  ChevronRight,
  Clock,
  Hand,
  MapPin,
  MessageCircle,
  Plus,
  Send,
  Trophy,
} from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Progress, RsvpBar } from "@/components/ui/progress"
import { StatCard } from "@/components/squadly/StatCard"
import { RsvpRing } from "@/components/squadly/RsvpRing"
import { RsvpChip } from "@/components/squadly/RsvpChip"
import { Avatar } from "@/components/squadly/Avatar"
import { EmptyState } from "@/components/squadly/EmptyState"
import { ChannelDot } from "@/components/squadly/ChannelHealth"
import { CountUpValue } from "@/hooks/useCountUp"
import { trpc } from "@/lib/trpc"
import { countdown, dayLabel, longDay, timeLabel } from "@/lib/format"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

export default function Dashboard() {
  const navigate = useNavigate()
  const utils = trpc.useUtils()
  const summary = trpc.squadly.dashboard.summary.useQuery()
  const events = trpc.squadly.events.list.useQuery()
  const polls = trpc.squadly.polls.list.useQuery()

  const [reminded, setReminded] = useState(false)
  const remind = trpc.squadly.events.remind.useMutation({
    onSuccess: (res) => {
      setReminded(true)
      void utils.invalidate()
      confetti({ particleCount: 60, spread: 65, origin: { y: 0.7 }, colors: ["#A3E635", "#16A34A", "#FFC53D"] })
      toast.success(`Relance envoyée à ${res.reminded} joueur${res.reminded > 1 ? "s" : ""}`)
    },
  })

  const data = summary.data
  const next = data?.nextEvent
  const unanswered = next?.unanswered ?? []
  const openPoll = polls.data?.find((p) => p.poll.status === "open")
  const upcoming = (events.data ?? [])
    .filter((e) => new Date(e.event.startsAt).getTime() > Date.now())
    .sort((a, b) => new Date(a.event.startsAt).getTime() - new Date(b.event.startsAt).getTime())
    .slice(0, 3)

  const quickActions = [
    { label: "Nouvelle convocation", icon: Send, tint: "bg-pitch/12 text-pitch-dark", to: "/app/convocations?new=1" },
    { label: "Nouveau sondage", icon: BarChart3, tint: "bg-sun/20 text-sun-dark", to: "/app/sondages?new=1" },
    {
      label: "Relancer les sans-réponse",
      icon: BellRing,
      tint: "bg-coral/12 text-coral",
      to: "#relance",
      badge: unanswered.length || null,
    },
    { label: "Message rapide", icon: MessageCircle, tint: "bg-mist text-pitch-dark", to: "/app/messages?compose=1" },
  ]

  return (
    <AppShell
      title={`Salut ${data ? "Karim" : ""}`}
      subtitle={
        next ? (
          <span className="inline-flex items-center gap-1.5">
            <Hand size={15} className="text-sun" />
            {longDay(next.event.startsAt)} · {next.event.title} —{" "}
            {countdown(next.event.startsAt) ? `dans ${countdown(next.event.startsAt)}` : "c'est aujourd'hui"}.
          </span>
        ) : (
          "Aucune convocation à venir — c'est le moment d'en créer une."
        )
      }
      actions={
        <Button onClick={() => navigate("/app/convocations?new=1")}>
          <Plus size={17} /> Nouvelle convocation
        </Button>
      }
    >
      {/* 2. Actions rapides */}
      <div className="-mx-5 mb-6 flex snap-x gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-4 md:px-0">
        {quickActions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (a.to.startsWith("#")) document.getElementById("relance")?.scrollIntoView({ behavior: "smooth" })
              else navigate(a.to)
            }}
            className="group flex w-[190px] shrink-0 snap-start items-center gap-3 rounded-card border border-line bg-white p-4 text-left shadow-card transition-shadow hover:shadow-lift md:w-auto"
          >
            <span
              className={cn(
                "relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-6",
                a.tint,
              )}
            >
              <a.icon size={19} />
              {a.badge && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-coral text-[11px] font-bold text-white">
                  {a.badge}
                </span>
              )}
            </span>
            <span className="text-[13.5px] font-bold leading-tight text-ink">{a.label}</span>
          </motion.button>
        ))}
      </div>

      {/* 3. Prochaine convocation */}
      {summary.isLoading ? (
        <CardSkeleton className="h-64" />
      ) : next ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="bg-pitch-field grid gap-8 rounded-panel  p-7 text-paper shadow-lift md:grid-cols-[1.1fr_1fr] md:p-9"
        >
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="glass">
                <Trophy size={13} className="text-lime" />
                {next.event.type === "match"
                  ? "Match"
                  : next.event.type === "entrainement"
                    ? "Entraînement"
                    : next.event.type === "tournoi"
                      ? "Tournoi"
                      : "Événement"}
              </Badge>
              <Badge variant="glass">{next.team?.name}</Badge>
            </div>

            <h2 className="mt-4 font-display text-[24px] font-bold leading-tight tracking-tight text-paper md:text-[28px]">
              {next.event.title}
            </h2>

            <div className="mt-4 space-y-1.5 text-[14.5px] text-paper/80">
              <p className="flex items-center gap-2">
                <Calendar size={15} className="text-lime" /> {longDay(next.event.startsAt)}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-lime" /> {timeLabel(next.event.startsAt)}
              </p>
              {next.event.location && (
                <p className="flex items-center gap-2">
                  <MapPin size={15} className="text-lime" /> {next.event.location}
                </p>
              )}
            </div>

            {countdown(next.event.startsAt) && (
              <div className="mt-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-paper/50">
                  Coup d'envoi dans
                </p>
                <p className="tnum mt-1 font-display text-[38px] font-extrabold leading-none text-lime">
                  {countdown(next.event.startsAt)}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-5">
            <RsvpRing counts={next.counts} />

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="glass">
                <span className="h-2 w-2 rounded-full bg-pitch" /> {next.counts.present} présents
              </Badge>
              <Badge variant="glass">
                <span className="h-2 w-2 rounded-full bg-sun" /> {next.counts.maybe} peut-être
              </Badge>
              <Badge variant="glass">
                <span className="h-2 w-2 rounded-full bg-coral" /> {next.counts.absent} absents
              </Badge>
              <Badge variant="glass">
                <span className="h-2 w-2 rounded-full bg-white/40" /> {next.counts.none} sans réponse
              </Badge>
            </div>

            <p className="flex items-center gap-2 text-[12.5px] text-paper/60">
              <ChannelDot connected /> Temps réel — les réponses arrivent en direct
            </p>

            <Button asChild variant="ghost-light" size="sm" className="group">
              <Link to="/app/convocations">
                Voir le détail
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      ) : (
        <EmptyState
          image="/empty-events.svg"
          title="Aucune convocation prévue"
          description="Envoyez la première en 30 secondes — vos joueurs répondent dans WhatsApp."
          action={
            <Button onClick={() => navigate("/app/convocations?new=1")}>
              <Plus size={17} /> Créer une convocation
            </Button>
          }
        />
      )}

      {/* 4. Alerte sans réponse */}
      {next && unanswered.length > 0 && (
        <motion.div
          id="relance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 rounded-card border border-sun/40 bg-sun/[.06] p-5 md:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun/20 text-sun-dark">
                <BellRing size={19} />
              </span>
              <div>
                <p className="text-[15.5px] font-bold text-ink">
                  {unanswered.length} joueur{unanswered.length > 1 ? "s" : ""} n'
                  {unanswered.length > 1 ? "ont" : "a"} pas répondu
                </p>
                <p className="mt-0.5 text-[13.5px] text-ink-soft">
                  {reminded
                    ? `Relances envoyées aujourd'hui à ${timeLabel(new Date())}.`
                    : "La relance automatique part demain à 18 h — ou envoyez-la maintenant."}
                </p>
              </div>
            </div>
            {!reminded && (
              <Button
                variant="sun"
                onClick={() => remind.mutate({ id: next.event.id })}
                disabled={remind.isPending}
              >
                {remind.isPending ? (
                  <>
                    <Clock size={16} className="animate-spin" /> Envoi…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Relancer maintenant
                  </>
                )}
              </Button>
            )}
          </div>

          <ul className="mt-4 space-y-2">
            {unanswered.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 rounded-[14px] bg-white/70 px-3 py-2"
              >
                <Avatar firstName={m.firstName} lastName={m.lastName} color={m.avatarColor} size={32} />
                <span className="flex-1 text-[14px] font-semibold text-ink">
                  {m.firstName} {m.lastName}
                </span>
                {reminded ? (
                  <Badge variant="default">
                    <CheckCheck size={13} /> Relancé
                  </Badge>
                ) : (
                  <RsvpChip status="none" />
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* 5. StatCards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Taux de réponse"
          value={data?.kpis.responseRate ?? 0}
          suffix=" %"
          delta={{ value: "+12 %", positive: true }}
          spark={[62, 68, 66, 71, 74, 79, 83, data?.kpis.responseRate ?? 86]}
        />
        <StatCard
          index={1}
          label="Joueurs actifs"
          value={data?.kpis.members ?? 0}
          delta={{ value: "+5", positive: true }}
          hint={`${data?.kpis.teams ?? 0} équipes`}
        />
        <StatCard
          index={2}
          label="Messages ce mois"
          value={data?.subscription?.messagesUsed ?? 0}
          hint={`quota ${data?.subscription?.messagesQuota ?? 0} — plan ${data?.subscription?.plan ?? ""}`}
        />
        <StatCard
          index={3}
          label="Délai médian"
          value={data?.kpis.medianDelayMin ?? 0}
          suffix=" min"
          delta={{ value: "-18 min", positive: true }}
          hint="de mieux en mieux"
        />
      </div>

      {/* 6. À venir + dernier sondage */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-[18px] font-bold tracking-tight text-ink">À venir</h3>
            <Link to="/app/convocations" className="text-[13px] font-semibold text-pitch hover:underline">
              Tout voir →
            </Link>
          </div>

          {upcoming.length === 0 && <p className="text-[14px] text-ink-faint">Rien de prévu.</p>}

          <ul className="space-y-1">
            {upcoming.map((e, i) => (
              <motion.li
                key={e.event.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to="/app/convocations"
                  className="flex items-center gap-3 rounded-[14px] p-2 transition-colors hover:bg-mist"
                >
                  <DateBlock date={e.event.startsAt} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14.5px] font-bold text-ink">{e.event.title}</p>
                    <p className="text-[12.5px] text-ink-soft">
                      {timeLabel(e.event.startsAt)}
                      {e.event.location ? ` · ${e.event.location}` : ""}
                    </p>
                    {e.counts && <RsvpBar counts={e.counts} className="mt-2 h-1.5 w-full max-w-[160px]" />}
                  </div>
                  {e.counts ? (
                    <span className="tnum shrink-0 text-[13.5px] font-bold text-ink">
                      {e.counts.present}/{e.counts.total}
                    </span>
                  ) : (
                    <Badge variant="dashed">Brouillon</Badge>
                  )}
                  <ChevronRight size={16} className="shrink-0 text-ink-faint" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          {openPoll ? (
            <>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="pitch">
                  <ChannelDot connected /> Sondage ouvert
                </Badge>
                <span className="text-[12.5px] text-ink-faint">{openPoll.team?.name}</span>
              </div>
              <p className="text-[16px] font-bold text-ink">{openPoll.poll.question}</p>
              <div className="mt-4 space-y-3">
                {openPoll.options.map((o, i) => (
                  <div key={o.id}>
                    <div className="mb-1 flex justify-between text-[13px] font-semibold text-ink-soft">
                      <span>{o.label}</span>
                      <span className="tnum">{o.votes}</span>
                    </div>
                    <Progress
                      value={openPoll.totalVotes ? (o.votes / openPoll.totalVotes) * 100 : 0}
                      delay={i * 0.15}
                    />
                  </div>
                ))}
              </div>
              <p className="tnum mt-4 text-[13px] text-ink-faint">
                <CountUpValue value={openPoll.totalVotes} /> votes
              </p>
              <Button asChild variant="ghost" size="sm" className="mt-3">
                <Link to="/app/sondages">Voir les sondages →</Link>
              </Button>
            </>
          ) : (
            <EmptyState
              image="/empty-polls.svg"
              title="Aucun sondage ouvert"
              description="Posez votre première question — les réponses arrivent dans WhatsApp."
              className="border-0 bg-transparent py-4"
              action={
                <Button size="sm" onClick={() => navigate("/app/sondages?new=1")}>
                  Créer un sondage
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* 7. Canal WhatsApp */}
      {data?.tenant && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "mt-6 flex flex-wrap items-center gap-4 rounded-card p-5",
            data.tenant.channelConnected ? "bg-mist" : "border border-coral/30 bg-coral/[.08]",
          )}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-wa/15 text-wa">
            <MessageCircle size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold text-ink">Canal WhatsApp</p>
            <p className="text-[13px] text-ink-soft">
              {data.tenant.whatsappNumber} ·{" "}
              {data.tenant.channelConnected ? "Connecté · session saine" : "Déconnecté"}
            </p>
          </div>
          <Button asChild variant={data.tenant.channelConnected ? "ghost" : "danger-soft"} size="sm">
            <Link to="/app/parametres">
              {data.tenant.channelConnected ? "Gérer" : "Reconnecter"} <ChevronRight size={15} />
            </Link>
          </Button>
        </motion.div>
      )}
    </AppShell>
  )
}

export function DateBlock({ date, className }: { date: Date | string; className?: string }) {
  const parsed = typeof date === "string" ? new Date(date) : date
  const [day, month] = dayLabel(parsed).split(" ").slice(1)
  return (
    <span
      className={cn(
        "grid h-14 w-14 shrink-0 place-content-center rounded-[16px] bg-mist text-center",
        className,
      )}
    >
      <span className="tnum font-display text-[20px] font-bold leading-none text-pitch-dark">{day}</span>
      <span className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-faint">
        {month}
      </span>
    </span>
  )
}

