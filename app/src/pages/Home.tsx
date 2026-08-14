import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  CheckCheck,
  Hand,
  MapPin,
  Play,
  Send,
  Smartphone,
  Star,
  Sun,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PhoneMockup } from "@/components/squadly/PhoneMockup"
import { WhatsAppBubble } from "@/components/squadly/WhatsAppBubble"
import { Progress } from "@/components/ui/progress"
import { CountUpValue } from "@/hooks/useCountUp"
import { PLANS } from "@contracts/plans"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
const LOGIN = "/api/oauth/callback?redirect=/app"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Features />
      <Editorial />
      <Testimonials />
      <PricingTeaser />
      <Faq />
      <FinalCta />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. Hero                                                                     */
/* -------------------------------------------------------------------------- */

function Hero() {
  const words = "La convocation envoyée en".split(" ")

  return (
    <section className="bg-field-pattern relative overflow-hidden rounded-b-[32px] bg-pine pb-24 pt-32 md:pb-32 md:pt-40">
      <div
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full opacity-[.09] blur-[80px]"
        style={{ background: "radial-gradient(circle, #A3E635 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[55fr_45fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-pine-800 px-3.5 py-1.5 text-[12.5px] font-semibold text-lime"
          >
            <Zap size={14} className="fill-lime" />
            Nouveau — relances automatiques J-1
          </motion.span>

          <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-paper md:text-[68px] md:leading-[1.02]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.08 }}
                className="mr-[0.25em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 + words.length * 0.08 }}
                className="inline-block text-lime"
              >
                30 secondes
              </motion.span>
              <svg
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 h-3 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M4 8 C 70 2, 150 11, 296 4"
                  stroke="#A3E635"
                  strokeWidth={6}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />
              </svg>
            </span>
            <span className="text-paper">.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 max-w-xl text-[17px] leading-[1.65] text-paper/80 md:text-[18px]"
          >
            Squadly envoie vos convocations, sondages et rappels directement dans WhatsApp. Vos
            joueurs répondent en un tap — vous, vous regardez les réponses remonter tout seuls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="group">
              <a href={LOGIN}>
                Essayer gratuitement
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="ghost-light" size="lg">
              <a href="#comment">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-lime/20">
                  <Play size={13} className="fill-lime text-lime" />
                </span>
                Voir la démo
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-5 text-[13px] text-paper/55"
          >
            Gratuit pour 1 équipe · Sans carte bancaire · 2 min pour démarrer
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7">
            {[
              { v: "86 %", l: "de réponses sous 24 h" },
              { v: "30 s", l: "par convocation" },
              { v: "0", l: "appli à installer" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <p className="tnum font-display text-[28px] font-extrabold leading-none text-lime">
                  {s.v}
                </p>
                <p className="mt-1 text-[12.5px] text-paper/55">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
          className="relative mx-auto w-fit"
        >
          <div className="animate-floaty">
            <LiveConversation />
          </div>

          {[
            { label: "12 présents", top: "6%", left: "-16%", delay: 1.2, Icon: Check },
            { label: "Relance auto J-1", top: "44%", left: "-24%", delay: 1.35, Icon: BellRing },
            { label: "Réponse moy. 42 min", top: "78%", left: "-10%", delay: 1.5, Icon: Sun },
          ].map((chip) => (
            <motion.div
              key={chip.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 17, delay: chip.delay }}
              style={{ top: chip.top, left: chip.left }}
              className="absolute hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12.5px] font-semibold text-paper backdrop-blur-md xl:flex"
            >
              <chip.Icon size={13} className="text-lime" />
              {chip.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Conversation WhatsApp jouée en boucle dans le téléphone du hero. */
function LiveConversation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % 6), 2000)
    return () => window.clearInterval(id)
  }, [])

  const statuses = ["pending", "sent", "delivered", "read", "read", "read"] as const
  const replies = [
    { name: "Yanis", text: "Présent", color: "lime" },
    { name: "Samira (maman de Noé)", text: "Présent", color: "sun" },
    { name: "Enzo", text: "Peut-être, je confirme vendredi", color: "coral" },
  ]

  return (
    <PhoneMockup subtitle={`${Math.min(step, 3)} réponses`}>
      <WhatsAppBubble
        direction="out"
        kind="convocation"
        content={
          "Convocation — Match U13 A vs FC Montreuil\nSam. 14 juin · 14 h 30\nStade Jean-Bouin, Verrières\nTu viens ?"
        }
        buttons={["Présent", "Absent", "Peut-être"]}
        status={statuses[step]}
        createdAt={new Date()}
        compact
      />
      {replies.slice(0, Math.max(0, step - 2)).map((r) => (
        <WhatsAppBubble
          key={r.name}
          direction="in"
          content={r.text}
          senderName={r.name}
          senderColor={r.color}
          createdAt={new Date()}
          compact
        />
      ))}
    </PhoneMockup>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. Bandeau de confiance                                                     */
/* -------------------------------------------------------------------------- */

function TrustBar() {
  const clubs = [
    "AS Verrières Football",
    "FC Montreuil",
    "US Choisy Basket",
    "RC Villebon Handball",
    "Volley Club Orsay",
  ]
  return (
    <section className="bg-paper py-12">
      <p className="text-center text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
        Ils coachent avec Squadly
      </p>
      <div className="pause-on-hover mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max gap-12">
          {[...clubs, ...clubs].map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-[18px] font-semibold text-ink/40 transition-colors hover:text-ink/70"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 4. Comment ça marche — section épinglée scroll-driven                        */
/* -------------------------------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    title: "Vous créez la convocation",
    text: "Match, date, lieu. Trois champs, et c'est prêt.",
  },
  {
    n: "02",
    title: "Squadly l'envoie sur WhatsApp",
    text: "Chaque joueur la reçoit dans sa conversation habituelle.",
  },
  {
    n: "03",
    title: "Les joueurs répondent en un tap",
    text: "Présent, Absent ou Peut-être. Rien à installer.",
  },
  {
    n: "04",
    title: "Les stats se remplissent toutes seules",
    text: "Vous voyez qui vient, qui manque, qui répond vite.",
  },
]

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [active, setActive] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      setActive(Math.min(3, Math.floor(p * 4)))
    })
  }, [scrollYProgress])

  return (
    <section id="comment" className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-5 pt-24 text-center md:px-8 md:pt-32">
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-pitch">
            Comment ça marche
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[52px] md:leading-[1.05]">
            Du tableau de bord à WhatsApp, <span className="text-pitch">sans quitter votre poche.</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Faites défiler — on vous montre le voyage d'une convocation.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mx-auto max-w-[1200px] px-5 md:px-8" style={{ height: "250vh" }}>
        <div className="sticky top-0 flex min-h-svh items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <ol className="order-2 space-y-5 lg:order-1">
              {STEPS.map((s, i) => (
                <li key={s.n} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "font-display text-[15px] font-extrabold transition-colors duration-300",
                        i === active ? "text-lime" : "text-ink/25",
                      )}
                    >
                      {s.n}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="mt-2 w-px flex-1 bg-line" style={{ minHeight: 28 }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p
                      className={cn(
                        "font-display text-[19px] font-bold tracking-tight transition-colors duration-300 md:text-[21px]",
                        i === active ? "text-ink" : "text-ink/30",
                      )}
                    >
                      {s.title}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[14.5px] transition-colors duration-300",
                        i === active ? "text-ink-soft" : "text-ink/25",
                      )}
                    >
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="order-1 lg:order-2">
              <StageScreen active={active} progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-mist px-5 py-20 text-center md:py-24">
        <Reveal>
          <p className="mx-auto max-w-2xl text-balance font-display text-[30px] font-bold leading-tight tracking-tight text-ink md:text-[42px]">
            Résultat :{" "}
            <span className="tnum text-pitch">
              <CountUpValue value={2.5} decimals={1} /> h
            </span>{" "}
            gagnées chaque semaine.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-ink-soft">
            C'est le temps moyen que nos coachs passaient à relancer dans leurs groupes WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function StageScreen({ active, progress }: { active: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [0.98, 1])

  return (
    <motion.div
      style={{ scale }}
      className="relative min-h-[400px] overflow-hidden rounded-panel border border-line bg-white p-6 shadow-lift md:min-h-[440px]"
    >
      <div className="absolute left-6 top-6 flex gap-1.5">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-pitch" : "w-2 bg-line",
            )}
          />
        ))}
      </div>

      <div className="mt-10">
        {active === 0 && <StageForm />}
        {active === 1 && <StageSending />}
        {active === 2 && <StageReplies />}
        {active === 3 && <StageStats />}
      </div>
    </motion.div>
  )
}

function StageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function StageForm() {
  return (
    <StageWrap>
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
        Nouvelle convocation
      </p>
      <div className="mt-4 space-y-3">
        {[
          { label: "Type", value: "Match" },
          { label: "Titre", value: "U13 A vs FC Montreuil" },
          { label: "Date", value: "Samedi 14 juin · 14 h 30" },
          { label: "Lieu", value: "Stade Jean-Bouin, Verrières" },
        ].map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-[14px] border border-line px-4 py-3"
          >
            <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              {f.label}
            </p>
            <p className="mt-0.5 text-[15px] font-semibold text-ink">{f.value}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ scale: [1, 0.97, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
        className="mt-5"
      >
        <Button variant="whatsapp" size="lg" className="w-full">
          <Send size={17} /> Envoyer sur WhatsApp — 16 joueurs
        </Button>
      </motion.div>
    </StageWrap>
  )
}

function StageSending() {
  return (
    <StageWrap>
      <div className="mx-auto max-w-[290px]">
        <PhoneMockup subtitle="envoi en cours">
          <WhatsAppBubble
            direction="out"
            kind="convocation"
            content={"Convocation — Match U13 A vs FC Montreuil\nSam. 14 juin · 14 h 30"}
            buttons={["Présent", "Absent", "Peut-être"]}
            status="delivered"
            createdAt={new Date()}
            compact
          />
        </PhoneMockup>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-[13.5px] text-ink-soft">
        <CheckCheck size={16} className="text-ink-faint" /> 18 messages remis en 4 secondes
      </p>
    </StageWrap>
  )
}

function StageReplies() {
  return (
    <StageWrap>
      <div className="mx-auto max-w-[290px]">
        <PhoneMockup subtitle="3 réponses">
          {[
            { n: "Yanis", t: "Présent", c: "lime" },
            { n: "Samira (maman)", t: "Présent", c: "sun" },
            { n: "Enzo", t: "Peut-être", c: "coral" },
          ].map((r, i) => (
            <WhatsAppBubble
              key={r.n}
              direction="in"
              content={r.t}
              senderName={r.n}
              senderColor={r.c}
              createdAt={new Date()}
              index={i}
              compact
            />
          ))}
        </PhoneMockup>
      </div>
    </StageWrap>
  )
}

function StageStats() {
  return (
    <StageWrap>
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-ink-faint">
        Match U13 A vs FC Montreuil
      </p>
      <p className="tnum mt-3 font-display text-[44px] font-extrabold leading-none text-ink">
        <CountUpValue value={12} />
        <span className="text-ink-faint">/18</span>
      </p>
      <p className="mt-1 text-[13.5px] text-ink-soft">confirmés — mis à jour en direct</p>

      <div className="mt-6 space-y-4">
        {[
          { label: "Présents", value: 67, color: "bg-pitch" },
          { label: "Peut-être", value: 11, color: "bg-sun" },
          { label: "Absents", value: 6, color: "bg-coral" },
          { label: "Sans réponse", value: 16, color: "bg-ink/15" },
        ].map((b, i) => (
          <div key={b.label}>
            <div className="mb-1.5 flex justify-between text-[13px] font-semibold text-ink-soft">
              <span>{b.label}</span>
              <span className="tnum">{b.value} %</span>
            </div>
            <Progress value={b.value} barClassName={b.color} delay={i * 0.1} />
          </div>
        ))}
      </div>

      <Badge variant="sun" className="mt-5">
        <BellRing size={13} /> Relance auto envoyée aux 3 sans-réponse
      </Badge>
    </StageWrap>
  )
}

/* -------------------------------------------------------------------------- */
/* 5. Fonctionnalités — bento                                                  */
/* -------------------------------------------------------------------------- */

function Features() {
  return (
    <section id="fonctionnalites" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-pitch">
            Fonctionnalités
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[50px]">
            Tout ce qu'il faut. <span className="text-pitch">Rien de trop.</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Squadly fait 5 choses, et il les fait très bien.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <FeatureCard
            className="lg:col-span-7"
            index={0}
            icon={Send}
            title="Convocations en un tap"
            text="Envoyez à toute l'équipe en 30 secondes. Les joueurs répondent Présent, Absent ou Peut-être directement dans WhatsApp."
          >
            <div className="mt-5 rounded-[18px] bg-sand p-3">
              <WhatsAppBubble
                direction="out"
                kind="convocation"
                content={"Convocation — Match U13 A vs FC Montreuil\nSam. 14 juin · 14 h 30"}
                buttons={["Présent", "Absent", "Peut-être"]}
                status="read"
                createdAt={new Date()}
                compact
              />
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-5"
            index={1}
            icon={BellRing}
            title="Relances automatiques"
            text="Squadly relance gentiment les sans-réponse. Vous, vous n'y pensez plus."
          >
            <div className="mt-6 flex items-center justify-between">
              {["J-7", "J-1", "Match"].map((d, i) => (
                <div key={d} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className={cn("h-3 w-3 rounded-full", i === 2 ? "bg-pitch" : "bg-sun")}
                    />
                    <span className="text-[12px] font-bold text-ink-soft">{d}</span>
                  </div>
                  {i < 2 && <span className="mx-2 h-px flex-1 bg-line" />}
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-4"
            index={2}
            icon={BarChart3}
            title="Sondages"
            text="Covoiturage, dates, goûter… décidez ensemble, sans 47 messages."
          >
            <div className="mt-5 space-y-2.5">
              {[
                { l: "Je conduis", v: 33 },
                { l: "Je cherche une place", v: 28 },
                { l: "Pas besoin", v: 39 },
              ].map((o, i) => (
                <div key={o.l}>
                  <p className="mb-1 text-[12.5px] font-semibold text-ink-soft">{o.l}</p>
                  <Progress value={o.v} delay={i * 0.12} />
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-4"
            index={3}
            icon={Sun}
            title="Statistiques"
            text="Qui répond vite ? Qui manque souvent ? Vous le savez enfin."
          >
            <p className="tnum mt-5 font-display text-[40px] font-extrabold leading-none text-pitch">
              <CountUpValue value={86} /> %
            </p>
            <p className="mt-1 text-[12.5px] text-ink-faint">taux de réponse moyen</p>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-4"
            index={4}
            icon={Smartphone}
            title="Zéro installation"
            text="Vos joueurs et les parents restent sur WhatsApp. Rien à installer, rien à expliquer."
          >
            <ul className="mt-5 space-y-2">
              {["Pas de compte à créer", "Pas de mot de passe", "Pas de mise à jour"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <Check size={15} className="text-pitch" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  children,
  className,
  index,
}: {
  icon: typeof Send
  title: string
  text: string
  children?: React.ReactNode
  className?: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group rounded-[24px] border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-mist text-pitch-dark transition-transform duration-300 group-hover:-rotate-6">
        <Icon size={21} />
      </span>
      <h3 className="mt-4 font-display text-[21px] font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{text}</p>
      {children}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/* 6. Éditorial                                                                */
/* -------------------------------------------------------------------------- */

function Editorial() {
  return (
    <section className="bg-field-pattern bg-pine px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12%)", rotate: -4 }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", rotate: -2 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="overflow-hidden rounded-panel"
        >
          <img
            src="/hero-illustration.png"
            alt="Un coach au bord du terrain, téléphone à la main"
            className="w-full"
          />
        </motion.div>

        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-lime">Mobile-first</p>
          <h2 className="mt-4 text-balance font-display text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-paper md:text-[46px]">
            Conçu pour être utilisé <span className="text-lime">une main dans le dos</span>, l'autre
            sur le sifflet.
          </h2>
          <ul className="mt-8 space-y-5">
            {[
              { t: "Actions au pouce", d: "Tout est accessible d'une seule main." },
              { t: "Lisible en plein soleil", d: "Des contrastes pensés pour le bord du terrain." },
              { t: "Rapide même en 3G", d: "Léger, sans fioritures qui chargent." },
            ].map((p, i) => (
              <motion.li
                key={p.t}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex gap-3.5"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
                  <Check size={16} strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[16px] font-bold text-paper">{p.t}</p>
                  <p className="mt-0.5 text-[14.5px] text-paper/65">{p.d}</p>
                </div>
              </motion.li>
            ))}
          </ul>
          <Button asChild variant="ghost-light" size="lg" className="mt-9 group">
            <a href={LOGIN}>
              Essayer sur mon téléphone
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 7. Témoignages                                                              */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    avatar: "/avatar-sophie.jpg",
    quote:
      "Avant, je passais mes jeudis soirs à relancer les parents un par un. Maintenant j'envoie, et je regarde les réponses arriver pendant l'apéro.",
    name: "Sophie Marchand",
    role: "Coach U11, FC Montreuil",
  },
  {
    avatar: "/avatar-mehdi.jpg",
    quote:
      "Le truc génial : les parents n'ont rien à installer. Ils répondent sur WhatsApp, moi j'ai mes tableaux. Tout le monde y gagne.",
    name: "Mehdi Kaci",
    role: "Coach U15, AS Verrières",
  },
  {
    avatar: "/avatar-claire.jpg",
    quote:
      "On l'utilise pour le basket, le sondage covoiturage a changé nos déplacements. Simple, rapide, fini.",
    name: "Claire Dubois",
    role: "Coach basket, BC Orsay",
  },
]

function Testimonials() {
  return (
    <section className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl text-balance font-display text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[48px]">
            Des coachs qui ont <span className="text-pitch">raccroché leur sifflet de relance.</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative w-[85vw] shrink-0 snap-center overflow-hidden rounded-[24px] border border-line bg-white p-7 shadow-card md:w-auto"
            >
              <span className="pointer-events-none absolute -right-2 -top-8 font-display text-[120px] font-extrabold leading-none text-lime/20">
                “
              </span>
              <div className="relative flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-sun text-sun" />
                ))}
              </div>
              <blockquote className="relative mt-4 text-[15.5px] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-[14.5px] font-bold text-ink">{t.name}</p>
                  <p className="text-[13px] text-ink-faint">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 8. Tarifs (teaser)                                                          */
/* -------------------------------------------------------------------------- */

function PricingTeaser() {
  const highlights = useMemo(
    () => ({
      freemium: ["1 équipe · 25 joueurs", "100 messages / mois", "Convocations & réponses"],
      premium: ["Équipes illimitées", "Relances auto J-7 & J-1", "Sondages & statistiques"],
      club: ["Vue consolidée du club", "Rôles délégués", "Numéro WhatsApp dédié"],
    }),
    [],
  )

  return (
    <section id="tarifs" className="bg-mist px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-pitch">Tarifs</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[50px]">
            Gratuit pour démarrer. <span className="text-pitch">Abordable pour grandir.</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Sans engagement. Sans carte pour l'essai. Sans surprise.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-5 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const featured = plan.id === "premium"
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: featured ? "spring" : "tween",
                  stiffness: 320,
                  damping: 20,
                  duration: 0.6,
                  delay: i * 0.12,
                }}
                className={cn(
                  "relative rounded-panel p-7",
                  featured
                    ? "bg-gradient-pitch text-paper shadow-glow-lime md:scale-[1.04]"
                    : "border border-line bg-white text-ink shadow-card",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sun px-3 py-1 text-[12px] font-bold text-pine">
                    Le plus choisi
                  </span>
                )}
                <p className={cn("text-[15px] font-bold", featured ? "text-paper" : "text-ink")}>
                  {plan.name}
                </p>
                <p className={cn("mt-1 text-[13.5px]", featured ? "text-paper/70" : "text-ink-soft")}>
                  {plan.tagline}
                </p>
                <p className="tnum mt-5 font-display text-[44px] font-extrabold leading-none">
                  {plan.monthlyPrice} €
                  <span className={cn("text-[15px] font-semibold", featured ? "text-paper/60" : "text-ink-faint")}>
                    {plan.monthlyPrice === 0 ? " pour toujours" : " /mois"}
                  </span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {highlights[plan.id].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px]">
                      <Check
                        size={16}
                        strokeWidth={3}
                        className={cn("mt-0.5 shrink-0", featured ? "text-lime" : "text-pitch")}
                      />
                      <span className={featured ? "text-paper/85" : "text-ink-soft"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={featured ? "sun" : "secondary"}
                  size="lg"
                  className="mt-7 w-full"
                >
                  <a href={LOGIN}>{plan.cta}</a>
                </Button>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-10 text-center">
          <a
            href={LOGIN}
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-pitch hover:underline"
          >
            Voir le détail des plans <ArrowRight size={16} />
          </a>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 9. FAQ                                                                      */
/* -------------------------------------------------------------------------- */

const FAQ = [
  {
    q: "Mes joueurs doivent installer quelque chose ?",
    a: "Non. Ils reçoivent et répondent directement dans WhatsApp, comme d'habitude. C'est toute la magie de Squadly.",
  },
  {
    q: "C'est le vrai WhatsApp ?",
    a: "Oui, via notre partenaire d'intégration. Dans cette démo, les messages sont simulés pour que vous puissiez tout essayer sans connecter votre numéro.",
  },
  {
    q: "Et les parents des jeunes joueurs ?",
    a: "Un parent peut être lié à son enfant et répondre à sa place. La réponse est tracée : vous savez qui a répondu.",
  },
  {
    q: "Que se passe-t-il si WhatsApp se déconnecte ?",
    a: "Squadly vous alerte immédiatement et garde vos données en sécurité. La reconnexion prend 30 secondes via un QR code.",
  },
  {
    q: "Puis-je gérer plusieurs équipes ?",
    a: "Oui, avec les plans Premium (équipes illimitées) et Club (vue consolidée multi-équipes, délégation aux coachs).",
  },
  {
    q: "C'est vraiment gratuit ?",
    a: "Le plan Découverte l'est, pour toujours : 1 équipe, 100 messages/mois. Parfait pour tester en conditions réelles.",
  },
]

function Faq() {
  return (
    <section id="faq" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[720px]">
        <Reveal className="text-center">
          <h2 className="text-balance font-display text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-ink md:text-[44px]">
            Les questions qu'on nous pose <span className="text-pitch">au bord du terrain.</span>
          </h2>
        </Reveal>
        <Accordion type="single" collapsible className="mt-10">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 10. CTA final                                                               */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="bg-paper px-5 pb-24 md:px-8 md:pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="bg-pitch-field mx-auto grid max-w-[1200px] items-center gap-8 overflow-hidden rounded-[32px]  px-8 py-14 md:grid-cols-[1.2fr_1fr] md:px-14 md:py-16"
      >
        <div>
          <h2 className="text-balance font-display text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-paper md:text-[44px]">
            Votre prochaine convocation part dans <span className="text-lime">30 secondes.</span>
          </h2>
          <p className="mt-4 max-w-md text-[16px] text-paper/80">
            Créez votre équipe, envoyez, respirez.
          </p>
          <Button asChild variant="sun" size="lg" className="mt-8 group">
            <a href={LOGIN}>
              Essayer Squadly gratuitement
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <p className="mt-4 text-[13px] text-paper/60">Gratuit · Sans CB · 2 min</p>
        </div>
        <motion.img
          src="/celebration.png"
          alt=""
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mx-auto w-full max-w-[420px] rounded-[24px]"
        />
      </motion.div>

      <p className="mx-auto mt-10 flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <Hand size={14} /> Sans engagement
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} /> Données hébergées en Europe
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Check size={14} /> Résiliable en 2 clics
        </span>
      </p>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
