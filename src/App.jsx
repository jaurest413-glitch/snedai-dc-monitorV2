/**
 * 🏗️ COMPOSANT PRINCIPAL - APPLICATION DE MONITORING
 * VERSION CORRIGÉE - SANS RECHARGEMENT AUTOMATIQUE
 */

import { useState, useEffect, useRef } from 'react'
import { CircularProgress } from '@mui/material'

import { Header } from './components'
import { MainContent } from './components'
import { Footer } from './components'
import { Dashboard } from './components/Dashboard'
import AboutModal from './components/AboutModal'
import {
  createSafeInterval,
  getRefreshInterval,
  getSiteConfig,
} from './config/refreshConfig'

function App() {
  // 🔄 RÉFÉRENCE POUR ÉVITER LES FUITES MÉMOIRE
  const intervalsRef = useRef([])
  const isUnmountingRef = useRef(false)

  // 🛡️ PROTECTION SIMPLIFIÉE - SANS GESTIONNAIRES GLOBAUX AGRESSIFS
  useEffect(() => {
    // Marquer comme monté
    isUnmountingRef.current = false

    // Nettoyage au démontage UNIQUEMENT
    return () => {
      isUnmountingRef.current = true
      console.log('🧹 Nettoyage des intervalles au démontage...')

      // Nettoyer tous les intervalles stockés
      intervalsRef.current.forEach(clearInterval)
      intervalsRef.current = []
    }
  }, [])

  // 🧭 NAVIGATION: État de la page actuelle
  const [currentPage, setCurrentPage] = useState('home')

  // ⏳ CHARGEMENT: Indicateur de chargement
  const [isLoading, setIsLoading] = useState(false)

  // 📊 DONNÉES: États des données
  const [readings, setReadings] = useState([])
  const [selectedSite, setSelectedSite] = useState('SANON')
  const [siteStatus, setSiteStatus] = useState('online')
  const [latestReading, setLatestReading] = useState({
    temperature_c: '--',
    humidity_percent: '--',
    id: 0,
    device_id: '',
    recorded_at: '',
  })

  // 🪟 MODAL: État du modal "À propos"
  const [showAboutModal, setShowAboutModal] = useState(false)

  // 🔄 FONCTION DE RÉCUPÉRATION DES DONNÉES - OPTIMISÉE
  const getReadings = async (siteId) => {
    // 🛡️ PROTECTION: Ne pas faire de requête si le composant est démonté
    if (isUnmountingRef.current) {
      console.log('⏹️ Composant en cours de démontage, requête annulée')
      return
    }

    try {
      setIsLoading(true)

      console.log(`🔍 Récupération intelligente des données pour ${siteId}`)

      // 📊 ÉTAPE 1: Récupérer la dernière mesure
      console.log('📡 Étape 1: Récupération de la dernière mesure...')
      const lastResponse = await fetch(
        `https://zmdsgzswdovyxrvkfjml.supabase.co/rest/v1/api_sensorreading?order=recorded_at.desc&limit=1&device_id=eq.${siteId}`,
        {
          headers: {
            apikey: 'sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            Authorization:
              'Bearer sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            'Content-Type': 'application/json',
          },
        },
      )

      if (!lastResponse.ok) {
        throw new Error(`HTTP error! status: ${lastResponse.status}`)
      }

      const lastData = await lastResponse.json()

      // 🛡️ VÉRIFICATION: S'assurer que le composant est toujours monté
      if (isUnmountingRef.current) {
        console.log('⏹️ Composant démonté pendant la requête, données ignorées')
        return
      }

      if (lastData.length === 0) {
        // ❌ Aucune donnée disponible
        console.log('⚠️ Aucune donnée trouvée pour ce site')
        setReadings([])
        setLatestReading({
          temperature_c: '--',
          humidity_percent: '--',
          id: 0,
          device_id: siteId,
          recorded_at: new Date().toISOString(),
        })
        setSiteStatus('offline')
        return
      }

      // 📊 ÉTAPE 2: Calculer la date de début (24h avant la dernière mesure)
      const lastDate = new Date(lastData[0].recorded_at)
      const startDate = new Date(lastDate.getTime() - 24 * 60 * 60 * 1000) // 24h avant

      console.log(`📅 Dernière mesure: ${lastDate.toISOString()}`)
      console.log(`📅 Début période: ${startDate.toISOString()}`)

      // 📊 ÉTAPE 3: Récupérer toutes les données depuis cette date
      console.log('📡 Étape 2: Récupération des données sur 24h...')
      const allResponse = await fetch(
        `https://zmdsgzswdovyxrvkfjml.supabase.co/rest/v1/api_sensorreading?order=recorded_at.asc&device_id=eq.${siteId}&recorded_at=gte.${startDate.toISOString()}`,
        {
          headers: {
            apikey: 'sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            Authorization:
              'Bearer sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            'Content-Type': 'application/json',
          },
        },
      )

      if (!allResponse.ok) {
        throw new Error(`HTTP error! status: ${allResponse.status}`)
      }

      const allData = await allResponse.json()

      // 🛡️ VÉRIFICATION FINALE: S'assurer que le composant est toujours monté
      if (isUnmountingRef.current) {
        console.log('⏹️ Composant démonté pendant la requête, données ignorées')
        return
      }

      if (allData && allData.length > 0) {
        setReadings(allData)
        setLatestReading(allData[allData.length - 1]) // Dernière mesure
        setSiteStatus('online')
        console.log(
          `✅ ${allData.length} points récupérés sur 24h intelligentes`,
        )
        console.log(
          `📊 Période: ${new Date(allData[0].recorded_at).toLocaleString()} → ${new Date(allData[allData.length - 1].recorded_at).toLocaleString()}`,
        )
      } else {
        setReadings([])
        setLatestReading({
          temperature_c: '--',
          humidity_percent: '--',
          id: 0,
          device_id: siteId,
          recorded_at: new Date().toISOString(),
        })
        setSiteStatus('offline')
        console.log('⚠️ Aucune donnée dans la période de 24h')
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération intelligente:', error)

      // 🛡️ GESTION D'ERREUR SANS RECHARGEMENT
      if (!isUnmountingRef.current) {
        setReadings([])
        setLatestReading({
          temperature_c: '--',
          humidity_percent: '--',
          id: 0,
          device_id: siteId,
          recorded_at: new Date().toISOString(),
        })
        setSiteStatus('error')
      }
    } finally {
      if (!isUnmountingRef.current) {
        setIsLoading(false)
      }
    }
  }

  // 🔄 CHARGEMENT INITIAL DES DONNÉES
  useEffect(() => {
    const loadInitialData = () => {
      const siteConfig = getSiteConfig(selectedSite)
      if (siteConfig.enabled) {
        getReadings(siteConfig.deviceId)
      } else {
        // ✅ CORRECTION : Vider les données pour les sites désactivés
        console.log(`🧹 Site ${selectedSite} désactivé - Nettoyage des données`)
        setReadings([])
        setLatestReading({
          temperature_c: '--',
          humidity_percent: '--',
          id: 0,
          device_id: selectedSite,
          recorded_at: new Date().toISOString(),
        })
        setSiteStatus('offline')
      }
    }

    loadInitialData()
  }, [selectedSite])

  // 🔄 ACTUALISATION AUTOMATIQUE - VERSION SÉCURISÉE
  useEffect(() => {
    const siteConfig = getSiteConfig(selectedSite)

    if (!siteConfig.enabled) {
      console.log(
        `⚠️ Site ${selectedSite} désactivé - Pas d'actualisation automatique`,
      )
      return
    }

    const refreshData = () => {
      // 🛡️ DOUBLE PROTECTION
      if (isUnmountingRef.current) {
        console.log('⏹️ Actualisation annulée - composant démonté')
        return
      }

      console.log('🔄 Actualisation automatique des données...')
      getReadings(siteConfig.deviceId)
    }

    // 🔄 CRÉATION DE L'INTERVALLE SÉCURISÉ
    const intervalId = setInterval(refreshData, getRefreshInterval('DATA'))

    // 📝 STOCKER LA RÉFÉRENCE POUR LE NETTOYAGE
    intervalsRef.current.push(intervalId)

    // 🧹 NETTOYAGE DE CET INTERVALLE SPÉCIFIQUE
    return () => {
      clearInterval(intervalId)
      intervalsRef.current = intervalsRef.current.filter(
        (id) => id !== intervalId,
      )
    }
  }, [selectedSite])

  // 🌐 NAVIGATION URL - VERSION SÉCURISÉE
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const page = urlParams.get('page')

      if (page === 'dashboard' && currentPage !== 'dashboard') {
        console.log('📊 Navigation vers le dashboard via URL')
        setCurrentPage('dashboard')
      } else if (page === 'home' && currentPage !== 'home') {
        console.log("🏠 Navigation vers l'accueil via URL")
        setCurrentPage('home')
      } else if (!page && currentPage !== 'home') {
        console.log("🏠 Navigation vers l'accueil par défaut")
        setCurrentPage('home')
      }
    }

    // Vérification initiale
    handleUrlChange()

    // Écouter les changements d'URL (navigation navigateur)
    const handlePopState = () => handleUrlChange()
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [currentPage])

  // 🎯 GESTIONNAIRES D'ÉVÉNEMENTS - OPTIMISÉS
  const handleSelectSite = (site) => {
    console.log(`🏢 Changement de site: ${site}`)
    setSelectedSite(site)
  }

  const navigateTo = (page) => {
    console.log(`🧭 Navigation vers: ${page}`)

    if (page === 'about') {
      setShowAboutModal(true)
      return
    }

    // 🔄 MISE À JOUR DE L'ÉTAT ET DE L'URL
    setCurrentPage(page)
    setShowAboutModal(false)

    // 🌐 MISE À JOUR DE L'URL SANS RECHARGEMENT
    const url = new URL(window.location)
    if (page === 'home') {
      url.searchParams.delete('page')
    } else {
      url.searchParams.set('page', page)
    }

    // 📝 MISE À JOUR SILENCIEUSE DE L'URL
    window.history.pushState({ page }, '', url.toString())
  }

  // ⏳ ÉCRAN DE CHARGEMENT
  if (isLoading && readings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
        <span className="ml-4 text-gray-600">Chargement des données...</span>
      </div>
    )
  }

  // 📊 PAGE DASHBOARD
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

  // 🏠 PAGE PRINCIPALE
  return (
    <div className="font-sans bg-gradient-to-br from-[#F5F7FA] to-[#E0E7FF] text-foreground min-h-screen">
      {/* 🎨 EFFETS VISUELS */}
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

      {/* 🧩 COMPOSANTS PRINCIPAUX */}
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      <MainContent
        latestReading={latestReading}
        readings={readings}
        fetchLatestData={getReadings}
        selectedSite={selectedSite}
        handleSelectSite={handleSelectSite}
        siteStatus={siteStatus}
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
