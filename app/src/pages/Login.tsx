import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/squadly/Logo"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="bg-field-pattern grid min-h-svh place-items-center bg-pine px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] rounded-panel bg-white p-8 shadow-pop"
      >
        <div className="flex justify-center">
          <Logo size={36} />
        </div>

        <h1 className="mt-7 text-center font-display text-[26px] font-bold tracking-tight text-ink">
          Connexion coach
        </h1>
        <p className="mt-2 text-center text-[14.5px] leading-relaxed text-ink-soft">
          Un lien magique, pas de mot de passe. Vous retrouvez votre club, vos équipes et vos
          convocations.
        </p>

        <Button asChild size="lg" className="mt-7 w-full group">
          <a href="/api/oauth/callback?redirect=/app">
            Entrer dans la démo
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Button>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-ink-faint">
          <ShieldCheck size={14} />
          Démo — vous êtes connecté en tant que Karim Haddad, coach U13.
        </p>
      </motion.div>
    </div>
  )
}
