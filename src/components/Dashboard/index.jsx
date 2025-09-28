import { useState } from 'react'
import { Header } from '../header'
import { Footer } from '../Footer'
import DashboardHero from './DashboardHero'
import PowerBIDashboard from './PowerBIDashboard'
import AlertsSystem from './AlertsCenter'
import AboutModal from '../AboutModal'

export const Dashboard = ({ onNavigate, currentPage, selectedSite }) => {
  const [showAboutModal, setShowAboutModal] = useState(false)
  return (
    <div className="font-sans bg-gradient-to-br from-[#F5F7FA] to-[#E0E7FF] text-foreground min-h-screen">
      <Header onNavigate={onNavigate} currentPage={currentPage} />

      {/* AJOUT : Utiliser votre nouveau composant DashboardHero */}
      <DashboardHero />

      {/* CONTENU DASHBOARD ICI *
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text bg-gradient-to-br from-primary to-accent">
          📊 Dashboard Avancé
        </h1> 
      </div>*/}
      {/* AJOUT : Dashboard PowerBI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PowerBIDashboard />
        {/* AJOUT : Centre d'Alertes */}
        <AlertsSystem
          siteId={selectedSite}
          readingsLimit={50}
          refreshInterval={60000}
          alertThresholds={{
            temperature: { min: 18, max: 27, critical: 35 },
            humidity: { min: 40, max: 60, critical: 85 },
          }}
        />
      </div>

      <Footer />
      {/* AJOUT : Modal About - APRÈS le Footer */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  )
}
