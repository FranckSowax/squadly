import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import {
  Building2,
  Check,
  Copy,
  FlaskConical,
  LogOut,
  MessageCircle,
  Bell,
  User,
} from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Segmented } from "@/components/ui/segmented"
import { Input, Label, Select } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar } from "@/components/squadly/Avatar"
import { ChannelDot } from "@/components/squadly/ChannelHealth"
import { trpc } from "@/lib/trpc"
import { ago } from "@/lib/format"
import { cn } from "@/lib/utils"

type Tab = "org" | "channel" | "notifications" | "profile" | "demo"

export default function Settings() {
  const [tab, setTab] = useState<Tab>("org")

  return (
    <AppShell title="Paramètres" subtitle="Votre club, votre canal WhatsApp, votre démo.">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Segmented
            value={tab}
            onChange={setTab}
            className="w-full lg:hidden"
            items={[
              { value: "org", label: "Organisation" },
              { value: "channel", label: "Canal" },
              { value: "notifications", label: "Notifications" },
              { value: "profile", label: "Profil" },
              { value: "demo", label: "Démo" },
            ]}
          />
          <nav className="hidden space-y-1 lg:block">
            {(
              [
                { v: "org", label: "Organisation", Icon: Building2 },
                { v: "channel", label: "Canal WhatsApp", Icon: MessageCircle },
                { v: "notifications", label: "Notifications", Icon: Bell },
                { v: "profile", label: "Profil", Icon: User },
                { v: "demo", label: "Mode démo", Icon: FlaskConical },
              ] as const
            ).map((item) => (
              <button
                key={item.v}
                onClick={() => setTab(item.v)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[14px] font-semibold transition-colors",
                  tab === item.v ? "bg-mist text-pitch-dark" : "text-ink-soft hover:bg-mist/50",
                )}
              >
                <item.Icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-[760px] space-y-5"
        >
          {tab === "org" && <OrgTab />}
          {tab === "channel" && <ChannelTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "profile" && <ProfileTab />}
          {tab === "demo" && <DemoTab />}
        </motion.div>
      </div>
    </AppShell>
  )
}

/* -------------------------------------------------------------------------- */

function OrgTab() {
  const utils = trpc.useUtils()
  const tenant = trpc.squadly.tenant.get.useQuery()
  const [name, setName] = useState("")
  const [sport, setSport] = useState("Football")

  useEffect(() => {
    if (tenant.data?.tenant) {
      setName(tenant.data.tenant.name)
      setSport(tenant.data.tenant.sport)
    }
  }, [tenant.data])

  const rename = trpc.squadly.tenant.rename.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      toast.success("Paramètres enregistrés")
    },
  })

  const dirty = tenant.data?.tenant && name !== tenant.data.tenant.name

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-mist font-display text-[18px] font-bold text-pitch-dark">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="font-display text-[18px] font-bold tracking-tight text-ink">
              Votre organisation
            </p>
            <p className="text-[13px] text-ink-soft">Ces informations apparaissent dans WhatsApp.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Nom du club</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Sport principal</Label>
            <Select value={sport} onChange={(e) => setSport(e.target.value)}>
              {["Football", "Basket", "Handball", "Volley", "Rugby", "Autre"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>

        {dirty && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-5">
            <Button onClick={() => rename.mutate({ name })} disabled={rename.isPending}>
              Enregistrer
            </Button>
          </motion.div>
        )}
      </Card>

      <Card className="p-6">
        <p className="font-display text-[17px] font-bold tracking-tight text-ink">
          Membres de l'organisation
        </p>
        <ul className="mt-4 space-y-2">
          {[
            { n: "Karim Haddad", r: "Owner", v: "sun" as const, c: "lime" },
            { n: "Julie Perrot", r: "Admin", v: "default" as const, c: "mist" },
            { n: "Mehdi Kaci", r: "Coach", v: "default" as const, c: "sun" },
          ].map((m) => (
            <li key={m.n} className="flex items-center gap-3 rounded-[14px] border border-line p-3">
              <Avatar firstName={m.n.split(" ")[0]} lastName={m.n.split(" ")[1]} color={m.c} size={34} />
              <span className="flex-1 text-[14px] font-semibold text-ink">{m.n}</span>
              <Badge variant={m.v}>{m.r}</Badge>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => toast.success("Invitation envoyée par email")}
        >
          Inviter un coach
        </Button>
      </Card>
    </>
  )
}

/* -------------------------------------------------------------------------- */

function ChannelTab() {
  const utils = trpc.useUtils()
  const tenant = trpc.squadly.tenant.get.useQuery()
  const [copied, setCopied] = useState(false)

  const reconnect = trpc.squadly.tenant.reconnect.useMutation({
    onSuccess: () => {
      void utils.invalidate()
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ["#A3E635", "#16A34A"] })
      toast.success("Canal WhatsApp reconnecté")
    },
  })
  const setChannel = trpc.squadly.tenant.setChannel.useMutation({
    onSuccess: () => void utils.invalidate(),
  })

  const t = tenant.data?.tenant
  if (!t) return null

  return (
    <>
      <Card className={cn("p-6", !t.channelConnected && "border-coral/30 bg-coral/[.06]")}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-wa/12 text-wa">
            <MessageCircle size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[18px] font-bold tracking-tight text-ink">
              Canal WhatsApp
            </p>
            <p className="flex items-center gap-2 text-[13px] text-ink-soft">
              <ChannelDot connected={t.channelConnected} />
              {t.channelConnected ? "Connecté" : "Déconnecté"} · vérifié {ago(t.channelLastSeenAt)}
            </p>
          </div>
          <Badge variant={t.channelConnected ? "pitch" : "coral"}>
            {t.channelConnected ? "Session saine" : "Session interrompue"}
          </Badge>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              Numéro dédié
            </p>
            <p className="mt-1 flex items-center gap-2 font-display text-[18px] font-bold text-ink">
              {t.whatsappNumber}
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(t.whatsappNumber ?? "")
                  setCopied(true)
                  toast.success("Numéro copié")
                  window.setTimeout(() => setCopied(false), 1600)
                }}
                className="text-ink-faint transition-colors hover:text-pitch"
                aria-label="Copier"
              >
                {copied ? <Check size={16} className="text-pitch" /> : <Copy size={16} />}
              </button>
            </p>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              Fournisseur
            </p>
            <p className="mt-1 flex items-center gap-2 text-[14.5px] text-ink">
              Whapi.Cloud <Badge variant="default">Démo simulée</Badge>
            </p>
          </div>
          <div className="sm:col-span-2">
            <div className="mb-2 flex justify-between text-[13px]">
              <span className="text-ink-soft">Santé de session</span>
              <span className="tnum font-bold text-ink">98 % de messages remis</span>
            </div>
            <Progress value={98} />
            <p className="mt-1.5 text-[12.5px] text-ink-faint">0 incident ce mois-ci</p>
          </div>
        </div>

        {t.channelConnected ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant="ghost"
              onClick={() => toast.success("Message de test envoyé — visible dans Messages")}
            >
              Tester l'envoi
            </Button>
            <Button
              variant="danger-soft"
              onClick={() => setChannel.mutate({ connected: false })}
              disabled={setChannel.isPending}
            >
              Déconnecter la session
            </Button>
          </div>
        ) : (
          <Reconnect onReconnect={() => reconnect.mutate()} pending={reconnect.isPending} />
        )}
      </Card>

      <Card className="px-6 py-2">
        <Accordion type="single" collapsible>
          {[
            {
              q: "D'où viennent les messages ?",
              a: "Squadly utilise une session WhatsApp dédiée à votre club, via notre partenaire Whapi.Cloud. Les joueurs voient un numéro professionnel, jamais le vôtre.",
            },
            {
              q: "Et si la session tombe ?",
              a: "On vous alerte immédiatement (email + bannière), vos convocations se mettent en pause et repartent automatiquement à la reconnexion.",
            },
            {
              q: "C'est le WhatsApp officiel ?",
              a: "Nous passons par une API non officielle (Whapi.Cloud), très répandue chez les petites structures. Une bascule vers l'API Business officielle est possible à tout moment. Dans cette démo, aucun message réel n'est envoyé.",
            },
          ].map((f) => (
            <AccordionItem key={f.q} value={f.q} className="last:border-b-0">
              <AccordionTrigger className="text-[16px]">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </>
  )
}

function Reconnect({ onReconnect, pending }: { onReconnect: () => void; pending: boolean }) {
  const [left, setLeft] = useState(107)

  useEffect(() => {
    const id = window.setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 107)), 1000)
    return () => window.clearInterval(id)
  }, [])

  // Faux QR déterministe (modules pseudo-aléatoires fixes).
  const modules = useMemo(() => {
    const size = 21
    const cells: boolean[] = []
    let seed = 7
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 1103515245 + 12345) % 2147483648
      cells.push(seed % 100 > 52)
    }
    return { size, cells }
  }, [])

  return (
    <div className="mt-6 rounded-[20px] border border-line bg-white p-6">
      <p className="font-display text-[17px] font-bold tracking-tight text-ink">
        Reconnecter en 30 secondes
      </p>
      <ol className="mt-3 space-y-1.5 text-[13.5px] text-ink-soft">
        <li>1. Ouvrez WhatsApp sur le téléphone du club</li>
        <li>2. Appareils connectés</li>
        <li>3. Scannez ce code</li>
      </ol>

      <div className="relative mx-auto mt-5 w-[220px] overflow-hidden rounded-[20px] border border-line p-4">
        <svg viewBox={`0 0 ${modules.size} ${modules.size}`} className="h-[188px] w-[188px]">
          <rect width={modules.size} height={modules.size} fill="white" />
          {modules.cells.map((on, i) =>
            on ? (
              <rect
                key={i}
                x={i % modules.size}
                y={Math.floor(i / modules.size)}
                width={1}
                height={1}
                fill="#12211A"
              />
            ) : null,
          )}
          {[
            [0, 0],
            [14, 0],
            [0, 14],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect x={x} y={y} width={7} height={7} fill="white" />
              <rect x={x} y={y} width={7} height={7} fill="none" stroke="#12211A" strokeWidth={1} />
              <rect x={x + 2} y={y + 2} width={3} height={3} fill="#12211A" />
            </g>
          ))}
          <rect x={8} y={8} width={5} height={5} rx={1} fill="#16A34A" />
        </svg>

        <motion.span
          animate={{ y: [0, 180, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-4 top-4 h-0.5 rounded-full bg-pitch/70"
        />
      </div>

      <p className="tnum mt-3 text-center text-[13px] text-ink-faint">
        expire dans {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
      </p>

      <Button className="mt-4 w-full" onClick={onReconnect} disabled={pending}>
        Simuler la reconnexion
      </Button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    rsvp: true,
    reminders: true,
    channel: true,
    weekly: true,
    news: false,
  })

  const items = [
    { key: "rsvp" as const, label: "Réponse à une convocation", hint: "un récap discret, pas 18 notifications" },
    { key: "reminders" as const, label: "Rappel des sans-réponse", hint: "la veille à 18 h" },
    { key: "channel" as const, label: "Canal WhatsApp déconnecté", hint: "recommandé" },
    { key: "weekly" as const, label: "Résumé hebdo du dimanche", hint: "vos stats de la semaine" },
    { key: "news" as const, label: "Nouveautés produit", hint: "une fois par mois maximum" },
  ]

  return (
    <Card className="divide-y divide-line">
      {items.map((it) => (
        <div key={it.key} className="flex items-center gap-4 p-5">
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-bold text-ink">{it.label}</p>
            <p className="text-[12.5px] text-ink-faint">{it.hint}</p>
          </div>
          <Switch
            checked={prefs[it.key]}
            onCheckedChange={(v) => {
              setPrefs({ ...prefs, [it.key]: v })
              toast.success("Enregistré")
            }}
          />
        </div>
      ))}
    </Card>
  )
}

function ProfileTab() {
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/"
    },
  })

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Avatar firstName="Karim" lastName="Haddad" color="lime" size={56} />
        <div>
          <p className="font-display text-[19px] font-bold tracking-tight text-ink">Karim Haddad</p>
          <p className="text-[13px] text-ink-soft">karim@asverrieres.fr</p>
          <Badge variant="sun" className="mt-1.5">
            Owner — AS Verrières Football
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Nom</Label>
          <Input defaultValue="Karim Haddad" />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input defaultValue="karim@asverrieres.fr" />
        </div>
      </div>

      <Button variant="ghost" className="mt-6" onClick={() => logout.mutate()}>
        <LogOut size={16} /> Se déconnecter
      </Button>
    </Card>
  )
}

function DemoTab() {
  const utils = trpc.useUtils()
  const tenant = trpc.squadly.tenant.get.useQuery()
  const setDemo = trpc.squadly.tenant.setDemo.useMutation({
    onSuccess: () => void utils.invalidate(),
  })
  const setChannel = trpc.squadly.tenant.setChannel.useMutation({
    onSuccess: () => void utils.invalidate(),
  })

  const t = tenant.data?.tenant
  if (!t) return null

  return (
    <>
      <Card className="border-0 bg-mist p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-pitch">
            <FlaskConical size={20} />
          </span>
          <p className="font-display text-[19px] font-bold tracking-tight text-ink">
            Vous explorez une démo
          </p>
        </div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          Cette version de Squadly fonctionne avec des données fictives (le club {t.name}, ses
          équipes et ses membres) et un canal WhatsApp simulé : les messages progressent comme en
          vrai (envoyé → remis → lu) et des joueurs virtuels répondent pour rendre l'expérience
          vivante. Aucun message réel n'est envoyé.
        </p>
      </Card>

      <Card className="divide-y divide-line">
        <div className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <p className="text-[14.5px] font-bold text-ink">Simuler des réponses entrantes</p>
            <p className="text-[12.5px] text-ink-faint">
              Pilote toutes les boucles temps réel de l'app
            </p>
          </div>
          <Switch
            checked={t.demoMode}
            onCheckedChange={(v) => setDemo.mutate({ demoMode: v })}
          />
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <p className="text-[14.5px] font-bold text-ink">Simuler une déconnexion du canal</p>
            <p className="text-[12.5px] text-ink-faint">
              Affiche la bannière globale et met les messages en pause
            </p>
          </div>
          <Switch
            checked={!t.channelConnected}
            onCheckedChange={(v) => setChannel.mutate({ connected: !v })}
          />
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="flex-1">
            <p className="text-[14.5px] font-bold text-ink">Vitesse de simulation</p>
            <p className="text-[12.5px] text-ink-faint">Temps réel ou accéléré</p>
          </div>
          <Select
            value={t.simSpeed}
            onChange={(e) => setDemo.mutate({ simSpeed: Number(e.target.value) })}
            className="w-40"
          >
            <option value={0}>En pause</option>
            <option value={1}>Temps réel</option>
            <option value={2}>Accéléré ×2</option>
            <option value={3}>Accéléré ×3</option>
          </Select>
        </div>
      </Card>
    </>
  )
}
