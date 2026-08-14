import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Heart, Menu, X } from "lucide-react"
import { Logo } from "@/components/squadly/Logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#comment", label: "Comment ça marche" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
]

export default function Layout() {
  return (
    <div className="min-h-svh bg-paper">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-line bg-paper/90 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-5 py-4 md:px-8">
          <Link to="/" className="shrink-0">
            <Logo tone={scrolled ? "dark" : "light"} />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative text-[14.5px] font-semibold transition-colors",
                  scrolled ? "text-ink-soft hover:text-ink" : "text-paper/75 hover:text-paper",
                )}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href="/api/oauth/callback?redirect=/app"
              className={cn(
                "hidden rounded-full px-4 py-2 text-[14px] font-semibold transition-colors sm:block",
                scrolled ? "text-ink-soft hover:text-ink" : "text-paper/80 hover:text-paper",
              )}
            >
              Se connecter
            </a>
            <Button asChild size="md" className="group">
              <a href="/api/oauth/callback?redirect=/app">
                Essayer gratuitement
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <button
              onClick={() => setOpen(true)}
              className={cn("p-2 md:hidden", scrolled ? "text-ink" : "text-paper")}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-field-pattern fixed inset-0 z-[60] bg-pine px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo tone="light" />
              <button onClick={() => setOpen(false)} className="p-2 text-paper" aria-label="Fermer">
                <X size={24} />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i }}
                  className="font-display text-[32px] font-bold tracking-tight text-paper"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <Button asChild size="lg" className="mt-12 w-full">
              <a href="/api/oauth/callback?redirect=/app">Essayer gratuitement</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  const columns = [
    { title: "Produit", links: ["Fonctionnalités", "Tarifs", "Sécurité", "Feuille de route"] },
    { title: "Ressources", links: ["Guide du coach débordé", "Centre d'aide", "Blog", "Contact"] },
    { title: "Légal", links: ["Mentions légales", "Confidentialité", "CGU"] },
  ]

  return (
    <footer className="bg-field-pattern bg-pine text-paper">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-paper/70">
            Moins de temps sur WhatsApp, plus de temps sur le terrain.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-lime">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group relative text-[14.5px] text-paper/70 transition-colors hover:text-paper"
                  >
                    {link}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-6 text-[13px] text-paper/55 md:px-8">
        <p>© {new Date().getFullYear()} Squadly</p>
        <p className="inline-flex items-center gap-1.5">
          Fait avec <Heart size={13} className="fill-lime text-lime" /> pour les coachs bénévoles
        </p>
        <p>Français (FR)</p>
      </div>
    </footer>
  )
}
