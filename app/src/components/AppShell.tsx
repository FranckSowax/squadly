import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  BarChart3,
  CreditCard,
  Home,
  Info,
  LogOut,
  MessageCircle,
  Plus,
  Send,
  Settings as SettingsIcon,
  Users,
  Vote,
  X,
} from "lucide-react"
import { Toaster } from "sonner"
import { Logo, LogoMark } from "@/components/squadly/Logo"
import { ChannelHealth } from "@/components/squadly/ChannelHealth"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar } from "@/components/squadly/Avatar"
import { useSimLoop, useTenant } from "@/hooks/useSquadly"
import { trpc } from "@/lib/trpc"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/app", label: "Tableau de bord", icon: Home },
  { to: "/app/equipes", label: "Équipes", icon: Users },
  { to: "/app/convocations", label: "Convocations", icon: Send },
  { to: "/app/sondages", label: "Sondages", icon: Vote },
  { to: "/app/messages", label: "Messages", icon: MessageCircle },
  { to: "/app/statistiques", label: "Statistiques", icon: BarChart3 },
]

const SECONDARY = [
  { to: "/app/abonnement", label: "Abonnement", icon: CreditCard },
  { to: "/app/parametres", label: "Paramètres", icon: SettingsIcon },
]

const MOBILE_TABS = [
  { to: "/app", label: "Accueil", icon: Home },
  { to: "/app/equipes", label: "Équipes", icon: Users },
  { to: "/app/messages", label: "Messages", icon: MessageCircle },
  { to: "/app/statistiques", label: "Stats", icon: BarChart3 },
]

export function AppShell({
  title,
  subtitle,
  actions,
  children,
  wide,
}: {
  title: string
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  wide?: boolean
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { data } = useTenant()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [demoDismissed, setDemoDismissed] = useState(
    () => localStorage.getItem("squadly.demoBanner") === "off",
  )

  useSimLoop()

  const tenant = data?.tenant
  const sub = data?.subscription
  const quotaPct = sub ? Math.min(100, Math.round((sub.messagesUsed / sub.messagesQuota) * 100)) : 0

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/"
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const isActive = (to: string) =>
    to === "/app" ? location.pathname === "/app" : location.pathname.startsWith(to)

  return (
    <div className="min-h-svh bg-paper">
      <Toaster position="bottom-right" richColors closeButton />

      {/* ---------- Sidebar desktop ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-line bg-white lg:flex">
        <div className="px-6 py-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(item.to)} />
          ))}
          <div className="my-3 h-px bg-line" />
          {SECONDARY.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(item.to)} />
          ))}
        </nav>

        {sub && (
          <div className="mx-3 mb-3 rounded-[18px] border border-line bg-mist/70 p-4">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              Plan {sub.plan === "premium" ? "Premium" : sub.plan === "club" ? "Club" : "Découverte"}
            </p>
            <p className="tnum mt-1.5 text-[13px] font-semibold text-ink">
              {sub.messagesUsed} / {sub.messagesQuota} messages
            </p>
            <Progress value={quotaPct} className="mt-2 h-1.5 bg-white" />
            <Button
              variant="sun"
              size="sm"
              className="mt-3 w-full"
              onClick={() => navigate("/app/abonnement")}
            >
              Gérer mon plan
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3 border-t border-line px-5 py-4">
          <Avatar firstName="Karim" lastName="Haddad" color="lime" size={38} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-bold text-ink">Karim H.</p>
            <p className="truncate text-[12px] text-ink-faint">Coach U13 · Owner</p>
          </div>
          <button
            onClick={() => logout.mutate()}
            title="Se déconnecter"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-faint transition-colors hover:bg-mist hover:text-coral"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ---------- Top bar mobile ---------- */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/">
          <LogoMark size={28} className="text-pitch" />
        </Link>
        <p className="flex-1 truncate font-display text-[17px] font-bold tracking-tight text-ink">
          {title}
        </p>
        {tenant && (
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              tenant.channelConnected ? "bg-pitch" : "bg-coral",
            )}
          />
        )}
        <Avatar firstName="Karim" lastName="Haddad" color="lime" size={30} />
      </header>

      {/* ---------- Contenu ---------- */}
      <main className={cn("pb-28 lg:ml-[264px] lg:pb-12")}>
        {tenant && !tenant.channelConnected && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-3 bg-coral/10 px-5 py-2.5 text-[13.5px] font-semibold text-coral"
          >
            WhatsApp déconnecté — les convocations sont en pause.
            <Link to="/app/parametres" className="underline underline-offset-2">
              Reconnecter
            </Link>
          </motion.div>
        )}

        <div
          className={cn(
            "mx-auto px-5 py-6 md:px-8 md:py-8",
            wide ? "max-w-[1320px]" : "max-w-[1080px]",
          )}
        >
          {tenant?.demoMode && !demoDismissed && (
            <div className="mb-5 flex items-center gap-2.5 rounded-full bg-mist px-4 py-2 text-[13px] text-pitch-dark">
              <Info size={15} className="shrink-0" />
              <span className="flex-1">Mode démo — les messages WhatsApp sont simulés.</span>
              <button
                onClick={() => {
                  localStorage.setItem("squadly.demoBanner", "off")
                  setDemoDismissed(true)
                }}
                className="rounded-full p-1 transition-colors hover:bg-white"
                aria-label="Masquer"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="mb-6 hidden flex-wrap items-start justify-between gap-4 lg:flex">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[32px] font-bold tracking-tight text-ink"
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="mt-1 text-[14px] text-ink-soft"
                >
                  {subtitle}
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {tenant && (
                <ChannelHealth
                  connected={tenant.channelConnected}
                  lastSeenAt={tenant.channelLastSeenAt}
                />
              )}
              {actions}
            </div>
          </div>

          {subtitle && <div className="mb-5 text-[14px] text-ink-soft lg:hidden">{subtitle}</div>}

          {children}

          <p className="mt-12 text-center text-[12.5px] text-ink-faint">
            Squadly pour {tenant?.name ?? "votre club"} ·{" "}
            {sub?.plan === "premium" ? "Plan Premium" : sub?.plan === "club" ? "Plan Club" : "Plan Découverte"} ·
            Mode démo — les messages sont simulés.
          </p>
        </div>
      </main>

      {/* ---------- Bottom tab bar mobile ---------- */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-end justify-around px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
          {MOBILE_TABS.slice(0, 2).map((t) => (
            <MobileTab key={t.to} {...t} active={isActive(t.to)} />
          ))}
          <button
            onClick={() => setSheetOpen(true)}
            className="-mt-6 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-pitch text-white shadow-pop transition-transform active:scale-95"
            aria-label="Créer"
          >
            <Plus size={26} strokeWidth={2.6} />
          </button>
          {MOBILE_TABS.slice(2).map((t) => (
            <MobileTab key={t.to} {...t} active={isActive(t.to)} />
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-50 bg-pine/40 backdrop-blur-[3px] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-panel bg-white p-5 pb-8 shadow-pop lg:hidden"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
              <div className="space-y-2">
                {[
                  { to: "/app/convocations?new=1", label: "Nouvelle convocation", icon: Send },
                  { to: "/app/sondages?new=1", label: "Nouveau sondage", icon: Vote },
                  { to: "/app/messages?compose=1", label: "Message rapide", icon: MessageCircle },
                ].map((a) => (
                  <button
                    key={a.to}
                    onClick={() => {
                      setSheetOpen(false)
                      navigate(a.to)
                    }}
                    className="flex w-full items-center gap-3 rounded-[16px] border border-line p-3.5 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-mist"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-pitch-dark">
                      <a.icon size={19} />
                    </span>
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string
  label: string
  icon: typeof Home
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex items-center gap-3 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors",
        active ? "text-pitch-dark" : "text-ink-soft hover:bg-mist/60 hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-mist"
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        />
      )}
      <Icon size={19} className="relative shrink-0" strokeWidth={active ? 2.5 : 2} />
      <span className="relative">{label}</span>
    </Link>
  )
}

function MobileTab({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string
  label: string
  icon: typeof Home
  active: boolean
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex w-16 flex-col items-center gap-1 py-1 text-[11px] font-semibold transition-colors",
        active ? "text-pitch-dark" : "text-ink-faint",
      )}
    >
      <Icon size={21} strokeWidth={active ? 2.6 : 2} />
      {label}
      <span
        className={cn("h-1 w-1 rounded-full transition-colors", active ? "bg-lime" : "bg-transparent")}
      />
    </Link>
  )
}
