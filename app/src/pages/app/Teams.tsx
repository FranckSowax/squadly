import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  ArrowLeft,
  Check,
  Clock,
  MessageCircle,
  Plus,
  Search,
  Users,
} from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Segmented } from "@/components/ui/segmented"
import { Input, Label, Select } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, TeamAvatar } from "@/components/squadly/Avatar"
import { EmptyState } from "@/components/squadly/EmptyState"
import { WhatsAppBubble } from "@/components/squadly/WhatsAppBubble"
import { trpc } from "@/lib/trpc"
import { dayLabel, timeLabel } from "@/lib/format"
import { shortName } from "@/lib/utils"

type Filter = "all" | "player" | "parent"

export default function Teams() {
  const [openTeam, setOpenTeam] = useState<number | null>(null)
  const teams = trpc.squadly.teams.list.useQuery()

  const current = teams.data?.find((t) => t.team.id === openTeam)

  return (
    <AppShell
      title={current ? current.team.name : "Équipes"}
      subtitle={
        current
          ? `${current.players} joueurs · ${current.parents} parents liés`
          : "Vos équipes, leurs effectifs et leur statut WhatsApp."
      }
      actions={
        current ? (
          <Button variant="secondary" onClick={() => setOpenTeam(null)}>
            <ArrowLeft size={16} /> Toutes les équipes
          </Button>
        ) : (
          <Button onClick={() => toast.info("Création d'équipe — bientôt disponible en démo.")}>
            <Plus size={17} /> Nouvelle équipe
          </Button>
        )
      }
    >
      {teams.isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton className="h-56" />
          <CardSkeleton className="h-56" />
        </div>
      )}

      {!current && teams.data && (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.data.map((t, i) => (
            <motion.div
              key={t.team.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full rounded-[24px] p-6 transition-shadow hover:shadow-lift">
                <div className="flex items-center gap-3.5">
                  <TeamAvatar name={t.team.name} color={t.team.color} />
                  <div>
                    <p className="font-display text-[20px] font-bold tracking-tight text-ink">
                      {t.team.name}
                    </p>
                    <Badge variant="neutral" className="mt-1">
                      Coach : Karim H.
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-[16px] border border-line py-3 text-center">
                  {[
                    { v: t.players, l: "joueurs" },
                    { v: t.responseRate != null ? `${t.responseRate} %` : "—", l: "réponses" },
                    { v: t.parents, l: "parents" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="tnum font-display text-[20px] font-bold text-ink">{s.v}</p>
                      <p className="text-[11.5px] text-ink-faint">{s.l}</p>
                    </div>
                  ))}
                </div>

                {t.nextEvent ? (
                  <div className="mt-4 rounded-[14px] bg-mist px-4 py-3">
                    <p className="text-[13px] font-semibold text-pitch-dark">
                      {dayLabel(t.nextEvent.startsAt)} · {timeLabel(t.nextEvent.startsAt)}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-ink-soft">{t.nextEvent.title}</p>
                  </div>
                ) : (
                  <p className="mt-4 rounded-[14px] bg-mist/60 px-4 py-3 text-[13px] text-ink-faint">
                    Aucun événement à venir.
                  </p>
                )}

                <Button
                  variant="ghost"
                  className="mt-4 w-full"
                  onClick={() => setOpenTeam(t.team.id)}
                >
                  <Users size={16} /> Voir l'effectif
                </Button>
              </Card>
            </motion.div>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => toast.info("Création d'équipe — bientôt disponible en démo.")}
            className="group grid min-h-[200px] place-items-center rounded-[24px] border-2 border-dashed border-ink/15 text-center transition-colors hover:border-pitch"
          >
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mist text-pitch transition-transform duration-300 group-hover:rotate-90">
                <Plus size={22} />
              </span>
              <p className="mt-3 text-[14.5px] font-bold text-ink-soft">Créer une équipe</p>
            </div>
          </motion.button>
        </div>
      )}

      {current && <Roster teamId={current.team.id} teamName={current.team.name} teamColor={current.team.color} />}
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */

function Roster({
  teamId,
  teamName,
  teamColor,
}: {
  teamId: number
  teamName: string
  teamColor: string
}) {
  const utils = trpc.useUtils()
  const members = trpc.squadly.teams.members.useQuery({ teamId })
  const [filter, setFilter] = useState<Filter>("all")
  const [search, setSearch] = useState("")
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)

  const invite = trpc.squadly.teams.invite.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success("Invitation WhatsApp envoyée")
    },
  })

  const rows = (members.data ?? []).filter((m) => {
    if (filter !== "all" && m.role !== filter) return false
    if (!search) return true
    return `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
  })

  const all = members.data ?? []
  const optIn = all.filter((m) => m.whatsappOptIn).length
  const toInvite = all.filter((m) => !m.whatsappOptIn)

  if (members.isLoading) return <CardSkeleton className="h-96" />
  if (all.length === 0)
    return (
      <EmptyState
        image="/empty-teams.svg"
        title="Aucun membre pour l'instant"
        description="Ajoutez vos joueurs un par un, ou invitez-les par WhatsApp — ils rempliront leur fiche eux-mêmes."
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={17} /> Ajouter un membre
          </Button>
        }
      />
    )

  return (
    <>
      <Card className="mb-5 flex flex-wrap items-center gap-4 p-5">
        <TeamAvatar name={teamName} color={teamColor} size={52} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-ink">
            {optIn} membres joignables sur WhatsApp
          </p>
          <Progress value={(optIn / all.length) * 100} className="mt-2 max-w-sm" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="pitch">
            <Check size={13} /> {optIn} opt-in
          </Badge>
          {toInvite.length > 0 && (
            <Badge variant="coral" className="animate-pulse-soft">
              <Clock size={13} /> {toInvite.length} à inviter
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Ajouter
          </Button>
          <Button variant="whatsapp" size="sm" onClick={() => setInviteOpen(true)}>
            <MessageCircle size={16} /> Inviter
          </Button>
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Segmented
          value={filter}
          onChange={setFilter}
          items={[
            { value: "all", label: "Tous", count: all.length },
            { value: "player", label: "Joueurs", count: all.filter((m) => m.role === "player").length },
            { value: "parent", label: "Parents", count: all.filter((m) => m.role === "parent").length },
          ]}
        />
        <div className="relative min-w-[200px] flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un membre…"
            className="rounded-full pl-10"
          />
        </div>
      </div>

      <Card className="divide-y divide-line overflow-hidden">
        {rows.map((m, i) => {
          const linked = all.find((x) => x.id === m.linkedMemberId)
          return (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-mist/40"
            >
              <Avatar firstName={m.firstName} lastName={m.lastName} color={m.avatarColor} size={40} />
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-bold text-ink">
                  {m.firstName} {m.lastName}
                </p>
                <p className="text-[12.5px] text-ink-faint">
                  {m.role === "parent"
                    ? linked
                      ? `Parent de ${shortName(linked.firstName, linked.lastName)}`
                      : "Parent"
                    : m.position || "Joueur"}
                </p>
              </div>

              <Badge variant={m.role === "parent" ? "sun" : "default"}>
                {m.role === "parent" ? "Parent" : m.role === "coach" ? "Coach" : "Joueur"}
              </Badge>

              {m.whatsappOptIn ? (
                <Badge variant="pitch" title={m.phone}>
                  <Check size={13} /> Opt-in
                </Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="coral" className="animate-pulse-soft">
                    <Clock size={13} /> À inviter
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={invite.isPending}
                    onClick={() => invite.mutate({ memberId: m.id })}
                  >
                    Inviter
                  </Button>
                </div>
              )}

              <div className="w-24 shrink-0">
                <div className="mb-1 text-right text-[12.5px] font-bold text-pitch-dark tnum">
                  {m.reliability} %
                </div>
                <Progress value={m.reliability} className="h-1.5" animate={false} />
              </div>
            </motion.div>
          )
        })}
        {rows.length === 0 && (
          <p className="p-8 text-center text-[14px] text-ink-faint">Aucun membre ne correspond.</p>
        )}
      </Card>

      <InviteDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        candidates={toInvite}
        onSend={(ids) => {
          ids.forEach((id) => invite.mutate({ memberId: id }))
          setInviteOpen(false)
        }}
      />

      <AddMemberDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        teamId={teamId}
        players={all.filter((m) => m.role === "player")}
      />
    </>
  )
}

/* -------------------------------------------------------------------------- */

type Member = { id: number; firstName: string; lastName: string; avatarColor: string }

function InviteDialog({
  open,
  onOpenChange,
  candidates,
  onSend,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  candidates: Member[]
  onSend: (ids: number[]) => void
}) {
  const [selected, setSelected] = useState<number[]>([])

  const toggle = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const list = selected.length ? selected : candidates.map((c) => c.id)

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (v) setSelected(candidates.map((c) => c.id))
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Invitez vos joueurs en un message</DialogTitle>
          <DialogDescription>
            Squadly envoie un message WhatsApp avec un lien magique. Le joueur (ou son parent)
            confirme son accord en un tap.
          </DialogDescription>
        </DialogHeader>

        {candidates.length === 0 ? (
          <p className="rounded-[14px] bg-mist p-4 text-[14px] text-pitch-dark">
            Tout le monde est déjà joignable sur WhatsApp.
          </p>
        ) : (
          <div className="space-y-2">
            {candidates.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-line p-3"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={() => toggle(c.id)}
                  className="h-4.5 w-4.5 accent-pitch"
                />
                <Avatar firstName={c.firstName} lastName={c.lastName} color={c.avatarColor} size={32} />
                <span className="text-[14px] font-semibold text-ink">
                  {c.firstName} {c.lastName}
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="rounded-[18px] bg-sand p-3">
          <WhatsAppBubble
            direction="out"
            kind="annonce"
            content={
              "Salut ! Karim (AS Verrières U13) utilise Squadly pour les convocations. Reçois-les directement ici sur WhatsApp : squadly.app/j/…"
            }
            status="read"
            createdAt={new Date()}
            compact
          />
        </div>

        <Button
          variant="whatsapp"
          size="lg"
          disabled={list.length === 0}
          onClick={() => onSend(list)}
        >
          <MessageCircle size={18} /> Envoyer {list.length} invitation{list.length > 1 ? "s" : ""}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

function AddMemberDialog({
  open,
  onOpenChange,
  teamId,
  players,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  teamId: number
  players: Member[]
}) {
  const utils = trpc.useUtils()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "player" as "player" | "parent",
    position: "",
    phone: "",
    linkedMemberId: "",
    optIn: false,
  })

  const create = trpc.squadly.teams.createMember.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success(`${form.firstName} a rejoint l'effectif`)
      onOpenChange(false)
      setForm({
        firstName: "",
        lastName: "",
        role: "player",
        position: "",
        phone: "",
        linkedMemberId: "",
        optIn: false,
      })
    },
  })

  const valid = form.firstName.trim() && form.lastName.trim() && form.optIn

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau membre</DialogTitle>
          <DialogDescription>
            Il recevra ses convocations sur WhatsApp — avec son accord, bien sûr.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-[16px] bg-mist p-3">
          <Avatar
            firstName={form.firstName || "?"}
            lastName={form.lastName}
            color="lime"
            size={40}
          />
          <span className="text-[14.5px] font-semibold text-ink">
            {form.firstName || "Prénom"} {form.lastName}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Prénom</Label>
            <Input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="Yanis"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Nom</Label>
            <Input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Belkacem"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Rôle</Label>
          <Segmented
            value={form.role}
            onChange={(role) => setForm({ ...form, role })}
            items={[
              { value: "player", label: "Joueur" },
              { value: "parent", label: "Parent" },
            ]}
          />
        </div>

        {form.role === "player" ? (
          <div className="space-y-1.5">
            <Label>Poste</Label>
            <Select
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            >
              <option value="">—</option>
              {["Gardien", "Défenseur", "Milieu", "Attaquant"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label>Enfant lié</Label>
            <Select
              value={form.linkedMemberId}
              onChange={(e) => setForm({ ...form, linkedMemberId: e.target.value })}
            >
              <option value="">—</option>
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
          <Label>Téléphone WhatsApp</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={form.optIn}
            onChange={(e) => setForm({ ...form, optIn: e.target.checked })}
            className="mt-0.5 h-4 w-4 shrink-0 accent-pitch"
          />
          Le membre (ou son parent) accepte de recevoir les messages du club sur WhatsApp.
        </label>

        <Button
          size="lg"
          disabled={!valid || create.isPending}
          onClick={() =>
            create.mutate({
              teamId,
              firstName: form.firstName.trim(),
              lastName: form.lastName.trim(),
              role: form.role,
              position: form.position,
              phone: form.phone,
              linkedMemberId: form.linkedMemberId ? Number(form.linkedMemberId) : null,
            })
          }
        >
          Ajouter le membre
        </Button>
      </DialogContent>
    </Dialog>
  )
}
