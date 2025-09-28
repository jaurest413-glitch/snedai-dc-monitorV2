/**
 * 🏗️ COMPOSANT PRINCIPAL - APPLICATION DE MONITORING
 *
 * Architecture:
 * - Gestion d'état centralisée pour le sélecteur de site
 * - API Supabase pour récupération des données IoT
 * - Interface adaptative selon la disponibilité des données
 * - Gestion robuste des erreurs et sites hors ligne
 *
 * Sites supportés:
 * - SANON (ESP32_DHT11) - Site principal avec données
 * - SIEGE (ESP32_DHT11_SIEGE) - Site secondaire
 * - PLATEAU (ESP32_DHT11_PLATEAU) - Site secondaire
 */

import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'

import { Header } from './components'
import { Section } from './components'
import { MainContent } from './components'
import { Footer } from './components'
import { Dashboard } from './components/Dashboard'
import AboutModal from './components/AboutModal'

function App() {
  // 🧭 NAVIGATION: État de la page actuelle (home/dashboard)
  const [currentPage, setCurrentPage] = useState('home')

  // ⏳ CHARGEMENT: Indicateur de chargement pendant les requêtes API
  const [isLoading, setIsLoading] = useState(false)

  // 📊 DONNÉES: Historique des 24 dernières lectures du site sélectionné
  const [readings, setReadings] = useState([])

  // 🏢 SITE: Site actuellement sélectionné (SANON/SIEGE/PLATEAU)
  const [selectedSite, setSelectedSite] = useState('SANON')

  // ✅ NOUVEAU: État du site pour gestion adaptative (online/offline/error)
  const [siteStatus, setSiteStatus] = useState('online')

  // 📈 LECTURE ACTUELLE: Dernière lecture disponible du site sélectionné
  const [latestReading, setLatestReading] = useState({
    temperature_c: '--',
    humidity_percent: '--',
    id: 0,
    device_id: '',
    recorded_at: '',
  })

  // 🔄 DÉCLENCHEUR: Recharge les données quand le site change
  useEffect(() => {
    if (selectedSite === 'SANON') {
      getReadings('ESP32_DHT11')
    } else if (selectedSite === 'SIEGE') {
      getReadings('ESP32_DHT11_SIEGE')
    } else if (selectedSite === 'PLATEAU') {
      getReadings('ESP32_DHT11_PLATEAU')
    }
  }, [selectedSite])

  // 🔄 ACTUALISATION AUTOMATIQUE: Rafraîchit les données toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Actualisation automatique des données...')
      if (selectedSite === 'SANON') {
        getReadings('ESP32_DHT11')
      } else if (selectedSite === 'SIEGE') {
        getReadings('ESP32_DHT11_SIEGE')
      } else if (selectedSite === 'PLATEAU') {
        getReadings('ESP32_DHT11_PLATEAU')
      }
    }, 30000) // 30 secondes

    return () => {
      clearInterval(interval)
    }
  }, [selectedSite])

  // 🌐 NAVIGATION URL: Gestion de la navigation via URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const page = urlParams.get('page')

    if (page === 'dashboard') {
      console.log('📊 Navigation vers le dashboard via URL')
      setCurrentPage('dashboard')
    } else if (page === 'home') {
      console.log("🏠 Navigation vers l'accueil via URL")
      setCurrentPage('home')
    }
  }, [])

  // 🪟 MODAL: État de visibilité du modal "À propos"
  const [showAboutModal, setShowAboutModal] = useState(false)

  // 🌐 FONCTION PRINCIPALE: Récupération des données depuis l'API Supabase
  const getReadings = async (siteId) => {
    try {
      setIsLoading(true)

      // 📡 REQUÊTE API: Récupération des 24 dernières lectures du site
      const response = await fetch(
        `https://zmdsgzswdovyxrvkfjml.supabase.co/rest/v1/api_sensorreading?order=recorded_at.desc&limit=24&device_id=eq.${siteId}`,
        {
          headers: {
            apikey: 'sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            Authorization:
              'Bearer sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            'Content-Type': 'application/json',
          },
        },
      )

      // ✅ VÉRIFICATION HTTP: Contrôle du statut de la réponse
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Données reçues pour', siteId, ':', data)

      // 🛡️ GESTION DÉFENSIVE: Vérification de l'existence et du contenu des données
      if (data && data.length > 0) {
        setReadings(data)
        setLatestReading(data[0])
        setSiteStatus('online')
        console.log('✅ Données chargées avec succès')
      } else {
        // 🔴 SITE HORS LIGNE: Gestion des sites sans données disponibles
        setReadings([])
        setLatestReading({
          temperature_c: '--',
          humidity_percent: '--',
          id: 0,
          device_id: siteId,
          recorded_at: new Date().toISOString(),
        })
        setSiteStatus('offline')
        console.log('⚠️ Aucune donnée disponible pour', siteId)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des données:', error)

      // 🚨 GESTION D'ERREUR: Fallback en cas d'échec de l'API
      setReadings([])
      setLatestReading({
        temperature_c: '--',
        humidity_percent: '--',
        id: 0,
        device_id: siteId,
        recorded_at: new Date().toISOString(),
      })
      setSiteStatus('error')

      setIsLoading(false)
    }
  }

  // 🎯 GESTIONNAIRE: Changement de site sélectionné
  const handleSelectSite = (site) => {
    setSelectedSite(site)
  }

  // 🧭 NAVIGATION: Gestion du changement de page et des modals
  const navigateTo = (page) => {
    console.log(`🧭 Navigation vers: ${page}`)

    if (page === 'about') {
      setShowAboutModal(true) // Ouvrir le modal
    } else {
      setCurrentPage(page)
      setShowAboutModal(false) // Fermer le modal si on change de page

      // ✅ MISE À JOUR URL: Synchroniser l'URL avec la navigation
      const url = new URL(window.location)
      if (page === 'home') {
        url.searchParams.delete('page')
      } else {
        url.searchParams.set('page', page)
      }

      // Mettre à jour l'URL sans recharger la page
      window.history.pushState({ page }, '', url.toString())
    }
  }

  // ⏳ ÉCRAN DE CHARGEMENT: Affichage pendant la récupération des données
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    )
  }

  // 📊 PAGE DASHBOARD: Affichage de la page dashboard avec modal
  if (currentPage === 'dashboard') {
    return (
      <>
        <Dashboard
          onNavigate={navigateTo}
          currentPage={currentPage}
          selectedSite={selectedSite}
        />
        <AboutModal
          isOpen={showAboutModal}
          onClose={() => setShowAboutModal(false)}
        />
      </>
    )
  }

  // 🏠 PAGE PRINCIPALE: Interface principale avec sélecteur de site
  return (
    <div className="font-sans bg-gradient-to-br from-[#F5F7FA] to-[#E0E7FF] text-foreground min-h-screen">
      {/* 🎨 EFFETS VISUELS: Particules d'arrière-plan animées */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="particle w-2 h-2 left-[10%]"></div>
        <div className="particle w-3 h-3 left-[20%]"></div>
        <div className="particle w-1 h-1 left-[30%]"></div>
        <div className="particle w-4 h-4 left-[40%]"></div>
        <div className="particle w-2 h-2 left-[50%]"></div>
        <div className="particle w-3 h-3 left-[60%]"></div>
        <div className="particle w-1 h-1 left-[70%]"></div>
        <div className="particle w-4 h-4 left-[80%]"></div>
        <div className="particle w-2 h-2 left-[90%]"></div>
      </div>

      {/* 🧩 COMPOSANTS PRINCIPAUX: Structure de l'interface */}
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      <Section />
      <MainContent
        latestReading={latestReading}
        readings={readings}
        fetchLatestData={getReadings}
        selectedSite={selectedSite}
        handleSelectSite={handleSelectSite}
        siteStatus={siteStatus} // ✅ NOUVEAU: Statut du site pour interface adaptative
      />
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <Footer />
    </div>
  )
}

export default App
