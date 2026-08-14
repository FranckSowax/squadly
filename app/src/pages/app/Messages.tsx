import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Megaphone, PenLine, Send } from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TeamAvatar } from "@/components/squadly/Avatar"
import { EmptyState } from "@/components/squadly/EmptyState"
import { WhatsAppBubble } from "@/components/squadly/WhatsAppBubble"
import { ChannelHealth } from "@/components/squadly/ChannelHealth"
import { StatusTicks, STATUS_HINT, STATUS_LABEL, type MessageStatus } from "@/components/squadly/StatusTicks"
import { trpc } from "@/lib/trpc"
import { chatDay, timeLabel } from "@/lib/format"
import { cn, shortName } from "@/lib/utils"

type Row = {
  msg: {
    id: number
    content: string
    direction: "in" | "out"
    kind: string
    status: MessageStatus
    statusLog: Array<{ status: string; at: string }>
    buttons: string[]
    createdAt: Date
    teamId: number | null
  }
  memberName: string | null
  memberLastName: string | null
  memberColor: string | null
  teamName: string | null
}

export default function Messages() {
  const [params, setParams] = useSearchParams()
  const utils = trpc.useUtils()
  const teams = trpc.squadly.teams.list.useQuery()
  const tenant = trpc.squadly.tenant.get.useQuery()
  const [teamId, setTeamId] = useState<number | null>(null)
  const [detail, setDetail] = useState<Row | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = trpc.squadly.messages.list.useQuery({
    teamId: teamId ?? undefined,
    limit: 120,
  })

  const retry = trpc.squadly.messages.retry.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success("Message remis en file d'envoi")
    },
  })

  useEffect(() => {
    if (teams.data?.[0] && teamId === null) setTeamId(teams.data[0].team.id)
  }, [teams.data, teamId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.data?.length])

  const rows = (messages.data ?? []) as unknown as Row[]

  const groups = useMemo(() => {
    const out: Array<{ day: string; rows: Row[] }> = []
    for (const r of rows) {
      const day = chatDay(r.msg.createdAt)
      const last = out[out.length - 1]
      if (last && last.day === day) last.rows.push(r)
      else out.push({ day, rows: [r] })
    }
    return out
  }, [rows])

  const channelConnected = tenant.data?.tenant.channelConnected ?? true
  const currentTeam = teams.data?.find((t) => t.team.id === teamId)

  return (
    <AppShell
      title="Messages"
      subtitle="Tout ce qui sort, tout ce qui rentre — avec le statut de chaque message."
      wide
      actions={
        <Button variant="secondary" onClick={() => setParams({ compose: "1" })}>
          <PenLine size={16} /> Composer
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Sélecteur de conversation */}
        <div className="lg:space-y-2">
          <div className="hidden lg:block">
            <ChannelHealth
              connected={channelConnected}
              lastSeenAt={tenant.data?.tenant.channelLastSeenAt}
              className="w-full justify-center"
            />
          </div>

          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:px-0">
            {teams.data?.map((t) => (
              <button
                key={t.team.id}
                onClick={() => setTeamId(t.team.id)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors lg:w-full",
                  teamId === t.team.id ? "bg-mist" : "hover:bg-mist/50",
                )}
              >
                <TeamAvatar name={t.team.name} color={t.team.color} size={36} />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold text-ink">{t.team.name}</p>
                  <p className="hidden truncate text-[12px] text-ink-faint lg:block">
                    {t.players} membres
                  </p>
                </div>
              </button>
            ))}
            <button
              onClick={() => setTeamId(null)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors lg:w-full",
                teamId === null ? "bg-mist" : "hover:bg-mist/50",
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-[16px] bg-sun/20 text-sun-dark">
                <Megaphone size={17} />
              </span>
              <p className="text-[14px] font-bold text-ink">Tout le club</p>
            </button>
          </div>
        </div>

        {/* Fil */}
        <Card className="flex h-[70svh] min-h-[520px] flex-col overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3.5">
            <TeamAvatar
              name={currentTeam?.team.name ?? "Club"}
              color={currentTeam?.team.color}
              size={38}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[17px] font-bold tracking-tight text-ink">
                {currentTeam?.team.name ?? "Diffusions club"}
              </p>
              <p className="truncate text-[12.5px] text-ink-faint">
                {currentTeam ? `${currentTeam.players} membres · ` : ""}
                {tenant.data?.tenant.whatsappNumber}
              </p>
            </div>
            <ChannelHealth connected={channelConnected} className="hidden sm:inline-flex" />
          </div>

          {!channelConnected && (
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-b border-coral/30 bg-coral/10 px-5 py-2.5 text-[13px] font-semibold text-coral"
            >
              WhatsApp déconnecté — les messages sont mis en pause.
            </motion.div>
          )}

          <div className="bg-field-pattern flex-1 space-y-2.5 overflow-y-auto bg-sand p-4">
            {messages.isLoading && <CardSkeleton className="h-32 bg-white" />}

            {messages.data && rows.length === 0 && (
              <EmptyState
                image="/empty-chat.svg"
                title="Aucun message"
                description="Envoyez une convocation ou un message rapide — il apparaîtra ici."
                className="border-0 bg-white/70"
              />
            )}

            {groups.map((g) => (
              <div key={g.day} className="space-y-2.5">
                <div className="sticky top-0 z-10 flex justify-center py-1">
                  <span className="rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-ink-soft shadow-xs">
                    {g.day}
                  </span>
                </div>
                {g.rows.map((r, i) => (
                  <WhatsAppBubble
                    key={r.msg.id}
                    index={i}
                    direction={r.msg.direction}
                    kind={r.msg.kind}
                    content={r.msg.content}
                    status={r.msg.status}
                    buttons={r.msg.buttons}
                    createdAt={r.msg.createdAt}
                    senderName={
                      r.memberName ? shortName(r.memberName, r.memberLastName ?? "") : null
                    }
                    senderColor={r.memberColor}
                    onRetry={
                      r.msg.status === "failed" ? () => retry.mutate({ id: r.msg.id }) : undefined
                    }
                    onClick={r.msg.direction === "out" ? () => setDetail(r) : undefined}
                  />
                ))}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-line px-4 py-3">
            <Button
              variant="secondary"
              className="w-full justify-start text-ink-faint"
              onClick={() => setParams({ compose: "1" })}
              disabled={!channelConnected}
            >
              <PenLine size={16} /> Écris ton message…
            </Button>
          </div>
        </Card>
      </div>

      <MessageDetail row={detail} onClose={() => setDetail(null)} />
      <Composer
        open={params.get("compose") === "1"}
        onClose={() => setParams({})}
        teamId={teamId ?? teams.data?.[0]?.team.id ?? 0}
        teamName={currentTeam?.team.name ?? "l'équipe"}
        members={currentTeam?.players ?? 0}
      />
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */

function MessageDetail({ row, onClose }: { row: Row | null; onClose: () => void }) {
  return (
    <Dialog open={!!row} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Détail du message</DialogTitle>
        </DialogHeader>

        {row && (
          <>
            <div className="rounded-[18px] bg-sand p-3">
              <WhatsAppBubble
                direction="out"
                kind={row.msg.kind}
                content={row.msg.content}
                status={row.msg.status}
                createdAt={row.msg.createdAt}
                compact
              />
            </div>

            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                Machine à états
              </p>
              <ol className="relative space-y-4 pl-6">
                <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
                {row.msg.statusLog.map((entry, i) => {
                  const key = entry.status as NonNullable<MessageStatus>
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.25 }}
                      className="relative"
                    >
                      <span
                        className={cn(
                          "absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white",
                          key === "read"
                            ? "bg-read"
                            : key === "failed"
                              ? "bg-coral"
                              : key === "requeued"
                                ? "bg-sun"
                                : "bg-ink/25",
                        )}
                      />
                      <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
                        {STATUS_LABEL[key] ?? entry.status}
                        <StatusTicks status={key} />
                      </p>
                      <p className="text-[12.5px] text-ink-faint">
                        {timeLabel(entry.at)} — {STATUS_HINT[key] ?? ""}
                      </p>
                    </motion.li>
                  )
                })}
                {row.msg.statusLog.length === 0 && (
                  <p className="text-[13px] text-ink-faint">Aucun historique disponible.</p>
                )}
              </ol>
            </div>

            <div className="rounded-[14px] bg-mist p-4 text-[12.5px] text-pitch-dark">
              <p className="font-bold">Détails techniques</p>
              <p className="mt-1 font-mono text-[11.5px] leading-relaxed">
                message_id: {row.msg.id}
                <br />
                direction: outbound · type: {row.msg.kind}
                <br />
                provider: Whapi.Cloud (simulé)
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Composer({
  open,
  onClose,
  teamId,
  teamName,
  members,
}: {
  open: boolean
  onClose: () => void
  teamId: number
  teamName: string
  members: number
}) {
  const utils = trpc.useUtils()
  const [content, setContent] = useState("")

  useEffect(() => {
    if (!open) setContent("")
  }, [open])

  const send = trpc.squadly.messages.send.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success(`Message envoyé à ${members} membres`)
      onClose()
    },
  })

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Message rapide</DialogTitle>
        </DialogHeader>

        <Badge variant="default">{teamName} · {members} destinataires</Badge>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          placeholder="Entraînement avancé à 17 h 45 demain, l'accueil ouvre plus tôt."
          className="min-h-[120px]"
        />

        <div className="rounded-[18px] bg-sand p-3">
          <WhatsAppBubble
            direction="out"
            kind="annonce"
            content={content || "Votre message apparaîtra ici…"}
            status="pending"
            createdAt={new Date()}
            compact
          />
        </div>

        <Button
          variant="whatsapp"
          size="lg"
          disabled={!content.trim() || send.isPending || !teamId}
          onClick={() => send.mutate({ teamId, content: content.trim() })}
        >
          <Send size={18} /> Envoyer sur WhatsApp
        </Button>
      </DialogContent>
    </Dialog>
  )
}
