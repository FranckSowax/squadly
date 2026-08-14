import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Crown, Download, Medal, TrendingDown, TrendingUp } from "lucide-react"
import { AppShell } from "@/components/AppShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/squadly/StatCard"
import { Avatar } from "@/components/squadly/Avatar"
import { trpc } from "@/lib/trpc"
import { duration } from "@/lib/format"
import { cn } from "@/lib/utils"

export default function Stats() {
  const stats = trpc.squadly.stats.overview.useQuery()
  const teams = trpc.squadly.teams.list.useQuery()
  const data = stats.data

  const exportCsv = () => {
    if (!data) return
    const rows = [
      ["Joueur", "Présences", "Convocations", "Taux (%)", "Fiabilité (%)"],
      ...data.attendance.map((a) => [a.name, a.present, a.total, a.rate, a.reliability]),
    ]
    const csv = rows.map((r) => r.join(";")).join("\n")
    // BOM pour qu'Excel ouvre l'UTF-8 correctement
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }))
    const a = document.createElement("a")
    a.href = url
    a.download = "squadly-statistiques.csv"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Export téléchargé")
  }

  if (stats.isLoading || !data)
    return (
      <AppShell title="Statistiques">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} className="h-32" />
          ))}
        </div>
      </AppShell>
    )

  const podium = data.leaderboard.slice(0, 3)
  const [first, second, third] = [podium[0], podium[1], podium[2]]

  return (
    <AppShell
      title="Statistiques"
      subtitle="Regardez comme votre équipe répond vite."
      wide
      actions={
        <Button variant="secondary" onClick={exportCsv}>
          <Download size={16} /> Exporter en CSV
        </Button>
      }
    >
      {/* 1. KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          index={0}
          label="Taux de réponse"
          value={data.responseRate}
          suffix=" %"
          delta={{ value: "+12 %", positive: true }}
          spark={data.trend.map((t) => t["U13 A"])}
        />
        <StatCard
          index={1}
          label="Convocations suivies"
          value={data.totalEvents}
          hint="sur la période"
        />
        <StatCard
          index={2}
          label="Délai médian"
          value={data.medianDelayMin ?? 0}
          suffix=" min"
          delta={{ value: "-18 min", positive: true }}
          hint="de mieux en mieux"
        />
        <StatCard
          index={3}
          label="Présences confirmées"
          value={data.attendance.reduce((s, a) => s + a.present, 0)}
          delta={{ value: "+5", positive: true }}
        />
      </div>

      {/* 2. Graphique vedette */}
      <Card className="mt-5 rounded-[24px] p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-[18px] font-bold tracking-tight text-ink">
            Vos équipes répondent de mieux en mieux
          </h3>
          <div className="flex flex-wrap gap-3 text-[12.5px] text-ink-soft">
            {[
              { l: "U13 A", c: "#16A34A" },
              { l: "U15", c: "#FFC53D" },
              { l: "Seniors B", c: "#8AA093" },
            ].map((s) => (
              <span key={s.l} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c }} />
                {s.l}
              </span>
            ))}
          </div>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="g-u13" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="g-u15" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFC53D" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FFC53D" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#E4E9E1" />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#8AA093", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#8AA093", fontSize: 12 }}
                domain={[40, 100]}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #E4E9E1",
                  boxShadow: "0 8px 24px -8px rgba(12,43,28,.15)",
                  fontSize: 13,
                }}
                formatter={(v: number) => [`${Math.round(v)} %`, ""]}
              />
              <Area
                type="monotone"
                dataKey="U13 A"
                stroke="#16A34A"
                strokeWidth={2.5}
                fill="url(#g-u13)"
              />
              <Area type="monotone" dataKey="U15" stroke="#FFC53D" strokeWidth={2} fill="url(#g-u15)" />
              <Area
                type="monotone"
                dataKey="Seniors B"
                stroke="#8AA093"
                strokeWidth={2}
                strokeDasharray="5 4"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 3. Deux colonnes */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="rounded-[24px] p-6">
          <h3 className="font-display text-[18px] font-bold tracking-tight text-ink">
            Qui vient le plus souvent ?
          </h3>
          <ul className="mt-5 space-y-3">
            {data.attendance.slice(0, 8).map((a, i) => (
              <motion.li
                key={a.name + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  "flex items-center gap-3 rounded-[14px] px-2 py-1.5 transition-colors hover:bg-mist",
                  i === 0 && "bg-sun/[.08]",
                )}
              >
                <Avatar
                  firstName={a.name.split(" ")[0]}
                  lastName={a.name.split(" ")[1] ?? ""}
                  color={a.color}
                  size={32}
                />
                <span className="w-24 shrink-0 truncate text-[13.5px] font-semibold text-ink">
                  {a.name}
                </span>
                {i === 0 && <Crown size={15} className="shrink-0 text-sun" />}
                <Progress value={a.rate} className="h-3.5 flex-1" delay={i * 0.07} />
                <span className="tnum w-11 shrink-0 text-right text-[13px] font-bold text-ink">
                  {a.rate} %
                </span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-[24px] p-6">
          <h3 className="font-display text-[18px] font-bold tracking-tight text-ink">
            À quelle vitesse répond votre équipe ?
          </h3>
          <div className="mt-5 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.speedBuckets} margin={{ top: 16, right: 5, left: -28, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E4E9E1" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#8AA093", fontSize: 11.5 }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#8AA093", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "#EDF6EF" }}
                  contentStyle={{ borderRadius: 14, border: "1px solid #E4E9E1", fontSize: 13 }}
                />
                <Bar dataKey="count" fill="#16A34A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Badge variant="lime" className="mt-4">
            Vos joueurs répondent 2× plus vite que la moyenne Squadly
          </Badge>
        </Card>
      </div>

      {/* 4. Podium */}
      {podium.length >= 3 && (
        <Card className="bg-pitch-field mt-5 rounded-[24px] border-0  p-7 text-paper">
          <h3 className="font-display text-[20px] font-bold tracking-tight">
            Le podium de la fiabilité
          </h3>
          <p className="mt-1 text-[14px] text-paper/70">
            Ces joueurs répondent toujours — dites-leur merci.
          </p>

          <div className="mt-8 flex items-end justify-center gap-3">
            {[
              { m: second, h: 80, place: 2, medal: "#C0C7CE" },
              { m: first, h: 110, place: 1, medal: "#FFC53D" },
              { m: third, h: 60, place: 3, medal: "#CD7F32" },
            ].map(({ m, h, place, medal }) => (
              <div key={place} className="flex w-24 flex-col items-center sm:w-32">
                <Medal size={22} style={{ color: medal }} />
                <Avatar
                  firstName={m.name.split(" ")[0]}
                  lastName={m.name.split(" ")[1] ?? ""}
                  color={m.color}
                  size={52}
                  className="my-2 ring-2 ring-white/30"
                />
                <p className="text-center text-[13px] font-bold">{m.name}</p>
                <p className="tnum text-[12.5px] text-paper/70">{m.reliability} %</p>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: place * 0.15 }}
                  style={{ height: h }}
                  className="mt-3 w-full origin-bottom rounded-t-[12px] bg-white/10"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 5. Comparatif par équipe */}
      <Card className="mt-5 overflow-hidden rounded-[24px]">
        <div className="border-b border-line p-6 pb-4">
          <h3 className="font-display text-[18px] font-bold tracking-tight text-ink">Par équipe</h3>
        </div>
        <div className="divide-y divide-line">
          {teams.data?.map((t, i) => (
            <motion.div
              key={t.team.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-wrap items-center gap-4 p-5"
            >
              <p className="w-28 shrink-0 text-[14.5px] font-bold text-ink">{t.team.name}</p>
              <div className="min-w-[120px] flex-1">
                <Progress value={t.responseRate ?? 0} delay={i * 0.07} />
              </div>
              <span className="tnum w-14 text-right text-[14px] font-bold text-ink">
                {t.responseRate ?? 0} %
              </span>
              <span className="tnum w-20 text-right text-[13px] text-ink-soft">
                {duration(data.medianDelayMin)}
              </span>
              <span
                className={cn(
                  "inline-flex w-20 items-center justify-end gap-1 text-[13px] font-bold",
                  i === 2 ? "text-coral" : "text-pitch-dark",
                )}
              >
                {i === 2 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                {i === 2 ? "-2 %" : `+${4 + i * 2} %`}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      <p className="mt-5 text-center text-[12.5px] text-ink-faint">
        Statistiques calculées sur les réponses WhatsApp. Mode démo : données simulées.
      </p>
    </AppShell>
  )
}
