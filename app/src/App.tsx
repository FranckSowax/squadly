import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Dashboard from '@/pages/app/Dashboard'
import Teams from '@/pages/app/Teams'
import Events from '@/pages/app/Events'
import Polls from '@/pages/app/Polls'
import Messages from '@/pages/app/Messages'
import Stats from '@/pages/app/Stats'
import Billing from '@/pages/app/Billing'
import Settings from '@/pages/app/Settings'

export default function App() {
  return (
    <Routes>
      {/* Landing — Layout avec Navbar fixed + Footer (pattern routes imbriquées) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* App connectée — chaque page s'enveloppe dans AppShell */}
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/equipes" element={<Teams />} />
      <Route path="/app/convocations" element={<Events />} />
      <Route path="/app/sondages" element={<Polls />} />
      <Route path="/app/messages" element={<Messages />} />
      <Route path="/app/statistiques" element={<Stats />} />
      <Route path="/app/abonnement" element={<Billing />} />
      <Route path="/app/parametres" element={<Settings />} />

      {/* Auth — placeholder, Phase 5 plante la vraie page OAuth */}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
